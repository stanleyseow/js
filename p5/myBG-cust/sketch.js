// This sketch cities from csv and plot to Google Maps API
// Use both p5.js and Google JS API
// position
// title = market title when hover on top

// Create an Google API key at 
// https://console.developers.google.com/apis/dashboard?project=winged-precept-206116&supportedpurview=project&duration=PT1H

var map2;
var data;
var sales;
let custObj = {};
const farm = {
    lat: 3.215484622983702,
    lng: 101.75364073732851
};

function preload() {
   var url  = "https://stanleyseow.github.io/js/p5/myBG-cust/data.json";

   loadJSON(url, custData);
}

function setup() {

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

        const loc1 = {
            lat : custObj[i].latitude,
            lng : custObj[i].longitude
        }
    
        const linePath = [
            farm,   
            loc1
        ]
        addLine(linePath, map2);

    }
    const image =
    "https://stanleyseow.github.io/js/p5/myBG-cust/favicon.png";
    const marker = new google.maps.Marker({
        position: farm,
        map: map2,
        icon: image
      });

}

function draw() {}

function addCircle(location, map) {
    const circle = new google.maps.Circle({
        position: location,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        center: location,
        radius: Math.sqrt(sales) * 100
    });

    circle.setMap(map)
}

function addLine(linePath, map) {
    const lines = new google.maps.Polygon({
        paths: linePath,
        strokeColor: "#0000ff",
        strokeOpacity: 0.2,
        strokeWeight: 1,
      });

      lines.setMap(map);


}



function initMap() {
    map2 = new google.maps.Map(document.getElementById('map22'), {
        center: {
            lat: 3.139003,
            lng: 101.68685499999992
        },
        //mapTypeId: 'satellite',
        zoom: 11
    });
}

function custData(data) {
    // Put data in object
    custObj = data;
    //console.log(custObj);
  }
  