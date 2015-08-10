var net = require('net')
var port = process.argv[2]

var server = net.createServer (function (socket) {

// socket.write("welcome to " + socket.remoteAddress + "\n")
 socket.end(now())

function now() {
var now = new Date()
var hours, day
	if (now.getHours() < 10) {
	  hours = "0" + now.getHours()
	   } else { 
	  hours = now.getHours()
	   } 
	if (now.getDate() < 10) {
	  day = "0" + now.getDate()
	   }  else {
	  day  = now.getDate()
	   }

var outputDate = now.getFullYear() + "-" + now.getMonth()+1 + "-" + day + " " + hours  + ":" + now.getMinutes()

return outputDate + "\n"
}

  })
server.listen(port)
