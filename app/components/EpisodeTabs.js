import React, {Component} from 'react';
import {TouchableHighlight, Text} from 'react-native';
import styles from "../styles/styles";

export default class EpisodeTabs extends Component {

    _onPress = () => {
        console.log(`You pressed on ${this.props.data.number}`);
    }

    render() {
        let data = this.props.data;
        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor='#dddddd'
                style={{width: 60, height: 40,
                    borderRadius: 1, borderWidth: 1,
                    flex: 1, flexDirection: 'column',
                    borderColor: '#000000', alignContent: 'center',
                    alignItems: 'center'}}>
                <Text>
                    E {data.number}
                </Text>
            </TouchableHighlight>
        )
    }
}