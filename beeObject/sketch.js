var img;

function preload() {
  img = loadImage('bee.jpg');
}

var bee1 = new Bee2(0, 0, 1);
var bee2 = new Bee2(100, 100, 2);
var bee3 = new Bee2(200, 200, 3);

function setup() {
  createCanvas(800, 800);
  frameRate(5);
}

function draw() {
  background(255);
  bee1.move();
  bee1.display();

  bee2.move();
  bee2.display();

  //bee3.move();
  //bee3.display();
}

// Object constructor , blueprint of a house
function Bee2(x, y, size) {
  this.x = x; // property of x
  this.y = y; // property of y

  // move methods
  this.move = function() {
    this.x = x + random(100, 400);
    this.y = y + random(100, 400);
  };

  // display methods

  this.display = function() {
    //var scale = map(this.size,50,50,50*this.size,50*this.size);
    image(img, this.x, this.y, 50 * size, 50 * size);
  };
}
