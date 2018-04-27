var app=require('./../SQLServer');
var user = require('./../Users');
var device = require('./../Devices');


module.exports=function(app){
    app.get('/', user.serverStart)
//Show Content of Table
    app.get('/user/', user.getUserList);

    //Update the record
    app.put('/user', user.updateUserList);

    //Insert the record 
    app.post('/user', user.insertUser);

    //Delete the records
    app.delete('/user', user.deleteUser);

    //All in one
    app.patch('/user', user.executeAllDbOperation);

    //Show Content of Table
    app.get('/device/', device.getDeviceList);

    //Update the record
    app.put('/device', device.updateDeviceList);

    //Insert the record 
    app.post('/device', device.insertDevice);

    //Delete the records
    app.delete('/device', device.deleteDevice);

    //All in one
    app.patch('/device', device.executeAllDbOperation);
}