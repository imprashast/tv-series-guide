import React, {Component} from 'react';
import {Container, Header, Title, Button, Icon, Right, Body, Content, Left, Text, Tab, Tabs} from 'native-base';
import styles from "../../styles/styles";
import {ProgressViewIOS, View, TouchableHighlight} from 'react-native';
import {selectWithArgs} from '../../database/DbOps';

export default class SeasonsProgress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seenCount: '',
        };
    }

    _onPress = () => {
        this.props.navigation.navigate("SeasonEpisodes", { show: this.props.data, title: this.props.number });
    }

    componentWillMount() {
        let query = "select count(*) as seenCount from episode where showTraktID= ? and season = ? and seen=?";
        selectWithArgs(query, [this.props.data, this.props.number, "true"], (tx, results) => {
            this.setState({seenCount: results.rows.item(0).seenCount})
        })
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor='#dddddd'>
            <View style={{marginLeft: 20, marginRight:20}}>
                <View style={styles.flexRowsProgress}>
                    <View style={styles.flexHalfLeftNoPad}>
                        <Text style={styles.name}>Season {this.props.number}</Text>
                    </View>
                    <View style={styles.flexHalfRightNoPad}>
                        <Text style={styles.title}>{this.state.seenCount} / {this.props.episodeCount} </Text>
                    </View>
                </View>
                <ProgressViewIOS style={{marginTop: 5, marginLeft:10,}} progressTintColor="green"
                                 progress={this.state.seenCount / this.props.episodeCount}/>
                <Text style={[styles.title, {marginLeft: 10}]}>{this.state.seenCount} Episodes watched</Text>

            </View>
            </TouchableHighlight>
        )
    }
}