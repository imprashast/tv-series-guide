import React, {PureComponent} from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from "../styles/styles";
import {selectWithArgs} from '../database/DbOps';
import EpisodeTabs from './EpisodeTabs';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import type { NavigationState } from 'react-native-tab-view/types';
import Episode from './Episode';

type Route = {
    key: string,
    title: string,
};

type State = NavigationState<Route>;

export default class SeasonEpisodes extends PureComponent<*, State> {

    state: State = {
        index: 0,
        routes: [
            { key: '1', title: 'E1' },
            { key: '2', title: 'E2' },
        ],
        episodeTable: [],
    };

    componentWillMount() {
        selectWithArgs("select * from episode where showTraktID = ? and season = ?",
            [this.props.navigation.state.params.show, this.props.navigation.state.params.title],
            (tx, results) => {
                console.log("Query completed");
                let len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    this.state.episodeTable.push(row);
                    if(i > 1) {
                        this.state.routes.push({key: (i + 1).toString(), title: `E${row.number}`});
                    }
                }
                this.setState(() => ({loading: false}));
            })
    }

    _handleIndexChange = index => {
        this.setState({
            index,
        });
    };

    _renderHeader = props => {
        return (
            <TabBar
                {...props}
                scrollEnabled
                indicatorStyle={{backgroundColor: '#ffeb3b',}}
                style={{backgroundColor: '#12698e',}}
                tabStyle={{width: 70,}}
                labelStyle={{color: '#fff', fontWeight: '400',}}
            />
        );
    };

    _renderScene = ({route}) => {
        return (
            <Episode data={this.state.episodeTable[route.key]} />
        );
    };

    render() {
        return (
            <TabViewAnimated
                style={[styles.container, this.props.style]}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}