//Import some needy libraries
var fs=require('fs');
var express= require('express');
var bodyParser = require('body-parser');
var httpStatus=require('http-status-codes');
var app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const Error="Error";
const Status="Status";
const fileNotExist="File is not exist";
//function which check the existence of the file
function isFileExist(fileName){
    if(fs.existsSync(__dirname+'/../'+fileName))
    {
        return true;
    }
    else{
        return false;
    }        
}
//Creating the CRUD request

//Post request for creating file in the server
app.post('/create',function(request,response){
    fs.writeFile(request.body.fileName,'',function(err,data){
        if(err){
            response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                {Status:"Not able to create file"}
            ));}
         else{
             response.status(httpStatus.OK).send(JSON.stringify(
                 {Status:'Successfully file created'}
            ));
        }
    });        
});

//Get request for showing the files Content
app.get('/file',function(request,response){
    var getFileName=request.param('fileName');
    console.log(getFileName);
    if(isFileExist(getFileName)){
        fs.readFile(getFileName,function(err,data){
            if(!err){
            response.status(httpStatus.OK).send(response.send(JSON.stringify(
                {"Content":data.toString()}
            )));
        }
        else{
            response.status(httpStatus.BAD_REQUEST).send(response.send(JSON.stringify(
                {Error:err}
            )));
        }
        });
    }else{
        response.send(JSON.stringify(
            {Status:fileNotExist}
        ));
    }
});

//Put Request for modify the content in the file
app.put('/update',function(request,response){
    if(isFileExist(request.body.fileName)){
       // console.log('if file Not exist, it will be created');
        fs.appendFile(request.body.fileName,request.body.newData,function(err){
            if(err){
                response.send(JSON.stringify({Status:"Error in updating the file"}));
                return;
            }
            response.status(httpStatus.OK).send(JSON.stringify(
                {Status:"Successfully updated"}
            ));
        })
    }
    else{response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
        {Status:fileNotExist}
    ));
}
});

//Delete request to delete the file using unlink
app.delete('/delete', function(request,response){
    if(isFileExist(request.body.fileName)){
        fs.unlink(request.body.fileName,function(err){
            if(err){
                response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
                {Status:"Not able to delete the file"}
                ));
            return;
        }
            response.status(httpStatus.OK).send(JSON.stringify(
                {Status:"File Successfully deleted"}
            ));
        });
    }
    else{
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
            {Status:fileNotExist}
        ));
    }
});

//Create Server
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port= server.address().port;
	console.log('Server listen at host %s and port %s',host,port);
});