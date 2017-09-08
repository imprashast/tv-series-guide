import React, { Component } from "react";
import { ListView } from "react-native";
import SingleEpisodeTile from './SingleEpisodeTile';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Body,
    Item,
    Input,
    View,
} from "native-base";

import styles from "../styles";

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

export default class HistoryTab extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
        };
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container style={styles.container}>
                <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <SingleEpisodeTile content={data} style={{paddingLeft: 20, backgroundColor: "#2a2a2a"}}/>
                        }
                        renderLeftHiddenRow={data =>
                            <Button
                                full
                                onPress={() => alert(data.text)}
                                style={{
                                    backgroundColor: "#CCC",
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon active name="information-circle" />
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button
                                full
                                danger
                                onPress={_ => this.deleteRow(secId, rowId, rowMap)}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon active name="trash" />
                            </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                </Content>
            </Container>
        );
    }
}