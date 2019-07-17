
class level1Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1Scene' });
        // Put global variable here
        this.carrot = 0;
        this.life = 3;
        this.heart1;
        this.heart2;
        this.heart3;
    }

preload() {

    // map made with Tiled in JSON format

    this.load.tilemapTiledJSON('map', 'assets/level1.json');
    
    this.load.spritesheet('tiled', 'assets/tiledmap.png', {frameWidth: 64, frameHeight: 64});

    this.load.spritesheet('bunbun', 'assets/bunbun.png', { frameWidth: 64, frameHeight: 128 });

    this.load.image('carrot', 'assets/carrot.png');

    this.load.image('background1', 'assets/bg1.png');
    this.load.image('background2', 'assets/bg2.png');

    this.load.image('heart', 'assets/heart.png');

}

create() {

    this.bg1= this.add.tileSprite(0,0, this.game.config.width, this.game.config.height,"background1");
    this.bg1.setOrigin(0.0);
    this.bg1.setScrollFactor(0);

    this.bg2= this.add.tileSprite(0,0, this.game.config.width, this.game.config.height,"background2");
    this.bg2.setOrigin(0.0);
    this.bg2.setScrollFactor(0);

    this.map = this.make.tilemap({key: 'map'});
    
    // Must match tileSets name
    let Tiles = this.map.addTilesetImage('tiledmap','tiled');

    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundlayer', Tiles, 0, 0);
    //this.carrotLayer = map.createDynamicLayer('carrotLayer', Tiles, 0, 0);
    

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // Set starting and ending position using object names in tiles
    this.startPoint = this.map.findObject("Object1", obj => obj.name === "startPoint");
    this.endPoint = this.map.findObject("Object1", obj => obj.name === "endPoint");

    // Place an image manually on the endPoint
    //this.add.image(this.endPoint.x, this.endPoint.y, 'carrot').setOrigin(0, 0);

    console.log('startPoint ', this.startPoint.x, this.startPoint.y);
    console.log('endPoint ', this.endPoint.x, this.endPoint.y);

    // create the player sprite    
    this.player = this.physics.add.sprite(400, 400, 'bunbun');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height);
    this.player.setCollideWorldBounds(true); // don't go out of the map  
    

    // Set this.player to starting position
    //this.player.setPosition(this.startPoint.x, this.startPoint.y);  
    this.player.setPosition(0, 0);  

    //hearts
    this.heart1 = this.add.image (700,35,'heart').setScrollFactor(0);
    this.heart2 = this.add.image (650,35,'heart').setScrollFactor(0);
    this.heart3 = this.add.image (600,35,'heart').setScrollFactor(0);
    //console.log('player ', this.player.x, this.player.y);


    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ collides: true });
    //this.carrotLayer.setCollisionByProperty({ carrot: true });
    
    this.physics.add.collider(this.groundLayer, this.player);
    //this.physics.add.collider(this.carrotLayer, this.player);


    // Add random carrots
    this.carrot = this.physics.add.group({
        key: 'carrot',
        repeat: 9,
        setXY: { x: 400, y: 10, stepX: Phaser.Math.Between(500, 700) }
    });

    this.physics.add.overlap(this.player, this.carrot,this.hitCarrot, null, this );

    // // Collide platform with stars
    this.physics.add.collider(this.groundLayer, this.carrot);

    // this.physics.add.overlap(this.player, this.stars,this.collectStars, null, this );

    this.add.text(30,20, 'Level 1', { font: '30px Lemon Bird', fill: '#A92C4B' }).setScrollFactor(0);

    this.anims.create({
        key: 'jump',
        frames: [ { key: 'bunbun', frame: 2 } ],
        frameRate: 20,
        repeat: false
    });
  
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('bunbun', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });
    this.space = this.input.keyboard.addKey('SPACE');
    this.cursors = this.input.keyboard.createCursorKeys();

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  // make the camera follow the this.player
  this.cameras.main.startFollow(this.player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#A6D2CE');

}

  hitCarrot(player,carrot) {
    //carrot.disableBody(true, true);
    console.log('Hit carrot, restart game');
    //this.scene.pause();
    this.cameras.main.shake(100);
    // delay 1 sec

    this.life = this.life -1;

        carrot.disableBody(true, true);

    console.log('life', this.life);

    if ( this.life === 3) {
        this.heart1.setVisible(false);

    } else if ( this.life === 2) {
        this.heart1.setVisible(false);

    } else if ( this.life === 1) {
        this.heart2.setVisible(false);

    } else if ( this.life === 0) {
        this.heart3.setVisible(false);

    } 
    
    if (this.life < 0 )

        {  this.time.delayedCall(500,function() {
        this.life = 3;

        this.scene.restart();
        this.scene.start("goScene");
        },[], this);
        } 

}

update() {

    if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);
        this.player.flipX = false; 
    }
    
    // jump 
    if (this.space.isDown && this.player.body.onFloor())
    {
        this.player.body.setVelocityY(-400); 
        this.player.anims.play('jump', true);       
    }

    else if (this.player.body.onFloor())
    {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);       
    }


    var dist = this.endPoint.x - this.player.x;


    if ( dist < -50) {
        console.log('Reached End, level 2');
        //this.cameras.main.shake(500);
        this.time.delayedCall(500,function() {
            this.scene.stop("level1Scene");
            this.scene.start("level2Scene");
        },[], this);
    }

  
    this.bg1.tilePositionX = this.cameras.main.scrollX * .2
    this.bg2.tilePositionX = this.cameras.main.scrollX * .7

    }
}

