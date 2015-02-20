// code to capture url datastreams asynchronously
// see other attempts  9_2 and 9_3.  i think i was failing here, because i didn't ensapsualte the print and the get functions separately.    first get and then print.  (though it's stil not completely obvious)


var http = require('http')
var bl = require('bl')
var urls = process.argv.slice(2,5), count = 0, results = []

function printResults () {
  for (var i=0; i < 3; i++) {
    console.log(results[i]) 
 }
}

function httpGet(index) {
  http.get(urls[index], function callback(response) {
    response.pipe(bl(function(err, data) {
      if (err) 
        console.log("error " + err)
     results[index] = data.toString()
     count ++
 
     if (count == 3) {
     printResults()
        }   
    }))
  })
}

for (var j=0; j< urls.length; j++) {
  httpGet(j)
}
