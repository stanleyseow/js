// collect stars, no enemies
class level6 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level6' });
        // Put global variable here
        this.starCount = 0;
    }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map2', 'assets/level2.json');
    
    this.load.spritesheet('tiles', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});

    this.load.spritesheet('player','assets/dude2.png', { frameWidth: 64, frameHeight: 96} );


    this.load.image('star', 'assets/star.png');

    this.load.image('coin', 'assets/goldCoin.png');

    this.load.image('bomb', 'assets/bomb.png');

    this.load.spritesheet('mummy', 'assets/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });

    // // Sound preload
    // this.load.audio('ping', 'assets/ping.mp3');
    // this.load.audio('explode', 'assets/explosion.mp3');
    // this.load.audio('blaster', 'assets/blaster.mp3');

}

create() {

    this.add.text(0,0, 'Level 6 - Moving mummies', { font: '24px Courier', fill: '#000000' }).setScrollFactor(0);

    // Load the tilemap to map variable
    this.map2 = this.make.tilemap({key: 'map2'});
    
    // Must match tileSets name inside Tiled
    let Tiles = this.map2.addTilesetImage('tiles64x64','tiles');

    // create the ground & platform layer
    this.groundLayer = this.map2.createDynamicLayer('groundLayer', Tiles, 0, 0);
    this.platformLayer = this.map2.createDynamicLayer('platformLayer', Tiles, 0, 0);

    // Set starting and ending position using object names in Tiled
    this.startPoint6 = this.map2.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint6 = this.map2.findObject("ObjectLayer", obj => obj.name === "endPoint");

    // Place an image manually on the endPoint
    this.add.image(this.endPoint6.x, this.endPoint6.y, 'coin');

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    //this.player.setPosition(this.startPoint.x, this.startPoint.y);  
    this.player.setPosition(0, 1000);  

    //console.log('player ', this.player.x, this.player.y);

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

    this.physics.add.collider(this.platformLayer, this.stars);
    this.physics.add.collider(this.groundLayer, this.stars);

    // When player overlap with stars, run collectStars function
    this.physics.add.overlap(this.player, this.stars,this.collectStars, null, this );

    // Timed events, drop starts every 2 secs, clear stars every 10 secs
    //this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.dropStars, callbackScope: this, loop: true });
    //this.timedEvent2 = this.time.addEvent({ delay: 10000, callback: this.clearStars, callbackScope: this, loop: true });
    
    // Added 3 coins as 3mlives
    this.coin1 = this.add.image(50,530, 'coin').setScrollFactor(0);
    this.coin2 = this.add.image(100,530,'coin').setScrollFactor(0);
    this.coin3 = this.add.image(150,530,'coin').setScrollFactor(0);

    // Create animation for player
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


    // Add animation for mummy
    this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('mummy'),
            frameRate: 20,
            yoyo: true,
            repeat: -1
    });

    // create mummies physics group
    this.mummies = this.physics.add.group();

    // Add members to mummies group
    this.mummies.create(400, 600, 'mummy').setScale(2);
    this.mummies.create(800, 600, 'mummy').setScale(2);
    this.mummies.create(1200, 600, 'mummy').setScale(2);
    this.mummies.create(1600, 600, 'mummy').setScale(2);
    this.mummies.create(2000, 600, 'mummy').setScale(2);

    // Iterate all the children and play animation
    this.mummies.children.iterate(mummy => {
        mummy.play('walk')
      })

    // Add colider to ground and platform
    this.physics.add.collider(this.platformLayer, this.mummies);
    this.physics.add.collider(this.groundLayer, this.mummies);
    this.physics.add.collider(this.mummies, this.mummies);
    this.physics.add.collider(this.player, this.mummies);
    
    // Setup cursors, up, down, left , right
    this.cursors = this.input.keyboard.createCursorKeys();

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, this.map2.widthInPixels, this.map2.heightInPixels);

  // make the camera follow the this.player
  this.cameras.main.startFollow(this.player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');

 // Add exit button
  // sprites are : overFrame, outFrame, downFrame, upFrame
  this.btnquit = this.addButton(760, 40, 'sprites', this.doBack, this, 
            'btn_close_hl', 'btn_close', 'btn_close_hl', 'btn_close').setScrollFactor(0);
}

// Exit button function
doBack()
{
    console.log('Called mainScene from level6');
    this.scene.start('mainScene');
}


update() {

    // Make mummies walk at speed 
    this.mummies.setVelocityX(80);

    // Check for end of screen at right , reset to left
    this.mummies.children.iterate(mummy => {
        if ( mummy.x > this.physics.world.bounds.width + 50 ) {
             mummy.x = -10;      
        }
    });
    

    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-200);
        this.player.anims.play('left', true); // walk left
        //this.player.flipX = true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);
        //this.player.flipX = false; // use the original sprite looking to the right
    } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play('idle', true);
    }
    // jump 
    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.body.setVelocityY(-300);   
        //this.blasterSnd.play();   
    }

    //console.log('Current this.player pos ', this.player.x, this.player.y);
    
    // Check for more then 5 stars
    if ( this.starCount > 10 ) {
        console.log('Collected n star, jump to next level');
        this.scene.stop("level6");
        this.scene.start("gameoverScene");
    }

    let x = Math.abs(this.endPoint6.x - this.player.x);
    let y = Math.abs(this.endPoint6.y - this.player.y);
    //console.log(x,y);

    // Check for reaching endPoint object
    if ( x < 50 && y < 50 ) {
        console.log('Reached endPoint, loading next level');
        this.scene.stop("level6");
        this.scene.start("gameoverScene");
    }
    
}


}

