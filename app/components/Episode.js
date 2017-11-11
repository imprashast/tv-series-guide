import React, {PureComponent} from 'react';
import {Image, View, Text, TouchableHighlight} from 'react-native';
import styles from "../styles/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import {insertQuery} from '../database/DbOps';

export default class Episode extends PureComponent {

    _onPress = () => {
        let query = "update episode set seen=? where showTraktID = ? and season = ? and number = ?";
        insertQuery(query, ["true", this.props.data.showTraktID, this.props.data.season, this.props.data.number])
        this.props.data.seen = "true";
        this.setState({seen: true});
    }

    render() {
        let ep = this.props.data;
        let title = "";
        let imageURL = "https://www.thetvdb.com/banners/";
        let overview = "";
        let since = "";
        let seenText = "Mark as watched";
        let iconColor = "";
        try{
            title = ep.title;
            imageURL = imageURL + ep.imageURL;
            overview = ep.overview;
            let epDate = new Date(ep.firstAired);
            let today = new Date();
            let oneDay = 24*60*60*1000;
            since = Math.round(Math.abs((epDate.getTime() - today.getTime())/(oneDay)));
            if(since > 29 && epDate < today) {
                since = epDate.toDateString();
            } else if ( epDate > today) {
                since = "In " + since + " days";
            } else {
                since = since + " days ago";
            }
            if("true" === ep.seen){
                console.log("Episode seen");
                seenText = "Watched";
                iconColor = styles.green;
            }
        } catch (e) {
            console.log(e);
        }
        return(
            <View style={styles.flexColumn}>
                <View style={{marginTop: 10, marginLeft: 10}}>
                    <Text style={styles.storeHeaderText}>
                        {title}
                    </Text>
                    <Text style={styles.storeShowTitleText}>
                        {since}
                    </Text>
                </View>
                <View style={{alignItems: "center", marginTop: 10}}>
                    <Image source={{uri: imageURL}} style={styles.episodeImage} />
                </View>
                <View style={{alignItems: "center", alignContent: "center", width: "100%",
                    marginTop: 10, marginBottom:10}}>
                    <TouchableHighlight onPress={this._onPress} underlayColor='#dddddd'>
                        <View style={{alignItems: "center", alignContent: "center",}}>
                            <Icon name="check" size={18} style={iconColor}/>
                            <Text>{seenText}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{alignItems: "center", alignContent: "center", width: "100%", marginTop: 10}}>
                    <View style={{width: "90%"}}>
                        <Text style={styles.descriptionText}>
                            {overview}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}