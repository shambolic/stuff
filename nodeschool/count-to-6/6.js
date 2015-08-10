module.exports = function average (...args) {
	var sum = 0;
	args.forEach(function (value){
		sum += value;
	});
	var av = sum/args.length
	return av	
 }

// here's the arrow way of doing it
//  module.exports = (...args) => {
//        var sum = args.reduce((soFar, value) => soFar + value, 0);
//        return sum / args.length;
//    };
