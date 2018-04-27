// var routeAPI=require('./../Routes');
var chai =require('chai'), chaiHttp=require('chai-http');
var should=chai.should();
var serverLocalHost='http://192.168.0.49:8082';
chai.use(chaiHttp);
chai.use(require('chai-things'));
var constConfig=require('./../constConfig');
const DEVICE_NAME="BR";
const NAME_COL="Name";
const DEVICE_ADDRESS="Address";
const ID="ID";

describe('Routes Testing', function(){
    it('Test case1-->Should fetch the records of device with the defined property',function(done){
        chai.request(serverLocalHost)
        .get('/device/')
        .end(function(err,response){
            response.should.have.status(200);
            response.body.should.have.property(constConfig.result);
            response.body.result.should.all.have.property(constConfig.Name);
            response.body.result.should.all.have.property(constConfig.Address);
            response.body.result.should.all.have.property(constConfig.ID);
            response.should.be.json;
            done();
            }) 
        
        }
    );

    it('should insert the device record successfully with appropriate parameter',function(done){
        chai.request(serverLocalHost)
        .post('/device')
        .send({
            NAME_COL:DEVICE_NAME,
            DEVICE_ADDRESS:"IAE"
        })
        .end(function(err,response){
            response.should.have.status(200);
            response.body.should.have.property(constConfig.Status);
            response.body.Status.should.equal(constConfig.insertDone);
            response.should.be.json;
            done();
            }) 
        
        }
    );

    it('should not insert the device record successfully with inappropriate parameter',function(done){
        chai.request(serverLocalHost)
        .post('/device')
        .send({
            NAME_COL:DEVICE_NAME
        })
        .end(function(err,response){
            response.should.have.status(400);
            response.body.should.have.property(constConfig.Status);
            response.body.Status.should.equal(constConfig.insertError);
            response.should.be.json;
            done();
            }) 
        
        }
    );

    it('should update the device record successfully',function(done){
        chai.request(serverLocalHost)
        .put('/device')
        .send({
            NAME_COL:DEVICE_NAME,
            DEVICE_ADDRESS:"USA",
            ID:"1"
        })
        .end(function(err,response){
            response.should.have.status(200);
            response.body.should.have.property(constConfig.Status);
            response.body.Status.should.equal(constConfig.updateDone);
            response.should.be.json;
            done();
            }) 
        
        }
    );

    it('should not update the device record successfully',function(done){
        chai.request(serverLocalHost)
        .put('/device')
        .send({
            NAME_COL:DEVICE_NAME,
            ID:"1"
        })
        .end(function(err,response){
            response.should.have.status(400);
            response.body.should.have.property(constConfig.Status);
            response.body.Status.should.equal(constConfig.updateError);
            response.should.be.json;
            done();
            }) 
        
        }
    );

    it('should delete the device record',function(done){
        chai.request(serverLocalHost)
        .delete('/device')
        .send({
            ID:"3"
        })
        .end(function(err,response){
            response.should.have.status(200);
            response.body.should.have.property(constConfig.Status);
            response.body.Status.should.equal(constConfig.deleteDone);
            response.should.be.json;
            done();
            }) 
        
        }
    );
    it('should not delete the device record',function(done){
        chai.request(serverLocalHost)
        .delete('/device')
        .send({
            NAME_COL:DEVICE_NAME
        })
        .end(function(err,response){
            response.should.have.status(500);
            response.body.should.have.property(constConfig.Status);
            response.body.Status.should.equal(constConfig.deleteError);
            response.should.be.json;
            done();
            }) 
        
        }
    );
});


