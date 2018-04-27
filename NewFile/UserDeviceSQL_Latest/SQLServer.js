var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./Routes/Routes.js')(app);


//start server and connect with the Database
var server = app.listen(8082, function (request, response) {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Server is hostedd on ${host}:${port}`);
});
module.exports = { app, server }

