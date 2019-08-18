// https://api.giphy.com/v1/gifs/search?api_key=r6l75necy0Mhmqy1JXEB4GyuXgI8BC66&q=abc&limit=25&offset=0&rating=G&lang=en


var apiStart = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "api_key=r6l75necy0Mhmqy1JXEB4GyuXgI8BC66";
var query = "&q=github";
var apiEnd = "&limit=25&offset=0&rating=G&lang=en";


function setup() {
    //createCanvas(400, 400);
    noCanvas();
    var url = apiStart + apiKey + query + apiEnd;
    loadJSON(url, gotData);
}

function gotData(giffy) {
    //console.log(giffy.data[0].images.original.url);
    //for (var i = 0; giffy.data.length; i++) {
    createImg(giffy.data[0].images.original.url);
    //}
}

function draw() {

}
