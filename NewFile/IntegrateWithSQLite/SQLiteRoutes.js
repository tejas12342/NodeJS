var express = require('express');
var sqlite = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var httpStatus = require('http-status-codes');
var constConfig = require('/.constConfig');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Status = "Status";

//Connecting Database with fileSystem
var db = new sqlite.Database(constConfig.dbLocation, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(fsDbError+err.message);
        return;
    }
    console.log(fsDb);
});

//*******Inmemory Database ***********/
// var db= new sqlite.Database(':memory:',sqlite3.OPEN_READWRITE,(err)=>{
//     if(err){console.log(`Not able to opened the SQLite database${err}`);}
//     console.log(`Connect with the in-memory database`);
// });

function isTabelExist(requestedTabelName) {
    if (db.serialize(() => {
        db.run(`SELECT NAME from sqlite_master WHERE name='${requestedTabelName}'`, function (err, result) {
            if (err) { return false }
            else { return true }
                })
            })
        );
    else { return false }
}

app.post(constConfig.create, function (request, response) {
    // db.serialize(()=>{db.run(`CREATE TABLE SuperStar(Name TEXT, Address TEXT, ID INTEGER AUTO_INCREMENT PRIMARY KEY);`, function(err,result){
    db.serialize(() => {
        db.run(`CREATE TABLE ${request.body.tableName}(${request.body.col1}, ${request.body.col2}, ${request.body.col3});`, function (err, result) {
            if (err) {
                console.log(err);
                response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                    { Status: constConfig.tableCreatError+err.message }
                ));
                return;
            }
            else {
                response.status(httpStatus.OK).send(JSON.stringify(
                    { Status: constConfig.tableCreated }
                ));
            }
        })
    });
});
app.get(constConfig.show, function (request, response) {
    var getTableName = request.param('tableName');
    console.log(getTableName);
    db.serialize(() => {
        db.each(`SELECT * FROM ${getTableName};`, function (err, result) {
            if (err) {
                console.log(err);
                response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                    { Status: constConfig.retriveError + err.message }
                ));
                return;
            }
            else {
                response.status(httpStatus.OK).send(JSON.stringify({ result }));
            }
        })
    });
});

app.put(constConfig.update, function (request, response) {
    db.serialize(() => {
        db.run(`UPDATE ${request.body.tableName} SET Address="${request.body.Address}", Name="${request.body.Name}" where ID=${request.body.ID};`, function (err, result) {
            if (err) {
                console.log(err);
                response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                    { Status: constConfig.updateError + err.message }

                ));
                return;
            }
            else {
                response.status(httpStatus.OK).send(JSON.stringify(
                    { Status: constConfig.updateDone }
                ));
            }
        })
    });
});

app.put(constConfig.update, function (request, response) {
    db.serialize(() => {
        db.run(`INSERT INTO ${request.body.tableName} (Name, Address,ID) VALUES ("${request.body.Name}","${request.body.Address}",${request.body.ID})`, function (err, result) {
            if (err) {
                console.log(err);
                response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                    { Status: constConfig.insertError + err.messgae }
                ));
                return;
            }
            else {
                console.log("Insert done");
                response.status(httpStatus.OK).send(JSON.stringify({ Status: constConfig.insertDone }));
            }
        })
    });
});

app.delete(constConfig.Delete, function (request, response) {//%s,var
    db.serialize(() => {
        db.run(`DELETE FROM ${request.body.tableName} where ID= ${request.body.ID}`, function (err, result) {
            if (err) {
                response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                    { Status: constConfig.deleteError + err }
                ));
                return;
            }
            else {
                response.status(httpStatus.OK).send(JSON.stringify({ Status: constConfig.deleteDone + "with ID"+request.body.ID }));
            }
        })
    });
});


var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`The host is created on ${host} at port ${port}`);
});
