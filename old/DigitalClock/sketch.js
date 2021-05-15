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

var a = 0;

function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    background(0);
    frameRate(60);
}

function draw() {
    background(0);
    d = new Date();
    var m = minute();
    var h = hour();
    var s = second();
    var ms = millis() / 300;
    var mss = Math.round(millis() / 10);


    push();
    translate(100, 100);
    turnHand(3,30,9,30);
    //turnHand(9,30,0,45);

    
//    clockFunction(200, 200, 7, 35);
//    
//    clockFunction(200, 200, 6, 34);
//    clockFunction(200, 200, 5, 33);
//    clockFunction(200, 200, 4, 32);
//    clockFunction(200, 200, 3, 31);
//    clockFunction(200, 200, 3, 30);
//    
//    clockFunction(200, 200, 3, 30);
//    clockFunction(200, 200, 4, 30);
//    clockFunction(200, 200, 5, 30);
//    clockFunction(200, 200, 6, 30);
//    clockFunction(200, 200, 7, 30);
//    clockFunction(200, 200, 8, 30);
//    clockFunction(200, 200, 9, 30);
//
//    clockFunction(200, 200, 10, 34);
//    clockFunction(200, 200, 11, 40);
//    clockFunction(200, 200, 0, 45);
    
    //zero();
    pop();

    noLoop();
}

//

function turnHand(h1, m1, h2, m2) {

    //  const hPos = [7, 3, 9, 0, 0, 6, 3];
    //const mPos = [35, 30, 30, 45, 15, 0, 45];

    // 0 to 1

    var ss = 100;
    var f = 0;
    var ms = millis() / 300;


    var fromM = Math.floor(map(m1, 0, 60, 0, 359));
    var toM = Math.floor(map(m2, 0, 60, 0, 359));

    var fromH = Math.floor(map(h1, 0, 12, 0, 359));
    var toH = Math.floor(map(h2, 0, 12, 0, 359));

    var degH = fromH;
    var degM = fromM;

    console.log(fromH, toH);

    stroke(128);
    strokeWeight(1);
    fill(f);
    ellipse(0, 0, ss, ss);
    strokeWeight(10);
    stroke(255);

    // rotate fromH to toH
    push();
    rotate(-90);
    rotate(fromH);
    line(0, 0, ss / 2 - 10, 0);
    // rotate(toH);
    // line(0, 0, ss / 2 - 10, 0);

    if (fromH < toH) {
        while (degH - toH < 0) {
            rotate(ms);
            line(0, 0, ss / 2 - 10, 0);
            degH++;
            //console.log('turn right',degH); 
        }
    } else {
        while (degH - toH > 0) {
            rotate(-ms);
            line(0, 0, ss / 2 - 10, 0);
            degH--;
            //console.log('turn left',degH);
        }
    }
    pop();

    // rotate fromM to toM
    // push();
    // rotate(-90);
    // rotate(fromM);
    // line(0, 0, ss / 2 - 10, 0);
    // rotate(toM)
    // line(0, 0, ss / 2 - 10, 0);
    // pop();

}

function clockFunction(x, y, h, m) {
    push();
    translate(x, y);
    //console.log(h, m);

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
