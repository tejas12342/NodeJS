var fs=require('fs');
var buf= new Buffer(100);
console.log(buf.length);
fs.open('abc.txt','r+', function(err,data){
	if(err){
		return console.log(err);
	}
	fs.read(data,buf,0,buf.length,0,function(err,bytes){   //fs.read(data,buffer,offsetForBuffer,bufferLength,startingPoint,callback)
		if(err){
			return console.log(err);
		}
		console.log(bytes+" total bytes read");
		if(bytes>0){
			console.log(buf.slice(0,bytes).toString());
		}
		//Close the File
		fs.close(data,function(err){
			if(err){
				return console.log(err);
			}
			console.log('File is closed');
		});

	});
});
