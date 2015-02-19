// var socket = new WebSocket('ws://careers.immerselearning.com', []
var WebSocket = require('ws')
var ws = new WebSocket('ws://localhost:8000')

ws.on('open', function open () {
	var array = new Float32Array(5)
	
	for (var i = 0; i < array.length; i++) {
		array [i] = i / 2;
	}
	console.log(array)
	ws.send(array, {binary: true, mask: true})
})

