import React, {Component} from 'react';
import {ActivityIndicator, Button, ScrollView} from 'react-native';
import {resetDB} from "../database/Init";
import {fetchAllShowFromList} from "../database/DbOps";
import styles from "../styles/styles";
import ShowTile from "./ShowTile";
import { Root } from "native-base";
import {white, black} from "../styles/colors";
import { SearchBar } from 'react-native-elements';
import {traktApiHelper} from '../api/ApiHelper';

export default class SyncPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            defaultShows: [],
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.fetchShowsFromDB();
    }

    fetchShowsFromDB() {
        fetchAllShowFromList((tx, results) => {
            var len = results.rows.length;
            if(len > 0) {
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    this.state.defaultShows.push(row);
                }
                this.setState({ isLoading: false });
            }
        });
    }

    resetDB() {
        resetDB();
    }

    _onPress = (event) => {
        this.setState({ isLoading: true });
        if (event.length > 3) {
            this.fetchSearch(event);
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle);
    }

    fetchSearch(query) {
        this.timeoutHandle = setTimeout(()=>{
        }, 10000);
        let url = "https://api.trakt.tv/search/show?query="+query;
        traktApiHelper(url)
            .then(response => this.populateSearchResults(response))
    }

    populateSearchResults(response) {
        this.state.defaultShows = [];
        response.map(t => this.transormObject(t)).map( t => this.state.defaultShows.push(t));
        this.setState({ isLoading: false });
    }

    transormObject(object) {
        let transformedObject = {title: object.show.title,
            tvdb: object.show.ids.tvdb,
            trakt: object.show.ids.trakt,  };
        return transformedObject;
    }

    render() {
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large'/> : null;
        return (
            <Root>
            <ScrollView style={styles.container}>
                <SearchBar
                    noIcon
                    lightTheme
                    onChangeText={this._onPress}
                    onClearText={this._onPress}
                    placeholder='Type Here...' />
                {
                    this.state.defaultShows.map((t, i) => <ShowTile content={t} key={i} navigation={this.props.navigation}/>)
                }
                    {spinner}
                    <Button
                        onPress={this.resetDB}
                        title="Reset DB"
                        color="#841584"
                    />
            </ScrollView>
            </Root>
        );
    }
}