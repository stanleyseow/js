// This sketch cities from csv and plot to Google Maps API
// Use both p5.js and Google JS API
// position
// title = market title when hover on top

// Create an Google API key at 
// https://console.developers.google.com/apis/dashboard?project=winged-precept-206116&supportedpurview=project&duration=PT1H


var cities;
var map2;
var city;
var state;


function preload() {
    cities = loadTable("malaysia-cities.csv", "header");
}

function setup() {
    //  createCanvas(1000, 500);
    //  background(0);

    // Init Google Maps
    initMap();

    for (var i = 0; i < cities.getRowCount(); i++) {
        var latitude = cities.getNum(i, "lat");
        var longitude = cities.getNum(i, "lng");
        city = cities.getString(i, "city");
        state = cities.getString(i, "province");
        title = city + ", " + state;

        var pos = {
            lat: latitude,
            lng: longitude
        };
        // Call google addMarket functions
        addMarker(pos, map2);
    }
}

function draw() {}

function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        map: map2,
        title: title
    });
}


function initMap() {
    map2 = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 5.204719,
            lng: 109.136950
        },
        //    center: {lat: 3.139003, lng: 101.68685499999992},
        zoom: 6
    });
}
