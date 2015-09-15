/* nodeschool tutorial for promises -  15-9-15

task:
 Use the popular "Q" library to create a promise.
 Pass console.log to the "then" method of your promise.
 Manually resolve that promise using setTimeout with a delay of 300ms and pass it a parameter of "RESOLVED!".
 In Q, promises are created using Q.defer()
 The defer that is created is not exactly the promise and in order to return the actual
 promise object itself you must return the "promise" attribute of the newly created defer.
*/

'use strict';
var q = require('q');

var deferred = q.defer();

deferred.promise.then(console.log); //  the deferred function is the promise attribute of 'deferred'
setTimeout(deferred.resolve, 300, "RESOLVED!") // set timeout is called with 3 arguments:   (callback, delay, arguments to the callback).  

/*  example chain
Q.fcall(promisedStep1)
.then(promisedStep2)
.then(promisedStep3)
.then(promisedStep4)
.then(function (value4) {
    // Do something with value4
})
.catch(function (error) {
    // Handle any error from all above steps
})
.done();
*/