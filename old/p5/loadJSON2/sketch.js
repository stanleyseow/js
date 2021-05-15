
var URL = "http://219.92.246.129:1880/api/"
var score;

function preload() {
      loadJSON(URL, getData, errData);
}

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(0);
    fill(255)
    textSize(30);
    text(score,100,100);

}

function getData(data) {
  console.log(data.score);
  score = data.score
}

function errData(err) {
  console.log(err);
}
