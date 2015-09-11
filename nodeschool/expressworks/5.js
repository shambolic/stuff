// expressworks tutorial 5 - css
// 13-8-15

var express = require('express');
// var stylus = require('stylus');
var app = express();

var port = process.argv[2];
// app.use(express.static(process.argv[3]));  // NB: needs to be a directory
//
app.set('view engine', 'jade');
app.set('views', process.argv[3]);


app.use(require('stylus').middleware(process.argv[3] + '/public'));
// app.use(stylus.middleware(
//     {  src: process.argv[3] ,
//     dest: process.argv[3],
//     complile: compile
//     }
//     ));
    
    function compile(str, path){
        return stylus(str).set()
      
    } 
    app.get('/', index.html) ;
    
//      function(req, res) {
//     // if (!req.body) return res.sendStatus(400);
//     // res.send('this is working');
//     res.send('index.html');
//    // res.send(req.body.str.split('').reverse().join(''));
// });
app.listen(process.argv[2]);



