

// function main() {
//
// }
//
//
// window.onload = function() {
//       main();
// }



window.onload = function() {
  var terugGaan = document.getElementById('terugGaan');
  terugGaan.onclick = function(){
       console.log("Ga terug");
       window.history.back();
  }

  if (window.location.href === "http://localhost:5000/404") {

  }
  if (window.location.href === "http://localhost:5000/aanmelden") {

  }
  if (window.location.href === "http://localhost:5000/halteZoeken") {
        navigator.geolocation.getCurrentPosition(function(location) {
             var lat = location.coords.latitude;
             var lng = location.coords.longitude;
             console.log([lat, lng]);
             document.getElementById('lat').value = lat;
             document.getElementById('lng').value = lng;
        });
  }
  if (window.location.href === "http://localhost:5000/halteZoekenResultaat") {

  }
  if (window.location.href === "http://localhost:5000/index") {

  }
  if (window.location.href === "http://localhost:5000/registreren") {

  }
  if (window.location.href === "http://localhost:5000/routePlannen") {
        function locatieOpvragen() {
            	document.getElementById("routesKnop").onclick = function() {
            		var startPoint = document.getElementById("startPoint").value;
              	var endPoint = document.getElementById("endPoint").value;
            		// console.log("Gevonden locaties voor " + startPoint);
            		// console.log("Gevonden locaties voor " + endPoint);
            		addressToLocation(startPoint, endPoint, searchLocations);

            	}
              function searchLocations(locations) {
              	if(locations && locations.length) {
              		console.log("Aantal locaties: " + locations.length);
              		var numOfLocations = locations.length;
              		for(var i=0; i<numOfLocations; i++) {
              			coordinatenTeruggevenStartPoint("<p>" + locations[i].textStartPoint + "<br>" + locations[i].location.lat() + ", " + locations[i].location.lng() + "</p>");
              			coordinatenTeruggevenEndPoint("<p>" + locations[i].textEndPoint + "<br>" + locations[i].location.lat() + ", " + locations[i].location.lng() + "</p>");
              		}
              	} else {
              		coordinatenTeruggevenStartPoint("Geen locatie gevonden");
                	coordinatenTeruggevenEndPoint("Geen locatie gevonden");
              	}
              }
              function addressToLocation(startPoint, endPoint, callback) {
              	var geocoderStartPoint = new google.maps.Geocoder();
                var geocoderEndPoint = new google.maps.Geocoder();
                geocoderStartPoint.geocode({
                  address: startPoint},
              		function(resultsStartPoint, status) {
              			var resultLocationsStartPoint = [];
              			if(status == google.maps.GeocoderStatus.OK) {
              				if(resultsStartPoint) {
              					var numOfResultsStartPoint = resultsStartPoint.length;
              					for(var i=0; i<numOfResultsStartPoint; i++) {
              						var resultStartPoint = resultsStartPoint[i];
              						resultLocationsStartPoint.push({
              								textStartPoint:resultStartPoint.formatted_address,
              								addressStrStartPoint:resultStartPoint.formatted_address,
              								location:resultStartPoint.geometry.location
              						});
              					};
              				}
              			} else if(status == google.maps.GeocoderStatus.ZERO_RESULTS) {
              				console.log('Adres niet gevonden');
              			}

                    var startLat = resultStartPoint.geometry.location.lat();
                    var startLng = resultStartPoint.geometry.location.lng();
                    var teruggevenLatLngStartPoint = [startLat, startLng];

                    document.getElementById('startLat').value = startLat;
                    document.getElementById('startLng').value = startLng;

                    // console.log(startLat);
                    // console.log(startLng);

              			if (resultLocationsStartPoint.length > 1) {
              				coordinatenTeruggevenStartPoint("<p>Specifieer je zoekwaarde</p>");
              			} else if (resultLocationsStartPoint.length === 1) {
                      callback(resultLocationsStartPoint);
                      console.log(teruggevenLatLngStartPoint);
              			} else {
              				callback(null);
              			}
                  }
                );
                geocoderEndPoint.geocode({
                  address: endPoint},
                  function(resultsEndPoint, status) {
                    var resultLocationsEndPoint = [];
                    if(status == google.maps.GeocoderStatus.OK) {
                      if(resultsEndPoint) {
                        var numOfResultsEndPoint = resultsEndPoint.length;
                        for(var j=0; j<numOfResultsEndPoint; j++) {
                          var resultEndPoint = resultsEndPoint[j];
                          resultLocationsEndPoint.push({
                              textEndPoint:resultEndPoint.formatted_address,
                              addressStrEndPoint:resultEndPoint.formatted_address,
                              location:resultEndPoint.geometry.location
                          });
                        };
                      }
                    } else if(status == google.maps.GeocoderStatus.ZERO_RESULTS) {
                      console.log('Adres niet gevonden');
                    }

                    var endLat = resultEndPoint.geometry.location.lat();
                    var endLng = resultEndPoint.geometry.location.lng();
                    var teruggevenLatLngEndPoint = [endLat, endLng];

                    document.getElementById('endLat').value = endLat;
                    document.getElementById('endLng').value = endLng;

                    // console.log(endLat);
                    // console.log(endLng);

                    if (resultLocationsEndPoint.length > 1) {
                      coordinatenTeruggevenEndPoint("<p>Specifieer je zoekwaarde</p>");
                    } else if (resultLocationsEndPoint.length === 1) {
                      callback(resultLocationsEndPoint);
                      console.log(teruggevenLatLngEndPoint);
                    } else {
                      callback(null);
                    }
                  }
                );

              }
              function coordinatenTeruggevenStartPoint(str) {
              	var coordinatenLatLngStartPoint = document.getElementById("coordinatenLatLngStartPoint");
              	coordinatenLatLngStartPoint.innerHTML = "";
              	coordinatenLatLngStartPoint.innerHTML = coordinatenLatLngStartPoint.innerHTML + "<br />" + str;
                console.log(coordinatenLatLngStartPoint);
              }
              function coordinatenTeruggevenEndPoint(str) {
              	var coordinatenLatLngEndPoint = document.getElementById("coordinatenLatLngEndPoint");
              	coordinatenLatLngEndPoint.innerHTML = "";
              	coordinatenLatLngEndPoint.innerHTML = coordinatenLatLngEndPoint.innerHTML + "<br />" + str;
                console.log(coordinatenLatLngEndPoint);
              }
        }

        var formRoutePlannen = document.getElementById('formRoutePlannen');
        formRoutePlannen.onclick = function() {
              locatieOpvragen();
        }

        function vervoersMiddelenChecken() {
              var byBus = document.getElementById('busInput');
              if (byBus.checked === true) {
                    byBus.value = 'on'
              } else {
                    byBus.value = 'of'
              }

              var byTram = document.getElementById('tramInput');
              if (byTram.checked === true) {
                    byTram.value = 'on'
              } else {
                    byTram.value = 'of'
              }

              var byMetro = document.getElementById('metroInput');
              if (byMetro.checked === true) {
                    byMetro.value = 'on'
              } else {
                    byMetro.value = 'of'
              }

              var byTrain = document.getElementById('treinInput');
              if (byTrain.checked === true) {
                    byTrain.value = 'on'
              } else {
                    byTrain.value = 'of'
              }

              var byBelbus = document.getElementById('belbusInput');
              if (byBelbus.checked === true) {
                    byBelbus.value = 'on'
              } else {
                    byBelbus.value = 'of'
              }
        }
  }
  if (window.location.href === "http://localhost:5000/routePlannenResultaat") {

  }
  if (window.location.href === "http://localhost:5000/startscherm") {

  }
  if (window.location.href === "http://localhost:5000/verkooppuntZoeken") {

  }
  if (window.location.href === "http://localhost:5000/verkooppuntZoekenResultaat") {

  }
}
