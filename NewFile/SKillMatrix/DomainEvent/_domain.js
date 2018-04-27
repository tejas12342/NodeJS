var EventEmitter = require("events").EventEmitter;
var domain = require("domain");

var emitter = new EventEmitter();

// Create a domain
var domain1 = domain.create();

domain1.on('error', function(err){
   console.log("domain1 handled this error ("+err.message+")");
});

// Explicit binding 
domain1.add(emitter);

emitter.on('error',function(err){
   console.log("listener handled this error ("+err.message+")");
});

emitter.emit('error',new Error('To be handled by listener'));

emitter.removeAllListeners('error');

emitter.emit('error',new Error('To be handled by domain1'));

var domain2 = domain.create();

domain2.on('error', function(err){
   console.log("domain2 handled this error ("+err.message+")");
});

// Implicit binding
domain2.run(function(){
   var emitter2 = new EventEmitter();
   emitter2.emit('error',new Error('To be handled by domain2'));   
});


domain1.remove(emitter);
emitter.emit('error', new Error('Converted to exception. System will crash!'));