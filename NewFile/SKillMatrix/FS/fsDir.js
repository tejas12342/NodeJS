var fs = require('fs');
var location='/home/tejas/NodeJS/node_training_tejasn_patel/SKillMatrix/FS/sampleDir';
function makeDir(location) {
    fs.mkdir(location, (err) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("Directory generated");
        }
    });
}
function removeDir(location) {
    fs.rmdir(location, (err) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("Directory removed");
        }
    });
}
function readDir(location){
    fs.readdir(location, (err, data) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log(data);
            console.log("Directory");
        }
    });
}

makeDir(location);
makeDir(location+'/A');
makeDir(location+'/B');
readDir(location);
removeDir(location);

