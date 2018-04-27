// Import the Database connection object from gitDbConnection object
var dbConnection = require('./gitDbConnection');
module.exports = {
    getAllRecord: function () {
        return new Promise(function (fullfill, reject) {
            console.log('Executed select query');
            //Select query to fetch all the records
            dbConnection.serialize(() => {
                dbConnection.all(`SELECT * FROM gitIssues;`,[], function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        console.log(result);
                        fullfill(result);
                    }
                });

            });
        })

    },
    insertRecord: function (ID,Name,Web_URL,SSH_URL) {
        return new Promise(function (fullfill, reject) {
            console.log("Insert Record");
            // Query to insert the record inside the database
            dbConnection.serialize(() => {
                dbConnection.run(`INSERT into gitIssues (ID, Name, Web_URL, SSH_URL) VALUES ('${ID}','${Name}','${Web_URL}','${SSH_URL}');`, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fullfill(result);
                    }
                });
            })
        })
    },

    

}