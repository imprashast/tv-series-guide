import React from 'react';
import datas from '../api/json/shows.json';

function fetchDataFromAPI(id) {
        let URI = "https://api.trakt.tv/shows/"+id+"/next_episode";
        fetch(URI, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': '',
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



