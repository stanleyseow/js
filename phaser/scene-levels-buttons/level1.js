// collect stars, no enemies
class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
        // Put global variable here
        this.starCount = 0;
    }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/level1.json');
    
    this.load.spritesheet('tiles', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});

    this.load.spritesheet('player','assets/dude2.png', { frameWidth: 64, frameHeight: 96} );

    this.load.image('star', 'assets/star.png');

    this.load.image('coin', 'assets/goldCoin.png');


}

create() {

    this.add.text(0,0, 'Level 1 - Collect stars', { font: '24px Courier', fill: '#000000' }).setScrollFactor(0);

    this.map = this.make.tilemap({key: 'map'});
    
    // Must match tileSets name
    let Tiles = this.map.addTilesetImage('tiles64x64','tiles');

    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundLayer', Tiles, 0, 0);
    this.platformLayer = this.map.createDynamicLayer('platformLayer', Tiles, 0, 0);

    // Make it global variable for troubleshooting
    window.groundLayer = this.groundLayer;


    // Set starting and ending position using object names in tiles
    this.startPoint = this.map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint = this.map.findObject("ObjectLayer", obj => obj.name === "endPoint");

    // Make it global variable for troubleshooting
    window.startPoint = this.startPoint;
    window.endPoint = this.endPoint;

    // Place an image manually on the endPoint
    this.add.image(this.endPoint.x, this.endPoint.y, 'coin').setOrigin(0, 0);

    // console.log('startPoint ', this.startPoint.x, this.startPoint.y);
    // console.log('endPoint ', this.endPoint.x, this.endPoint.y);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    //this.player.setPosition(this.startPoint.x, this.startPoint.y);  
    this.player.setPosition(0, 0);  

    // Make it global variable for troubleshooting
    window.player = this.player;

    //console.log('player ', this.player.x, this.player.y);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.platformLayer.setCollisionByProperty({ collides: true });
    
    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.platformLayer, this.player);

    // Add random stars
    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 10,
        setXY: { x: 100, y: 0, stepX: Phaser.Math.Between(200, 200) }
    });


    // Collide platform with stars
    this.physics.add.collider(this.platformLayer, this.stars);
    this.physics.add.collider(this.groundLayer, this.stars);

    this.physics.add.overlap(this.player, this.stars,this.collectStars, null, this );


    // this text will show the score
    this.starText = this.add.text(20, 40, 'Stars 0', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    this.starText.setScrollFactor(0);
    this.starText.visible = true;

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

    this.cursors = this.input.keyboard.createCursorKeys();

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
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
doBack(){
    console.log('Called mainScene from level1');
    this.starCount = 0;
    this.scene.stop('level1');
    this.scene.start('mainScene');
}

collectStars(player, stars) {
    stars.disableBody(true, true);
    this.starCount += 1; 
    console.log('starCount: ',this.starCount);
    this.starText.setText(this.starCount); // set the text to show the current score
    return false;
}

update() {

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
        this.player.body.setVelocityY(-500);        
    }

    //console.log('Current this.player pos ', this.player.x, this.player.y);
    
    // Check for more then 5 stars
    if ( this.starCount > 3 ) {
        console.log('Collected 1 star, jump to level 2');
        this.scene.stop("level1");
        this.scene.start("level1End");
    }

    let distX = this.endPoint.x - this.player.x;
    let distY = this.endPoint.y - this.player.y;
    // Check for reaching endPoint object
    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
        console.log('Reached endPoint, loading next level');
        this.scene.stop("level1");
        this.scene.start("level1End");
    }
    
}


}