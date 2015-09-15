// nodeschool tutorial for promises -  15-9-15
// exercise 4 - demonstrates that resoltion 

'use strict';
var q = require('q');
var deferred = q.defer();

deferred.promise.then(console.log,  null);  // (resolution, rejected, progress)
deferred.resolve("SECOND");  // Your script will pass and show you that despite the promise being resolved synchronously, the provided function is not executed until the next turn of the event loop.

console.log("FIRST")
