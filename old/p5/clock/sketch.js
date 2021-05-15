function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(0);

   translate(200,200);
  rotate(-90);


  var hr = hour();
  var mn = minute();
  var sc = second();
  var mi = millis();

  var sc1 = map(sc,0,60,0,360); 
  var mn1 = map(mn,0,60,0,360); 
  var hr1 = map(hr % 12,0,12,0,360); 
  
  stroke(255);
  strokeWeight(10);  
  noFill();
  
  stroke('red');
  arc(0, 0, 200, 200, 0, sc1 );
  stroke('cyan');
  arc(0, 0, 180, 180, 0, mn1 );
  stroke('yellow');
  arc(0, 0, 160, 160, 0, hr1 );
  
  // Only rotate the sec hand
  push();
  stroke('red');
  rotate(sc1);
  line(0,0,50,0);
  pop();
  
  rotate(90);
  noStroke();
  textAlign(CENTER);
  textSize(50);
  textFont("Chela One");
  fill(200,0,sc*4);
  var clock = hr + ":" + mn + ":" + sc;
  text(clock, 0, 150);
  
}
