import React from 'react';
import { ListView } from 'react-native';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text,List, ListItem, Thumbnail} from "native-base";
import styles from "../styles";
import { Grid, Row } from "react-native-easy-grid";
import SingleEpisodeTile from './SingleEpisodeTile';
import Expo, {SQLite} from 'expo';

const db = SQLite.openDatabase({name: 'db.tv_series_guide'});
export default class EpisodeTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listViewData: [],
        };
    }

    componentDidMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM shows ORDER BY title ASC', [], (tx, results) => {
                console.log("Query completed");

                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    this.state.listViewData.push(row);
                }
                this.setState({loaded: true});
            });
        });
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        console.log(`Episode Tile: ${JSON.stringify(this.props)}`);
        return(
            <Container>
                <Content>
                    <List
                        dataArray={this.state.listViewData}
                        renderRow={data =>
                            <SingleEpisodeTile content={data} style={{paddingLeft: 0, backgroundColor: "#2a2a2a"}} navigation={this.props.navigation}/>
                        }
                    />
                </Content>
            </Container>
        );
    }
}