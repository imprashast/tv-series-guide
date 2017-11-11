import TraktKey from "./Trakt";
import TvdbToken from "./Tvdb";

export const tvdbApiHelper = (url) => fetch(url, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TvdbToken,
    }
}).then(this.validateResponse).then(response => response.json());

export const traktApiHelper = (url) => fetch(url, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': TraktKey,
    }
}).then(this.validateResponse)
    .then(response => response.json());

function validateResponse(response) {
    return (response.status === 200) ;
}

