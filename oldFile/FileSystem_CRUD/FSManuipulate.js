//Import some needy libraries
var fs=require('fs');
var express= require('express');
var app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//function which check the existence of the file
function isFileExist(fileName){
    if(fs.existsSync(__dirname+'/../'+fileName)){return true;}
    else{return false;}
}

//Creating the CRUD request
//Post request for creating file in the server
app.post('/create',function(request,response){
    console.log('Query receive');
    fs.writeFile(request.body.fileName,'',function(err,data){
        if(err){
            console.log(err)
         }//else{response.send("Successfully file created");}
         else{response.send(JSON.stringify({"Status":'Successfully file created'}));}
    });        
});

//Get request for showing the files Content
app.get('/file',function(request,response){
    var getFileName=request.param('fileName');
    console.log(getFileName);
    if(isFileExist(getFileName)){
        console.log('Start reading the file');
        fs.readFile(getFileName,function(err,data){
            response.send(response.send(JSON.stringify({"Status":data.toString()})));
        });
    }else{response.send(JSON.stringify({"Status":"File is not exist"}));}
});

//Put Request for modify the content in the file

app.put('/update',function(request,response){
    if(isFileExist(request.body.fileName)){
        console.log('if file Not exist, it will be created');
    fs.appendFile(request.body.fileName,request.body.newData,function(err){
        if(err){
            response.send(JSON.stringify({"Status":"Error in updating the file"}));
        }
        console.log("Data appended");});
    fs.readFile(request.body.fileName,function(err,data){
        if(err){
            response.send(JSON.stringify({"Status":"Error in reading the file"}));
        }
        response.send(JSON.stringify({"Data":data.toString()}));
    });
    }
    else{response.send(JSON.stringify({"Status":"File name is not exist"}));}
});

//Delete request to delete the file using unlink
app.delete('/delete', function(request,response){
    if(isFileExist(request.body.fileName)){
        fs.unlink(request.body.fileName,function(err){
            if(err){response.send(JSON.stringify({"Status":"Not able to delete the file"}));}
            response.send(JSON.stringify({"Status":"File Successfully deleted"}));
        });}
    else{response.send(JSON.stringify({"Status":"File is not Exist"}));}
});

//Create Server
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port= server.address().port;
	console.log('Server listen at host %s and port %s',host,port);
});