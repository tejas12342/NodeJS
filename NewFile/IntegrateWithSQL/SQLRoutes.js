var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var httpStatus= require('http-status-codes');
var constConfig=require('./constConfig');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Status="Status";
// console.log(mysql);

var dbConnection = mysql.createConnection({
    host: constConfig.localHost,
    user: constConfig.root,
    password: constConfig.root,
    database: constConfig.SampleDb
});

function isTabelExist(requestedTabelName) {
    if (dbConnection.query(`show table like ${requestedTabelName}`, function (err, result) {
        if (err) { return false }
        else { return true }
    })) { return true }
    else { return false }
}
//Create the Table

app.post(constConfig.create, function (request, response) {
    console.log(request.body);
    dbConnection.query(`create table ${request.body.tableName} (${request.body.col1}, ${request.body.col2}, ID INT AUTO_INCREMENT PRIMARY KEY)`, function (err, result) {
        if (err) { 
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                { Status: constConfig.tableCreatError + err.message }
            ));
            return; 
        }
        response.send(JSON.stringify(
            { Status: constConfig.tableCreated }
        ));
    });

});

//Show Content of Table

app.get(constConfig.show, function (request, response) {
    var getTableName = request.param('tableName');
    dbConnection.query(`select * from ${getTableName}`, function (err, result) {
        if (err) 
        { 
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                { Status: constConfig.retriveError + err.message }
            )); 
            return;
        }
        console.log(result);
        response.send(JSON.stringify({ result }));
    });
});

//Update the record

app.put(constConfig.update, function (request, response) {
    if (isTabelExist(request.body.tableName)) {
        dbConnection.query(`UPDATE ${request.body.tableName} SET Name= "${request.body.Name}", Address= "${request.body.Address}" where ID=${request.body.ID}`, function (err, results) {
            if (err) 
            { 
                response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                    { Status: constConfig.updateError + err.message }
                )); 
                return;
            }
            response.status(httpStatus.OK).send(JSON.stringify(
                { Status: constConfig.updateDone }
            ));
        });
    }
    else {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
            { Status: constConfig.tableNotFound }
        ));
    }

});

//Insert the record 

app.put(constConfig.insert, function (request, response) {
    if (isTabelExist(request.body.tableName)) {
        dbConnection.query(`INSERT into ${request.body.tableName} (Name, Address) VALUES ('${request.body.Name}','${request.body.Address}')`, function (err, results) {
            if (err) 
            { 
                response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                    { Status: constConfig.insertError + err.message }
                ));
                return;
            }
            response.status(httpStatus.OK).send(JSON.stringify(
                { Status: constConfig.insertDone }
            ));
        });
    }
    else {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
            { Status: constConfig.tableNotFound }
        ));
    }

});

//Delete the records

app.delete(constConfig.Delete, function (request, response) {
    if (isTabelExist(request.body.tableName)) {
        dbConnection.query(`DELETE FROM ${request.body.tableName} where ID= ${request.body.ID}`, function (err, results) {
            if (err) 
            {
                response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                     { Status: constConfig.deleteError }
                    ));
                return; 

                }
            response.status(httpStatus.OK).write(JSON.stringify(
                { Status: constConfig.deleteDone }
            ));
        });
    }
    else {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
            { Status : constConfig.tableNotFound }
        ));
    }

});


try {
    connection.connect(function (err) {
        if (err) 
        { 
            console.log(constConfig.dbNotConnect+err.message);
            return; 
        } 
        console.log(constConfig.connected);
    });
}
catch (err) {
    console.error(err);
}
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Server is hosted on ${host}:${port}`);
});