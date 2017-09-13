import React from 'react';
import { Image } from "react-native";
import styles from "../styles";
import { Content, List, ListItem, Icon, Left, Text } from "native-base";
const drawerCover = require("../img/sidebar-cover.png");

const datas = [
    {
        name: "Shows",
        route: "Anatomy",
        icon: "keypad",
        bg: "#C5F442",
    },
    {
        name: "Lists",
        route: "Anatomy",
        icon: "navigate",
        bg: "#C5F442",
    },
    {
        name: "Movies",
        route: "Anatomy",
        icon: "film",
        bg: "#C5F442",
    },
    {
        name: "Statistics",
        route: "Anatomy",
        icon: "pulse",
        bg: "#C5F442",
    },
    {
        name: "Settings",
        route: "Anatomy",
        icon: "settings",
        bg: "#C5F442",
    },
    {
        name: "Feedback",
        route: "Anatomy",
        icon: "grid",
        bg: "#C5F442",
    }

];
export default class Sidebar extends React.Component {

    render() {
        return (
            <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
                <Image source={drawerCover} style={styles.drawerCover}/>
                <List
                    dataArray={datas}
                    renderRow={data =>
                        <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
                            <Left>
                                <Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
                                <Text style={styles.text}>
                                    {data.name}
                                </Text>
                            </Left>
                        </ListItem>} />
            </Content>
        );
    }
}