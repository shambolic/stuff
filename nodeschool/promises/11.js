// tutorial 11.  12-10-15
'use strict';
var qhttp = require('q-io/http')
var URL = "http://jsonplaceholder.typicode.com/posts"
var URL2 = "http://localhost:7000"

  
qhttp.read(URL2)   //returns a promise.  after which, then. can use the results
.then(function (id){  // trying to understand how i can just get the id key from the session response? possibly something they don't explain properly. i guess gets passed the response object and can grab the id property
  return qhttp.read("http://localhost:7001/"+ id)
})
.then(function(json) {
  console.log(JSON.parse(json))
})
.then(null, console.error)
.done();

// returns values from arbitrary json online.
//   var jsonData = (JSON.parse(json));
//   for (var i = 0; i < jsonData.length; i++) {
//     console.log (jsonData[i].title)
//   }
// })
// .then(null, console.error)
// .done();
/*
Task
Let's talk to two remote processes over HTTP being run by your friend
and mine, "localhost"

Port 7000: Faux session cache (redis or some such thing) 
Port 7001: Faux database (mongo, level, postgres etc)

As in the previous lesson, use the "q-io" module to create promises
as wrappers for HTTP responses.  HINT: You will probably need more than
one promise...

1. Send an HTTP GET request to the session cache on port 7000.  A JSON payload
   will be returned to you containing a primary key called "id".  
2. Grab that id from the session response and send an HTTP GET request to 
   your database on port 7001 to the url "localhost:70001/<id>".
3. If successfully done, your database will return a user object.  console.log 
   it to win many nerd-points.

Hint
Don't forget that q-io's read method returns a buffer.  You will need to convert
it to a string and JSON.parse it to complete this lesson!
*/