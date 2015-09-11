// "use strict";
var express = require('express');
var port = process.argv[2];
var directory = process.argv[3] ;

var app = express();

app.use(express.static(directory));  // NB: needs to be a directory
app.use(function(err,req,res,next){
    console.error(err.stack);
});
app.listen(port);   