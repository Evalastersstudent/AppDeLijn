// window.onload = function() {
//
// 	// adding events
// 	document.getElementById("routesKnop").onclick = function() {
// 		var adres = document.getElementById("startPoint").value;
// 		console.log("Gevonden locaties voor " + adres);
// 		addressToLocation(adres, searchLocations);
// 	}
//
// }
//
// // processing the results
// function searchLocations(locations) {
// 	if(locations && locations.length) {
// 		console.log("Aantal locaties: " + locations.length);
// 		var numOfLocations = locations.length;
// 		for(var i=0; i<numOfLocations; i++) {
// 			coordinatenTeruggeven("<p>" + locations[i].text + "<br>" + locations[i].location.toString() + "</p>");
// 		}
// 	} else {
// 		coordinatenTeruggeven("Geen locatie gevonden");
// 	}
// }
//
// // converting the address's string to a google.maps.LatLng object
// function addressToLocation(adres, callback) {
// 	var geocoder = new google.maps.Geocoder();
// 	geocoder.geocode(
// 		{ address: adres},
// 		function(results, status) {
// 			var resultLocations = [];
// 			if(status == google.maps.GeocoderStatus.OK) {
// 				if(results) {
// 					var numOfResults = results.length;
// 					for(var i=0; i<numOfResults; i++) {
// 						var result = results[i];
// 						resultLocations.push(
// 							{
// 								text:result.formatted_address,
// 								addressStr:result.formatted_address,
// 								location:result.geometry.location
// 							}
// 						);
// 					};
// 				}
// 			} else if(status == google.maps.GeocoderStatus.ZERO_RESULTS) {
// 				console.log('Adres niet gevonden');
// 			}
// 			var lat = resultLocations[0].location.lat.toString();
// 			console.log(lat);
//
// 			if (resultLocations.length > 1) {
// 				coordinatenTeruggeven("<p>Specifieer je zoekwaarde</p>");
// 			} else if (resultLocations.length === 1) {
//         callback(resultLocations);
// 			} else {
// 				callback(null);
// 			}
// 		}
// 	);
// }
//
// // debugging
// function coordinatenTeruggeven(str) {
// 	var coordinatenLatLng = document.getElementById("coordinatenLatLng");
// 	coordinatenLatLng.innerHTML = "";
// 	coordinatenLatLng.innerHTML = coordinatenLatLng.innerHTML + "<br />" + str;
// }
