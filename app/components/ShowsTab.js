import React, { Component } from 'react';
import EpisodeTile from './EpisodeTile';
import { Container, Header, Title, Button, Icon, Tabs, Tab, Right, Left, Body } from 'native-base';

export default class ShowsTab extends React.Component {

    render() {
        return (
            <Container>
                <EpisodeTile/>
            </Container>
        );
    }
}