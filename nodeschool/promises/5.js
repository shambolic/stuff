// nodeschool tutorial for promises -  15-9-15
// exercise 4 - demonstrates that resoltion 

'use strict';
var q = require('q');
var deferred = q.defer();

function attachTitle(name){
    return "DR. " + name;
}

deferred.promise
.then(attachTitle)
.then(console.log);

deferred.resolve("MANHATTAN");
