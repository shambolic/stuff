// 11-9-15 - expressworks exercise 8
//  return a hash of an id passed in as a parameter
var fs= require('fs')
var express = require('express');

var port = process.argv[2];
var file = process.argv[3];
var app  = express();
var contents;

fs.readFile(file, function (err, data){
        if (err) throw err;
        contents = data.toString();
            });

app.get('/books', function(req, res) {   
      var json = JSON.parse(contents)
      res.json(json);
});

app.listen(port);