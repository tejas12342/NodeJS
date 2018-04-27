var express=require('express');
var app=express();
var PORT=8089;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
var routes=require('./gitRoutes')(app);
var ADDRESS='127.0.0.1'


app.listen(PORT,ADDRESS,function(err){
    console.log(`Server is hosted on:${PORT}`);
});
module.exports=app;