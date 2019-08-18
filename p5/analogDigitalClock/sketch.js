const hPos = [7, 3, 9, 0, 0, 6, 3];
const mPos = [35, 30, 30, 45, 15, 0, 45];

const handPos = [
  // 0 - Blank position: ~7:37
  [7, 35],
  // 1 - Top-left corner: ~3:30
  [3, 30],
  // 2 - Top-right corner: ~9:30
  [9, 30],
  // 3 - Bottom-right corner: ~12:45
  [0, 45],
  // 4 - Bottom-left corner: ~12:15
  [0, 15],
  // 5 - Vertical line: 6:00
  [6, 0],
  // 6 - Horizontal line: ~3:45
  [3, 45]
];

// Use eval() to execute function in content of the array
var numArray = [
  "zero()",
  "one()",
  "two()",
  "three()",
  "four()",
  "five()",
  "six()",
  "seven()",
  "eight()",
  "nine()"
];

var a = 0;

function setup() {
  createCanvas(1020, 300);
  angleMode(DEGREES);
  background(0);
  frameRate(2);
}

function draw() {
  background(0);
  d = new Date();
  var mm = minute();
  var hh = hour();
  var ss = second();
  var ms = millis() / 300;
  var mss = Math.round(millis() / 10);

  // stroke(255);
  // fill(255);
  // textSize(20);
  // text(hh, 20, 20);
  // text(mm, 50, 20);
  // text(ss, 80, 20);

  let h1 = Math.trunc(hh / 10);
  let h2 = hh % 10;

  let m1 = Math.trunc(mm / 10);
  let m2 = mm % 10;

  let s1 = Math.trunc(ss / 10);
  let s2 = ss % 10;

//   text(h1, 20, 40);
//   text(h2, 40, 40);

//   text(m1, 60, 40);
//   text(m2, 80, 40);

//   text(s1, 100, 40);
//   text(s2, 120, 40);
  
  push();
  scale(1.1);
  digitClock(h1,h2,m1,m2,s1,s2,0.3);
  pop()
  
} // end of draw

function digitClock(h1, h2, m1, m2, s1, s2,size) {
  push();
  scale(size);
  
  push();
  translate(0, 0);
  eval(numArray[h1]);
  pop();
  
  push();
  translate(400, 0);
  eval(numArray[h2]);
  pop();
  
  push()
  translate(800, 0);  
  colon();
  pop()
  
  push();
  translate(1000, 0);
  eval(numArray[m1]);
  pop();
  
  push();
  translate(1400, 0);
  eval(numArray[m2]);
  pop();
  
  push()
  translate(1800, 0);  
  colon();
  pop()
  
  push();
  translate(2000, 0);
  eval(numArray[s1]);
  pop();
  
  push();
  translate(2400, 0);
  eval(numArray[s2]);
  pop();
  
  pop();
}

function clockFunction(x, y, h, m) {
  push();
  translate(x, y);
  console.log(h, m);

  //var s2 = map(s, 0, 60, 0, 359);
  var m2 = map(m, 0, 60, 0, 359);
  var h2 = map(h, 0, 12, 0, 359);

  // Ellipse with white band
  var ss = 100;
  var f = 0;

  stroke(128);
  strokeWeight(1);
  fill(f);
  ellipse(0, 0, ss, ss);

  // Hour hand rotate
  push();
  rotate(-90);
  rotate(h2);
  strokeWeight(10);
  stroke(255);
  line(0, 0, ss / 2 - 10, 0);
  pop();

  // Minute hand rotate
  push();
  rotate(-90);
  rotate(m2);
  strokeWeight(10);
  stroke(255);
  line(0, 0, ss / 2 - 10, 0);
  pop();

  pop();
}

function colon() {
  // 2 x 6 box
  clockFunction(200, 200, hPos[0], mPos[0]);
  clockFunction(200, 300, hPos[1], mPos[1]);
  clockFunction(200, 400, hPos[4], mPos[4]);
  clockFunction(200, 500, hPos[1], mPos[1]);
  clockFunction(200, 600, hPos[4], mPos[4]);
  clockFunction(200, 700, hPos[0], mPos[0]);
  
  clockFunction(300, 200, hPos[0], mPos[0]);
  clockFunction(300, 300, hPos[2], mPos[2]);
  clockFunction(300, 400, hPos[3], mPos[3]);
  clockFunction(300, 500, hPos[2], mPos[2]);
  clockFunction(300, 600, hPos[3], mPos[3]);
  clockFunction(300, 700, hPos[0], mPos[0]);
}

function zero() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[6], mPos[6]);
  clockFunction(400, 200, hPos[6], mPos[6]);
  clockFunction(500, 200, hPos[2], mPos[2]);

  clockFunction(200, 300, hPos[5], mPos[5]);
  clockFunction(300, 300, hPos[1], mPos[1]);
  clockFunction(400, 300, hPos[2], mPos[2]);
  clockFunction(500, 300, hPos[5], mPos[5]);

  clockFunction(200, 400, hPos[5], mPos[5]);
  clockFunction(300, 400, hPos[5], mPos[5]);
  clockFunction(400, 400, hPos[5], mPos[5]);
  clockFunction(500, 400, hPos[5], mPos[5]);

  clockFunction(200, 500, hPos[5], mPos[5]);
  clockFunction(300, 500, hPos[5], mPos[5]);
  clockFunction(400, 500, hPos[5], mPos[5]);
  clockFunction(500, 500, hPos[5], mPos[5]);

  clockFunction(200, 600, hPos[5], mPos[5]);
  clockFunction(300, 600, hPos[4], mPos[4]);
  clockFunction(400, 600, hPos[3], mPos[3]);
  clockFunction(500, 600, hPos[5], mPos[5]);

  clockFunction(200, 700, hPos[4], mPos[4]);
  clockFunction(300, 700, hPos[6], mPos[6]);
  clockFunction(400, 700, hPos[6], mPos[6]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

function one() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[6], mPos[6]);
  clockFunction(400, 200, hPos[2], mPos[2]);
  clockFunction(500, 200, hPos[0], mPos[0]);

  clockFunction(200, 300, hPos[4], mPos[4]);
  clockFunction(300, 300, hPos[2], mPos[2]);
  clockFunction(400, 300, hPos[5], mPos[5]);
  clockFunction(500, 300, hPos[0], mPos[0]);

  clockFunction(200, 400, hPos[0], mPos[0]);
  clockFunction(300, 400, hPos[5], mPos[5]);
  clockFunction(400, 400, hPos[5], mPos[5]);
  clockFunction(500, 400, hPos[0], mPos[0]);

  clockFunction(200, 500, hPos[0], mPos[0]);
  clockFunction(300, 500, hPos[5], mPos[5]);
  clockFunction(400, 500, hPos[5], mPos[5]);
  clockFunction(500, 500, hPos[0], mPos[0]);

  clockFunction(200, 600, hPos[1], mPos[1]);
  clockFunction(300, 600, hPos[3], mPos[3]);
  clockFunction(400, 600, hPos[4], mPos[4]);
  clockFunction(500, 600, hPos[2], mPos[2]);

  clockFunction(200, 700, hPos[4], mPos[4]);
  clockFunction(300, 700, hPos[6], mPos[6]);
  clockFunction(400, 700, hPos[6], mPos[6]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

function two() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[6], mPos[6]);
  clockFunction(400, 200, hPos[6], mPos[6]);
  clockFunction(500, 200, hPos[2], mPos[2]);

  clockFunction(200, 300, hPos[4], mPos[4]);
  clockFunction(300, 300, hPos[6], mPos[6]);
  clockFunction(400, 300, hPos[2], mPos[2]);
  clockFunction(500, 300, hPos[5], mPos[5]);

  clockFunction(200, 400, hPos[1], mPos[1]);
  clockFunction(300, 400, hPos[6], mPos[6]);
  clockFunction(400, 400, hPos[3], mPos[3]);
  clockFunction(500, 400, hPos[5], mPos[5]);

  clockFunction(200, 500, hPos[5], mPos[5]);
  clockFunction(300, 500, hPos[1], mPos[1]);
  clockFunction(400, 500, hPos[6], mPos[6]);
  clockFunction(500, 500, hPos[3], mPos[3]);

  clockFunction(200, 600, hPos[5], mPos[5]);
  clockFunction(300, 600, hPos[4], mPos[4]);
  clockFunction(400, 600, hPos[6], mPos[6]);
  clockFunction(500, 600, hPos[2], mPos[2]);

  clockFunction(200, 700, hPos[4], mPos[4]);
  clockFunction(300, 700, hPos[6], mPos[6]);
  clockFunction(400, 700, hPos[6], mPos[6]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

function three() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[6], mPos[6]);
  clockFunction(400, 200, hPos[6], mPos[6]);
  clockFunction(500, 200, hPos[2], mPos[2]);

  clockFunction(200, 300, hPos[4], mPos[4]);
  clockFunction(300, 300, hPos[6], mPos[6]);
  clockFunction(400, 300, hPos[2], mPos[2]);
  clockFunction(500, 300, hPos[5], mPos[5]);

  clockFunction(200, 400, hPos[1], mPos[1]);
  clockFunction(300, 400, hPos[6], mPos[6]);
  clockFunction(400, 400, hPos[3], mPos[3]);
  clockFunction(500, 400, hPos[5], mPos[5]);

  clockFunction(200, 500, hPos[4], mPos[4]);
  clockFunction(300, 500, hPos[6], mPos[6]);
  clockFunction(400, 500, hPos[2], mPos[2]);
  clockFunction(500, 500, hPos[5], mPos[5]);

  clockFunction(200, 600, hPos[1], mPos[1]);
  clockFunction(300, 600, hPos[6], mPos[6]);
  clockFunction(400, 600, hPos[3], mPos[3]);
  clockFunction(500, 600, hPos[5], mPos[5]);

  clockFunction(200, 700, hPos[4], mPos[4]);
  clockFunction(300, 700, hPos[6], mPos[6]);
  clockFunction(400, 700, hPos[6], mPos[6]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

function four() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[2], mPos[2]);
  clockFunction(400, 200, hPos[1], mPos[1]);
  clockFunction(500, 200, hPos[2], mPos[2]);

  clockFunction(200, 300, hPos[5], mPos[5]);
  clockFunction(300, 300, hPos[5], mPos[5]);
  clockFunction(400, 300, hPos[5], mPos[5]);
  clockFunction(500, 300, hPos[5], mPos[5]);

  clockFunction(200, 400, hPos[5], mPos[5]);
  clockFunction(300, 400, hPos[4], mPos[4]);
  clockFunction(400, 400, hPos[3], mPos[3]);
  clockFunction(500, 400, hPos[5], mPos[5]);

  clockFunction(200, 500, hPos[4], mPos[4]);
  clockFunction(300, 500, hPos[6], mPos[6]);
  clockFunction(400, 500, hPos[2], mPos[2]);
  clockFunction(500, 500, hPos[5], mPos[5]);

  clockFunction(200, 600, hPos[0], mPos[0]);
  clockFunction(300, 600, hPos[0], mPos[0]);
  clockFunction(400, 600, hPos[5], mPos[5]);
  clockFunction(500, 600, hPos[5], mPos[5]);

  clockFunction(200, 700, hPos[0], mPos[0]);
  clockFunction(300, 700, hPos[0], mPos[0]);
  clockFunction(400, 700, hPos[4], mPos[4]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

function five() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[6], mPos[6]);
  clockFunction(400, 200, hPos[6], mPos[6]);
  clockFunction(500, 200, hPos[2], mPos[2]);

  clockFunction(200, 300, hPos[5], mPos[5]);
  clockFunction(300, 300, hPos[1], mPos[1]);
  clockFunction(400, 300, hPos[6], mPos[6]);
  clockFunction(500, 300, hPos[3], mPos[3]);

  clockFunction(200, 400, hPos[5], mPos[5]);
  clockFunction(300, 400, hPos[4], mPos[4]);
  clockFunction(400, 400, hPos[6], mPos[6]);
  clockFunction(500, 400, hPos[2], mPos[2]);

  clockFunction(200, 500, hPos[4], mPos[4]);
  clockFunction(300, 500, hPos[6], mPos[6]);
  clockFunction(400, 500, hPos[2], mPos[2]);
  clockFunction(500, 500, hPos[5], mPos[5]);

  clockFunction(200, 600, hPos[1], mPos[1]);
  clockFunction(300, 600, hPos[6], mPos[6]);
  clockFunction(400, 600, hPos[3], mPos[3]);
  clockFunction(500, 600, hPos[5], mPos[5]);

  clockFunction(200, 700, hPos[4], mPos[4]);
  clockFunction(300, 700, hPos[6], mPos[6]);
  clockFunction(400, 700, hPos[6], mPos[6]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

function six() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[6], mPos[6]);
  clockFunction(400, 200, hPos[6], mPos[6]);
  clockFunction(500, 200, hPos[2], mPos[2]);

  clockFunction(200, 300, hPos[5], mPos[5]);
  clockFunction(300, 300, hPos[1], mPos[1]);
  clockFunction(400, 300, hPos[6], mPos[6]);
  clockFunction(500, 300, hPos[3], mPos[3]);

  clockFunction(200, 400, hPos[5], mPos[5]);
  clockFunction(300, 400, hPos[4], mPos[4]);
  clockFunction(400, 400, hPos[6], mPos[6]);
  clockFunction(500, 400, hPos[2], mPos[2]);

  clockFunction(200, 500, hPos[5], mPos[5]);
  clockFunction(300, 500, hPos[1], mPos[1]);
  clockFunction(400, 500, hPos[2], mPos[2]);
  clockFunction(500, 500, hPos[5], mPos[5]);

  clockFunction(200, 600, hPos[5], mPos[5]);
  clockFunction(300, 600, hPos[4], mPos[4]);
  clockFunction(400, 600, hPos[3], mPos[3]);
  clockFunction(500, 600, hPos[5], mPos[5]);

  clockFunction(200, 700, hPos[4], mPos[4]);
  clockFunction(300, 700, hPos[6], mPos[6]);
  clockFunction(400, 700, hPos[6], mPos[6]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

function seven() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[6], mPos[6]);
  clockFunction(400, 200, hPos[6], mPos[6]);
  clockFunction(500, 200, hPos[2], mPos[2]);

  clockFunction(200, 300, hPos[4], mPos[4]);
  clockFunction(300, 300, hPos[6], mPos[6]);
  clockFunction(400, 300, hPos[2], mPos[2]);
  clockFunction(500, 300, hPos[5], mPos[5]);

  clockFunction(200, 400, hPos[0], mPos[0]);
  clockFunction(300, 400, hPos[0], mPos[0]);
  clockFunction(400, 400, hPos[5], mPos[5]);
  clockFunction(500, 400, hPos[5], mPos[5]);

  clockFunction(200, 500, hPos[0], mPos[0]);
  clockFunction(300, 500, hPos[0], mPos[0]);
  clockFunction(400, 500, hPos[5], mPos[5]);
  clockFunction(500, 500, hPos[5], mPos[5]);

  clockFunction(200, 600, hPos[0], mPos[0]);
  clockFunction(300, 600, hPos[0], mPos[0]);
  clockFunction(400, 600, hPos[5], mPos[5]);
  clockFunction(500, 600, hPos[5], mPos[5]);

  clockFunction(200, 700, hPos[0], mPos[0]);
  clockFunction(300, 700, hPos[0], mPos[0]);
  clockFunction(400, 700, hPos[4], mPos[4]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

function eight() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[6], mPos[6]);
  clockFunction(400, 200, hPos[6], mPos[6]);
  clockFunction(500, 200, hPos[2], mPos[2]);

  clockFunction(200, 300, hPos[5], mPos[5]);
  clockFunction(300, 300, hPos[1], mPos[1]);
  clockFunction(400, 300, hPos[2], mPos[2]);
  clockFunction(500, 300, hPos[5], mPos[5]);

  clockFunction(200, 400, hPos[5], mPos[5]);
  clockFunction(300, 400, hPos[4], mPos[4]);
  clockFunction(400, 400, hPos[3], mPos[3]);
  clockFunction(500, 400, hPos[5], mPos[5]);

  clockFunction(200, 500, hPos[5], mPos[5]);
  clockFunction(300, 500, hPos[1], mPos[1]);
  clockFunction(400, 500, hPos[2], mPos[2]);
  clockFunction(500, 500, hPos[5], mPos[5]);

  clockFunction(200, 600, hPos[5], mPos[5]);
  clockFunction(300, 600, hPos[4], mPos[4]);
  clockFunction(400, 600, hPos[3], mPos[3]);
  clockFunction(500, 600, hPos[5], mPos[5]);

  clockFunction(200, 700, hPos[4], mPos[4]);
  clockFunction(300, 700, hPos[6], mPos[6]);
  clockFunction(400, 700, hPos[6], mPos[6]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

function nine() {
  clockFunction(200, 200, hPos[1], mPos[1]);
  clockFunction(300, 200, hPos[6], mPos[6]);
  clockFunction(400, 200, hPos[6], mPos[6]);
  clockFunction(500, 200, hPos[2], mPos[2]);

  clockFunction(200, 300, hPos[5], mPos[5]);
  clockFunction(300, 300, hPos[1], mPos[1]);
  clockFunction(400, 300, hPos[2], mPos[2]);
  clockFunction(500, 300, hPos[5], mPos[5]);

  clockFunction(200, 400, hPos[5], mPos[5]);
  clockFunction(300, 400, hPos[4], mPos[4]);
  clockFunction(400, 400, hPos[3], mPos[3]);
  clockFunction(500, 400, hPos[5], mPos[5]);

  clockFunction(200, 500, hPos[4], mPos[4]);
  clockFunction(300, 500, hPos[6], mPos[6]);
  clockFunction(400, 500, hPos[2], mPos[2]);
  clockFunction(500, 500, hPos[5], mPos[5]);

  clockFunction(200, 600, hPos[1], mPos[1]);
  clockFunction(300, 600, hPos[6], mPos[6]);
  clockFunction(400, 600, hPos[3], mPos[3]);
  clockFunction(500, 600, hPos[5], mPos[5]);

  clockFunction(200, 700, hPos[4], mPos[4]);
  clockFunction(300, 700, hPos[6], mPos[6]);
  clockFunction(400, 700, hPos[6], mPos[6]);
  clockFunction(500, 700, hPos[3], mPos[3]);
}

