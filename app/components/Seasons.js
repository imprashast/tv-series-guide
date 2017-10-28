import React, {Component} from 'react';
import {Container, Header, Title, Button, Icon, Right, Body, Content, Left, Text} from 'native-base';
import Expo, {SQLite} from 'expo';
import styles from "../styles";


const db = SQLite.openDatabase({name: 'db.tv_series_guide'});
export default class SyncPage extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text>Sync</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    <Text>
                        Welcome to Seasons page
                    </Text>
                </Content>
            </Container>
        );
    }
}