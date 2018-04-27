var nodeMailer=require('nodemailer');
var path=require('path');
var express=require('express');
var fs=require('fs');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var fileLocation='/home/tejas/NodeJS/Express/FileUploadOnServer/FileServer/';
const recepient="jaym.patel@volansystech.com";
const SUBJECT="Sample mail";
const TEXT_MESSAGE="Hi Jay,\n Please Find a zip file attached below";
var mailOption={
    from:'',
    to:recepient,
    subject:SUBJECT,
    text:TEXT_MESSAGE,
    attachments:[{
        path:path.normalize(fileLocation+'Admin.png.gz')
    }]
};
//base64 encoding part of mailId=d2l6YXJkY29yZTEyMzQyQGdtYWlsLmNvbQ==
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