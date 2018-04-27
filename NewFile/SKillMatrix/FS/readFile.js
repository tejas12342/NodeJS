//var fs= require('fs');
//fs.readFile('abc.txt', function(err,data){
//  if (err){
//  console.log(err);
//  }
//  console.log(data.toString());
//})
//console.log("The End");
var fs=require('fs');
var buf= new Buffer(256);
console.log("Open an existing file");
fs.open('abc.txt','r+',function(err, data){
  })

