var fs = require('fs');
var file = process.argv[2];

fs.readFile(file, function callback (err, data) {
  lines  = data.toString().split('\n').length-1;
 console.log(lines);
});


