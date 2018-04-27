app.post(create, function (request, response) {
    console.log(request.body);
    dbConnectio.query(`create table ${request.body.tableName} (${request.body.col1}, ${request.body.col2}, ID INT AUTO_INCREMENT PRIMARY KEY)`, function (err, result) {
        if (err) { 
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                { Status: "Error in Table creation" + err }
            ));
            return; 
        }
        response.send(JSON.stringify(
            { Status: "Table Created" }
        ));
    });

});
//Show Content of Table
app.get('/user/show', function (request, response) {
    var getTableName = request.param('tableName');
    dbConnectio.query(`select * from user`, function (err, result) {
        if (err) 
        { 
            response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                { Status: "Not able to retrive the data" + err }
            )); 
            return;
        }
        console.log(result);
        response.send(JSON.stringify({ result }));
    });
});

//Update the record
app.put(update, function (request, response) {
    if (isTabelExist(request.body.tableName)) {
        dbConnectio.query(`UPDATE ${request.body.tableName} SET Name= "${request.body.Name}", Address= "${request.body.Address}" where ID=${request.body.ID}`, function (err, results) {
            if (err) 
            { 
                response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                    { Status: "Error in Update the Table" + err }
                )); 
                return;
            }
            response.status(httpStatus.OK).send(JSON.stringify(
                { Status: "Update Successfully" }
            ));
        });
    }
    else {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
            { Status: "Table not found" }
        ));
    }

});

//Insert the record 
app.put(insert, function (request, response) {
    if (isTabelExist(request.body.tableName)) {
        dbConnectio.query(`INSERT into ${request.body.tableName} (Name, Address) VALUES ('${request.body.Name}','${request.body.Address}')`, function (err, results) {
            if (err) 
            { 
                response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                    { Status: "Error in Insert in the Record" + err }
                ));
                return;
            }
            response.status(httpStatus.OK).send(JSON.stringify(
                { Status: "Insert Successfully" }
            ));
        });
    }
    else {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
            { Status: "Table not found" }
        ));
    }

});

//Delete the records
app.delete(Delete, function (request, response) {
    if (isTabelExist(request.body.tableName)) {
        dbConnectio.query(`DELETE FROM ${request.body.tableName} where ID= ${request.body.ID}`, function (err, results) {
            if (err) 
            {
                response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                     { Status: "Not able to Delete the record" }
                    ));
                return; 

                }
            response.status(httpStatus.OK).write(JSON.stringify(
                { Status: "The record is deleted" }
            ));
        });
    }
    else {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
            { Status : "Table not found" }
        ));
    }

});