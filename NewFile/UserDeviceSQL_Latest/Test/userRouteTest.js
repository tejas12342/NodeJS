// var routeAPI=require('./../Routes');
var chai =require('chai'), chaiHttp=require('chai-http');
var should=chai.should();
chai.use(chaiHttp);
chai.use(require('chai-things'));
var constConfig=require('./../constConfig');
const serverLocalHost='http://127.0.0.1:8082';
const USER_NAME="Chagan";
const NAME_COL="Name";
const USER_ADDRESS="Address";
const ID="ID";

describe('Routes Testing', function(){
    it('Test case1-->Should fetch the records of user with the defined property',(done)=>{
        chai.request(serverLocalHost)
        .get('/user/')
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

    it('should insert the user record successfully with appropriate parameter',(done)=>{
        chai.request(serverLocalHost)
        .post('/user')
        .send({
            NAME_COL:USER_NAME,
            USER_ADDRESS:"IAE"
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

    it('should not insert the user record successfully with inappropriate parameter',(done)=>{
        chai.request(serverLocalHost)
        .post('/user')
        .send({
            NAME_COL:USER_NAME
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

    it('should update the user record successfully',(done)=>{
        chai.request(serverLocalHost)
        .put('/user')
        .send({
            NAME_COL:USER_NAME,
            USER_ADDRESS:"USA",
            ID:1
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

    it('should not update the user record successfully',(done)=>{
        chai.request(serverLocalHost)
        .put('/user')
        .send({
            NAME_COL:USER_NAME,
            ID:1
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

    it('should delete the user record',(done)=>{
        chai.request(serverLocalHost)
        .delete('/user')
        .send({
            ID:3
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
    it('should not delete the user record',(done)=>{
        chai.request(serverLocalHost)
        .delete('/user')
        .send({
            NAME_COL:USER_NAME
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


