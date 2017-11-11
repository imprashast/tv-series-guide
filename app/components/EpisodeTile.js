import React from 'react';
import {ScrollView} from 'react-native';
import {List} from "native-base";
import SingleEpisodeTile from './SingleEpisodeTile';
import {selectQuery} from '../database/DbOps';

export default class EpisodeTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listViewData: [],
        };
    }

    componentWillMount() {
        this.fetchShowsFromDB();
    }

    fetchShowsFromDB() {
        selectQuery('SELECT * FROM shows ORDER BY title ASC', (tx, results) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                this.state.listViewData.push(row);
            }
            this.setState({loaded: true});
        })
    }

    /*render() {
        return (<List
            dataArray={this.state.listViewData}
            renderRow={data =>
                <SingleEpisodeTile content={data} style={{ marginLeft: 0, paddingLeft: 10, paddingRight: 0, marginRight: 0, backgroundColor: "#ffffff"}}
                                   navigation={this.props.navigation}/>
            }
        />);
    }*/

    render() {
        return (<ScrollView>

            {this.state.listViewData.map((data,index) =>
                <SingleEpisodeTile content={data} style={{ marginLeft: 0, paddingLeft: 10, paddingRight: 0, marginRight: 0, backgroundColor: "#ffffff"}}
                navigation={this.props.navigation} key={index}/>
            )
            }
            </ScrollView>
        );
    }
}