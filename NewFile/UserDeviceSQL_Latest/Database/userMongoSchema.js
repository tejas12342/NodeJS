var dbConnection= require('./dbConnection');
var mongoose = require('mongoose');

var Schema=mongoose.Schema;
 var user= new Schema({
        userName:{type:String, require:true},
        Address: String,
        userId:{type:String, unique:true},
        versionKey:false
    });
var User= dbConnection.model('User',user);

module.exports=User;