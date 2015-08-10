var http = require('http')
var bl = require('bl')
var urls = process.argv.slice(2,5) , results = [], count = 0 

for (var i = 0; i < urls.length; i++ ) {
  http.get(urls[i], function callback(response) {
    response.pipe(bl(function(err, data) {

      if (err) 
	return console.log(err)

     results[i] = data.toString()
     //console.log("pushed data for count "+ i + "========\n"  + results[i] + "\n*******\n")
    count ++ 
    if (count == 3) {
      console.log(results)
      //console.log(results0[1])
      //console.log(results[2])
       }
    }))
  })
}

