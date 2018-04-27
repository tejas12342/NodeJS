var nodeMailer=require('nodemailer');
var zlib=require('zlib');
var path=require('path');
var express=require('express');
var fs=require('fs');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var fileLocation='/home/tejas/NodeJS/Express/FileUploadOnServer/FileServer/Admin.png';
var readStream=fs.createReadStream(fileLocation);
var writeStream=fs.createwriteStream(fileLocation);

var mailOption={
    from:'',
    to:"jaym.patel@volansystech.com",
    subject:"Sample mail",
    text:"Hi Jay Patel!",
    attachments:[{
        path:path.normalize('/home/tejas/NodeJS/Express/FileUploadOnServer/FileServer/Admin.png')
    }]
};
//base64 encoding part of d2l6YXJkY29yZTEyMzQyQGdtYWlsLmNvbQ==
app.put('/sentMail',function(request,response){
    var mailId=request.param('mailId');
    var buff=new Buffer(mailId,'base64');
    mailOption.from=buff.toString();
    var transporter= nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:mailOption.from,//'wizardcore12342@gmail.com'
            pass:'wizardcore@123'

        }

    });
    transporter.sendMail(mailOption,function(err,result){
        if(err){console.log(err)}
        else{
        response.status(200).send(JSON.stringify({"Status":"Successfully send a mail"}));}
    });
    
});

var server=app.listen(8081,function(){
    console.log(`server is hosted on ${server.address().port}`);
})