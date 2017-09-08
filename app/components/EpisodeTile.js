import React from 'react';
import { ListView } from 'react-native';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text,List, ListItem, Thumbnail} from "native-base";
import styles from "../styles";
import { Grid, Row } from "react-native-easy-grid";
import SingleEpisodeTile from './SingleEpisodeTile';
const datas = [
    {
        img: 'http://thetvdb.com/banners/_cache/posters/282670-13.jpg',
        text: "Narcos",
        note: "3x01 The Kingpin Strategy",
        aired: "6 days ago",
        airDetails: "10 remaining Netflix - Fri 9:00 AM"

    },
    {
        img: 'http://thetvdb.com/banners/_cache/posters/121361-57.jpg',
        text: "Game of Thrones",
        note: "7x07 The Dragon and the Wolf",
        aired: "6 days ago",
        airDetails: "1 remaining HBO - Mon 3:00 AM"

    },
    ];

export default class EpisodeTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listViewData: datas,
        };
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return(
            <Container>
                <Content>
                    <List
                        //dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        dataArray={datas}
                        renderRow={data =>
                            <SingleEpisodeTile content={data}/>}
                        /*renderLeftHiddenRow={data =>
                            <Button full onPress={() => alert(data)}>
                                <Icon active name="information-circle" />
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="heart" />
                            </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}*/
                    />
                </Content>
            </Container>
        );
    }
}