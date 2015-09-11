// 11-9-15 - expressworks exercise 7
//  return a hash of an id passed in as a parameter

var express = require('express');
// var  crypto = requir
var port = process.argv[2];
var app  = express();

app.get('/search', function(req, res) {
        // var params = req.query
        var param = req.query
        res.send(param)
})

app.listen(port);