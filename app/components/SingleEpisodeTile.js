import React from 'react';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text,List, ListItem, Thumbnail} from "native-base";
import styles from "../styles";
import {TouchableHighlight} from 'react-native';
import { TabNavigator } from "react-navigation";
import Seasons from "./Seasons";

const ScreenNavigator = TabNavigator({
    Seasons: {screen: Seasons}
});

export default class SingleEpisodeTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            push: false
        };
    }

    _onPress = () => {
        console.log(`You pressed on ${this.props.content.trakt} ${this.props.content.title}`);
        this.setState({push: true});
        console.log(this.props);
    }

    render() {
        let data = this.props.content;
        let date = new Date(data.last_watched_at);
        let showImage = "https://www.thetvdb.com/banners/posters/"+data.tvdb+"-1.jpg";
        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor='#dddddd'>
              <ListItem thumbnail style={[styles.listItem, this.props.style]}>
                  <Left>
                      <TouchableHighlight
                          onPress={this._onPress}
                          underlayColor='#dddddd'>
                      <Thumbnail square size={100} source={{uri: showImage}} style={styles.icon} />
                      </TouchableHighlight>
                  </Left>
                  <Body>
                  <Text style={[styles.subtitle, this.props.style]}>{date.toUTCString()}</Text>
                  <Text style={styles.name}>{data.title}</Text>
                  <Text style={styles.title} numberOfLines={1} note>{"nothing"}</Text>
                  <Text style={styles.subtitle}>{data.year}</Text>
                  </Body>
              </ListItem>
            </TouchableHighlight>
        );
    }
}
