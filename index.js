'use strict'

// Set moduls
var spa = require('./hotel');
var moment = require('moment');
var EventEmitter = require('events');
var eventsConfig = require('./config').events;
var http = require('http'),
	express = require('express');




// Server resonse
var app = express();
app.get('/', function(req,res){

	var spaLovers = new spa('Lovers','Spa');// Create Hotel insctance
	var log = new Array();

	// Set print event listener
	spaLovers.on(eventsConfig.PRINT, function (data){
		console.log(data);
	});

	// Set Error event listener
	spaLovers.on(eventsConfig.ERROR, function (data){
		console.log(data);
	});

	// Play some functions
	spaLovers.like(); // increments like 
	spaLovers.dislike();
	spaLovers.addReview("Nice Spa <3 ");
	spaLovers.addReview("Stupid Spa ! ! ! ");
	spaLovers.removeReview(1);
	spaLovers.removeReview(1); // simulates an error (out of index)
	spaLovers.rate(5);
	spaLovers.rate(3);
	spaLovers.rate(1);

	res.send(spaLovers.log);
});
http.createServer(app).listen(8080);

