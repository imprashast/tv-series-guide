const React = require("react-native");
const { Platform, Dimensions  } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import colors from "./colors";

export default {
    container: {
        backgroundColor: colors.white,
        width: '100%'
    },
    mb10: {
        marginBottom: 10
    },
    mt10: {
        marginTop: 10
    },
    mt20: {
        marginTop: 20
    },
    listItem: {
        height: 130,
    },
    listItemUpcoming: {
        height: 120,
        width: deviceWidth,
        backgroundColor: colors.white,
        flexDirection: 'row'
    },
    icon: {
        width: 70,
        height: 100,
        margin: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginTop: 2,
        marginBottom: 2,
    },
    title: {
        fontSize: 14,
        color: colors.black,
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
        color: colors.black
    },
    text: {
        alignSelf: "center",
        marginBottom: 7
    },
    sidebar: {
        flex: 1,
        backgroundColor: colors.white
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
        color: colors.white,
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
        color: colors.black,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5
    },
    drawerIcon: {
        width: 24,
        height: 24,
    },
    seasonsItem: {
        height: 50,
        margin: 10,
    },
    textright: {
        alignSelf: 'flex-end',
    },
    textLeft: {
        alignSelf: 'flex-start',
    },
    banner: {
        width: deviceWidth,
        height: 70
    },
    iconBig: {
        width: 100,
        height: 143,
    },
    backdropView: {
        backgroundColor: 'transparent',
    },
    showTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        textShadowColor: colors.white,
    },
    flexRows: {
        flexDirection: 'row',
        width: deviceWidth
    },
    flexHalfLeft: {
        alignContent: 'flex-start',
        width: deviceWidth/2,
        paddingLeft: 20,
    },
    flexHalfRight: {
        alignContent: 'flex-end',
        width: deviceWidth/2,
        paddingLeft: 20,
    },
    overview: {
        padding: 20,
        fontSize: 18,
        color: colors.black,
    },
    flexRowsProgress: {
        flexDirection: 'row',
        width: deviceWidth,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    flexHalfLeftNoPad: {
        alignContent: 'flex-start',
        width: deviceWidth - 100,
    },
    flexHalfRightNoPad: {
        alignContent: 'flex-end',
        width: 60,
        alignItems: 'flex-end',
    },
    contentContainer: {
        height: 200,
    },
    carouselContainer: {
        width: deviceWidth,
        height: 200,
        alignItems: 'center',
        flexDirection: 'column'
    },
    carouselImage: {
        width: deviceWidth-40,
        height: 160,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    storeHeaderText: {
        fontFamily: 'AppleSDGothicNeo-Medium',
        fontSize: 18,
        color: colors.black
    },
    storeShowTitleText: {
        fontFamily: 'AppleSDGothicNeo-UltraLight',
        fontSize: 18,
        color: colors.tealBlue
    },
    lineSeparator: {
        borderBottomColor: colors.lightslategrey,
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop:5,
        marginBottom: 5
    },
    searchBar: {
        backgroundColor: colors.white,
    },
    showTileContainer: {
        flexDirection: "row",
        height: 80,
    },
    showTileImages: {
        width: 49,
        height: 70,
        margin: 10,
        marginTop: 5,
    },
    showTextContainer: {
        width: deviceWidth-120,
        marginTop: 5,
    },
    descriptionText: {
        fontFamily: 'AppleSDGothicNeo-UltraLight',
        fontSize: 14,
        color: colors.black
    },
    showTileActionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    green: {
        color: colors.yellowgreen,
    },
    flexRow: {
        flexDirection: "row",
    },
    flexColumn: {
        flexDirection: "column",
    },
    episodeImage: {
        width: deviceWidth - 20,
        height: 150,
    }
};