const React = require("react-native");

const { StyleSheet, Platform, Dimensions  } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
    container: {
        backgroundColor: "#2a2a2a",
        width: '100%'
    },
    mb10: {
        marginBottom: 10
    },
    listItem: {
        height: 130,
    },
    icon: {
        width: 70,
        height: 100,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 2,
        marginBottom: 2,
    },
    title: {
        fontSize: 14,
        color: '#ffffff',
        marginTop: 2,
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 12,
        color: '#656565',
        marginTop: 2,
        marginBottom: 2,
    },
    tab: {
        backgroundColor: "#2a2a2a",
    },
    tabHeading: {
        fontSize: 11,
        color: '#000000'
    },
    text: {
        alignSelf: "center",
        marginBottom: 7
    },
    sidebar: {
        flex: 1,
        backgroundColor: "#fff"
    },
    drawerCover: {
        alignSelf: "stretch",
        // resizeMode: 'cover',
        height: deviceHeight / 3.5,
        width: null,
        position: "relative",
        marginBottom: 10
    },
    drawerImage: {
        position: "absolute",
        // left: (Platform.OS === 'android') ? 30 : 40,
        left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
        // top: (Platform.OS === 'android') ? 45 : 55,
        top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
        width: 210,
        height: 75,
        resizeMode: "cover"
    },
    listItemContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    iconContainer: {
        width: 37,
        height: 37,
        borderRadius: 18,
        marginRight: 12,
        paddingTop: Platform.OS === "android" ? 7 : 5
    },
    sidebarIcon: {
        fontSize: 21,
        color: "#fff",
        lineHeight: Platform.OS === "android" ? 21 : 25,
        backgroundColor: "transparent",
        alignSelf: "center"
    },
    textSideBar: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 16,
        marginLeft: 20
    },
    badgeText: {
        fontSize: Platform.OS === "ios" ? 13 : 11,
        fontWeight: "400",
        textAlign: "center",
        marginTop: Platform.OS === "android" ? -3 : undefined
    },
    recentlyWatched: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5
    },

};