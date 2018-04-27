const dns =require('dns');


//lookup display the address and the family of the given DNS
console.log(dns.lookup('google.com', function(err,address,family){
    console.log('address %s and family IPV%s',address,family);
    
}));

// lookupService display the service running on the give port
console.log(dns.lookupService('127.0.0.1',22, function(err,hostname,service){
    console.log('hostname %s and service %s',hostname,service);
}));


dns.resolve('google.com', function(err,address){
    console.log(`address`);
    console.log(address);
})