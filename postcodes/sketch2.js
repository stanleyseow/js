// This sketch takes poscode from csv and plot to Google Maps API
// Use both p5.js and Google JS API
// Create an Google API key at 
// https://console.developers.google.com/apis/dashboard?project=winged-precept-206116&supportedpurview=project&duration=PT1H


var cities;
var map;


function preload() {
  cities = loadTable("cities.csv", "header");
}

function setup() {
//  createCanvas(1000, 500);
//  background(0);


  // Init Google Maps
  initMap();

  for (var i = 0; i < cities.getRowCount(); i++) {
    var latitude = cities.getNum(i, "lat");
    var longitude = cities.getNum(i, "lng");

    var pos = { lat: latitude, lng: longitude };
    // Call google addMarket functions
    addMarker(pos, map);

  }


}


function draw() {
 
}


function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    //label: labels[labelIndex++ % labels.length],
    map: map
  });
}


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 3.139003, lng: 101.68685499999992},
    zoom: 8
  });
}


