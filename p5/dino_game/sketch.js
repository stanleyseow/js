var y = 300;
var x = 800;
var speed = 10;



function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(50);
    stroke(255);
    line(0, 360, width, 360);

    cactus(x, 380);
    x = x - speed;

    if (x < 0) {
        x = width;
        speed = random(5, 10);
        y = 300;
        console.log('s = ' + speed);
    }

    if (x < 180 + speed) {
        jump();
    } else {
        run();
    }

}

function jump() {

    y = y - speed / 2;
    fill('red');

    console.log('y = ' + y);
    if (y < 200 && x <= 50) {
        y = y + speed/2;
    }
    rect(50, y, 20, 50);
}

function run() {
    fill('red');
    rect(50, 300, 20, 50);
}

function cactus() {
    fill('green');
    rect(x, 300, 30, 50);
    //console.log('x = ' + x);
}
