// module for reading and filtering files in a directory
var fs = require('fs')
var path = require('path')
module.exports = function (directory, extension, callback) {
  
  fs.readdir (directory, function(err, list) { 

  if (err)
    return callback(err)

//process dir length
    list = list.filter(function (file) {
  return path.extname(file) === '.' + extension
   }) 
callback(null, list)
 })
}
