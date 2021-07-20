// This sketch cities from csv and plot to Google Maps API
// Use both p5.js and Google JS API
// position
// title = market title when hover on top

// Create an Google API key at 
// https://console.developers.google.com/apis/dashboard?project=winged-precept-206116&supportedpurview=project&duration=PT1H


//var cities;
var map2;
var data;
var sales;
let custObj = {};

function preload() {
   var url  = "https://stanleyseow.github.io/js/p5/myBG-cust/data.json"
   loadJSON(url, custData);

//    console.log(custData[0].latitude);
//    console.log(custData[0].longitude);
   
   // console.log(custData);

}

function setup() {
    //  createCanvas(1000, 500);
    //  background(0);

    // Init Google Maps
    initMap();

    for (var i = 0; i < custObj.length; i++) {
        var latitude = custObj[i].latitude;
        var longitude = custObj[i].longitude;
        sales = custObj[i].total_price;

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
        radius: Math.sqrt(sales) * 80

    });
}


function initMap() {
    map2 = new google.maps.Map(document.getElementById('map22'), {
        center: {
            lat: 3.139003,
            lng: 101.68685499999992
        },
        //    center: {lat: 3.139003, lng: 101.68685499999992},
        zoom: 11
    });
}

function custData(data) {
    console.log(data);

    custObj = data;

    // custObject = {
    //   name: d.name,
    //   city: d.city,
    //   total_price: d.total_price,
    //   latitude: d.latitude,
    //   longitude: d.longitude
    // });

    console.log(custObj.length);

  }
  