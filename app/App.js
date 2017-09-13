import React from 'react';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, Footer, FooterTab } from "native-base";
import ShowsTab from './components/ShowsTab';
import {Drawer} from 'native-base';
import styles from "./styles";
import ShowsFooter from './components/ShowsFooter';
import Sidebar from './components/Sidebar';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        var updateContent  = this.updateContent.bind(this);
        var initComponent = <ShowsTab/>;
        this.state = {
            mainContent: initComponent,
            shadowOffsetWidth: 1,
            shadowRadius: 4,
        };
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

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
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<Sidebar/>}
                    onClose={() => this.closeDrawer()} >
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.openDrawer()}>
                            <Icon name="ios-menu" />
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
                </Drawer>
            </Container>
        );
    }
}
