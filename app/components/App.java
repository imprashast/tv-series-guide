import React from 'react';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, Footer, FooterTab, ActionSheet} from "native-base";
import ShowsTab from './components/ShowsTab';
import {Drawer} from 'native-base';
import styles from "./styles";
import ShowsFooter from './components/ShowsFooter';
import Sidebar from './components/Sidebar';
import Expo, { SQLite } from 'expo';
import {Root} from 'native-base';
import SyncPage from './components/SyncPage';
import NavigatorIOS from 'react-native';

const db = SQLite.openDatabase({ name: 'db.tv_series_guide' });
const BUTTONS = ["Create App DB", "Option 1", "Option 2", "Delete", "Cancel"];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;
export default class Hom extends React.Component {

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

    syncPage() {
        console.log("Switching to sync page now");
        this.navigator.push({
            title: 'Sync Page',
            component: SyncPage,
        });
    }

    render() {
        console.log("Clicked?? "+this.state.clicked);
        if(this.state.clicked === BUTTONS[0]) {
            this.syncPage();
        }
        var updateContent = this.updateContent;
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
                        <Button transparent><Icon name="heart" /></Button>
                        <Button transparent onPress={() =>
                            ActionSheet.show(
                                {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                    title: "Testing ActionSheet"
                                },
                                buttonIndex => {
                                    this.setState({ clicked: BUTTONS[buttonIndex] });
                                }
                            )}><Icon name="more" /></Button>
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
            </Root>
        );
    }
}
