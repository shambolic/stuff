/* nodeschool tutorial for promises -  17-9-15
exercise 8  - throwing exceptions in the promise chain
*/
'use strict';
var q = require('q');

function throwMyGod (){
    throw new Error("OH NOES");     // i had return in here at first, which didn't cause the the chain to 
};                                  // break, but it lost the value of arg.  if you THROW an error you exit the chain

function iterate (arg){
    console.log(arg);
    return ++arg;
};

q.fcall(iterate, 1)
.then(iterate)  // functions don't need parentheses when called from promises, as the argument is passed down from
.then(iterate)
.then(iterate)
.then(iterate)
.then(throwMyGod)
.then(iterate)
.then(iterate)
.then(iterate)
.then(iterate)
.then(iterate)
.then(null, console.log);  //this is the rejection handler. always takes the pattern (null, error).  resembles a catch block as in this pattern
/*try {
  doStuff()
  doMoreStuff()
} catch (err) {
  complainAboutJavascript(err);
}


1. Create a function "throwMyGod" that throws an Error with 
   text "OH NOES"
2. Create a function "iterate" that prints the first argument 
   (an integer) to it and then returns that argument + 1;
3. Create a promise chain that wraps your iterate method using Q's
   fcall then a series of iterations that attempts to perform iterate
   10 times.  
4. Attach console.log as a rejection handler at the bottom of your
   chain.
5. Insert a call to "throwMyGod" after your 5th call of "iterate"

If you have done this correctly, your code should print 1,2,3,4,5, 
"[Error: OH NOES]".  It's important to notice that the thrown exception was 
turned into a rejected promise which caused the rejected promise to 
travel down the promise chain to the first available rejection handler.

Bonus

Try swapping your rejection handler from console.log to throwMyGod.
Your program will now throw an exception in the global context!  Ahh!
Try to fix this using the approach described above.

*/