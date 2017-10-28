import React from 'react';
import datas from '../api/json/shows.json';
import TraktKey from "../api/Trakt";

function fetchDataFromAPI(id) {
        let URI = "https://api.trakt.tv/shows/"+id+"/next_episode";
        fetch(URI, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': TraktKey,
            }
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => {
                console.log('Something bad happened ' + error);
            });
}

export default function getShowIds() {
    datas.map(t => fetchDataFromAPI(t.show.ids.trakt));
}



