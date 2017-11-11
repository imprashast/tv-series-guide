import React, { Component } from 'react';
import EpisodeTile from './EpisodeTile';

export default class ShowsTab extends Component {

    render() {
        return (<EpisodeTile navigation={this.props.navigation}/>
        );
    }
}