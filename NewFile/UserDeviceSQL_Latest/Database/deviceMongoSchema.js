var dbConnection= require('./dbConnection');
var mongoose = require('mongoose');

var Schema=mongoose.Schema;
 var device= new Schema({
        deviceName:{type:String, require:true},
        Address: String,
        deviceId:{type:String, unique:true},
        versionKey:false
    });
var Device= dbConnection.model('Device',device);

module.exports=Device;