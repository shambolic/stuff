/* nodeschool tutorial for promises -  15-9-15
exercise 5 - demonstrates that resolution
1. Construct a promise using Q's defer
2. Construct a function "attachTitle" which prepends "DR. " to 
   its first argument and returns the result.
3. Build a promise chain off the promise we constructed initially
   that first calls "attachTitle" then calls console.log.
4. Resolve the promise you created with a value of "MANHATTAN".
If your program runs successfully, it should print out "DR. MANHATTAN"
*/ 
'use strict';
var q = require('q');
var deferred = q.defer();

function attachTitle(name){
    return "DR. " + name;
}

deferred.promise 
.then(attachTitle) // use .then when you're going to do something with the result.
.then(console.log); // value

deferred.resolve("MANHATTAN"); // (fulfillment handler, rejection handler)

/*Do I HAVE to return promises??

NO!  Fulfillment handlers may return promises OR values.  Your Promises/A+ library will do the correct thing and wrap your return value in a promise if need be.  This is awesome because it allows you to intermix values with promises in a chain.

Imagine that you have a a cache of models that may already contain a model you would like to request from the server.  You could check your cache synchronously and return the found value OR send an ajax request to your remote server to fetch it.  

Wrapping this functionality in a promise means that both behaviors
can be consumed under a single abstraction: 

    doSomeSetup()
    .then(function () {
      return cache.fetchModel(id) 
        ? cache.fetchModel(id)
        : promisedAjax("users/" + id);
    })
    .then(displayUser)
    .then(null, handleError);

The key thing to understand here is that your handlers will WRAP your return values in promises even if they are obtained synchronously. Another very important point to understand is that, as discussed 
before, the returned value will resolve on the NEXT turn of the event loop.
*/
