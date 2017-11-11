import db from "./Database";
import {showsTable, seasonsTable,
    episodesTable, dropEpisodeTable,
    dropSeasonsTable, dropShowsTable,
    anticipatedTable, popularTable,
    trendingTable, weeklyPlayedTable,
    weeklyWatchedTable, dropTrendingTable,
    dropAnticipatedTable, dropPopularTable,
    dropWeeklyPlayedTable, dropWeeklyWatchedTable,
    keysTable, dropKeysTable, imageTable} from "./Tables";

export function initDB() {
    createTables();
    console.log("DB Created");
}

export function resetDB() {
    db.transaction(tx => {
        tx.executeSql(dropShowsTable);
        tx.executeSql(dropSeasonsTable);
        tx.executeSql(dropEpisodeTable);
        tx.executeSql(dropTrendingTable);
        tx.executeSql(dropAnticipatedTable);
        tx.executeSql(dropPopularTable);
        tx.executeSql(dropWeeklyWatchedTable);
        tx.executeSql(dropWeeklyPlayedTable);
        tx.executeSql(dropKeysTable);
    }, error => {
        console.error(error);
    });
    console.log("DB Reset Complete");
}

function createTables() {
    db.transaction(tx => {
        tx.executeSql(showsTable);
        tx.executeSql(seasonsTable);
        tx.executeSql(episodesTable);
        tx.executeSql(anticipatedTable);
        tx.executeSql(popularTable);
        tx.executeSql(trendingTable);
        tx.executeSql(weeklyWatchedTable);
        tx.executeSql(weeklyPlayedTable);
        tx.executeSql(keysTable);
        tx.executeSql(imageTable);
    }, error => {
        console.error(error);
    });
}