var express=require('express');
var fs=require('fs');
var fileUpload=require('express-fileupload');
var httpStatus=require('http-status-codes');
var path=require('path');
var constConfig=require('./constConfig');
var app=express();
app.use(fileUpload());

const Status="Status";


function isTextFile(filename){
    if(`"${path.extname(fileName)}"`!==".txt"){
        return false;
    }
    else{
        return true;
    }
}
app.post(upload,function(request,response){
    if(isTextFile(request.files.filename.name)){
        var fileName=request.files.filename;
        fileName.mv(__dirname+"/FileServer/"+fileName.name, function(err){
            if(err)
            {response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
                {Status:INT_SER_ER+err}
            ))}
            else{
            response.send(JSON.stringify(
                {Status:constConfig.success}
            ));
        }
    });}
    else{
        response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
        {Status:constConfignotFile}       
    ));}
});

var server=app.listen(8089, () => {
    console.log(`Server started on port ${server.address().port}`);
});
console.log(JSON.stringify(
    {Status:constConfig.success}
));