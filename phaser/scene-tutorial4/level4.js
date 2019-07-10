// collect stars, no enemies
class level4 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level4' });
        // Put global variable here
        this.starCount = 0;
    }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/level2.json');
    
    this.load.spritesheet('tiles', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});

    this.load.spritesheet('player','assets/dude2.png', { frameWidth: 64, frameHeight: 96} );

    this.load.image('star', 'assets/star.png');

    this.load.image('coin', 'assets/goldCoin.png');

    this.load.image('bomb', 'assets/bomb.png');


}

create() {

    let map = this.make.tilemap({key: 'map'});
    
    // Must match tileSets name
    let Tiles = map.addTilesetImage('tiles64x64','tiles');

    // create the ground layer
    this.groundLayer = map.createDynamicLayer('groundLayer', Tiles, 0, 0);
    this.platformLayer = map.createDynamicLayer('platformLayer', Tiles, 0, 0);

    // Set starting and ending position using object names in tiles
    this.startPoint = map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint = map.findObject("ObjectLayer", obj => obj.name === "endPoint");

    // Place an image manually on the endPoint
    //this.add.image(this.endPoint.x, this.endPoint.y, 'coin').setOrigin(0, 0);
    console.log('startPoint ', this.startPoint.x, this.startPoint.y);
    console.log('endPoint ', this.endPoint.x, this.endPoint.y);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    //this.player.setPosition(this.startPoint.x, this.startPoint.y);  
    this.player.setPosition(0, 0);  

    //console.log('player ', this.player.x, this.player.y);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.platformLayer.setCollisionByProperty({ collides: true });
    
    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.platformLayer, this.player);

    // Collide platform with stars
    this.stars = this.physics.add.group({defaultKey: 'star'})

    this.physics.add.collider(this.platformLayer, this.stars);
    this.physics.add.collider(this.groundLayer, this.stars);

    this.physics.add.overlap(this.player, this.stars,this.collectStars, null, this );

    this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.dropStars, callbackScope: this, loop: true });
    this.timedEvent2 = this.time.addEvent({ delay: 10000, callback: this.clearStars, callbackScope: this, loop: true });
    
    this.add.text(0,560, 'Level 4', { font: '24px Courier', fill: '#000000' }).setScrollFactor(0);

    this.coin1 = this.add.image(50,530, 'coin').setScrollFactor(0);
    this.coin2 = this.add.image(100,530,'coin').setScrollFactor(0);
    this.coin3 = this.add.image(150,530,'coin').setScrollFactor(0);

    // this text will show the score
    this.starText = this.add.text(20, 40, 'Stars ' + this.starCount, {
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
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  // make the camera follow the this.player
  this.cameras.main.startFollow(this.player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');

}

collectStars(player, stars) {
    stars.disableBody(true, true);
    this.starCount += 1; 
    console.log(this.starCount);
    this.starText.setText('Stars ' + this.starCount); // set the text to show the current score
    return false;
}

dropStars () {
    // Add random stars
    console.log('Dropping stars');
    this.stars.createMultiple({
        key: 'star',
        repeat: 20,
        setXY: { x: 0, y: Phaser.Math.Between(0, 200), stepX: Phaser.Math.Between(100, 400) }
    })

}

clearStars() {
    console.log('Clearing stars');    
    this.stars.clear(true,true);
}

update() {

    if ( this.starCount === 1) {
        this.coin1.setVisible(false);
    } else if ( this.starCount === 2) {
        this.coin2.setVisible(false);
    } else if ( this.starCount === 3) {
        this.coin3.setVisible(false);
    }


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
        this.scene.stop("level4");
        this.scene.start("gameoverScene");
    }

    // Check for reaching endPoint object
    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
        console.log('Reached endPoint, loading next level');
        this.scene.stop("level4");
        this.scene.start("gameoverScene");
    }
    
}


}