var inputs = process.argv.slice(2);

var result = inputs.map(
	x => x.charAt(0)
	// function(x){
	// return x.charAt(0)
	// }
).reduce(
	(a,b) => a.concat(b)
	// function(a,b){
	// return a.concat(b)
	});
console.log(`[${inputs}] becomes "${result}"`)