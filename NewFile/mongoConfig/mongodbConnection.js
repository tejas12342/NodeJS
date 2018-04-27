// var mongo= require('mongodb').MongoClient;
// var url = 'mongodb://127.0.0.1:27017/SampleDb';
// let dbo;
// var mongodb=mongo.connect(url, function(err,db){
//         if(err){
//             console.error("Not connect with the Db"+err);
//         }
//         else{
//             console.log("Connected!!");
//             dbo=db.db("SampleDb");
//             console.log(dbo);
//             }
//     })
// console.log("The value is");
// console.log(dbo);

        // dbo.createCollection("Employees",function(err,response){
        //     if(err){
        //         console.error(err);
        //     }
        //     else{
        //         console.log('Collection Created');
        //     }
        // });

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/sampleDb');
console.log(db);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
          console.log("DB connected");
    });