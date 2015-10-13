/* nodeschool tutorial for promises -  98-10-15
exercise   - fetch json over http */

'use strict';
var http = require ('q-io/http')
  , URL ="http://localhost:1337";

http.read(URL)
.then(function (json){
console.log(JSON.parse(json))
})
.then(null, console.error) // rejection handler
.done();

/*
Fetch JSON from "http://localhost:1337" and console.log it.
There are several things you will want to know:
1. q-io's http module has a "read" method which returns a promise for the content
   of a successful (status 200) http request.
2. Parse the returned JSON and console.log it for much win.

This challenge is a bit tricky but the implementation is relatively straightforward.
If you get stuck, refer to the q-io documentation for clarification.

*/