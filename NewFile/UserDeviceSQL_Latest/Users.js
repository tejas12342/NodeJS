const constConfig = require('./constConfig');
const httpStatus = require('http-status-codes');
var dbConfig = require('./Database/dbConfig');
const Status = "Status";
var userDAO;
const dataTypeString = "string";
const dataTypeString = "number";
if (dbConfig.databaseUse === "mysql") {
    userDAO = require('./Database/dbUserOperation');
}
if (dbConfig.databaseUse === "sqlite") {
    userDAO = require('./Database/SQLiteDbUserOperation');
}
if (dbConfig.databaseUse === "mongo") {
    userDAO = require('./Database/userMongoDbOperation')
}
else {
    console.log("Check your database configuration");
}
// console.log(userDAO);
module.exports = {
    serverStart: function (request, response) {
        {
            response.status(httpStatus.OK).json(
                { Status: constConfig.serverStart }
            )
        }
    },

    getUserList: function (request, response) {
        userDAO.getAllRecord()
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
    updateUserList: function (request, response) {
        const nameRequest = request.body.Name;
        const addressRequest = request.body.Address;
        const idRequest = request.body.ID;
        console.log(request.body);
        if ((Object.keys(request.body).length) !== 3) {     // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
            return;
        }
        if (!(request.body.hasOwnProperty(constConfig.Name) && request.body.hasOwnProperty(constConfig.Address) && request.body.hasOwnProperty(constConfig.ID)) && (nameRequest == undefined || addressRequest == undefined || idRequest == undefined)) {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
            return;
        }
        if (!(typeof nameRequest === dataTypeString && typeof addressRequest === dataTypeString && typeof idRequest === dataTypeNumber)) {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
            return;
        }

        userDAO.updateRecord(nameRequest, addressRequest, idRequest)
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

    insertUser: function (request, response) {
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
        userDAO.insertRecord(Name, Address)
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

    deleteUser: function (request, response) {
        const idRequest = request.body.ID;
        console.log(idRequest);
        if ((Object.keys(request.body).length) !== 1) {     // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.deleteError }
            );
        }
        if (!(request.body.hasOwnProperty(constConfig.ID)) || (idRequest == undefined)) {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.deleteError }
            );
        }
        if (typeof idRequest !== "number") {
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.deleteError }
            );
        }

        var ID = idRequest;
        console.log(typeof ID)
        userDAO.deleteRecord(ID)
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

        userDAO.insertRecord(Name, Address)
            .catch((err) => { console.log("CATCH1") })
            .then(userDAO.getAllRecord()
                .catch((err) => { console.log("CATCH2"); })
                .then(userDAO.updateRecord(Name, Address, ID)
                    .catch((err) => {
                        console.log("CATCH3"); response.
                            status(httpStatus.INTERNAL_SERVER_ERROR).json(
                                { Status: constConfig.patchError + err.message }

                            );
                        return;
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
                            response.status(httpStatus.OK).json(
                                { Status: constConfig.patchDone }
                            );
                        })
                    )))




    }
}
