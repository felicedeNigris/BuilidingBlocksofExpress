/* jshint -W097,-W033,-W117,-W119,-W104 */
'use strict'

const express = require('express')

const app = express()

const logger = require('./logger')
app.use(logger)

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules'))

var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

app.param('name', function(request,response,next){
  request.cityName = parseCityName(request.params.name)
  next();
});

app.get('/cities/:name', function (request, response) {
  var cityInfo = cities[request.cityName]
  if(cityInfo) {
    response.json(cityInfo)
  } else {
    response.status(404).json("City not found")
  }
});

function parseCityName(name){
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase()
  return parsedName;
}

app.param('year', function(request, response, next) {
  if(isYearFormat(request.params.year)) {
    next();
  } else {
    response.status(400).json('Invalid Format for Year');
  }
});

var citiesYear = {
  5000: 'Lotopia',
  5100: 'Caspiana',
  5105: 'Indigo',
  6000: 'Paradise',
  7000: 'Flotilla'
};

function isYearFormat(value) {
  var regexp = RegExp(/^d{4}$/);
  return regexp.test(value);
}

app.get('/cities/year/:year', function(request, response) {
  var year = request.params.year;
  var city = citiesYear[year];

  if(!city) {
    response.status(404).json("No City found for given year");
  } else {
    response.json("In " + year + ", " + city + " is created.");
  }

});

app.listen(2000)
