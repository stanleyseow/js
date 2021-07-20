var cannon;
var cannonball;
var pirateship;

var mouse;
var input;

var control=false;

var worldBounds;

class Scene extends Phaser.Scene{
    constructor(config){
        super(config);
        Phaser.Scene.call(this,{key:'scene'});
    }


    preload(){
        //load game images
        this.load.image('background','./assets/background.png');
        this.load.image('cannon','./assets/cannon.png');
        this.load.image('cannonBall','./assets/cannonBall.png');
        this.load.image('pirateShip','./assets/pirateShip.png');
    }

    create(){
        //Create image using setOrigin
        this.add.image(0,0,'background').setOrigin(0,0);

        //cannon creation according to the ship in the background
        cannon=this.physics.add.sprite(384,256,'cannon');
        //cannonball creation according to the cannon
        cannonball=this.physics.add.sprite(384,256,'cannonBall');

        //create pirate ship
        pirateship=this.physics.add.group();
        pirateship.create(100,100,'pirateShip');
        pirateship.create(600,100,'pirateShip');
        pirateship.create(100,400,'pirateShip');
        pirateship.create(600,400,'pirateShip');

        //for mouse click event
        mouse=this.input.mousePointer;
        //for mouse position
        input=this.input;

        //set game bounds shortcuts
        worldBounds=this.physics.world.bounds;
        
    }

    update(){
        
		//angle between mouse and ball
        let angle=Phaser.Math.Angle.Between(cannon.x,cannon.y,input.x,input.y);
        //rotation cannon with PI/2
        cannon.setRotation(angle+Math.PI/2);

        //mouse clicked
        if(mouse.isDown&& control==false){
            //for fire again
        	cannonball=this.physics.add.sprite(384,256,'cannonBall');
            //move to mouse position 
            this.physics.moveTo(cannonball,input.x,input.y,500);
            control=true;
        }

        //check world bounds
        if(cannonball.x>worldBounds.width || cannonball.y>worldBounds.height ||cannonball.x<0 || cannonball.y<0){
            control=false;
        }

        //for collision in updates as cannonball object was created in update
        this.physics.add.overlap(cannonball,pirateship,destroy,null,this);

    }
}

//collide cannonbal and pirateShip
function destroy(cannonball,pirateship) {
        pirateship.disableBody(true,true);
        cannonball.disableBody(true,true);
        control=false;
}
