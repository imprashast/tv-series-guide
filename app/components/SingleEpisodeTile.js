import React from 'react';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text,List, ListItem, Thumbnail} from "native-base";
import styles from "../styles";

export default class SingleEpisodeTile extends React.Component {

    render() {
        let data = this.props.content;
        let date = new Date(data.last_watched_at);
        let showImage = "https://www.thetvdb.com/banners/posters/"+data.show.ids.tvdb+"-1.jpg";
        return (
              <ListItem thumbnail style={[styles.listItem, this.props.style]}>
                  <Left>
                      <Thumbnail square size={100} source={{uri: showImage}} style={styles.icon} />
                  </Left>
                  <Body>
                  <Text style={[styles.subtitle, this.props.style]}>{date.toUTCString()}</Text>
                  <Text style={styles.name}>{data.show.title}</Text>
                  <Text style={styles.title} numberOfLines={1} note>{data.note}</Text>
                  <Text style={styles.subtitle}>{data.aired}</Text>
                  </Body>
              </ListItem>
        );
    }
}
