export const showsTable = 'CREATE TABLE IF NOT EXISTS shows ( trakt INTEGER PRIMARY KEY NOT NULL , title TEXT , slug TEXT , tvdb INT , imdb TEXT , tmdb INT , tvrage INT , year TEXT , last_watched_at TEXT, aliases TEXT , banner TEXT, status TEXT, firstAired TEXT, network TEXT, runtime TEXT , genre TEXT, overview TEXT, rating TEXT, siteRating TEXT );';

export const seasonsTable = 'create table if not exists seasons ( showTraktID integer not null , number int , episodeCount int , PRIMARY KEY(showTraktID, number));';

export const episodesTable = 'create table if not exists episode ( showTraktID integer not null , season int , number int , title text , trakt int ,  tvdb int , imdb text , tmdb int , tvrage int , overview text , firstAired text , imageURL text , tvdbRating text , director text , seen text , PRIMARY KEY(showTraktID, season, number) );';

export const dropShowsTable = 'DROP TABLE IF EXISTS shows;';

export const dropSeasonsTable = 'DROP TABLE IF EXISTS seasons;';

export const dropEpisodeTable = 'DROP TABLE IF EXISTS episode;';

export const dropTrendingTable = 'DROP TABLE IF EXISTS trendingTable;';

export const dropPopularTable = 'DROP TABLE IF EXISTS popularTable;';

export const dropWeeklyPlayedTable = 'DROP TABLE IF EXISTS weeklyPlayedTable;';

export const dropWeeklyWatchedTable = 'DROP TABLE IF EXISTS weeklyWatchedTable;';

export const dropAnticipatedTable = 'DROP TABLE IF EXISTS anticipatedTable;';

export const trendingTable = 'create table if not exists trendingTable ( trakt INTEGER PRIMARY KEY NOT NULL , title TEXT , tvdb INT , year TEXT , watchers TEXT , inserted_at text  )';

export const popularTable = 'create table if not exists popularTable ( trakt INTEGER PRIMARY KEY NOT NULL , title TEXT , tvdb INT , year TEXT , watchers TEXT , inserted_at text  )';

export const weeklyPlayedTable = 'create table if not exists weeklyPlayedTable ( trakt INTEGER PRIMARY KEY NOT NULL , title TEXT , tvdb INT , year TEXT , watchers TEXT , inserted_at text  )';

export const weeklyWatchedTable = 'create table if not exists weeklyWatchedTable ( trakt INTEGER PRIMARY KEY NOT NULL , title TEXT , tvdb INT , year TEXT , watchers TEXT , inserted_at text  )';

export const anticipatedTable = 'create table if not exists anticipatedTable ( trakt INTEGER PRIMARY KEY NOT NULL , title TEXT , tvdb INT , year TEXT , watchers TEXT , inserted_at text  )';

export const keysTable = 'create table if not exists keys ( apiNumber integer primary key not null, api text , key text , fetched text );';

export const dropKeysTable = 'DROP TABLE IF EXISTS keys';

export const imageTable = 'create table if not exists cacheImages ( traktid integer primary key not null, image blob );';



