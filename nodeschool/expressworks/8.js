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

// ******************Official solution *********************************
// var express = require('express')
//  var app = express()
//  var fs = require('fs')
//
//  app.get('/books', function(req, res){
//    var filename = process.argv[3]
//    fs.readFile(filename, function(e, data) {
//      if (e) return res.sendStatus(500)
//      try {
//        books = JSON.parse(data)
//      } catch (e) {
//        res.sendStatus(500)
//      }
//      res.json(books)
//    })
//  })
//
//  app.listen(process.argv[2])

