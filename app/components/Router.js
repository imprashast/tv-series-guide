import { TabNavigator, DrawerNavigator, StackNavigator } from 'react-navigation';
import {TouchableOpacity, Image} from "react-native";

import HistoryTab from './HistoryTab';
import ShowsTab from './ShowsTab';
import RecentTab from './RecentTab';
import UpcomingTab from './UpcomingTab';
import Seasons from "./SingleShow/Seasons";
import React from 'react';
import styles from "../styles/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import SyncPage from "./SyncPage";
import SeasonEpisodes from './SeasonEpisodes';


const Router = StackNavigator({
    Drawer: {
        screen: DrawerNavigator({
            DrawerMenu1: {
                screen: StackNavigator({
                    Tabs: {
                        screen: TabNavigator({
                            Tab1: { screen: ShowsTab, navigationOptions: { title: "Shows", headerMode: "none", tabBarIcon: ({ tintColor }) => (
                                <Image
                                    source={require('../img/shows.png')}
                                    style={[styles.drawerIcon, {tintColor: tintColor}]}
                                />
                            ) } },
                            Tab2: { screen: HistoryTab, navigationOptions: { title: "History", headerMode: "screen", tabBarIcon: ({ tintColor }) => (
                                <Image
                                    source={require('../img/history.png')}
                                    style={[styles.drawerIcon, {tintColor: tintColor}]}
                                />
                            ) }  },
                            Tab3: { screen: UpcomingTab, navigationOptions: { title: "Upcoming", headerMode: "screen", tabBarIcon: ({ tintColor }) => (
                                <Image
                                    source={require('../img/upcoming.png')}
                                    style={[styles.drawerIcon, {tintColor: tintColor}]}
                                />
                            ) } },
                            Tab4: { screen: RecentTab, navigationOptions: { title: "Recent", headerMode: "screen", tabBarIcon: ({ tintColor }) => (
                                <Image
                                    source={require('../img/recent.png')}
                                    style={[styles.drawerIcon, {tintColor: tintColor}]}
                                />
                            ) } }
                        }),
                        navigationOptions: {

                        }
                    }
                }, {
                    headerMode: 'none'
                })
            }
        }, {
            drawerPosition: 'left',
            contentOptions: {
                activeTintColor: '#000',
            }
        }), navigationOptions: {
            visible: false,
        }},
    //all screens that shouldn't be inside Drawer
    Seasons: {screen: Seasons, navigationOptions: (props) => ({ title: `${props.navigation.state.params.title}` , headerRight: null}) },
    Sync: {screen: SyncPage, navigationOptions: { title: "Sync" } },
    SeasonEpisodes: {screen: SeasonEpisodes, navigationOptions: (props) => ({ title: `Season ${props.navigation.state.params.title}` , headerRight: null})}
    /*Details: { screen: OfferDetails, navigationOptions: { title: "Details" } },
    Checkout: { screen: Checkout, navigationOptions: { title: "Checkout" } },
    Success: { screen: OrderSuccess, navigationOptions: { title: "Success" } },
    SearchResults: { screen: SearchResults, navigationOptions: { title: ({ state }) => `Search results for: ${state.params.searchQuery}` } }*/
}, {
    navigationOptions: (props) => ({
        title: "Shows",
        headerRight: (
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('Sync')
                }}>
                    <Icon name="plus-square" size={18} style={{paddingRight: 10}}/>
            </TouchableOpacity>
        ),
    })
});

export default Router;