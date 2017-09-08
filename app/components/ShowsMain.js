import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Tabs, Tab, Right, Left, TabHeading, Text, } from 'native-base';
import ShowsTab from './ShowsTab';
import styles from '../styles';
import HistoryTab from './HistoryTab';
export default class ShowsMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        };
    }

    render() {
        return (
            <Container>
                <Tabs style={{ width: '100%' }}>
                    <Tab heading={<TabHeading><Text style={styles.tabHeading}>SHOWS</Text></TabHeading>} style={styles.tab}>
                        <ShowsTab/>
                    </Tab>
                    <Tab heading={<TabHeading><Text style={styles.tabHeading}>HISTORY</Text></TabHeading>}>
                        <HistoryTab/>
                    </Tab>
                    <Tab heading={<TabHeading><Text style={styles.tabHeading}>UPCOMING</Text></TabHeading>}>
                    </Tab>
                    <Tab heading={<TabHeading><Text style={styles.tabHeading}>RECENT</Text></TabHeading>}>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}