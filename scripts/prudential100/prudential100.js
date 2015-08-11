//  script for mick to scrape the prudentail site
//  10-8-15

var cheerio = require('cheerio');
var request = require('request');
var converter = require('json-2-csv');
var q = require('q');

var baseURL = 'http://results.prudentialridelondon.co.uk/2015/';
var gender = process.argv[2] || "";
var results = process.argv[3] || 100;

// console.log("Name, Number, Age Group, Distance, Time")
var getPage = function(stem) {

	request(baseURL + stem, function(err, resp, html) // promise Q.request().then.parsedResults.push() ?
		{
			if (err) return console.log("error is: " + err);
			var $ = cheerio.load(html);
			var parsedResults = [];
			$('tbody').children().each(function(i, element) {
				var anchor = $(this).children().first();
				var number = anchor.text();
				var Name = anchor.next().text().replace(/» /g, "");
				var AG = anchor.next().next().text();
				var distance = anchor.next().next().next().next().text();
				var time = anchor.siblings().eq(10).text();

				var metadata = {
					name: Name,
					number: parseInt(number),
					group: parseInt(AG),
					distance: distance,
					time: time
				};

				parsedResults.push(metadata);
				console.log(Name + "," + number + ", " + AG + "," + distance + "," + time);
			});
			// console.log(parsedResults)
			// return parsedResults
		});
};

function getAllPages() {
	for (i = 1; i < 207; ++i) {
		var s = "?page=" + i + "&num_results=100&pid=search&search[sex]=M%25&search[nation]=%25&search_sort=name";
		// console.log(s)
		getPage(s);
	};
};

function convertCSV(json) {
	var json2csvCallback = function(err, csv) {
		if (err) console.log("error" + err);
		console.log(csv)
	};
	converter.json2csv(json, json2csvCallback);
};

getAllPages();

// Promise chain: 	 Q
//				  	.then(getAllPages)
// 			 	  	.then(convertCSV){
// 						})
// 					.catch(){
//						})
// 					.done();

// console.log(results);
