import React, { Component } from "react";
import {Image, View, Text} from 'react-native';
import styles from "../styles/styles";

export default class ShowCarousel extends Component {

    render() {
        let showImage = "https://www.thetvdb.com/banners/fanart/original/"+this.props.tvdb+"-2.jpg";
        return (
            <View style={styles.carouselContainer}>
                <Text style={styles.storeShowTitleText}>{this.props.title}</Text>
                <Image size={90} source={{uri: showImage, cache: 'force-cache'}}  style={styles.carouselImage} />
            </View>
        );
    }
}
