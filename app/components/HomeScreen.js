import React from 'react';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, Footer, FooterTab, ActionSheet} from "native-base";
import ShowsTab from './ShowsTab';
import {Drawer} from 'native-base';
import styles from "../styles";
import ShowsFooter from './ShowsFooter';
import Sidebar from './Sidebar';
import Expo, { SQLite } from 'expo';
import {Root} from 'native-base';
import SyncPage from './SyncPage';

const db = SQLite.openDatabase({ name: 'db.tv_series_guide' });
const BUTTONS = ["Create App DB", "Option 1", "Option 2", "Delete", "Cancel"];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;
export default class HomeScreen extends React.Component {

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

    componentWillUpdate() {
        if(this.state.clicked === BUTTONS[0]) {
            this.syncPage();
        }
    }

    syncPage() {
        console.log("Switching to sync page now");
        console.log(this.props.navigation.navigate);
        this.props.navigation.navigate("Sync");
    }

    render() {
        var updateContent = this.updateContent;
        console.log(this.props.navigation);
        return (
            <Root>
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
                                <Button transparent onPress={() => this.props.navigation.navigate("Sync")}><Icon name="refresh" /></Button>
                            </Right>

                        </Header>

                        <Content>
                            {this.state.mainContent}
                        </Content>

                        <Footer>

                            <ShowsFooter updateContent={updateContent.bind(this)} navigate={this.props.navigation} />

                        </Footer>
                    </Drawer>
                </Container>
            </Root>
        );
    }
}
