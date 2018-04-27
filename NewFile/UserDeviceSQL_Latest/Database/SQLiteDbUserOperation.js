var dbConnection = require('./dbConnection');
module.exports = {
    getAllRecord: function () {
        return new Promise(function (fullfill, reject) {
            console.log('Executed select query');
            dbConnection.serialize(() => {
                dbConnection.all(`SELECT * FROM user;`,[], function (err, result) {
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
    updateRecord: function (Name, Address, ID) {
        return new Promise(function (fullfill, reject) {
            dbConnection.serialize(() => {
                dbConnection.run(`UPDATE user SET Name= "${Name}", Address= "${Address}" where ID=${ID}`, function (err, result) {
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

    insertRecord: function (Name, Address) {
        return new Promise(function (fullfill, reject) {
            console.log("Insert Record");
            dbConnection.serialize(() => {
                dbConnection.run(`INSERT into user (Name, Address) VALUES ('${Name}','${Address}');`, function (err, result) {
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

    deleteRecord: function (ID) {
        return new Promise(function (fullfill, reject) {
            dbConnection.serialize(() => {
                dbConnection.run(`DELETE FROM user where ID= ${ID}`, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fullfill(result);
                    }
                });
            })
        })
    }

}