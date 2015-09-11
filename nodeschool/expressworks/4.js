// expressworks tutorial 4 - forms
// 13-8-15

// middleware definition:  Simply put, a middleware is a function invoked by Express.js before your own
// request handler.

// DOESNT WORK -- issues with body parser version

var express = require('express');
var bodyParser = require('body-parser');  // To parse x-www-form-urlencoded request bodies Express.js can use urlencoded()
                                          // middleware from the body-parser module.
var port = process.argv[2];
var app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.post('/form', bodyParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    res.send(req.body);
   // res.send(req.body.str.split('').reverse().join(''));
});
app.listen(process.argv[2]);



curl -X POST -d "<form><input name="jay was here"/></form>" localhost:8082/from