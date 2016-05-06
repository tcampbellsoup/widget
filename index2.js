//<%== param_name %> is string formatting action
//using underscore.js to help JS support this formatting.
//jQuery is used to handle ajax request but if can be forced
// var template = "?lat=" + lat + "&long=" + lon

//osm API here:
var osm_lookup = "http://nominatim.openstreetmap.org/search?format=json&limit=1&q=<%= address %>";

//sunlight API here:
var sunlight_lookup = "http://openstates.org/api/v1/legislators/geo/?lat=<%= latitude %>&long=<%= longitude %>&apikey=<%= apikey %>";

function buildResultForUser (){
	//the primary function 
	//combine the data from our two API's together to show result
}


function AjaxSynchronousRequest(url_template, params){
	return &.ajax({
		async : false,
		dataType : "json",
		url : _.template(url_template, params)
	});

}

function getLatLanFromAddress(address){
	//uses OpenStreetMaps API
	//in OSM, spaces='+'

	var params = {
		address : address.replace(\ \g, '+')
	};

	return doAjaxSynchronousRequest(osm_lookup, params);
}

function getLegislatorFromLatLong(latitude, longitude){
	//use Sunliight FDN API
	var apikey = "ABC123";

	var params = {
		latitude: latitude,
		longitude: longitude,
		apikey: apikey
	};

	return doAjaxSynchronousRequest(sunlight_lookup, params);
}