//Asynchronous System
var fs= require('fs');
var events= require('events');
var eventEmitter=new events.EventEmitter();

var listener= function listener(){
  console.log("Done with reading the file");
}
eventEmitter.on('Done',listener);
if(fs.existsSync(__dirname+'/abc.txt')){
  fs.readFile(__dirname+'/abc.txt',function(err,data){
    if(err) return console.log('The Error occured in the file'+err);
    console.log('Asynchronous Data Read -->'+ data.toString());
    eventEmitter.emit('Done');
  });
}
else{console.log("File Doesnt exis");}

console.log("The block end");


//Synchronous
// var data= fs.readFileSync('abc.txt');
// console.log('Synchronous Data Read -->'+data.toString());
// console.log("The Block end");

