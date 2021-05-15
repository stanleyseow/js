var angle;
var scalar;
var numPoints = 10;
function setup() {
  createCanvas(400, 400);
  strokeWeight(10);
  background(0);
}

function draw() {
  //background(0);
  //noSmooth();
  for (var i = 0; i < numPoints; i++) {
    angle = random(0, TWO_PI);
    scalar = random(50,150);
    x = width/2 + (cos(angle) * scalar );
    y = height/2 + (sin(angle) * scalar );

    stroke(random(0, 255), random(0, 255), random(0, 255));
    point(x, y);
  }
}

