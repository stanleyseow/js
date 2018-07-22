var angle = 0;
var angle2 = 0;
var angle3 = 0;
var s = 0;
function setup() {
    createCanvas(400, 400);
    //set the background color to grey
    //background('#ff8080');
    angleMode(DEGREES);

}

function draw() {
    background('#990000');
    noStroke(0)

    fill('#ffb366')
    rect(190 , 30 , 20, 80);
    fill('#ffcc99')
    rect(190 , 290 , 20, 80);
    fill('#ffd9b3')
    rect(30 , 190 , 80, 20);
    fill('#ffbf80')
    rect(290 , 190 , 80, 20);

    // translate 200,200 & rotate CW
    translate(200, 200);
    rotate(angle);
    angle++;
    translate(-200, -200);
    
    fill('#ff9933');
    ellipse(200, 200, 100);
    fill('#ff8c1a');
    ellipse(200, 200, 80);
    fill('#ff8000');
    ellipse(200, 200, 50);

    fill('#ffa31a')
    triangle(50, 45, 35, 60, 125, 125);
    fill('#ffa31a')
    triangle(50, 355, 35, 340, 125, 275);
    fill('#ffa31a')
    triangle(350, 45, 365, 60, 275, 125);
    fill('#ffa31a')
    triangle(350, 355, 365, 340, 275, 275);

    // translate 200,200 & rotate CCW by speed of 5 degree
    translate(200, 200);
    rotate(angle3);
    angle3 = angle3 - 5;
    translate(-200, -200);
    
    fill('#ffb366')
    rect(110, 20, 20, 20);
    fill('#ffcc99')
    rect(270, 20, 20, 20);
    fill('#ffb366')
    rect(110, 360, 20, 20);
    fill('#ffbf80')
    rect(270, 360, 20, 20);
    fill('#ffcc99')
    rect(20, 130, 20, 20);
    fill('#ffd9b3')
    rect(360, 130, 20, 20);
    fill('#ffb366')
    rect(20, 250, 20, 20);
    fill('#ffbf80')
    rect(360, 250, 20, 20);

    // translate 200,200 & rotate CW by speed of 10 degree
    translate(200, 200);
    rotate(angle2);
    angle2 = angle2 + 10;
    translate(-200, -200);
    
    stroke(20)
    line(160, 130, 130, 80);
    line(240, 130, 270, 80);
    line(70, 140, 130, 165);
    line(340, 140, 270, 165);
    line(160, 270, 130, 320);
    line(240, 270, 270, 320);
    line(70, 260, 130, 235);
    line(340, 260, 270, 235);

}
