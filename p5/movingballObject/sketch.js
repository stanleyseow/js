var ballArray = [];
var xPosArray = [];
var yPosArray = [];
var numBalls = 30;

function setup() {
  createCanvas(800, 400);
  frameRate(30);
  for (let i = 0; i < numBalls; i++) {
    ballArray[i] = new Ball(random(50, width-50), random(50, height-50));
  }
}

function draw() {
  background(10);

  for (let i = 0; i < numBalls; i++) {
    ballArray[i].draw();
    ballArray[i].move();
    ballArray[i].hitWall();
    // Save x & y into array
     xPosArray[i] = ballArray[i].x;
     yPosArray[i] = ballArray[i].y;
  }

  
  for (let i = 0; i < numBalls; i++) {
    for (let k = 0; k < numBalls; k++) {
      // Check for collision
      // Except for itself
     if ( xPosArray[i] === ballArray[i].x  && yPosArray[i] === ballArray[i].y  ) {
       // no nohting
     } else {
       if (
        dist(ballArray[i].x, ballArray[i].y, xPosArray[k], yPosArray[k]) >
        ballArray[i].size 
      ) { 
            ballArray[i].hitBall();
        }  
     }  
    }
  }
  
} // end of draw()

// ball object function
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.size = 20;
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

  this.hitBall = function() {
    this.xspeed = this.xspeed * -1;
    this.yspeed = this.yspeed * -1;
  };

  this.hitWall = function() {
    // check if hit the side walls
    if (this.x > width || this.x < 0) {
      this.xspeed = this.xspeed * -1;
      //console.log('xpeed =' + this.xspeed)
    }

    // check if hit the top/bottom walls
    if (this.y > height || this.y < 0) {
      this.yspeed = this.yspeed * -1;
      //console.log('yspeed =' + this.yspeed)
    }
  };
} // end of Ball()
