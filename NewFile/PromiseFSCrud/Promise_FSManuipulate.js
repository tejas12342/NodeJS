//Import some needy libraries
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var httpStatus = require('http-status-codes');
var constConfig=require('./constConfig');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const error="Error";
const Content = "Content";
const Status = "Status";

//function which check the existence of the file
function isFileExist(fileName) {
    if (fs.existsSync(__dirname + '/' + fileName)) {
        return true;
    }
    else {
        return false;
    }
}
//********Creating the CRUD request**********/
//Post request for creating file in the server
app.post(constConfig.create, function (request, response) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(request.body.fileName, '', function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve();
            }
        });
    })
        .then(() => {
            response.status(httpStatus.OK).send(JSON.stringify(
                { Status: constConfig.fileCreated }
            ));
        })
        .catch(() => {
            response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                { Status: constConfig.NotCreateFile + err.message }
            ));
        })
});

//Get request for showing the files Content
app.get(constConfig.show, function (request, response) {
    var getFileName = request.param('fileName');
    if (isFileExist(getFileName)) {
        return new Promise(function (resolve, reject) {
            fs.readFile(getFileName, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
        })
            .then((data) => {
                response.status(httpStatus.OK).send(JSON.stringify(
                    { Content: data.toString() }
                ));
            })
            .catch((err) => {
                response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                    { Error: err.message }
                ));

            })
    } else {
        response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
            { Status: constConfig.fileNotExist }
        ));
    }

});

//Put Request for modify the content in the file
app.put(constConfig.update, function (request, response) {
    if (isFileExist(request.body.fileName)) {
        // console.log('if file Not exist, it will be created');
        return new Promise(function (resolve, reject) {
            fs.appendFile(request.body.fileName, request.body.newData, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        })
            .then((data) => {
                response.status(httpStatus.OK).send(JSON.stringify(
                    { Status: constConfig.fileUpdated }
                ));
            })
            .catch((err) => {
                response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                    { Status: constConfig.ErrorUpdateFile + err.message }
                ));
            })
    }
    else {
        response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
            { Status: constConfig.fileNotExist }
        ));
    }
});

//Delete request to delete the file using unlink
app.delete(constConfig.Delete, function (request, response) {
    if (isFileExist(request.body.fileName)) {
        return new Promise(function (resolve, reject) {
            fs.unlink(request.body.fileName, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        }).then(() => {
            response.status(httpStatus.OK).send(JSON.stringify(
                { Status: constConfig.fileDeleted }
            ));
        })
            .catch((err) => {
                response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                    { Status: constConfig.fileNotDeleted + err.message }
                ));
            })
    }
    else {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
            { Status: constConfig.fileNotExist }
        ));
    }

});

//Create Server
var server = app.listen(8081, () => {
    console.log('Server listen at host %s and port %s', server.address().address, server.address().port);
});