var circle;

function setup() {
    createCanvas(800, 800);
    circle1 = new Circle(100,100);
    circle2 = new Circle(100,300);
    circle3 = new Circle(300,100);
    circle4 = new Circle(300,300);
  
    circle5 = new Circle(500,100);
    circle6 = new Circle(500,300);
    circle7 = new Circle(700,100);
    circle8 = new Circle(700,300);

    circle9 = new Circle(100,500);
    circle10 = new Circle(100,700);
    circle11 = new Circle(300,500);
    circle12 = new Circle(300,700); 
  
    circle13 = new Circle(500,500);
    circle14 = new Circle(500,700);
    circle15 = new Circle(700,500);
    circle16 = new Circle(700,700);   
}

function draw() {
  background(0);
  
  stroke('red');
  strokeWeight(5);
  noFill(0);
  rect(100,100,200,200);
  rect(300,300,200,200);
  rect(500,500,200,200);


  
  stroke(200);
  strokeWeight(1);
  circle1.draw();
  circle2.draw();
  circle3.draw();
  circle4.draw();
  
  circle5.draw();
  circle6.draw();
  circle7.draw();
  circle8.draw()
  
  circle9.draw();
  circle10.draw();
  circle11.draw();
  circle12.draw()
  
  circle13.draw();
  circle14.draw();
  circle15.draw();
  circle16.draw();
  
  circle1.grow();
  circle2.grow();
  circle3.grow();
  circle4.grow();
  circle6.grow();
  circle11.grow();
  circle13.grow();
  circle14.grow();
  circle15.grow();
  circle16.grow();
  
  
  circle1.shrink();  
  circle2.shrink();
  circle3.shrink();
  circle4.shrink();
  circle6.shrink();
  circle11.shrink();
  circle13.shrink();
  circle14.shrink();
  circle15.shrink();
  circle16.shrink();
  
}

var Circle = function(x,y) {
  
  this.x = x
  this.y = y
  this.size = 50;
  
  this.draw = function() {
    ellipse(this.x,this.y, this.size, this.size);
  };
  
  this.grow = function() {
      if ( this.size < 200 ) {
        this.size += 5;
      } 
  };

  this.shrink = function() {
      if ( this.size >= 200 ) {
        this.size -= 150;
      } 
  };  
  
}