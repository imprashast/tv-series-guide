import db from "./Database";
import {allTables, isShowInDB} from "./Queries"

export const selectQuery = (query, callback) => db.transaction((tx) => {
        tx.executeSql(query, [], callback);
    },
    error => {
        console.log(error);
    });

export const insertQuery = (query, args) => db.transaction(
    tx => {
        tx.executeSql(query, args);
    },
    error => {
        console.log(error);
    }
);

export const fetchAllShowFromList = (callback) => selectQuery(allTables, callback);

export const checkShowInDB = (callback, args) => db.transaction((tx) => {
        tx.executeSql(isShowInDB, [args], callback);
    },
    error => {
        console.log(error);
    });

export const countEpisodesRemaining = (args, callback) => db.transaction((tx) => {
        tx.executeSql("select count(*) as count from episode where showTraktID = ?", args, callback);
    },
    error => {
        console.log(error);
    });

export const selectWithArgs = (query, args, callback) => db.transaction((tx) => {
        tx.executeSql(query, args, callback);
    },
    error => {
        console.log(error);
    });

export const insertApiKey = (query, args, callback) => db.transaction((tx) => {
        tx.executeSql(query, args, callback);
    },
    error => {
        console.log(error);
    });
