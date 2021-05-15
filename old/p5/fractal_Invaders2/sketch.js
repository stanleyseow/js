// Fractal Invaders
// Code by Stanley Seow
// Inspired by Jared Tarbell's program "Fractal Invaders", 2004

var pxSize = 3; // resolution of each Invader (in pixels)
var invSize = 5; // must be an odd number!
var halfAxis = (invSize - 1) / 2; // fixes a middle vertical simmetry

var size;
var speed;
var y = 0;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  frameRate(1);
}

function draw() {
  let offset = width / 2;

  clear();
  background(255);
  size = 4;

  for (let x = 10; x < 200; x += 20) {
    for (let y = 10; y < 100; y += 20) {
      push();
      scale(size);
      translate(x, y);
      let r = random(0, 255);
      let g = random(0, 255);
      let b = random(0, 255);
      stroke(r, g, b);
      //fill(r, g, b);
      fill(0);
      genInvaders();
      pop();
    }
  }

  //noLoop();
}

function genInvaders() {
  for (var xx = halfAxis * pxSize; xx >= 0; xx -= pxSize) {
    for (var yy = 0; yy < invSize * pxSize; yy += pxSize) {
      var n = parseInt(random(0, 10));
      //console.log('n = ' + n);
      //console.log('xx yy = ' + xx + ',' + yy);

      if (n % 2 == 0) {
       //fill(0);

        rect(xx, yy, pxSize, pxSize);
        if (xx !== parseInt(halfAxis * pxSize)) {
          rect(2 * halfAxis * pxSize - xx, yy, pxSize, pxSize);
        }
      }
    }
  }
}
