var mysql = require('mysql');
var dbConfig = require('./dbConfig');
var sqlite = require('sqlite3').verbose();
var mongoose = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/SampleDb';

if (dbConfig.databaseUse === "mysql") {
    var dbConnection = mysql.createConnection({
        host: dbConfig.localHost,
        user: dbConfig.root,
        password: dbConfig.root,
        database: dbConfig.SampleDb
    });

    try {
        dbConnection.connect(function (err) {
            if (err) {
                console.log(dbConfig.dbNotConnect + err.message);
                return;
            }
            console.log(dbConfig.connected);
        });
    }
    catch (err) {
        console.error(err);
    }
}
if (dbConfig.databaseUse === 'sqlite') {
    var dbConnection = new sqlite.Database(dbConfig.dbLocation, sqlite.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(dbConfig.dbNotConnect + err.message);
            return;
        }
        console.log(dbConfig.connected);
    });
}

var dbConnection = mongoose.createConnection(url);
dbConnection.once('open', function callback() {
    console.log("DB connected");
});



console.log(dbConnection);
module.exports = dbConnection;
