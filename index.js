/*
 anytime you see "<%= param_name %>", it is supposed to be a string formatting operation!
 javascript does not natively support it, but templating engines exist.
 for this example, I'm using underscore because i loooooooove it (underscorejs.org)
 I'm also using jQuery to handle the ajax request
 but you may always brute-force it, ie: 
 var template = "?lat=" + lat + "&long=" + lon
*/


//EXPRESS STUFF:
//use express to passing params from front end to server side.
//in our case:
// /location/:lat/:long

//options (frontend) to get the lats and longs:
//have things go into diff elements
//string parsing 

//to initiate using express:
var request = require('sync-request');
var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();

var server = app.listen(3000, function() {
	console.log("listening!");
});

//look at this folder to sserver html page, look at these folders!
//get lat and long directed to the route, pseudo code below:
// app.get('/location/:lat/:lon/', function(req, res) {
// 	thelat = req.params.lat;
// 	thelon = req.params.lon;
// 	getLatLonFromWeDoIt(thelat, thelon)
// 	res.end();
// })


// make a button to request/produce an action to send results to API
//compare resultes to api 

var thelat;
var thelong;
var firstname;


app.use(express.static(path.join(__dirname, './public')));
//server route
//jquery button clicks above, check when the button is clicked, get element by id and  a
//pass as params (lat and long)
app.get('/location', function(req, res) {
	console.log(req.query);
	console.log(req.query);
	
	thelat = req.query.lat;
	thelong = req.query.long;
	

	// res.render('http://openstates.org/api/v1/legislators/geo/');
	
	var legislator_res = getLegislatorFromLatLong(thelat, thelong);
	console.info(legislator_res);
	// console.log(legislator_res);

	var firstLastArr = legislator_res.map(function(obj){
		res.send(obj['full_name']);
		// return obj['full_name'];
	});

	console.log(firstLastArr);

	//res.render("http://openstates.org/api/v1/legislators/geo/?lat=" + thelat + "&long=" + thelong + "&apikey=" + apikey);
	res.end();
	console.log("Lat: ", thelat);
	console.log("Long: ", thelong);
	console.log("name: ", firstname);
});

app.get('/location1', function(req, res) {
	console.log(req.query);
	console.log(req.query);
	
	thelat = req.query.lat;
	thelong = req.query.long;
	

	// res.render('http://openstates.org/api/v1/legislators/geo/');
	
	var legislator_res = getLegislatorFromLatLong(thelat, thelong);
	console.info(legislator_res);
	// console.log(legislator_res);

	var firstLastArr = legislator_res.map(function(obj){
		res.send(obj['email']);
		// return obj['full_name'];
	});

	console.log(firstLastArr);

	//res.render("http://openstates.org/api/v1/legislators/geo/?lat=" + thelat + "&long=" + thelong + "&apikey=" + apikey);
	res.end();
	console.log("Lat: ", thelat);
	console.log("Long: ", thelong);
	console.log("name: ", firstname);
});

app.get('/location2', function(req, res) {
	console.log(req.query);
	console.log(req.query);
	
	thelat = req.query.lat;
	thelong = req.query.long;
	

	// res.render('http://openstates.org/api/v1/legislators/geo/');
	
	var legislator_res = getLegislatorFromLatLong(thelat, thelong);
	console.info(legislator_res);
	// console.log(legislator_res);

	var firstLastArr = legislator_res.map(function(obj){
		res.send(obj['district']);
		// return obj['full_name'];
	});

	console.log(firstLastArr);

	//res.render("http://openstates.org/api/v1/legislators/geo/?lat=" + thelat + "&long=" + thelong + "&apikey=" + apikey);
	res.end();
	console.log("Lat: ", thelat);
	console.log("Long: ", thelong);
	console.log("name: ", firstname);
});

var osm_lookup = "http://nominatim.openstreetmap.org/search?format=json&limit=1&q=<%= address %>";
//var sunlight_lookup = "http://openstates.org/api/v1/legislators/geo/?lat=<%= latitude %>&long=<%= longitude %>&2d32628ae2794d2e991a85b0574adfdc=<%= 2d32628ae2794d2e991a85b0574adfdc %>";
var sunlight_lookup = "http://openstates.org/api/v1/legislators/geo/";

function buildResultForUser() {
	// THIS IS YOUR PRIMARY FUNCTION!
	// How do you combine the data from our two APIs together to show a result for the user
//function getLatLonFromWeDoIt();



}

function doAjaxSyncronousRequest(url_template, params) {
	console.log(url_template, params);
	var r = request('GET', url_template, { qs : params });
	console.log(r);

	return JSON.parse(r.getBody('utf8'));

	/*
	return $.ajax({
		async : false,
		dataType : "json",
		url : _.template(url_template, params)
	});
	*/
}

function getLatLonFromAddress(address) {
	// use OpenStreetMaps API
	// OSM requires spaces to be replaced by '+'

	var params = {
		address : address.replace(/ /g, '+')
	};

	return doAjaxSyncronousRequest(osm_lookup, params);

}

function getLatLonFromWeDoIt(latitude, longitude){
	// var params = {
	// 	latitude: latitude,
	// 	longitude: longitude
	// };

}

function getLegislatorFromLatLong(latitude, longitude) {
	// use Sunlight FDN API key
	var apikey = "2d32628ae2794d2e991a85b0574adfdc";

	var params = {
		lat : latitude, 
		long : longitude,
		apikey : apikey
		
		
	};

	return doAjaxSyncronousRequest(sunlight_lookup, params);
};




