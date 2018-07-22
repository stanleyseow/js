numPoints = 500;
function setup() {
  createCanvas(400, 400);
  stroke(200);
  strokeWeight(3);
}

function draw() {
  background(0);
  noSmooth();
  for (var i = 0; i < numPoints; i++) {
    x = random(50, width - 50);
    y = random(50, height - 50);
    stroke(random(0, 255), random(0, 255), random(0, 255));
    point(x, y);
  }
}