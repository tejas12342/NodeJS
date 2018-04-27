var constConfig = require('./constConfig');
var httpStatus = require('http-status-codes');
var dbConfig = require('./Database/dbConfig');
let deviceDAO = '';
const Status = "Status";

if (dbConfig.databaseUse === "mysql") {
    deviceDAO = require('./Database/dbDeviceOperation');
}
else {
    deviceDAO = require('./Database/SQLiteDbDeviceOperation');
}

module.exports = {
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
        if ((Object.keys(request.body).length) !== 3) {     // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
        }
        else {
            var Name = request.body.Name;
            var Address = request.body.Address;
            var ID = request.body.ID;
            deviceDAO.updateRecord(Name, Address, ID)
                .then((data) => {
                    response.status(httpStatus.OK).json(
                        { Status: constConfig.updateDone }
                    );
                })
                .catch((err) => {
                    response.status(httpStatus.INTERNAL_SERVER_ERROR).json(
                        { Status: constConfig.updateError + err.message }
                    );
                })
        }
    },

    insertDevice: function (request, response) {
        if ((Object.keys(request.body).length) !== 2) {     // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.insertError }
            );
        }
        else {
            var Name = request.body.Name;
            var Address = request.body.Address;
            deviceDAO.insertRecord(Name, Address)
                .then((data) => {
                    response.status(httpStatus.OK).json(
                        { Status: constConfig.insertDone }
                    );
                })
                .catch((err) => {
                    response.status(httpStatus.INTERNAL_SERVER_ERROR).json(
                        { Status: constConfig.insertError + err.message }
                    );
                });
        }
    },

    deleteDevice: function (request, response) {
        if ((Object.keys(request.body).length) !== 1) {     // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.deleteError } 
            );
        }
        else if(typeof request.body.ID!=="number"){
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.deleteError } 
            );
        }
        else {
            var ID = request.body.ID;
            deviceDAO.deleteRecord(ID)
                .then((data) => {
                    response.status(httpStatus.OK).json(
                        { Status: constConfig.deleteDone }
                    );
                })
                .catch((err) => {
                    response.status(httpStatus.INTERNAL_SERVER_ERROR).json(
                        { Status: constConfig.deleteError }
                    );
                })
        }
    },
    executeAllDbOperation: function (request, response) {
        var Name = request.body.Name;
        var Address = request.body.Address;
        var ID = request.body.ID;

        userDAO.insertRecord(Name, Address)
            .catch((err) => {
                console.log("CATCH1"); response
                    .status(httpStatus.OK).json(
                        { Status: constConfig.patchDone }
                    );
            })
            .then(userDAO.getAllRecord()
                .catch((err) => {
                    console.log("CATCH2"); response
                    .status(httpStatus.INTERNAL_SERVER_ERROR).json(
                        { Status: constConfig.patchError + err.message }
                        );
                })
                .then(userDAO.updateRecord(Name, Address, ID)
                    .catch((err) => {
                        console.log("CATCH3"); response
                        .status(httpStatus.INTERNAL_SERVER_ERROR).json(
                            { Status: constConfig.patchError + err.message }
                        );
                    })
                    .then(userDAO.deleteRecord(ID)
                        .catch((err) => {
                            console.log("CATCH4"); response
                            .status(httpStatus.INTERNAL_SERVER_ERROR).json(
                                { Status: constConfig.patchError + err.message }
                                );
                        })
                        .then(() => {
                            console.log("Done");
                            response.status(httpStatus.OK).send(JSON.stringify(
                                { Status: constConfig.patchDone }
                            ));
                        })
                    )))

    }
}
