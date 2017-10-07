import React from 'react';
import { ListView } from 'react-native';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text,List, ListItem, Thumbnail} from "native-base";
import styles from "../styles";
import { Grid, Row } from "react-native-easy-grid";
import SingleEpisodeTile from './SingleEpisodeTile';
import datas from '../api/json/shows.json';

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
                            <SingleEpisodeTile content={data} style={{paddingLeft: 0, backgroundColor: "#2a2a2a"}}/>}
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