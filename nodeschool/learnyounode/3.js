// program to read a file from the filesystem and output number of lines
var fs = require('fs');
var file = process.argv[2];

var str = fs.readFileSync(file).toString();
var array = str.split('\n');
console.log(array.length-1);
