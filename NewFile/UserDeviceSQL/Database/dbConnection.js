var mysql = require('mysql');
var dbConfig=require('./dbConfig');
var sqlite = require('sqlite3').verbose();
var mongo=require('mongodb').MongoClient;
var url='mongodb://127.0.0.1:12345/sampleDb';

if (dbConfig.databaseUse==="mysql"){
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
else if(dbConfig.databaseUse==='sqlite'){
    var dbConnection = new sqlite.Database(dbConfig.dbLocation, sqlite.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(dbConfig.dbNotConnect+err.message);
            return;
        }
        console.log(dbConfig.connected);
    });
}
else{
    mongo.connect(url,function(err,db){
        if(err) console.log(err.message);
        else{
            console.log(dbConfig.connected);
        }
    });

}
console.log(dbConnection);
module.exports=dbConnection;
