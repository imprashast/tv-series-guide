import React, {Component} from 'react';
import {Container, Header, Title, Button, Icon, Right, Body, Content, Left, Text} from 'native-base';
import Expo, {SQLite} from 'expo';
import styles from "../styles";
import data from '../api/json/shows.json';

const db = SQLite.openDatabase({name: 'db.tv_series_guide'});
export default class SyncPage extends React.Component {

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS shows ( trakt INTEGER PRIMARY KEY NOT NULL , title TEXT , slug TEXT , tvdb INT , imdb TEXT , tmdb INT , tvrage INT , year TEXT , last_watched_at TEXT );'
            );
            tx.executeSql(
                'create table if not exists seasons ( showTraktID integer primary key not null , number int , episodeCount int );'
            );
            tx.executeSql(
                'create table if not exists episode ( showTraktID integer primary key not null , season int , number int , title text , trakt int ,  tvdb int , imdb text , tmdb int , tvrage int , overview text , firstAired text , imageURL text , tvdbRating text , director text );'
            );
        }, error => {
            console.log(error);
        });

        data.map(t => {
            {
                console.log("Got row as: " + t.show.title);
                db.transaction(
                    tx => {
                        tx.executeSql('INSERT OR IGNORE INTO shows (trakt, title, slug, tvdb, imdb, tmdb, tvrage, year, last_watched_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                            [t.show.ids.trakt, t.show.title, t.show.ids.slug, t.show.ids.tvdb, t.show.ids.imdb, t.show.ids.tmdb, t.show.ids.tvrage, t.show.year, t.last_watched_at]);
                    },
                    error => {
                        console.log(error);
                    }
                );
                console.log("Inserted");
            }
        });

        console.log("DB Created");

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM shows', [], (tx, results) => {
                console.log("Query completed");

                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    console.log(`TraktID: ${row.trakt}, Title: ${row.title}`);
                    this.populateSeasonsAndEpisodes(row.trakt);
                }

            });
        });

    }

    populateSeasonsAndEpisodes(traktID) {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM seasons where showTraktID = ?', [traktID], (tx, results) => {
                console.log("Query completed");

                let len = results.rows.length;
                if(len === 0) {
                    console.log(`No data for traktID: ${traktID} fetching....`);
                    this.fetchDataFromAPI(traktID);
                } else {
                    console.log("Yay!! We have data for trakt:"+traktID);
                }
            });
        });
    }

    async fetchDataFromAPI(id) {
        let URI = "https://api.trakt.tv/shows/"+id+"/seasons?extended=episodes";
        console.log(URI);
        fetch(URI, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '0152ea69e59bb84b9632108f4c8717c116aaa7ef5973d9f945077d5f3009c9ab',
            }
        })
            .then(response => response.json())
            .then(response => this.insertSeasonAndEpisodeData(response, id))
            .catch(error => {
                console.log('Something bad happened ' + error);
            });
    }

    async insertSeasonAndEpisodeData(row, id) {
        console.log(`Data from api: ${row} for trackt:${id}`);
        row.map(t => {
            db.transaction(
                tx => {
                    tx.executeSql('INSERT OR IGNORE INTO seasons (showTraktID, number, episodeCount) VALUES (?, ?, ?)',
                        [id, t.number, this.isEmpty(t.episodes)]);
                },
                error => {
                    console.log(error);
                }
            );
            t.episodes.map(ep => this.insertEpisodeData(ep, id));
        })

    }

    async insertEpisodeData(row, id) {
        db.transaction(
            tx => {
                tx.executeSql('INSERT OR IGNORE INTO episode (showTraktID, season, number, title, trakt, tvdb, imdb, tmdb, tvrage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [id, row.season, row.number, row.title, row.ids.trakt, row.ids.tvdb, row.ids.imdb, row.ids.tmdb, row.ids.tvrage]);
            },
            error => {
                console.log(error);
            }
        );
        console.log(`Episode row ${row}`);
    }

    isEmpty(value) {
        if (typeof value  !== "undefined" && value) {
            return value.length;
        } else {
            return 0;
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text>Sync</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    <Text>
                        Welcome to Sync page
                    </Text>
                </Content>
            </Container>
        );
    }
}