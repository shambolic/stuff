//  script for mick to scrape the prudentail 100 site
//  10-8-15

var cheerio = require('cheerio');
var request = require('request');
var converter = require('json-2-csv');
var q = require('q');
// var fs = require('fs');

var baseURL = 'http://results.prudentialridelondon.co.uk/2015/';
var gender = process.argv[2] || "";
var results = process.argv[3] || 100;
var parsedResults = [];

// console.log("Name, Number, Age Group, Distance, Time")
var getPage = function (stem) {
    "use strict";
    var deferred = q.defer();

    request(baseURL + stem, function (err, resp, html) {
        if (err) return console.log("error is: " + err);
			var $ = cheerio.load(html);
			$('tbody').children().each(function(i, element) {
				var anchor = $(this).children().first();
				var number = anchor.text();
				var Name = anchor.next().text().replace(/» /g, "").replace(/,/g,"");
				var AG = anchor.next().next().text();
				var DA = anchor.next().next().next().next();
                var distance = DA.text();
                var split1 = DA.next().text();
                var split2 = DA.next().next().text();
                var split3 = DA.next().next().next().text();
                var split4 = DA.next().next().next().next().text();
                var split5 = DA.next().next().next().next().next().text();
                var split6 = DA.next().next().next().next().next().next().text();
				var time = anchor.siblings().eq(10).text();

				var metadata = {
					name: Name,
					number: parseInt(number),
					group: parseInt(AG),
					distance: distance,
                    "17 Miles": split1,
                    "26 Miles": split2,
                    "47 Miles": split3,
                    "55 Miles": split4,
                    "75 Miles": split5,
                    "85 Miles": split6,
					"Finishing Time": time
				};

				parsedResults.push(metadata);
				//console.log(Name + "," + number + ", " + AG + "," + distance + "," + time);
				deferred.resolve();
			});
		});

	return deferred.promise;
};

function getAllPages() {
	var promises = []; // create an array of promises

	for (i = 1; i < 207; ++i) 
    {
		var s = "?page=" + i + "&num_results=100&pid=search&search[sex]=M%25&search[nation]=%25&search_sort=name";
		// console.log(s)
		promises.push(getPage(s));
	};

	q.all(promises).then(function()
    {
		var json2csvCallback = function(err, csv) 
        {
			if (err) console.log("error" + err);
			console.log(csv)
		};
	converter.json2csv(parsedResults, json2csvCallback);

	});
};

getAllPages();
