const constConfig = require('./constConfig');
const httpStatus = require('http-status-codes');
var dbConfig = require('./Database/dbConfig');
const Status = "Status";
var deviceDAO;
if (dbConfig.databaseUse === "mysql") {
    deviceDAO = require('./Database/dbdeviceOperation');
}
if (dbConfig.databaseUse === "sqlite") {
    deviceDAO = require('./Database/SQLiteDbdeviceOperation');
}
if (dbConfig.databaseUse === "mongo") {
    deviceDAO = require('./Database/deviceMongoDbOperation')
}
else {
    console.log("Check your database configuration");
}
// console.log(deviceDAO);
module.exports = {
    serverStart: function (request, response) {
        {
            response.status(httpStatus.OK).json(
                { Status: constConfig.serverStart }
            )
        }
    },

    getDeviceList: function (request, response) {
        deviceDAO.getAllRecord()
            .then((result) => {
                response.status(httpStatus.OK).json(
                    { result }
                );
            })
            .catch((err) => {
                response.status(httpStatus.INTERNAL_SERVER_ERROR).json(
                    { Status: constConfig.retriveError + err.message }
                );
            })
    },
    updateDeviceList: function (request, response) {
        const nameRequest = request.body.Name;
        const addressRequest = request.body.Address;
        const idRequest = request.body.ID;
        console.log(request.body);
        if ((Object.keys(request.body).length) !== 3) {     // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
        }
        if (!(request.body.hasOwnProperty(constConfig.Name) && request.body.hasOwnProperty(constConfig.Address) && request.body.hasOwnProperty(constConfig.ID)) && (nameRequest == undefined || addressRequest == undefined || idRequest == undefined)) {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
        }
        if (!(typeof nameRequest === "string" && typeof addressRequest === "string" && typeof idRequest === "number")) {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
        }

        deviceDAO.updateRecord(nameRequest, addressRequest, idRequest)
            .then(() => {
                response.status(httpStatus.OK).json(
                    { Status: constConfig.updateDone }
                );
            })
            .catch(() => {
                response.status(httpStatus.INTERNAL_SERVER_ERROR).json(
                    { Status: constConfig.updateError }
                );
            })

    },

    insertDevice: function (request, response) {
        console.log("Insert");
        const nameRequest = request.body.Name;
        const addressRequest = request.body.Address;
        if ((Object.keys(request.body).length) !== 2) {      // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.insertError }
            );
        }
        if (!(request.body.hasOwnProperty(constConfig.Name) && request.body.hasOwnProperty(constConfig.Address)) && (nameRequest == undefined || addressRequest == undefined)) {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
        }
        if (!(typeof nameRequest === "string" && typeof addressRequest === "string")) {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
        }

        var Name = constConfig.nameRequest;
        var Address = constConfig.addressRequest;
        deviceDAO.insertRecord(Name, Address)
            .then(() => {
                response.status(httpStatus.OK).json(
                    { Status: constConfig.insertDone }
                );
            })
            .catch((err) => {
                response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                    { Status: constConfig.insertError + err.message }
                ));
            });
    },

    deleteDevice: function (request, response) {
        const idRequest = request.body.ID;
        console.log(idRequest);
        if ((Object.keys(request.body).length) !== 1) {     // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.deleteError }
            );
        }
        if (!(request.body.hasOwnProperty(constConfig.ID)) || (idRequest == undefined)) {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
        }
        if (typeof idRequest !== "number") {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.deleteError }
            );
        }

        // var ID = idRequest;
        console.log(typeof idRequest)
        deviceDAO.deleteRecord(idRequest)
            .then(() => {
                response.status(httpStatus.OK).json(
                    { Status: constConfig.deleteDone }
                );
            })
            .catch((err) => {
                response.status(httpStatus.INTERNAL_SERVER_ERROR).json(
                    { Status: constConfig.deleteError }
                );
            })

    },
    executeAllDbOperation: function (request, response) {
        var Name = constConfig.nameRequest;
        var Address = constConfig.addressRequest;
        var ID = constConfig.idRequest;

        deviceDAO.insertRecord(Name, Address)
            .catch((err) => { console.log("CATCH1") })
            .then(deviceDAO.getAllRecord()
                .catch((err) => { console.log("CATCH2"); })
                .then(deviceDAO.updateRecord(Name, Address, ID)
                    .catch((err) => {
                        console.log("CATCH3"); response.
                            status(httpStatus.INTERNAL_SERVER_ERROR).json(
                                { Status: constConfig.patchError + err.message }
                            );
                    })
                    .then(deviceDAO.deleteRecord(ID)
                        .catch((err) => {
                            console.log("CATCH4"); response
                                .status(httpStatus.INTERNAL_SERVER_ERROR).json(
                                    { Status: constConfig.patchError + err.message }
                                );
                        })
                        .then(() => {
                            console.log("Done");
                            response.status(httpStatus.OK).json(
                                { Status: constConfig.patchDone }
                            );
                        })
                    )))




    }
}
