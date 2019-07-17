// static enemies
class level2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level2' });
        this.bricksCount = 3;

    }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map2', 'assets/lvl2jpn.json');
    
    this.load.spritesheet('tiles', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('player','assets/zack2.png', {frameWidth: 90, frameHeight:150} );

    this.load.image('bricks', 'assets/brick.png', { frameWidth: 43, frameHeight:58});
    this.load.image('japan','assets/japan.png');
    this.load.image('life','assets/life.png');
    this.load.image('endpoint','assets/endpoint');
}

create() {
    this.japan = this.add.tileSprite(0, 0, game.config.width, game.config.height, "japan");
    this.japan.setOrigin(0, 0);
    this.japan.setScrollFactor(0);

    this.map = this.make.tilemap({key: 'map2'});
    
    // Must match tileSets name
   // var coinTiles = map.addTilesetImage('goldCoin');

    // Must match tileSets name
    this.Tiles = this.map.addTilesetImage('tiles64x64','tiles');

    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundLayer', this.Tiles, 0, 0);
    this.platformLayer = this.map.createDynamicLayer('platformLayer', this.Tiles, 0, 0);

    // Set starting and ending position using name
    this.startPoint2 = this.map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint2 = this.map.findObject("ObjectLayer", obj => obj.name === "endPoint");
    this.add.image(this.endPoint2.x, this.endPoint2.y, 'endpoint');

    //console.log('startPoint ', this.startPoint.x, this.startPoint.y);
   
    //console.log('endPoint ', this.endPoint.x, this.endPoint.y);
    
    // add coins as tiles
    //coinLayer = map.createDynamicLayer('coinLayer', coinTiles, 0, 0);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height);
    this.player.setCollideWorldBounds(true); // don't go out of the map  
    this.platformLayer.setCollisionByProperty({collides:(true)});

    // Set this.player to starting position
    this.player.setPosition(this.startPoint2.x, this.startPoint2.y);  

    console.log('player ', this.player.x, this.player.y);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ collides:true});
    this.platformLayer.setCollisionByProperty({ collides: true });
    
    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.platformLayer, this.player);

    this.timedEvent = this.time.addEvent({ delay: 4000, callback: this.dropbricks, callbackScope: this, loop: true });
    
    this.timedEvent2 = this.time.addEvent({ delay: 9000, callback: this.clearbricks, callbackScope: this, loop: true });
    this.life1 = this.add.image(50,120, 'life').setScrollFactor(0);
    this.life2 = this.add.image(100,120,'life').setScrollFactor(0);
    this.life3 = this.add.image(150,120,'life').setScrollFactor(0);


    // Add random stars
    // this.stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 40,
    //     setXY: { x: 0, y: 0, stepX: Phaser.Math.Between(100, 300) }
    // });

    // // Collide platform with stars
    // this.physics.add.collider(this.platformLayer, this.stars);
    // this.physics.add.collider(this.groundLayer, this.stars);

    // this.physics.add.overlap(this.player, this.stars,this.collectStars, null, this );

     // Add random bricks
     this.bricks = this.physics.add.group({
        key: 'bricks',
        repeat: 2,
        setXY: { x: 200, y: 0, stepX: Phaser.Math.Between(200, 800) }
    });

    // Collide platform with bricks
    this.physics.add.collider(this.platformLayer, this.bricks);
    this.physics.add.collider(this.groundLayer, this.bricks);

    //this.physics.add.overlap(this.stars, this.bombs, this.removeBombs, null, this );
    this.physics.add.overlap(this.player, this.bricks, this.hitbricks, null, this );

    this.add.text(0,560, 'Japan', { font: '24px Courier', fill: '#000000' }).setScrollFactor(0);

    // this text will show the score
    // this.lifeText = this.add.text(20, 40, 'LIFE : 3', {
    //     fontSize: '30px',
    //     fill: '#ffffff'
    // });
    // fix the text to the camera
    // this.lifeText.setScrollFactor(0);
    // this.lifeText.visible = true;

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {
            start: 0,
            end: 3
        }),
        frameRate: 20,
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
        frameRate: 20,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  // make the camera follow the this.player
  this.cameras.main.startFollow(this.player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');

}


// losingLife(player, bricks) {
//     bricks.disableBody(true, true);
//     this.lifeCount -= 1; // add 10 points to the score
//     console.log(this.lifeCount);
//     this.lifeText.setText(lifeCount); // set the text to show the current score
//     return false;
// }
hitbricks(player, bricks) {
    bricks.disableBody(true, true);
    console.log(this.bricksCount);
    this.bricksCount -= 1; 
    if ( this.bricksCount === 2) {
        this.cameras.main.shake(50);
        this.life1.setVisible(false);
    } else if ( this.bricksCount === 1) {
        this.cameras.main.shake(50);
        this.life2.setVisible(false);
    } else if ( this.bricksCount === 0) {
        this.cameras.main.shake(50);
        this.life3.setVisible(false);
    }
    if ( this.bricksCount === 0 ) {
        this.cameras.main.shake(400);
        // delay 1 sec
        this.time.delayedCall(1000,function() {
            this.bricksCount = 3;
            this.scene.restart();
        },[], this);
    }
    this.cameras.main.shake(50);
    
    //this.lifeText.setText('' + this.lifeCount); // set the text to show the current score
    return false;
}

// hitbricks(player,bricks) {
//     //bombs.disableBody(true, true);
//     console.log('bricks, bricksCount');
//     this.cameras.main.shake(50);
//     // this.lifeCount();
//     // delay 1 sec
// //     this.time.delayedCall(2000,function() {

// //         this.scene.restart();
// // //        this.scene.start("gameoverScene");
// //     },[], this);
// }



dropbricks ()
{
    // Add random stars
    console.log('Dropping bricks');
    this.bricks.createMultiple({
        key: 'bricks',
        repeat: 80,
        setXY: { x: 0, y: Phaser.Math.Between(0, 200), stepX: Phaser.Math.Between(100, 400) }
    })
    this.cameras.main.shake(500);
}

clearbricks() {
    console.log('Clearing bricks');    
    this.bricks.clear(true,true);
    this.cameras.main.shake(400);
}

update() {
    // if ( this.bricksCount === 1) {
    //     this.life1.setVisible(false);
    // } else if ( this.bricksCount === 2) {
    //     this.life2.setVisible(false);
    // } else if ( this.bricksCount === 3) {
    //     this.life3.setVisible(false);
    // }

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
        this.player.body.setVelocityY(-350);        
    }

    //console.log('Current this.player pos ', this.player.x, this.player.y);

    // Check for reaching endPoint object
    if ( this.player.x >= this.endPoint2.x && this.player.y >= this.endPoint2.y ) {
        console.log('Reached End, goto level3');
        //this.cameras.main.shake(500);
        this.time.delayedCall(1000,function() {
            this.scene.stop("level2");
            this.scene.start("stage3preload");
        },[], this);
    }
    this.japan.tilePositionX = this.cameras.main.scrollX * .2
    this.japan.tilePositionY = this.cameras.main.scrollY* 0;
    
}

// this.bg_2.tilePositionX = this.cameras.main.scrollX * .7;


}