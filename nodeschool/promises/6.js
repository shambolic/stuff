/* nodeschool tutorial for promises -  17-9-15
exercise 6 - error handling
*/
'use strict';
var q = require('q');
var deferred = q.defer(); // returns a deferred object with a :  promise property, and methods for resolve, reject, notify and make NodeResolver.
var jsonInput = process.argv[2];

function parsedPromised(json){
    try {
        var result = JSON.parse(json);
        }   catch (e) {
        deferred.reject(e);
    }
    deferred.resolve(json); // if successful resolve the promise wth the the json results 
    return deferred.promise; // return the promise.
}

parsedPromised(jsonInput)
.then(null,console.log)

/*
1. Build a function called parsePromised that creates a promise,
   performs JSON.parse in a try/catch block, and resolves or rejects
   the promise depending on whether an error is thrown.
   **NOTE** your function should synchronously return the promise!
2. Build a sequence of steps like the ones shown above that catches
   any thrown errors and logs them to the console.

*/