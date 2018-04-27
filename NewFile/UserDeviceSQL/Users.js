const constConfig = require('./constConfig');
const httpStatus = require('http-status-codes');
var dbConfig = require('./Database/dbConfig');
const Status = "Status";
var userDAO ;
if (dbConfig.databaseUse === "mysql") {
    userDAO = require('./Database/dbUserOperation');
}
else {
    userDAO = require('./Database/SQLiteDbUserOperation');
}
// console.log(userDAO);
module.exports = {
    serverStart: function(request, response){
        {response.status(httpStatus.OK).json(
            {Status:constConfig.serverStart}
    )}
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
        if ((Object.keys(request.body).length) !== 3) {     // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.updateError }
            );
        }
        // else if(request.body[0]!=){

        // }
        else {
            console.log(request.body[1]);
            var Name = request.body.Name;
            var Address = request.body.Address;
            var ID = request.body.ID;
            userDAO.updateRecord(Name, Address, ID)
                .then(() => {
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

    insertUser: function (request, response) {
        console.log("Insert");
        if ((Object.keys(request.body).length) !== 2) {      // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.insertError }
            );
        }
        else {
            var Name = request.body.Name;
            var Address = request.body.Address;
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
        }
    },

    deleteUser: function (request, response) {
        if ((Object.keys(request.body).length) !== 1) {     // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.deleteError }
            );
        }
        else if(typeof request.body.ID!=="number"){
            response.status(httpStatus.BAD_REQUEST).json(
                { Status:  constConfig.deleteError } 
            );
        }
        else {
            var ID = request.body.ID;
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
        }
    },
    executeAllDbOperation: function (request, response) {
        var Name = request.body.Name;
        var Address = request.body.Address;
        var ID = request.body.ID;

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
