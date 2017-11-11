import React, {Component} from "react";
import RecentEpisodeTile from './RecentEpisodeTile';
import {ScrollView} from 'react-native';
import {selectWithArgs} from '../database/DbOps';

export default class UpcomingTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            loaded: false,
            day: 0,
        };
    }

    componentWillMount() {
        let today = new Date().toISOString().substr(0,10);
        let query = 'SELECT e.firstAired,e.season,e.number,e.tvdb,e.imageURL,e.title,s.title AS seriesTitle, s.tvdb AS parentTvdb, e.seen  FROM episode e LEFT OUTER JOIN shows s ON s.trakt = e.showTraktID WHERE e.firstAired >= ? ORDER BY e.firstAired ASC ';
        selectWithArgs(query, [today] , (tx, results) => {
                let len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    this.state.listData.push(row);
                }
                this.state.listData.map(t => {
                    t.dayOfTheMonth = new Date(t.firstAired).getDay()
                })
                this.setState({loaded: true});
            });
    }

    render() {
        if (this.state.loaded === "true") {
            this.state.day = this.state.listData[0].dayOfTheMonth;
        }
        return (
            <ScrollView>
                {this.state.listData.map((t,index) => {
                    if (this.state.day === t.dayOfTheMonth) {
                        return <RecentEpisodeTile content={t} day={false} key={index}/>;
                    } else {
                        this.state.day = t.dayOfTheMonth;
                        return <RecentEpisodeTile content={t} day={true} key={index}/>;
                    }
                })
                }
            </ScrollView>
        )
    }
}