// This sketch load 5 images based on number pressed
// on the keyboard, 1-5

var start;
var image1;
var image2;
var image3;
var image4;
var image5;


var state = 0;
var typed = "";

function preload() {
    start = loadImage("start.jpg");
    image1 = loadImage("1.jpg");
    image2 = loadImage("2.jpg");
    image3 = loadImage("3.jpg");
    image4 = loadImage("4.jpg");
    image5 = loadImage("5.jpg");
}

function setup() {
    createCanvas(800, 600);
    textFont("Helvetica");
    textSize(22);

}

function draw() {

    background(255);
    if (state == 0) {
        image(start, 0, 0);
    } else if (state == 1) {
        image(image1, 0, 0);
    } else if (state == 2) {
        image(image2, 0, 0);
    } else if (state == 3) {
        image(image3, 0, 0);
    } else if (state == 4) {
        image(image4, 0, 0);
    } else if (state == 5) {
        image(image5, 0, 0);
    }

    // display whatever was keyed in
    text(typed, 0, 0, width - 20, height - 20);

}

function keyTyped() {

    typed += key;

    if (key == '0') {
        state = 0;
    } else if (key == '1') {
        state = 1;
    } else if (key == '2') {
        state = 2;
    } else if (key == '3') {
        state = 3;
    } else if (key == '4') {
        state = 4;
    } else if (key == '5') {
        state = 5;
    } else {

    }
}
