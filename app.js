var express = require("express");
var request = require('request');
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))

app.get("/404", function(req, res) {
  res.render("404");
});

app.get("/aanmelden", function(req, res) {
  res.render("aanmelden");
});

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/halteZoeken", function(req, res) {
  var haltesInDeBuurt;

  var lat = req.body.lat;
  var lng = req.body.lng;
  var coorX = 0;
  var coorY = 0;
  var radius = 300;
  // omrekenen
  request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + lat + '/' + lng, function (error, response, body) {
      if (body === '') {
            response = undefined;
      } else {
            // Attempt the parse. If it fails, a parse error should be delivered to the user.
            response = body.replace(XSSI_PREFIX, '');
            try {
                  response = JSON.parse(body);
            }
            catch (error) {
                  // Even though the response status was 2xx, this is still an error.
                  ok = false;
                  // The parse error contains the text of the body that failed to parse.
                  response = ({ error: error, text: body });
            }
      }

      console.log(response);

      //console.log(response.xCoordinaat);
      coorX = body.xCoordinaat;
      coorY = body.yCoordinaat;

      console.log("x:"+coorX, "y:"+coorY);


      request('https://www.delijn.be/rise-api-core/haltes/indebuurt/' + coorX + '/' + coorY + '/' + radius, function (error, response, body) {
            // console.log('Status:', response.statusCode);
            // console.log('Headers:', JSON.stringify(response.headers));
            //console.log('Response:', body);
            halteInDeBuurt = body;

            //console.log(halteInDeBuurt);
            res.render("halteZoeken", {
                  content: body
            });
       });
  });
});
app.post("/halteZoekenResultaat", function(req, res) {
  var inDeBuurt;

  var lng = req.body.lng;
  var lat = req.body.lat;
  var coorX = 0;
  var coorY = 0;
  var radius = 300;

  console.log("lng:"+ lng);
  console.log("lat:"+lat);
  // omrekenen
  request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + lat + '/' + lng, function (error, response, body) {

       var body = JSON.parse(body);
       coorX = body.xCoordinaat;
       coorY = body.yCoordinaat;

       console.log("2: x:", coorX, "y:", coorY);


       request('https://www.delijn.be/rise-api-core/haltes/indebuurt/' + coorX + '/' + coorY + '/' + radius, function (error, response, body) {
            // console.log('Status:', response.statusCode);
            // console.log('Headers:', JSON.stringify(response.headers));
            //console.log('Response:', body);
            inDeBuurt = body;

            console.log(inDeBuurt);

            res.render('halteZoekenResultaat', {
                 content: inDeBuurt
            });
       });
  });
});

app.get("/registreren", function(req, res) {
  res.render("registreren");
});

app.get("/routePlannen", function(req, res) {
  res.render("routePlannen");
});
app.post("/routePlannenResultaat", function(req, res) {
      var startPoint = req.body.startPoint;
      var startLat = req.body.startLat;
      var startLng = req.body.startLng;
      var startX = "";
      var startY = "";

      var endPoint = req.body.endPoint;
      var endLat = req.body.endLat;
      var endLng = req.body.endLng;
      var endX = "";
      var endY = "";

      var date = req.body.date.split("-").reverse().join("-");
      var time = req.body.time;

      console.log("1:", date);

      var arrivalDeparture = req.body.arrivalDeparture;

      var byBus = req.body.byBus;
      var byTram = req.body.byTram;
      var byMetro = req.body.byMetro;
      var byTrain = req.body.byTrain;
      var byBelbus = req.body.byBelbus;

      console.log("2:", startPoint, endPoint, startX, startY, endX, endY, date, time, arrivalDeparture, byBus, byTram, byMetro, byTrain, byBelbus);

      request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + endLat + '/' + endLng, function (error, response, body) {
           var response = JSON.parse(body);
           console.log("3:", response);

           endX = response.xCoordinaat;
           endY = response.yCoordinaat;

           console.log("4:", endX, endY);
           console.log("h:", startPoint, endPoint, startX, startY, endX, endY, date, time, arrivalDeparture, byBus, byTram, byMetro, byTrain, byBelbus);
      });

      request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + startLat + '/' + startLng, function (error, response, body) {
           var response = JSON.parse(body);
           console.log("i:", response);

           startX = response.xCoordinaat;
           startY = response.yCoordinaat;

           console.log("e:", startX, startY);
           console.log("j:", startPoint, endPoint, startX, startY, endX, endY, date, time, arrivalDeparture, byBus, byTram, byMetro, byTrain, byBelbus);

            request('https://www.delijn.be/rise-api-core/reisadvies/routes/' + startPoint + '/' + endPoint + '/' + startX + '/' + startY + '/' + endX + '/' + endY + '/'+ date + '/' + time + '/' + arrivalDeparture + '/' + byBus + '/' + byTram + '/' + byMetro + '/' + byTrain + '/' + byBelbus + '/nl' , function(error,response, data)  {


                  var body = JSON.parse(data);

                  //console.log("data:"+body);
                  var gevondenRoute="";
                  for (var j =0; j < body.reiswegen.length; j++) {

                        var reisTijd = body.reiswegen[j].duration;
                        var vertrekTijd = body.reiswegen[j].startTime;
                        var aankomstTijd = body.reiswegen[j].endTime;
                        gevondenRoute =gevondenRoute + '<p class="gevondenRouteClass">Vertrekuur: ' + vertrekTijd + '<br>Aankomstuur: ' + aankomstTijd + '<br>Reistijd: ' + reisTijd + '</p>';
                        console.log("5:", reisTijd+vertrekTijd+aankomstTijd);
                  };

                  // var gevondenRoute = body;

                  console.log("6:", body);
                  console.log("7:", reisTijd, vertrekTijd, aankomstTijd);
                  console.log("8:"+gevondenRoute);
                  res.render("routePlannenResultaat", {
                    content: gevondenRoute,
                    startPoint: startPoint,
                    endPoint: endPoint,
                    date: date
                  });
            });
      });
});

app.get("/startscherm", function(req, res) {
  res.render("startscherm");
});

app.get("/verkooppuntZoeken", function(req, res) {
  res.render("verkooppuntZoeken");
});
app.post("/verkooppuntZoekenResultaat", function(req, res) {
  var stad = req.body.stad;

  request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + stad, function (error, response, body) {
    var body = JSON.parse(body);
    console.log(body);

    if (stad === null) {
      '<p> Er zijn geen verkooppunten gevonden in de gemeente ' + stad + '</p>';
    } else {
      '<h2> Verkooppunten in ' + stad + '</h2>';
      var cont="";
      for (var i = 0; i < body.length; i++) {
          var gemeenteVerkooppunt = body[i].gemeente;
          var naamVerkooppunt = body[i].naam;
          var adresVerkooppunt = body[i].adresString;
          cont=cont+'<p class="gevondenVerkooppuntenClass">' + naamVerkooppunt + '<br>' + adresVerkooppunt + '</p>';
      }
    }
    res.render("verkooppuntZoekenResultaat", {
      content:cont,
      stad:stad
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
