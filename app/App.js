import React, { Component } from "react";
import Router from './components/Router';
import { AppLoading } from 'expo';
import {initDB} from './database/Init';
import {insertTraktKey, fetchTraktKey} from './api/Trakt';

export default class App extends Component {

    state = {
        isReady: false,
    };

    async _cacheResourcesAsync() {
        initDB();
        insertTraktKey();
        console.log(fetchTraktKey());
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return <Router />;
    }
}
//export default from './storybook';