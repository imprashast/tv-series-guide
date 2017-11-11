import {SQLite} from 'expo';
const db = SQLite.openDatabase({name: 'db.tv_series_guide'});
export default db;