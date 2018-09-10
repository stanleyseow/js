//object Oriented Collision
var score = 0;
var rects = [];
var numRects = 50;
var cir;
function setup() {
	createCanvas(1000,300);

	for(i=0;i<numRects;i++){
		r = new rectObj(random(width),random(height), 30, 30 ) // generate a rectObj
		rects.push(r); //add it to the array.
	}

	cir = new circleObj(20);// create a new circle object
	console.log(rects);
}

function draw(){
	background(255);

	for(i=0;i<numRects;i++){
		rects[i].disp();
		if ( rects[i].collide( cir ) ) {
        text("collide",110,50);      
    }
	}

	cir.disp(mouseX,mouseY); //pass the x,y pos in to the circle.
      textSize(50);
      text(score,50,50);
  
}

function rectObj(x,y,w,h){
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.color = color(random(255),random(255),random(255))
	this.hit = false;

	this.collide = function(obj){

		this.hit = collideRectCircle(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.dia); 

		if (this.hit) {
			this.color = color(0);
      // hide the objects
      this.x = -100;
      this.y = -100;
      numRects--;
      score++;
      return 1;
		}

	}

	this.disp = function(){
		noStroke();
		fill(this.color);
		this.x += 3 //move to the right!
		if(this.x > width){ //loop to the left!
			this.x = -this.w;
		}
		rect(this.x,this.y,this.w,this.h);

	}

}

function circleObj(dia){
	this.dia = dia;
	this.color = color(random(255),random(255),random(255))
	this.x;
	this.y;

	this.disp = function(x,y){
		this.x = x;
		this.y = y;
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.dia,this.dia);
	}

}