class level6 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level6' });
        // Put global variable here
        this.starCount = 0;
        this.bullets;
    }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map2', 'assets/level2.json');
    this.load.spritesheet('tiles', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('player','assets/dude2.png', { frameWidth: 64, frameHeight: 96} );

    this.load.image('star', 'assets/star.png');
    this.load.image('coin', 'assets/goldCoin.png');
    this.load.image('bomb', 'assets/bomb.png');
    
    // Load the bullet
    this.load.image('bullet', 'assets/bullet7.png');

    // Sound preload
    this.load.audio('ping', 'assets/ping.mp3');
    this.load.audio('explode', 'assets/explosion.mp3');
    this.load.audio('blaster', 'assets/blaster.mp3');
}

create() {

    this.add.text(0,0, 'Level 6 - Shooter overlap', { font: '24px Courier', fill: '#000000' }).setScrollFactor(0);

    // Sound variable
    this.explodeSnd = this.sound.add('explode');
    this.pingSnd = this.sound.add('ping');
    this.blasterSnd = this.sound.add('blaster');

    // Load the tilemap to map variable
    this.map2 = this.make.tilemap({key: 'map2'});
    
    // Must match tileSets name inside Tiled
    let Tiles = this.map2.addTilesetImage('tiles64x64','tiles');

    // create the ground & platform layer
    this.groundLayer = this.map2.createDynamicLayer('groundLayer', Tiles, 0, 0);
    this.platformLayer = this.map2.createDynamicLayer('platformLayer', Tiles, 0, 0);

    // Set starting and ending position using object names in Tiled
    this.startPoint5 = this.map2.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint5 = this.map2.findObject("ObjectLayer", obj => obj.name === "endPoint");

    // Place an image manually on the endPoint
    this.add.image(this.endPoint5.x, this.endPoint5.y, 'coin').setOrigin(0, 0);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    //this.player.setPosition(this.startPoint.x, this.startPoint.y);  
    this.player.setPosition(0, 0);  
    window.player = this.player;

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // Setup collider for ground and platform layer
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.platformLayer.setCollisionByProperty({ collides: true });
    
    // Collides ground and platform with player
    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.platformLayer, this.player);

    // Collide ground and platform with stars
    this.stars = this.physics.add.group({defaultKey: 'star'})
    window.stars = this.stars;

    this.physics.add.collider(this.platformLayer, this.stars);
    this.physics.add.collider(this.groundLayer, this.stars);

    // Timed events, drop starts every 2 secs, clear stars every 10 secs
    this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.dropStars, callbackScope: this, loop: true });
    //this.timedEvent2 = this.time.addEvent({ delay: 5000, callback: this.clearBullets, callbackScope: this, loop: true });
    

    this.stars.createMultiple({
        key: 'star',
        repeat: 20,
        setXY: { x: Phaser.Math.Between(300, 400), y: Phaser.Math.Between(0, 500), stepX: Phaser.Math.Between(0, 500) }
    })

    // Display the stars collected
    this.starText = this.add.text(20, 40, 'Stars ' + this.starCount, {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    this.starText.setScrollFactor(0);
    this.starText.visible = true;

    ///////////////////////////////
    // Create animation for player
    //////////////////////////////
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: [{
            key: 'player',
            frame: 4
        }],
        frameRate: 20,
        repeat: false
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });


////////////////////////////
// Setup cursors and cameras
////////////////////////////
    this.cursors = this.input.keyboard.createCursorKeys();
  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, this.map2.widthInPixels, this.map2.heightInPixels);
  // make the camera follow the this.player
  this.cameras.main.startFollow(this.player);
  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');



// Create the bullet object
this.bullets = new Bullets(this);

// Define spacebar
this.spaceDown = this.input.keyboard.addKey('SPACE');
this.spaceDown.on('down', function(){
    this.blasterSnd.play();
    this.bullets.fireBullet(this.player.x, this.player.y+20);
    //console.log(this.bullets);
    }, this );

window.bullets = this.bullets;

// When bullets overlap with stars, run shootStar function
this.physics.add.overlap(this.bullets, this.stars,this.shootStars, null, this );

} 
///////////////////////// end of create() //////////////////////////

update() {

    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-200);
        this.player.anims.play('left', true); 
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);
    } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play('idle', true);
    }
    // jump 
    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.body.setVelocityY(-500);   
    }
    
} 
/////////////////////////// end of update() /////////////////////////////////

shootStars(bullets, stars) {
    // remove stars once collected
    console.log('stars shot')
    stars.disableBody(true, true);
    bullets.disableBody(true, true);

    // Add counter
    this.starCount += 1; 
    // Play sound
    this.pingSnd.play();
    console.log(this.starCount);

    // Update star counter
    this.starText.setText('Stars ' + this.starCount); // set the text to show the current score

    return false;
}

dropStars () {
    // Add random stars
    //console.log('Dropping stars');
    this.stars.createMultiple({
        key: 'star',
        repeat: 20,
        setXY: { x: Phaser.Math.Between(300, 400), y: Phaser.Math.Between(0, 500), stepX: Phaser.Math.Between(0, 500) }
    })
    this.cameras.main.shake(100);
}

clearStars() {
    console.log('Clearing stars');    
    this.stars.clear(true,true);
    //this.explodeSnd.play();
}

clearBullets() {
this.bullets.children.iterate( bullet => {
    console.log('Clear faulty bullets');
    if ( (bullet.body.prev.x === bullet.body.position.x ) &&  bullet.body.prev.x !== -6  ) {
        console.log("prev ", bullet.body.prev.x);
        console.log("pos  ", bullet.body.position.x);
        bullet.setActive(false);
        bullet.setVisible(false);
    }
});
}


}