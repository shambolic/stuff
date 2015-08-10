// learnyounode http server - exercise 11
var http = require('http')
var fs = require('fs')
var port = process.argv[2]

var server = http.createServer(function (req, res) {
var rstream = fs.createReadStream(process.argv[3])
rstream.pipe(res)
})
server.listen(port)

