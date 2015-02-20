// http json api server - l	earnyounode challnge 13
var http = require('http')
var url = require('url')
var port = process.argv[2]

var server = http.createServer(function(req, res) {
	var reqURL = url.parse(req.url, true)
	var paramDate = new Date(reqURL.query.iso)

	if (reqURL.pathname == "/api/parsetime") {
		var hours = paramDate.getHours()
		var minutes = paramDate.getMinutes()
		var seconds = paramDate.getSeconds()
		var json = JSON.stringify({
			"hour": hours,
			"minute": minutes,
			"second": seconds,
		}, null, " ")

		res.writeHead(200, {
			'Content-Type': 'application/json'
		})
		res.end(json)
	}

	if (reqURL.pathname == "/api/unixtime") {
		var unixtime = JSON.stringify({
			"unixtime": (paramDate).getTime()
		})
		res.writeHead(200, {
			'Content-Type': 'application/json'
		})
		res.end(unixtime)
	}
})

server.listen(port)
