var readModule = require('./6module.js')

var directory = process.argv[2]
var extension = process.argv[3]

readModule(directory, extension , function (err, list){
 if (err)
   return console.error("error!", err)

  list.forEach(function(file) {
    console.log(file)
  })
})
