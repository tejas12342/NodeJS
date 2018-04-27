var express=require('express');
var sqlite=require('sqlite3').verbose();
var bodyParser=require('body-parser');
var httpStatus=require('http-status-codes');
var constConfig=require('/.constConfig');

var app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const Status="Status";


//Connecting Database with fileSystem
var db= new sqlite.Database(constConfig.dbLocation,sqlite.OPEN_READWRITE,(err)=>{
    if(err)
    {console.error(`Not able to opened the SQLite database${err}`);
    return;
    }
    console.log(`Connect with the FileSystem database`);
});

//*******Inmemory Database ***********/
// var db= new sqlite.Database(':memory:',sqlite3.OPEN_READWRITE,(err)=>{
//     if(err){console.log(`Not able to opened the SQLite database${err}`);}
//     console.log(`Connect with the in-memory database`);
// });

function isTabelExist(requestedTabelName){
    if(db.serialize(()=>{
        db.run(`SELECT NAME from sqlite_master WHERE name='${requestedTabelName}'`,function(err,result){
            if(err){return false}
            else{return true}
    })
})
);
    else{return false}
}

app.post(constConfig.create,function(request,response){
    // db.serialize(()=>{db.run(`CREATE TABLE SuperStar(Name TEXT, Address TEXT, ID INTEGER AUTO_INCREMENT PRIMARY KEY);`, function(err,result){
        db.serialize(()=>{
            db.run(`CREATE TABLE ${request.body.tableName}(${request.body.col1}, ${request.body.col2}, ${request.body.col3});`, function(err,result){
        if(err){
            console.log(err);
            response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                {Status:"Not able to create Table, Table Already Exsit"}
            ));
            return;
        }
        else{
        response.status(httpStatus.OK).send(JSON.stringify(
            {Status:"Table Created"}
        ));
        }
    })});
});
app.get(constConfig.show,function(request,response){
        var getTableName=request.param('tableName');
        console.log(getTableName);
        db.serialize(()=>{db.each(`SELECT * FROM ${getTableName};`, function(err,result){
            if(err){
                console.log(err);
                response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                    {Status:"Not able to show the content of Table due to "+err}
                ));
                return;
            }
            else{
            response.status(httpStatus.OK).send(JSON.stringify({result}));
            }
        })});
});

app.put(constConfig.update,function(request,response){
    db.serialize(()=>{db.run(`UPDATE ${request.body.tableName} SET Address="${request.body.Address}" where ID=${request.body.ID};`, function(err,result){
        if(err){
            console.log(err);
            response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                {Status:"Not able to update the record due to "+err}
                
            ));
            return;
        }
        else{
        response.status(httpStatus.OK).send(JSON.stringify(
            {Status:"Update successfully"}
        ));
        }
    })});
});

app.put(constConfig.update,function(request,response){
    console.log("got Insert Query");
    db.serialize(()=>{db.run(`INSERT INTO ${request.body.tableName} (Name, Address,ID) VALUES ("${request.body.Name}","${request.body.Address}",${request.body.ID})`, function(err,result){
        if(err){
            console.log(err);
            response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                {Status:"Not able to Insert data into table due to"+err}
            ));
            return;
        }
        else{
            console.log("Insert done");
        response.status(httpStatus.OK).send(JSON.stringify({Status:"Data Successfully Inserted"}));
        }
    })});
});

app.delete(constConfig.Delete,function(request,response){//%s,var
    db.serialize(()=>{db.run(`DELETE FROM ${request.body.tableName} where ID= ${request.body.ID}`, function(err,result){
        if(err){
            response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                {Status:"Not able to Delete the record due to "+err}
            ));
            return;
        }
        else{
        response.status(httpStatus.OK).send(JSON.stringify({Status:"Successfully deleted the record with ID "+request.body.ID}));
        }
    })});
});


var server=app.listen(8082,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log(`The host is created on ${host} at port ${port}`);
});
