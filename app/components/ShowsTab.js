import React, { Component } from 'react';
import EpisodeTile from './EpisodeTile';
import { Container, Header, Title, Button, Icon, Tabs, Tab, Right, Left, Body } from 'native-base';

export default class ShowsTab extends React.Component {

    render() {
        console.log(`Shows Tab: ${JSON.stringify(this.props)}`);
        return (
            <Container>
                <EpisodeTile navigation={this.props.navigation}/>
            </Container>
        );
    }
}