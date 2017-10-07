import React, { Component } from "react";
import styles from "../styles";
import {
    Container,
    Text,
    List
} from "native-base";
import datas from '../api/json/shows.json';
import RecentEpisodeTile from './RecentEpisodeTile';

export default class RecentTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            loaded: false
        };
    }

    componentWillMount () {
        datas.map(t => this.fetchDataFromAPI(t.show.ids.trakt, t));
    }

    fetchDataFromAPI(id, data) {
        let URI = "https://api.trakt.tv/shows/"+id+"/next_episode";
        fetch(URI, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '',
            }
        })
            .then(response => response.json())
            .then(response => this.handleResponse(response, data))
            .catch(error => {
                console.log('Something bad happened ' + error);
            });
    }

    handleResponse(data, episode) {
        console.log(data);
        episode.title = data.title;
        episode.season = data.season;
        episode.number = data.number;
        console.log(episode);
        this.state.listData.push(episode);
        console.log("In state" + this.state.listData);
        this.setState({loaded: true});
    }

    render() {
        return (
            <Container style={styles.container}>
                <List
                    dataArray={this.state.listData}
                    renderRow={data =>
                        <RecentEpisodeTile content={data} style={{paddingLeft: 0, backgroundColor: "#2a2a2a"}}/>}
                />
            </Container>
        )
    }
}