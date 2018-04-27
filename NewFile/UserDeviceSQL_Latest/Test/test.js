var server= require('./../SQLServer');
var chai =require('chai'), chaiHttp=require('chai-http');
var should=chai.should();
var serverLocalHost='http://127.0.0.1:8082';
chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Rest API test case',function(){
    describe('Server Test case',function(){
        it('Test case1-->Server should be started',function(done){
            chai.request(serverLocalHost)
            .get('/')
            .end(function(err,response){
                console.log(response.body);
                response.should.have.status(200);
                response.body.should.have.property("Status");
                response.body.Status.should.equal("Server successfully started");
                response.should.be.json;
                done();
                }) 
            
            }
        );
            
    })
    require('./deviceRouteTest');
    require('./userRouteTest');

    
})

