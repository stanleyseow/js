// p5 play Space Shooter
// Win once remove all the enemies
// Lose once hit the enemy
// Use the mouse to move left/right
// Click LEFT button to shoot

var Player;
var Bullets;
var bulletImage;

var Object1;
var numObject1 = 20;
var winScore = 20;

var speed1 = 10;
var score = 0;

// Star array
var stars = [];


function setup() {
  createCanvas(800, 600);
  noCursor();
  frameRate(30);

  // Generate 1000 stars
  for ( let i = 0; i < 1000; i++) {
    stars[i] = new Star();
  }
  
    bulletImage = loadImage('https://raw.githubusercontent.com/stanleyseow/js/gh-pages/media//asteroids_bullet.png');

  Bullets = new Group();

  
  // new Object1 group
  Object1 = new Group();
  //create Object1 in arrays
  for (let i = 0; i < numObject1; i++) {
    var b = createSprite(random(0, width), random(-400, 0));
    b.addImage(
      loadImage(
  "https://raw.githubusercontent.com/stanleyseow/js/gh-pages/media/space-invaders-40x30.png"
      )
    );
            
    //Object1.velocity.y = speed1;
    //Object1.setSpeed(speed1,180);
    Object1.add(b);
  }

 
  // create Player sprite
  Player = createSprite(200, height-50);
  Player.addImage(
    loadImage(
      "https://raw.githubusercontent.com/stanleyseow/js/gh-pages/media/rocket-50x50.png"
    )
  );

}
////////// end of setup /////////////

function draw() {
  background(20);
  starBackground(); 
  runGame();
  drawSprites();
}
///////// end of draw() /////////

function starBackground() {
  push();
  translate(width / 2, height / 2);
  for (let i=0; i < 1000; i++) {
    stars[i].update();
    stars[i].show();
  }  
  pop();
}

function runGame() {
  textSize(50);
  stroke(255);
  fill(255);
  text(score, 50,50);
  Player.position.x = mouseX;
  
  // Lock player to screen
  if ( Player.position.x < 30 ) {
    Player.position.x = 30;
  }
  
  if ( Player.position.x > width - 30 ) {
    Player.position.x = width - 30;
  }
  
  // Use mousePressed() function
  //shootBullets();
  moveObject1();

  Object1.overlap(Bullets,hitObject);

  // Check for losing condition
  if ( Player.overlap(Object1) ) {
          textSize(100);
          text("Game Over", 150,height/2);
          //noLoop();
   } 
      
  // Check for winning condition
  if ( score == winScore ) {
      textSize(100);
      text("You Win!!!", 200,height/2);
      //noLoop();
  } 
  
}

///////// end of runGame() ////////////

function hitObject(Object1,Bullets) {
        score++;
        Object1.position.x = -100;
        Object1.position.y = -100;
        Object1.remove();
  
        // Reduced the object by 1
        numObject1--;
  
        Bullets.position.x = -100;
        Bullets.position.y = -100;
        Bullets.remove();
  }  
  

function moveObject1() {
    for (let j = 0; j < numObject1; j++) {
        Object1[j].velocity.y = random(2,speed1);

        // Reset the objects
        if (Object1[j].position.y > height) {
          Object1[j].position.x = random(0, width);
          Object1[j].position.y = random(-200, 0);
    }
  }
}

function mousePressed() {
 var bullet =  createSprite(Player.position.x,  Player.position.y-50);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10, 270);
    bullet.life = 100;
    Bullets.add(bullet);
}

// function shootBullets() {
//   // Shoot the bullets
// //  if( mouseDown(LEFT) ) {
//    if (mouseIsPressed) {
//     var bullet = createSprite(Player.position.x, Player.position.y-50);
//     bullet.addImage(bulletImage);
//     bullet.setSpeed(10, 270);
//     bullet.life = 100;
//     Bullets.add(bullet);
//   } 
// }

function Star() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.z = random(0, width);
  this.pz = this.z;

  this.update = function() {
    this.z = this.z - 10;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  };

  this.show = function() {
    var px, py, sx, sy;
    sx = map(this.x / this.z, 0, 1, 0, width);
    sy = map(this.y / this.z, 0, 1, 0, width);
    px = map(this.x / this.pz, 0, 1, 0, width);
    py = map(this.y / this.pz, 0, 1, 0, width);
    this.pz = this.z;
    stroke(255);
    line(px, py, sx, sy);
  };
}