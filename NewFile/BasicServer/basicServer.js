var http=require('http');

http.createServer(function(request,response){
	console.log('Hello World!!');
}).listen(3031);
console.log('Server is hosted on http://192.168.0.49:3031');
