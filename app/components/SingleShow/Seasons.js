import React, {Component} from 'react';
import {Container, Header, Title, Button, Icon, Right, Body, Content, Left, Text, Tab, Tabs} from 'native-base';
import Expo, {SQLite} from 'expo';
import styles from "../../styles/styles";
import {ProgressViewIOS, View, ScrollView} from 'react-native';
import SeasonsProgress from './SeasonsProgress';
import ShowDetails from './ShowDetails';

const db = SQLite.openDatabase({name: 'db.tv_series_guide'});
export default class SyncPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showsTable: '',
            seasonsTable: [],
            loaded: false
        };
    }

    componentWillMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM shows where trakt = ?', [this.props.navigation.state.params.show], (tx, results) => {
                let len = results.rows.length;
                this.setState({showsTable: results.rows.item(0)})
                //console.log(results.rows.item(0));
            });

            tx.executeSql('SELECT * FROM seasons where showTraktID = ? ORDER BY number DESC', [this.props.navigation.state.params.show], (tx, results) => {
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    this.state.seasonsTable.push(row);
                }
                this.setState({loaded: true});
                //console.log(results.rows);
            });
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Tabs initialPage={0} tabBarPosition="top">
                    <Tab heading="SHOW">
                        <Container style={styles.container}>
                            <ShowDetails content={this.state.showsTable}/>
                        </Container>
                    </Tab>
                    <Tab heading="OVERVIEW">
                        <Container style={styles.container}>

                        </Container>
                    </Tab>
                    <Tab heading="SEASONS">
                        <ScrollView>
                        <Container style={styles.container}>
                            {
                                this.state.seasonsTable.map((t,i) =>
                                    (<SeasonsProgress key={i}
                                                      number={t.number}
                                                      episodeCount={t.episodeCount}
                                                      data={t.showTraktID}
                                                      navigation={this.props.navigation}
                                    />))
                            }
                        </Container>
                        </ScrollView>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
