var express=require('express');
var fs=require('fs');
var fileUpload=require('express-fileupload');
var httpStatus=require('http-status-codes');
var path=require('path');
var app=express();
var zlib=require('zlib');
var gzip=zlib.createGzip();
app.use(fileUpload());
//File Constants
const upload="/upload";
const success="Successfully uploaded";
const Status="Status";
const INT_SER_ER="Error inside the server";
const notFile="Uploaded content is not text file";


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
            var readStream=fs.createReadStream((__dirname+"/FileServer/"+fileName.name);
            var writeStream=fs.createwriteStream(__dirname+"/FileServer/"+fileName.name+'.gz');
            readStream.pipe(gzip).pipe(writeStream);
            response.send(JSON.stringify(
                {Status:constConfig.success}
            ));
        }
    });}
    else{
        response.status(httpStatus.BAD_REQUEST).send(JSON.stringify(
        {Status:notFile}       
    ));}
});

var server=app.listen(8089, () => {
    console.log(`Server started on port ${server.address().port}`);
});
console.log(JSON.stringify(
    {Status:constConfig.success}
));