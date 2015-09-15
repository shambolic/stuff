// nodeschool tutorial for promises -  15-9-15

// Create a function to print error.message using console.log.  Pass this
// function as a rejection handler to the "then" method of your promise.
//
// Manually reject that promise using setTimeout with a delay of 300ms and pass it
// an Error object with parameter "REJECTED!";
    
'use strict';
var q = require('q');
var deferred = q.defer();

function printError(err) {
    console.log(err.message);  // message property of error. other properties include stack, arguments, type, message, whichi the parameter.
}

deferred.promise.then(null, printError);  // remember:  promise.then(onFulfilled, onRejected, onProgress)
setTimeout(deferred.reject, 300, new Error("REJECTED!") ); // setTimeout(callback, delay, callbackArgs[])
