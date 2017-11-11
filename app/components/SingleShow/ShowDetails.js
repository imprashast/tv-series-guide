import React, {Component} from 'react';
import {Container, Header, Title, Button, Icon, Right, Body, Content, Left, Text, Tab, Tabs} from 'native-base';
import styles from "../../styles/styles";
import {ScrollView, View, Image} from 'react-native';

export default class ShowDetails extends Component {
    render() {
        let data = this.props.content;
        let banner = "https://www.thetvdb.com/banners/"+data.banner;
        let showImage = "https://www.thetvdb.com/banners/posters/"+data.tvdb+"-1.jpg";
        let alias = data.aliases;
        let genres = data.genre;
        try {
            alias = JSON.parse(data.aliases);
            genres = JSON.parse(data.genre);
        }catch (e) {
            console.log(e);
        }
        return (
            <ScrollView>
                <Image source={{uri: banner}} style={styles.banner} />

                <View style={{flexDirection: 'row', height: 143, margin: 20, backgroundColor: "#9c9a9d",}}>
                    <Image source={{uri: showImage}} style={styles.iconBig} />
                    <View style={{flex: 0, width: '70%'}}>
                    <Image blurRadius={10} style={{flex: 1, resizeMode: 'cover', opacity: 0.4}} source={{ uri: showImage }}>
                        <View style={styles.backdropView}>
                            <Text style={styles.showTitle}>{data.status}</Text>
                            <Text style={styles.showTitle}>{data.network}</Text>
                            <Text style={styles.showTitle}>{data.runtime} min</Text>
                        </View>
                    </Image>
                    </View>
                </View>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 10, marginRight: 10}}/>

                <View style={styles.flexRows}>
                    <View style={styles.flexHalfLeft}>
                        <Text style={styles.showTitle}>Rating</Text>
                        <Text style={styles.showTitle}>{data.siteRating}/10</Text>
                    </View>
                    <View style={styles.flexHalfRight}>
                        <Text style={styles.showTitle}>{data.rating}</Text>
                    </View>
                </View>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 10, marginRight: 10}}/>

                <View style={styles.flexRows}>
                    <Text style={styles.overview}>{data.overview}</Text>
                </View>

                <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 10, marginRight: 10}}/>

                <View>
                    <Text style={styles.overview}>Also known as: {alias} </Text>
                    <Text style={styles.overview}>Genres: {genres} </Text>
                    <Text style={styles.overview}>Year: {data.year} </Text>
                </View>


            </ScrollView>
        )
    }
}