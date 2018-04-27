var dbConfig = require('./gitDbConfig');
var sqlite = require('sqlite3').verbose();

//sqlite data base connection
var dbConnection = new sqlite.Database(dbConfig.dbLocation, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(dbConfig.dbNotConnect + err.message);
        return;
    }
    console.log(dbConfig.connected);
});

console.log(dbConnection);
module.exports = dbConnection;
