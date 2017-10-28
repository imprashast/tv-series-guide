import React, { Component } from "react";
import HomeScreen from "./components/HomeScreen.js";
import SyncPage from "./components/SyncPage"
import SideBar from "./components/Sidebar";
import Seasons from "./components/Seasons";
import { DrawerNavigator } from "react-navigation";

const AppRouter = DrawerNavigator(
    {
        Home: { screen: HomeScreen },
        Sync: { screen: SyncPage },
        Seasons: { screen: Seasons }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default AppRouter;