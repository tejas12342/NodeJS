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
try{
if(isFileExist(__dirname+'/SampleData.txt')){    
    buffer=fs.readFileSync(__dirname+"/SampleData.txt");
    if(!(buffer.has = null))
        {
        fs.writeFileSync(__dirname+"/OutputCopy.txt",buffer);
        buffer.fill(null);
        console.log(buffer);
        }
    
    }

else{
    console.log('Error occured in the file');
    }
}
catch(err){
    console.log(err);
}

//Read and Write By stream
// readStream.pipe(writeStream);
