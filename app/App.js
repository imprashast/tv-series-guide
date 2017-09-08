import React from 'react';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, Footer, FooterTab } from "native-base";
import ShowsTab from './components/ShowsTab';
import styles from "./styles";
import ShowsFooter from './components/ShowsFooter';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        var updateContent  = this.updateContent.bind(this);
        var initComponent = <ShowsTab/>;
        this.state = {
            mainContent: initComponent
        };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }

    updateContent(component) {
        console.log("Updating");
        this.setState({mainContent: component});
    }

    render() {

        var updateContent = this.updateContent;
        return (
            <Container style={styles.container}>
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Shows</Title>
                    </Body>
                    <Right>
                        <Button transparent><Icon name="search" /></Button>
                        <Button transparent><Icon name="heart" /></Button>
                        <Button transparent><Icon name="more" /></Button>
                    </Right>

                </Header>

                <Content>
                    {this.state.mainContent}
                </Content>

                <Footer>

                        <ShowsFooter updateContent={updateContent.bind(this)} />

                </Footer>
            </Container>
        );
    }
}
