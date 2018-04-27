var net= require('net');
var socket= new net.Socket();
var client=socket.connect(8080,()=>{
    console.log('connected');
});

client.on('data',(data)=>{
    console.log("Server>>"+data.toString());
});
client.on('end',()=>{
    console.log('disconnected');
});
client.write("Hi Server!!");
// client.pipe(client);
