// var fs=require('fs');
// var buf= new Buffer(256);
// console.log('Open File');
// fs.open('abc.txt', 'r+',function(err,data){
// 	if(err) => console.log(err);
// 	console.log(data);

// });
var os=require('os');
var fs=require('fs');
console.log('Write the file');
fs.writeFile('abc.txt','Hi my name is Tejas Patel',function(err){
	if(err){
		return console.log(err);
	}
	fs.readFile('abc.txt',function(err,data){
		if(err){
			return console.log(err);
		}
		console.log(data.toString());
	});
});
console.log(os.endianness());
console.log(os.EOL);