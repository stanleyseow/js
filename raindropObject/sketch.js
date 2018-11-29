// an array of objects
var raindrops = [];
var numOfDrops = 500;

function setup() {
  createCanvas(800, 800);

  // Create raindrops into array
  for (var i = 0; i < numOfDrops; i++) {
    raindrops[i] = new Raindrop();
  }
}

function draw() {
  background(0);

  // Loop all the raindrop object one by one
  for (var i = 0; i < numOfDrops; i++) {
    raindrops[i].fall();
    raindrops[i].show();
    
    // If reached bottom, reset y and restart raindrops
    if (raindrops[i].reachedBottom()) {
      raindrops[i].y = -100;
    }
  }
}

// Raindrop Class
function Raindrop() {
  this.x = random(0,1000);
  this.y = random(-600, -100);

  this.size = random(1, 1);

  this.speed = random(1, 5);
  this.gravity = random(1, 3);
  this.len = random(1, 10);

  // this function makes the raindrop fall
  this.fall = function() {
    this.y += this.speed;
    this.y += this.gravity;
  };

  // This function display the raindrop
  this.show = function() {
    strokeWeight(this.size);
    stroke(255, 255, 255);
    line(this.x, this.y, this.x, this.y + this.len);
    
  };

  // this function check of raindrop reached the bottom
  this.reachedBottom = function() {
    if (this.y > height) {
      return true;
    } else {
      return false;
    }
  };
}
