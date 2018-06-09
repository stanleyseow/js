// This sketch cities from csv and plot to Google Maps API
// Use both p5.js and Google JS API
// position
// title = market title when hover on top

// Create an Google API key at 
// https://console.developers.google.com/apis/dashboard?project=winged-precept-206116&supportedpurview=project&duration=PT1H


//var cities;
var map2;
var city;
var state;
var pop;


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
        pop = cities.getNum(i, "pop");

        var pos = {
            lat: latitude,
            lng: longitude
        };
        // Call google addMarket functions
        addCircle(pos, map2);
    }
}

function draw() {}

function addCircle(location, map) {
    var circle = new google.maps.Circle({
        position: location,
        map: map2,

        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        center: location,
        radius: Math.sqrt(pop) * 50

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
