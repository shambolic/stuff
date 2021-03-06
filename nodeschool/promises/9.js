/* nodeschool tutorial for promises -  8-10-15
exercise   - multiple promises */
'use strict';
var q = require('q')
    ,promise1 = q.defer()
    ,promise2 = q.defer();

function all (promise1, promise2) {
    var internalPromise = q.defer()
    , counter = 0
    , val1
    , val2;
    
    promise1
    .then(function(result) {
        val1 = result;
        ++counter;
        if (counter >= 2) internalPromise.resolve([val1, val2]);
    })
    .then(null, internalPromise.reject)
    .done();
    
    
    promise2
    .then(function(result){
        val2 = result;
        ++counter;
        if (counter>=2){
            internalPromise.resolve([val1, val2]);
        };
    })
    .then(null, internalPromise.reject)
    .done();

    return internalPromise.promise;
}

all(promise1.promise, promise2.promise)
.then(console.log)
.done();

setTimeout(function (){
    promise1.resolve("PROMISES");
    promise2.resolve("FTW");
}, 200);

/* Can you do what async do?

When doing asynchronous programming you will often want to 
perform multiple operations in parallel.  In some cases 
you may wish to delay further processing until a list of 
async operations have completed.

In synchronous code this is trivial because our operations
are executed in the order they are specified:

var thingOne = getThing(1);
var thingTwo = getThing(2);

combine(thingOne, thingTwo);

We would like to build a function such that we can specify a list
of asynchronous values we would like to fetch and then use once all
are available.

getAll([fetch(1), fetch(2)])
.then(function (first, second) {
  console.log(first, second);
});
Task
Let's build this function!

1. Construct two promises using Q's defer
2. Construct a function "all" that accepts two promises as arguments.
   Your function should create an internal promise using Q's defer and return it!
   Your function should create a counter variable with initial value of 0.
   Your function should attach "then" fulfillment handlers to both
   promises which increment an internal counter and fulfill the function's
   internal promise with an array containing BOTH values IF the counter reaches 2.
   You should ALSO attach rejection handlers to both promises which both reject
   the internal promise!
3. Pass your two promises into your new function and then attach console.log as 
   a fulfillment handler to the promise returned by your function.
4. Attach a function to setTimeout that resolves both of the promises you created
   and passed to your function with the values "PROMISES" and "FTW" respectively.
   Set the timeout delay to 200ms.

TIP: Don't forget to pass the "promise" attribute of your deferreds!
     
If your function is successful it should print out ["PROMISES", "FTW"] which is
just someone's opinion man!

Bonus

Try using Q's "all" method to replace your function.  Note that their implementation
expects you to pass it an ARRAY of promises and not individual arguments.

Super Bonus

Try using Q's "spread" method to replace your "then" handler on the promise returned
by "all".  Note that spread will return individual arguments which should affect
your output slightly!

Q.all, .spread, etc are just some of the many promise utility functions that many
promise libraries make available or that you can easily build for yourself.  The 
composability of promises (do to them being re-ified objects) is a huge upside
and you can quickly discover many amazing patterns for building async systems. 
*/