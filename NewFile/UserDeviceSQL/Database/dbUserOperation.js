var dbConnection=require('./dbConnection');

module.exports={
    getAllRecord: function(){
        console.log('My SQL GET');
        return new Promise(function(fullfill,reject){
            console.log('Executed select query');
            dbConnection.query(`select * from user;`, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else{
                    console.log(result);
                    fullfill(result);
                }
            });
        
        });
        
    },
    updateRecord:function(Name,Address,ID){
        console.log('My SQL Update');
        return new Promise(function(fullfill,reject){
            dbConnection.query(`UPDATE user SET Name= "${Name}", Address= "${Address}" where ID=${ID}`, function (err, result) {
                if (err) {
                    reject(err);
                }
                else{
                    fullfill(result);
                }
            });
        })
    },

    insertRecord:function(Name,Address){
        console.log("MysqlInsert");
        return new Promise(function(fullfill,reject){
            dbConnection.query(`INSERT into user (Name, Address) VALUES ('${Name}','${Address}')`, function (err, result) {
                if (err) {
                    reject(err);
                }
                else{
                    fullfill(result);
                }
            });
        })
    },

    deleteRecord:function(ID){
        console.log('My SQL Delete');
        return new Promise(function(fullfill,reject){
            dbConnection.query(`DELETE FROM user where ID= ${ID}`, function (err, result) {
                if (err) {
                    reject(err);
                }
                else{
                    fullfill(result);
                }
            });
        })
    }
    
};