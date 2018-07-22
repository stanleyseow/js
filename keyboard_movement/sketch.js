// This sketch control a square using keyboard arrows

var x = 200;
var y = 200;
var s = 10;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  fill(200);
  rect(x, y, 20, 20);
  console.log("x,y = " + x + "," + y);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    y = y - s;
  } else if (keyCode === DOWN_ARROW) {
    y = y + s;
  } else if (keyCode === LEFT_ARROW) {
    x = x - s;
  } else if (keyCode === RIGHT_ARROW) {
    x = x + s;
  }
}
