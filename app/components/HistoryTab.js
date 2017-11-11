import React, {Component} from "react";
import {ScrollView, View, Text} from 'react-native';
import styles from "../styles/styles";
import ShowCarousel from "./ShowCarousel";
import {SQLite} from 'expo';
import {traktApiHelper} from "../api/ApiHelper";
import {selectQuery, insertQuery} from "../database/DbOps";
import {fetchUpdatedTimestamp, insertIntoCarouselTable,
    fetchFromCarouselTable} from "../database/Queries";

const trendingURI = "https://api.trakt.tv/shows/trending";
const popularURI = "https://api.trakt.tv/shows/popular";
const weeklyPlayedURI = "https://api.trakt.tv/shows/played/weekly";
const weeklyWatchedURI = "https://api.trakt.tv/shows/watched/weekly";
const anticipatedURI = "https://api.trakt.tv/shows/anticipated";
const db = SQLite.openDatabase({name: 'db.tv_series_guide'});
const trendingTable = "trendingTable";
const popularTable = "popularTable";
const weeklyPlayedTable = "weeklyPlayedTable";
const weeklyWatchedTable = "weeklyWatchedTable";
const anticipatedTable = "anticipatedTable";

export default class HistoryTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: true,
            trendingList: [],
            popularList: [],
            weeklyPlayedList: [],
            weeklyWatchedList: [],
            anticipatedList: [],
            loaded: false
        };
    }

    componentWillMount() {
        selectQuery(fetchUpdatedTimestamp, (tx, results) => {
            var len = results.rows.length;
            if(len === 0) {
                this.fetchDataFromAPI(trendingURI);
                this.fetchDataFromAPI(popularURI);
                this.fetchDataFromAPI(weeklyPlayedURI);
                this.fetchDataFromAPI(weeklyWatchedURI);
                this.fetchDataFromAPI(anticipatedURI);
                this.fetchDataFromDB();
            } else {
                this.fetchDataFromDB();
            }
        });

    }

    dataMapper(tx, results, tableName) {
        var len = results.rows.length;
        if(len > 0) {
            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                if (tableName === trendingTable) {
                    this.state.trendingList.push(row);
                } else if (tableName === popularTable) {
                    this.state.popularList.push(row);
                } else if (tableName === weeklyPlayedTable) {
                    this.state.weeklyPlayedList.push(row);
                } else if (tableName === weeklyWatchedTable) {
                    this.state.weeklyWatchedList.push(row);
                } else if (tableName === anticipatedTable) {
                    this.state.anticipatedList.push(row);
                }
            }
        }
        this.setState(() => ({loaded: true}));
    }

    fetchDataFromDB() {
        selectQuery(fetchFromCarouselTable(trendingTable), (tx, results) => this.dataMapper(tx, results, trendingTable));
        selectQuery(fetchFromCarouselTable(popularTable), (tx, results) => this.dataMapper(tx, results, popularTable));
        selectQuery(fetchFromCarouselTable(weeklyWatchedTable), (tx, results) => this.dataMapper(tx, results, weeklyWatchedTable));
        selectQuery(fetchFromCarouselTable(weeklyPlayedTable), (tx, results) => this.dataMapper(tx, results, weeklyPlayedTable));
        selectQuery(fetchFromCarouselTable(anticipatedTable), (tx, results) => this.dataMapper(tx, results, anticipatedTable));
    }

    fetchDataFromAPI(URI) {
        traktApiHelper(URI)
            .then(response => this.handleResponse(response, URI))
            .catch(error => {
                console.log('Something bad happened ' + error)
            });
    }
    //trakt, title, tvdb, year, watchers, inserted_at

    handleResponse(response, URI) {
        if(URI === trendingURI) {
            response.map(t => {
                insertQuery(insertIntoCarouselTable("trendingTable"), [t.show.ids.trakt, t.show.title, t.show.ids.tvdb, t.show.year, t.watchers, new Date().toJSON() ]);
                //this.state.trendingList.push(t);
            })
        } else if (URI === popularURI) {
            response.map(t => {
                insertQuery(insertIntoCarouselTable("popularTable"), [t.ids.trakt, t.title, t.ids.tvdb, t.year, t.watchers, new Date().toJSON() ]);
                //this.state.popularList.push(t);
            })
        } else if (URI === weeklyPlayedURI) {
            response.map(t => {
                insertQuery(insertIntoCarouselTable("weeklyPlayedTable"), [t.show.ids.trakt, t.show.title, t.show.ids.tvdb, t.show.year, t.watchers, new Date().toJSON() ]);
                //this.state.weeklyPlayedList.push(t);
            })
        } else if (URI === weeklyWatchedURI) {
            response.map(t => {
                insertQuery(insertIntoCarouselTable("weeklyWatchedTable"), [t.show.ids.trakt, t.show.title, t.show.ids.tvdb, t.show.year, t.watchers, new Date().toJSON() ]);
                //this.state.weeklyWatchedList.push(t);
            })
        } else if (URI === anticipatedURI) {
            response.map(t => {
                insertQuery(insertIntoCarouselTable("anticipatedTable"), [t.show.ids.trakt, t.show.title, t.show.ids.tvdb, t.show.year, t.watchers, new Date().toJSON() ]);
                //this.state.anticipatedList.push(t);
            })
        }
        this.setState(() => ({loaded: true}));
    }


    render() {
        return (
            <ScrollView>
                <Text style={styles.storeHeaderText}>Anticipated Shows</Text>
                <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true}>
                    {this.state.anticipatedList.map(
                        (t, i) => <ShowCarousel title={t.title} tvdb={t.tvdb} key={i}/>
                    )}
                </ScrollView>
                <View style={styles.lineSeparator}/>
                <Text style={styles.storeHeaderText}>Trending Shows</Text>
                <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true}>
                    {this.state.trendingList.map(
                        (t, i) => <ShowCarousel title={t.title} tvdb={t.tvdb} key={i}/>
                    )}
                </ScrollView>
                <View style={styles.lineSeparator}/>
                <Text style={styles.storeHeaderText}>Popular Shows</Text>
                <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true}>
                    {this.state.popularList.map(
                        (t, i) => <ShowCarousel title={t.title} tvdb={t.tvdb} key={i}/>
                    )}
                </ScrollView>
                <View style={styles.lineSeparator}/>
                <Text style={styles.storeHeaderText}>Most Played Shows this week</Text>
                <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true}>
                    {this.state.weeklyPlayedList.map(
                        (t, i) => <ShowCarousel title={t.title} tvdb={t.tvdb} key={i}/>
                    )}
                </ScrollView>
                <View style={styles.lineSeparator}/>
                <Text style={styles.storeHeaderText}>Most Watched Shows this week</Text>
                <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true}>
                    {this.state.weeklyWatchedList.map(
                        (t, i) => <ShowCarousel title={t.title} tvdb={t.tvdb} key={i}/>
                    )}
                </ScrollView>
            </ScrollView>
        );
    }
}
