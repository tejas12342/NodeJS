var fs=require('fs');
var http=require('http');
var url=require('url');

http.createServer(function(request,response){
	var pathName= url.parse(request.url).pathname;
	console.log("Requests received for the"+pathName);
	//console.log("The substr are"+pathName.substr(1));
	// if(pathName.substr(1)===)
	fs.readFile(pathName.substr(1),function(err,data){
		if(err){
			return console.log("No file Found--> "+err);
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end("No File Found");
		}else{
			response.writeHead(200,{'Content-Type':'text/html'});
			response.write(data.toString());
		}
		response.end();
	fs.writeFile()

	});
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
