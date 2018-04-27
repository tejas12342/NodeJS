var dbConnection=require('./dbConnection');

module.exports={
    getAllRecord: function(){
        return new Promise(function(fullfill,reject){
            console.log('Executed select query');
            dbConnection.query(`select * from device;`, function (err, result) {
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
        return new Promise(function(fullfill,reject){
            dbConnection.query(`UPDATE device SET Name= "${Name}", Address= "${Address}" where ID=${ID}`, function (err, result) {
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
        return new Promise(function(fullfill,reject){
            dbConnection.query(`INSERT into device (Name, Address) VALUES ('${Name}','${Address}')`, function (err, result) {
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
        return new Promise(function(fullfill,reject){
            dbConnection.query(`DELETE FROM device where ID= ${ID}`, function (err, result) {
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