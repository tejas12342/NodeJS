var user = require('./userMongoSchema');

module.exports = {
    getAllRecord: function () {
        console.log('NoSQL GET');
        return new Promise(function (fullfill, reject) {
            user.find({}, function (err, result) {
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

    },

    updateRecord: function (name, userAddress, id) {
        console.log('NoSQL Update');
        var userData = {
            userName: name,
            Address: userAddress,
            userId: id
        };
        var USERID = {
            userId: id
        };
        // console.log(userData);
        // console.log(USERID);
        return new Promise(function (fullfill, reject) {
            user.findOne(USERID, function (err, result) {
                if (err || result == null) {
                    console.log("Enter in If");
                    console.error(err);
                    reject(err);
                }
                else {
                    console.log("Enter in else part");
                    user.update(USERID, userData, function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        else {
                            fullfill(result);
                        }
                    });
                }
            });
        })
    },

    insertRecord: function (Name, userAddress) {
        console.log("NosqlInsert");
        var userData = new user({
            userName: Name,
            Address: userAddress,
            userId: Math.floor((Math.random() * 100)).toString(10)

        });
        console.log(userData);
        return new Promise(function (fullfill, reject) {
            userData.save(function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    fullfill(result);
                }
            });
        })
    },

    deleteRecord: function (ID) {
        console.log('NoSql Delete');
        console.log(ID);
        var USERID = {
            userId: ID
        };
        console.log(USERID);
        return new Promise(function (fullfill, reject) {
            user.remove(USERID, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    fullfill(result);
                }
            });
        })
    }

};