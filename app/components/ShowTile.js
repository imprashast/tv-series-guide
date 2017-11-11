import React from 'react';
import styles from "../styles/styles";
import {View, Image, Text, TouchableHighlight} from 'react-native';
import Seasons from "./SingleShow/Seasons";
import {tvdbApiHelper} from "../api/ApiHelper";
import Icon from 'react-native-vector-icons/FontAwesome';
import {checkShowInDB} from "../database/DbOps";
import {Toast} from 'native-base';
import {addShow} from '../api/ApiOperations';

export default class ShowTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            iconName: 'plus-square',
        };
    }

    componentWillMount() {
        tvdbApiHelper("https://api.thetvdb.com/series/" + this.props.content.tvdb)
            .then(response => this.handleResponse(response))
            .catch(error => {
                console.log('Something bad happened ' + error)
            });
    }

    handleResponse(response) {
        this.checkShowAdded();
        this.setState(() => ({content: response.data.overview}));
    }

    checkShowAdded() {
        checkShowInDB((tx, results) => {
            if (results.rows.length > 0) {
                this.setState(function () {
                    return {iconName: 'check-square'}
                })
            }
        }, this.props.content.trakt);
    }

    _onPress = () => {
        Toast.show({text: `${this.props.content.title} will be added to your list!`,
            position: 'bottom', buttonText: 'Okay',
            duration: '2000'});
        addShow(this.props.content.trakt);
        this.checkShowAdded();
        this.setState({push: true});
        //this.props.navigation.navigate("Seasons", {show: this.props.content.trakt});
    }

    render() {
        let data = this.props.content;
        let showImage = "https://www.thetvdb.com/banners/posters/" + data.tvdb + "-1.jpg";
        return (
            <View>
                <View style={styles.showTileContainer}>
                    <Image size={70} source={{uri: showImage, cache: 'force-cache'}} style={styles.showTileImages}/>
                    <View style={styles.showTextContainer}>
                        <Text style={styles.storeHeaderText}>{data.title}</Text>
                        <Text style={styles.descriptionText} numberOfLines={3}>{this.state.content}</Text>
                    </View>
                    <View style={styles.showTileActionContainer}>
                        <TouchableHighlight
                            onPress={this._onPress}
                            underlayColor='#dddddd'>
                            <Icon name={this.state.iconName} size={18} style={styles.green}/>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.lineSeparator}/>
            </View>
        );
    }
}
