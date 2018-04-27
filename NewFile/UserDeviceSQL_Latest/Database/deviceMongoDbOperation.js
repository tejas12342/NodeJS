var device = require('./deviceMongoSchema');

module.exports = {
    getAllRecord: function () {
        console.log('NoSQL GET');
        return new Promise(function (fullfill, reject) {
            device.find({}, function (err, result) {
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
    updateRecord: function (name, deviceAddress, id) {
        console.log('NoSQL Update');
        var deviceData = {
            deviceName: name,
            Address: deviceAddress,
            deviceId: id
        }
        var deviceId = {
            deviceId: id
        }
        console.log(uesrData);
        console.log(id);
        return new Promise(function (fullfill, reject) {
            // usr.findOneAndupdate({deviceID:`${id}`},{deviceName:`'${name}'`, Address:`'${address}'`, Contact:`'${contact}'`}, function (err, result) {
            device.update(deviceId, deviceData, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    fullfill(result);
                }
            });
        })
    },

    insertRecord: function (Name, deviceAddress) {
        console.log("NosqlInsert");
        var deviceData = new usr({
            deviceName: Name,
            Address: deviceAddress,
            deviceId: Math.floor((Math.random() * 100)).toString(10)

        });
        console.log(deviceData);
        return new Promise(function (fullfill, reject) {
            deviceData.save(function (err, result) {
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
        var DEVICEID = {
            deviceId: ID
        }
        return new Promise(function (fullfill, reject) {
            device.remove(DEVICEID, function (err, result) {
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