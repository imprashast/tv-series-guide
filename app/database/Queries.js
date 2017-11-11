export const countShows = "SELECT count(*) FROM shows";

export const insertIntoShows = 'INSERT OR IGNORE INTO shows (trakt, title, slug, tvdb, imdb, tmdb, tvrage, year, last_watched_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

export const updateInfoFromTMDB = 'UPDATE shows set aliases = ? , banner = ?, status = ?, firstAired = ? , network = ? , runtime = ?  , genre = ? , overview = ? , rating = ? , siteRating = ? WHERE trakt = ?';

export const insertIntoSeasons = 'INSERT OR IGNORE INTO seasons (showTraktID, number, episodeCount) VALUES (?, ?, ?)';

export const insertIntoEpisodes = 'INSERT OR IGNORE INTO episode (showTraktID, season, number, title, trakt, tvdb, imdb, tmdb, tvrage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

export const updateEpisodeData = 'UPDATE episode set overview = ? , firstAired = ? , imageURL = ? , tvdbRating = ? , director = ? WHERE showTraktID = ? AND tvdb = ?';

export const insertIntoCarouselTable = (tableName) => `INSERT OR IGNORE INTO ${tableName} (trakt, title, tvdb, year, watchers, inserted_at) VALUES (?, ?, ?, ?, ?, ?)`;

export const fetchUpdatedTimestamp = 'select * from trendingTable;';

export const fetchFromCarouselTable = (tableName) => `select * from ${tableName}`;

export const allTables = 'select title, trakt, tvdb from trendingTable UNION select title, trakt, tvdb from popularTable UNION select title, trakt, tvdb from weeklyPlayedTable UNION select title, trakt, tvdb from weeklyWatchedTable UNION select title, trakt, tvdb from anticipatedTable';

export const isShowInDB = 'select * from shows where trakt=?';

export const insertKey = 'INSERT OR IGNORE INTO keys (apiNumber, api, key, fetched) VALUES (?, ?, ?, ?)';

export const deleteKey = 'Delete from keys where apiNumber=?';

export const updateKey = 'UPDATE keys set key = ? and fetched = ? where apiNumber = ?';

export const selectKey = 'select key from keys where apiNumber=?';