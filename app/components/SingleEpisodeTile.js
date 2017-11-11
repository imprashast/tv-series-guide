import React from 'react';
import styles from "../styles/styles";
import {TouchableHighlight, View, Image, Text, ActivityIndicator} from 'react-native';
import Seasons from "./SingleShow/Seasons";
import {countEpisodesRemaining} from '../database/DbOps';

export default class SingleEpisodeTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            push: false,
            episodesRemaining: 0
        };
    }

    componentWillMount() {
        countEpisodesRemaining([this.props.content.trakt], (tx, results) => {
            this.setState({episodesRemaining: results.rows.item(0).count});
        })
    }

    _onPress = () => {
        this.setState({push: true});
        this.props.navigation.navigate("Seasons", {show: this.props.content.trakt, title: this.props.content.title});
    }

    render() {
        let data = this.props.content;
        let showImage = "https://www.thetvdb.com/banners/posters/" + data.tvdb + "-1.jpg";
        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor='#dddddd'>
                <View style={styles.listItemUpcoming}>
                    <View style={styles.flexRow}>
                        <Image source={{uri: showImage, width: 70, height: 100}}
                               style={styles.icon}
                        />
                    </View>
                    <View style={[styles.flexColumn, styles.showTextContainer, styles.mt20]}>
                        <Text style={[styles.subtitle]}>{data.network}</Text>
                        <Text style={styles.name}>{data.title}</Text>
                        <Text style={styles.title} numberOfLines={1} note>{this.state.episodesRemaining} episodes
                            remaining</Text>
                        <Text style={styles.subtitle}>{data.status}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
