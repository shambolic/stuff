// expressworks tutorial #3
//
var express = require('express');
var app = express();

var directory = process.argv[3];

app.set('view engine', 'jade');
app.set('views', directory);

app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()});  // populates the variable in the template
});
app.listen(process.argv[2]);