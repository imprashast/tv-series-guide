import {tvdbApiHelper, traktApiHelper} from './ApiHelper';
import {insertQuery} from '../database/DbOps';
import {insertIntoShows, updateInfoFromTMDB,
    insertIntoSeasons, insertIntoEpisodes,
    updateEpisodeData} from '../database/Queries';

export const addShow = (traktID) => {
    let URL = "https://api.trakt.tv/shows/"+traktID;
    traktApiHelper(URL)
        .then(response => insertShow(response, traktID))
        .catch(error => {
            console.log('Something bad happened ' + error);
        });
};

function insertShow(response, traktID) {
    console.log(response);
    insertQuery(insertIntoShows,[traktID, response.title, response.ids.slug, response.ids.tvdb, response.ids.imdb, response.ids.tmdb, response.ids.tvrage, response.year, ""]);
    showDetailsFromTVDB(traktID, response.ids.tvdb);
}

async function showDetailsFromTVDB(traktID, tvdbID) {
    let URI = "https://api.thetvdb.com/series/"+tvdbID;
    console.log(`Fetching from TvDB (${tvdbID}) for id ${traktID}`);
    tvdbApiHelper(URI)
        .then(response => insertShowDetailData(response, traktID, tvdbID))
        .catch(error => {
            console.log('Something bad happened ' + error);
        });
}

async function insertShowDetailData(row, traktID, tvdbID) {
    console.log(`Data from tvdb(${tvdbID}) api: ${JSON.stringify(row)} for trakt:${traktID}`);
    insertQuery(updateInfoFromTMDB, [JSON.stringify(row.data.aliases), row.data.banner , row.data.status , row.data.firstAired , row.data.network, row.data.runtime, JSON.stringify(row.data.genre), row.data.overview, row.data.rating, row.data.siteRating, traktID])
    fetchDataFromAPI(traktID);
}

async function fetchDataFromAPI(traktID) {
    let URI = "https://api.trakt.tv/shows/"+traktID+"/seasons?extended=episodes";
    traktApiHelper(URI)
        .then(response => insertSeasonAndEpisodeData(response, traktID))
        .catch(error => {
            console.log('Something bad happened ' + error);
        });
}

async function insertSeasonAndEpisodeData(row, id) {
    console.log(`Data from api: ${row} for trackt:${id}`);
    row.map(t => {
        insertQuery(insertIntoSeasons, [id, t.number, isEmpty(t.episodes)]);
        t.episodes.map(ep => insertEpisodeData(ep, id));
    });
}

async function insertEpisodeData(row, id) {
    insertQuery(insertIntoEpisodes, [id, row.season, row.number, row.title, row.ids.trakt, row.ids.tvdb, row.ids.imdb, row.ids.tmdb, row.ids.tvrage]);
    console.log(`Episode row ${row}`);
    fetchDataFromTvdb(row, id);
}

async function fetchDataFromTvdb(row, id) {
    let URI = "https://api.thetvdb.com/episodes/"+row.ids.tvdb;
    console.log(`Fetching from TvDB for id ${row.ids.tvdb}`);
    tvdbApiHelper(URI)
        .then(response => insertDetailedEpisodeData(response, id))
        .catch(error => {
            console.log('Something bad happened ' + error);
        });
}

async function insertDetailedEpisodeData(row, id) {
    console.log(`Data from tvdb api: ${JSON.stringify(row)} for trakt:${id}`);
    insertQuery(updateEpisodeData, [row.data.overview, row.data.firstAired , row.data.filename , row.data.siteRating , row.data.director, id, row.data.id]);
}

function isEmpty(value) {
    if (typeof value  !== "undefined" && value) {
        return value.length;
    } else {
        return 0;
    }
}