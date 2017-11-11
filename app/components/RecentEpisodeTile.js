import React from 'react';
import styles from "../styles/styles";
import {View, Text, Image, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {insertQuery} from '../database/DbOps';

export default class RecentEpisodeTile extends React.Component {

    _onPress = () => {
        console.log("Marking seen: " + this.props.content.title)
        console.log("true", this.props.content.parentTvdb, this.props.content.season, this.props.content.number);
        let query = "update episode set seen=? where showTraktID = ? and season = ? and number = ?";
        insertQuery(query, ["true", this.props.content.parentTvdb, this.props.content.season, this.props.content.number])
        this.props.content.seen = "true";
        this.setState({seen: true});
    }

    render() {
        let data = this.props.content;
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayRender = "";
        if (this.props.day === true) {
            dayRender = days[data.dayOfTheMonth];
        }
        let showImage = "https://www.thetvdb.com/banners/posters/" + data.parentTvdb + "-1.jpg";
        let iconColor = "";
        if ("true" === data.seen) {
            iconColor = styles.green;
        }
        return (
            <View>
                <Text style={styles.name}>{dayRender}</Text>
                <View style={styles.listItemUpcoming}>
                    <View style={styles.flexRow}>
                        <Image source={{uri: showImage}} style={styles.icon}/>
                    </View>
                    <View style={[styles.flexColumn, styles.showTextContainer, styles.mt20]}>
                        <Text style={styles.subtitle}>{data.title}</Text>
                        <Text style={styles.name}>{data.seriesTitle}</Text>
                        <Text style={styles.title} numberOfLines={1} note>S{data.season}
                            E{data.number} {data.title}</Text>
                        <Text style={styles.subtitle}>{data.firstAired}</Text>
                    </View>
                    <TouchableHighlight onPress={this._onPress} underlayColor='#dddddd'>
                        <View style={styles.showTileActionContainer}>
                            <Icon name="check" size={18} style={iconColor}/>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
