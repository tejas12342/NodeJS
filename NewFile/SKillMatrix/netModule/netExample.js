var net= require('net');
const clientConfirm='client connected';
const stringTypeClient ='Client>>';
const clientDisconnect='Client Disconnected';
const PORT=8080;
var server= net.createServer(function(connection){
    console.log(clientConfirm);

    connection.on('end',()=>{
        console.log(clientDisconnect);
    });
    connection.on('data',(data)=>{
        console.log(stringTypeClient+(data.toString()));
    });
    connection.write();
});
server.listen(PORT,function(){
    console.log('Server hosted on'+server.PORT);
});







  