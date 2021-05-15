var x = 0;
var y = 0;

var speed = 5;
var speed2 = 5;

function setup() {
    createCanvas(400, 400);
    fill("green");
}

function draw() {
    background(0);

    if (x > width) {
        speed = -5;
    }

    if (x < 0) {
        speed = 5;
    }
    
    if ( speed == 5) {
        fill('green');
    } else {
        fill('red');
    }
    ellipse(x, 200, 100, 100);
    x = x + speed;


    if (y > width) {
        speed2 = -5;
    }

    if (y < 0) {
        speed2 = 5;
    }
    
    if ( speed2 == 5) {
        fill('pink');
    } else {
        fill('yellow');
    }
    ellipse(200, y, 100, 100);
    y = y + speed2;
    

    console.log("x= " + x + " speed = " + speed);
    console.log("y= " + y + " speed2 = " + speed2);

}
