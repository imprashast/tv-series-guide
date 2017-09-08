import React from 'react';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text,List, ListItem, Thumbnail} from "native-base";
import styles from "../styles";

export default class SingleEpisodeTile extends React.Component {

    render() {
        var data = this.props.content;
        return (
              <ListItem thumbnail style={[styles.listItem, this.props.style]}>
                  <Left>
                      <Thumbnail square size={100} source={{uri: data.img}} style={styles.icon} />
                  </Left>
                  <Body>
                  <Text style={[styles.subtitle, this.props.style]}>{data.airDetails}</Text>
                  <Text style={styles.name}>{data.text}</Text>
                  <Text style={styles.title} numberOfLines={1} note>{data.note}</Text>
                  <Text style={styles.subtitle}>{data.aired}</Text>
                  </Body>
              </ListItem>
        );
    }
}
