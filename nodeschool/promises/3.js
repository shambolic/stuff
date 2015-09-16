// nodeschool tutorial for promises -  15-9-15
// exercise 3

'use strict';
var q = require('q');
var deferred = q.defer();


deferred.promise.then(console.log, console.log, null);
deferred.resolve("I FIRED");  // 
deferred.reject(null, "I DID NOT FIRE"); // will not fire, as the promise can only be invoked once

