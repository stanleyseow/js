// Rainbow Meteora 
// control s for trial length

var drops = [];
var raindropSize = 3;
var droplets = 100;
var maxDrops = 150;
var thue;
var flig = 0;
var thickness = 21;
var tx;
var ty = 10;
var loc = 0;
var direct = -1;
var trail = 0.05;
var fade = 1;
var ms;
var distancy;
var mob = 0;
var xp = 1;
var yp = 1;
var value;

function setup() {
  //smooth();
  noStroke();
  colorMode(HSB, 360, 100, 50, 1);
  createCanvas(window.innerWidth, window.innerHeight);
  if (window.innerWidth < 800) mob = 1;
  if (mob == 1) droplets = droplets / 15;
  tx = random(-3, 3);

  for (var i = 0; i < droplets; i++) {
    var x = round(random(width / raindropSize) * raindropSize);
    var y =
      round(random(height / raindropSize)) * raindropSize - window.innerHeight;
    var r = raindropSize;
    var h = map(x, 0, width, 0, 360); //(0, 360);
    var s = random(1, 5); //trail = random(0.26, .7);
    thue = h;

    distancey = random(1, window.innerHeight);
    tswell = distancey / window.innerHeight * 25 * s / 2;
    drops[i] = new RainDrop(x, y, r, h, s, tswell, distancey);
  }
}

function draw() {
  var spot = 0;
  var lig = random(0, 5);
  //if (lig > 4.9) {
  //  flig = 50;
  //  thickness = round(random(1, 19));
  //lightening();}
  background(200, 100, flig, trail);
  flig -= 15;
  for (var i = 0; i < droplets; i++) {
    drops[i].move();
    drops[i].display();
  }
  //}
}
function RainDrop(
  tempX,
  tempY,
  tempDiameter,
  tempHue,
  tempSpeed,
  tswell,
  tdistance
) {
  colorMode(HSB, 360, 100, 50, 1);
  this.x = tempX;
  this.loc = tempX;
  this.y = tempY;
  this.spot = 0;
  this.diameter = tempDiameter;
  this.h = tempHue;
  this.s = tempSpeed;
  this.swell = tswell;
  this.distancey = tdistance;
  this.move = function() {
    //var ty = this.s;
    this.x += tx * raindropSize;
    if (this.y < tdistance) this.y += tempSpeed;
    if (this.x > width) {
      this.loc = this.x;
      this.x = this.x - window.innerWidth;
      
    }
    
    if (this.x < -20) {
      this.x = width;
    }
    
    // fill(255);
    // text(this.y, 100, 100);
    // noFill();}
    
    if (this.y > tdistance) {
      this.y = tdistance - raindropSize;
      //this.spot = 1;
      this.x -= tx * raindropSize;

      var fd = this.swell / tswell;
      this.swell -= 5;
    }
    
    if (this.swell < 4) {
      this.swell = tswell;
      this.y = random(-window.innerHeight, 0);
      this.spot = 0;
      this.distancey = tdistance;
    }
      this.f += 2;
      //this.y -= (tempSpeed);


    //round(random(height / raindropSize)) * (raindropSize - height);

    this.display = function() {
      if (this.spot == 0) {
        noStroke();
        fill(tempHue, 100, 50, fd);
        ellipse(this.x, this.y, raindropSize * 5, raindropSize * 5); //this.diameter);
      }
    };
  };
}

