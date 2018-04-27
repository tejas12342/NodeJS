var db=require('./mongodbConnection');
console.log("The laue is");
console.log(db);
function insertData(){
    dbo.collection("Employee").insertOne({name:"Jhon", Address:"California"},function(err,response){
        if(err){
            console.error(err);
        }
        else{
            console.log("Document inserted");
        }
    });
}