var fs=require('fs');
var bufData='';
var readData='';
var buffer= new Buffer(1024);
//var readStream= fs.createReadStream(buffer);
var readStream= fs.createReadStream(__dirname+'/SampleData.txt');
var writeStream= fs.createWriteStream(__dirname+'/output.txt');
readStream.setEncoding('UTF8');

function isFileExist(fileName){
    if(fs.existsSync(fileName)){return true;}
    else{return false;}
}
// fs.open(__dirname+'/SampleData.txt','r+',function(err,fd){
//     if(isFileExist(__dirname+'/SampleData.txt')){
//         fs.read(fd,buffer,0,buffer.length,0,function(err,data){
//             if(err)console.error(err);
//             bufData=buffer.write(data);
//         readStream.pipe(writeStream);
//         });
    

//     }else{console.log('File is not exist')}
    
    
// });
try{
if(isFileExist(__dirname+'/SampleData.txt')){    
    buffer=fs.readFileSync(__dirname+"/SampleData.txt");
if(!(buffer.has = null)){
        fs.writeFileSync(__dirname+"/OutputCopy.txt",buffer);
        buffer.fill(null);
        console.log(buffer);
    }
    
}

else{
    console.log('');
}
}
catch(err){
    console.log(err);
}




//Read and Write By stream
// readStream.pipe(writeStream);
