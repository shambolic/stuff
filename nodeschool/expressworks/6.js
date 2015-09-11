// 9-9-15 - expressworks exercise 6
//  return a hash of an id passed in as a parameter

var express = require('express');
// var  crypto = requir
var port = process.argv[2];
var app  = express();

app.get('/', function(req, res) {
		res.end("Hello World!")
})

app.put('/message/:id', function(req, res) { // colon designates a variable
    var hash = require('crypto')
    .createHash('sha1')
    .update(new Date().toDateString() + req.params.id)
    .digest('hex');

    res.end(hash);  // parameter is stored in req.params.VAR    
    // res.end("hash is" hash + "\n");  // parameter is stored in req.params.VAR
    
})
app.listen(port);