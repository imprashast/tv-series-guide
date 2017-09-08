1. Fetch User's TV Shows from TrackTV Api
(https://api.trakt.tv/sync/watched/shows)

2. Store this result in Realm DB for quick retrieve
(https://blog.realm.io/introducing-realm-react-native/)

3. Build the UI using TVDB Api
(https://api.thetvdb.com/swagger#!/Series/get_series_id)
`Can try to store images and other data in local DB for quick load of app. Not sure if size will become an issue but can give it a try`

4. As this is only for TV series, I won't look into the Movie part.

5. 