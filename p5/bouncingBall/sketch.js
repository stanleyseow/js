/* jslint esversion: 6 */

//var ball1 = new Ball(50, 50);
//var ball2 = new Ball(300, 300);

var ballArray = [];
var numBalls = 10;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  for (let i = 0; i < numBalls; i++) {
    ballArray[i] = new Ball(random(50, 400), random(50, 350));
  }
}

function draw() {
  background(10);

  drawBox();

  for (let i = 0; i < numBalls; i++) {
    ballArray[i].draw();
    ballArray[i].move();
    ballArray[i].hitWall();
  }
} // end of draw()

function drawBox() {
  // draw the 4 walls
  stroke("green");
  strokeWeight(10);
  line(0, 0, width, 0);
  line(0, 0, 0, height);
  line(width, 0, width, height);
  line(0, height, 400, height);
}

// ball object function
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.size = 40;
  this.r = random(1, 255);
  this.g = random(1, 255);
  this.b = random(1, 255);
  this.xspeed = random(5, 10);
  this.yspeed = random(-10, -5);

  this.draw = function() {
    strokeWeight(2);
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    stroke(this.r, this.g, this.b);
    line(width/2,height/2,this.x, this.y);
  };

  this.move = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  };

  this.showXY = function() {
    stroke(255);
    fill(255);
    strokeWeight(1);
    textSize(20);
    text("x= " + this.x + " y= " + this.y, 10, 360);
    text("x= " + this.xspeed + " y= " + this.yspeed, 10, 380);
  };

  this.hitWall = function() {
    // check if hit the side walls
    if (this.x > width || this.x < 0) {
      this.xspeed = this.xspeed * -1;
      //console.log('xpeed =' + this.xspeed)

      // this.r = 0;
      // this.g = 255;
      // this.b = 0;

      // Visually display wall
      // line(width, 0, width, height);
      // line(0, 0, 0, height);
    }

    // check if hit the top/bottom walls
    if (this.y > height || this.y < 0) {
      this.yspeed = this.yspeed * -1;
      //console.log('yspeed =' + this.yspeed)
      // this.r = 0;
      // this.g = 255;
      // this.b = 255;
      // Visually display wall
      // line(0, 0, width, 0);
      // line(0, height, 400, height);
    }
  };
} // end of Ball()
