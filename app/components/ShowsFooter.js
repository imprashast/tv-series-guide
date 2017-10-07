import React, {Component} from 'react';
import {Container, Header, Title, Button, Icon, Tabs, Tab, Right, Left, Badge, Text, FooterTab, View} from 'native-base';
import styles from '../styles';
import HistoryTab from './HistoryTab';
import ShowsTab from './ShowsTab';
import RecentTab from './RecentTab';

export default class ShowsFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false
        };
    }

    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false
        });
    }

    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
            tab4: false
        });
    }

    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        });
    }

    toggleTab4() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: true
        });
    }

    render() {
        var updateContent = this.props.updateContent;
        var historyTab = <HistoryTab/>;
        var showsTab = <ShowsTab/>;
        var recentTab = <RecentTab init={true}/>;
        return (
            <FooterTab>
                <Button
                    active={this.state.tab1}
                    onPress={() => {
                        updateContent(showsTab);
                        this.toggleTab1();
                    }}
                    vertical
                    badge
                >
                    <Badge><Text>2</Text></Badge>
                    <Icon active={this.state.tab1} name="play" />
                    <Text style={styles.tabHeading}>SHOWS</Text>
                </Button>
                <Button active={this.state.tab2} onPress={() => {
                    //updateContent(historyTab);
                    this.toggleTab2();
                }}>
                    <Icon active={this.state.tab2} name="archive" />
                    <Text style={styles.tabHeading}>HISTORY</Text>
                </Button>
                <Button
                    active={this.state.tab3}
                    onPress={() => {
                        updateContent(recentTab);
                        this.toggleTab3()
                    }}
                    vertical
                    badge
                >
                    <Badge style={{ backgroundColor: "green" }}>
                        <Text>5</Text>
                    </Badge>
                    <Icon active={this.state.tab3} name="film" />
                    <Text style={styles.tabHeading}>UPCOMING</Text>
                </Button>
                <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
                    <Icon active={this.state.tab4} name="flame" />
                    <Text style={styles.tabHeading}>RECENT</Text>
                </Button>
            </FooterTab>
        );
    }
}