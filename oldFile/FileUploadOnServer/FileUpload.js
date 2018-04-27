var express=require('express');
var fs=require('fs');
var fileUpload=require('express-fileupload');
var httpStatus=require('http-status-codes');
var path=require('path');
var app=express();
app.use(fileUpload());


app.post(upload,function(request,response){
    //console.log(path.extname(request.files.filename.name));
    if(`"${path.extname(request.files.filename.name)}"`!==".txt")
        {response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
        {Status:notFile}
        ));
    }
    else{
    var fileName=request.files.filename;
    console.log(fileName);
    fileName.mv(__dirname+"/FileServer/"+fileName.name, function(err){
        if(err)
        {response.status(httpStatus.INTERNAL_SERVER_ERROR).send(JSON.stringify(
            {Status:INT_SER_ER+err}
        ))}
        else{
        response.send(JSON.stringify(
            {Status:success}
        ));
    }
    });}
});

var server=app.listen(8089, () => {
    console.log(`Server started on port ${server.address().port}`);
});