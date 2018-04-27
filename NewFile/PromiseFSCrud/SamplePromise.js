function getSum(n1, n2) {   
    varisAnyNegative = function() {   
       return n1 < 0 || n2 < 0;   
    }   
    var promise = new Promise(function(resolve, reject) {   
       if (isAnyNegative()) {   
          reject(Error("Negatives not supported"));   
       }   
       resolve(n1 + n2)
    });   
    return promise;   
 } 