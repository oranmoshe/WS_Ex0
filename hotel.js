
'use strict'

var EventEmitter = require('events');
var eventsConfig = require('./config').events;
var moment = require('moment');

module.exports = class Hotel extends EventEmitter{
	constructor(name, type){
		super();
		this.name = name;
		this.type = type;
		this.stars = 0;
		this.startVotes = 0;
		this.likes = 0;
		this.reviews = new Array();
		this.log = new Array();
	}

	like(){
		this.likes++;
		this.emit(eventsConfig.PRINT,"Like");
		this.logEvent("Like");
	}

	dislike(){
		if(this.likes>0){
			this.likes--;
			this.emit(eventsConfig.PRINT,"Dislike");
			this.logEvent("Dislike");
		}
		else{
			this.emit(eventsConfig.ERROR,"Dislike");
			this.logEvent("Error: dislike");
		}
	}

	rate(start){
		var sum = this.startVotes * this.stars;
		sum += start;
		this.startVotes++;
		this.stars = sum/this.startVotes;
		this.emit(eventsConfig.PRINT,"Stars");
		this.logEvent("Stars");
	}

	addReview(review){
		this.reviews.push(review);
		this.emit(eventsConfig.PRINT,"Add review");
		this.logEvent("Add review");
	}

	removeReview(index){
		if(index < this.reviews.length){
			this.reviews.splice(index,1);
			this.emit(eventsConfig.PRINT,"Remove review");
			this.logEvent("Remove review");
		}
		else{
			this.emit(eventsConfig.ERROR,"Error: remove review");
			this.logEvent("Error: remove review");
		}
	}

	logEvent(type){
		var messages = new Array();
		messages.push(`\n ${moment().format()}`);
		messages.push(`Action: ${type}`);
		messages.push(`Name: ${this.name} - ${this.type}`);
		messages.push(`Likes:  ${this.likes}`);
		messages.push(`Stars:  ${this.stars}`);
		messages.push(`Reviews:  ${this.reviews}`);
		this.log.push(messages);
		console.log(messages);
	}
}
