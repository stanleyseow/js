var angle = 0;

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
}

function draw() {
    background(0);

    angle = angle + 1;

    // save current position
    push();
    translate(100, 100);
    fill('red');
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, 100, 50);
    pop();
    // restore current position

    stroke(200);
    line(0, 200, 400, 200);
    line(200, 0, 200, 400);

    // save current position
    push();
    translate(300, 100);
    fill('yellow');
    rotate(angle * 4);
    rectMode(CENTER);
    rect(0, 0, 100, 50);
    pop();
    // restore current position


    // save current position
    push();
    translate(300, 300);
    fill('blue');
    rotate(-angle * 2);
    rectMode(CENTER);
    rect(0, 0, 100, 50);
    pop();
    // restore current position

    // save current position
    push();
    translate(100, 300);
    fill('green');
    rotate(angle * -10);
    rectMode(CENTER);
    rect(0, 0, 100, 50);
    pop();
    // restore current position


}
