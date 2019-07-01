// moving enemies
class level3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level3' });
        this.starCount = 0;

    }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map3', 'assets/level2.json');
    
    this.load.spritesheet('tiles', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});

    //this.load.image('goldCoin', 'assets/goldCoin.png');

    //this.load.atlas('player', 'assets/this.player.png', 'assets/this.player.json');
    this.load.spritesheet('player','assets/dude.png', { frameWidth: 32, frameHeight: 48} );


    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');

}

create() {


    this.map = this.make.tilemap({key: 'map3'});
    
    // Must match tileSets name
   // var coinTiles = map.addTilesetImage('goldCoin');

    // Must match tileSets name
    this.Tiles = this.map.addTilesetImage('tiles64x64','tiles');

    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundLayer', this.Tiles, 0, 0);
    this.platformLayer = this.map.createDynamicLayer('platformLayer', this.Tiles, 0, 0);

    // Set starting and ending position using name
    this.startPoint = this.map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint = this.map.findObject("ObjectLayer", obj => obj.name === "endPoint");

    console.log('startPoint ', this.startPoint.x, this.startPoint.y);
    console.log('endPoint ', this.endPoint.x, this.endPoint.y);
    
    // add coins as tiles
    //coinLayer = map.createDynamicLayer('coinLayer', coinTiles, 0, 0);

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    this.player.setPosition(this.startPoint.x, this.startPoint.y);  

    console.log('player ', this.player.x, this.player.y);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.platformLayer.setCollisionByProperty({ collides: true });
    
    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.platformLayer, this.player);

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

     // Add random bomb
     this.bombs = this.physics.add.group({
        key: 'bomb',
        repeat: 5,
        setXY: { x: 400, y: 0, stepX: Phaser.Math.Between(300, 300) }
    });

    this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.moveLeft, callbackScope: this, loop: true });
    this.timedEvent2 = this.time.addEvent({ delay: 4000, callback: this.moveRight, callbackScope: this, loop: true });
       

    // Collide platform with stars
    this.physics.add.collider(this.platformLayer, this.bombs);
    this.physics.add.collider(this.groundLayer, this.bombs);

    //this.physics.add.overlap(this.stars, this.bombs, this.removeBombs, null, this );
    this.physics.add.overlap(this.player, this.bombs, this.hitBombs, null, this );

    this.add.text(0,560, 'Level 2', { font: '24px Courier', fill: '#000000' }).setScrollFactor(0);

    // this text will show the score
    this.starText = this.add.text(20, 40, '0', {
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

}

collectStars(player, stars) {
    stars.disableBody(true, true);
    this.starCount += 1; // add 10 points to the score
    console.log(this.starCount);
    //this.starText.setText(starCount); // set the text to show the current score
    return false;
}

hitBombs(player,bombs) {
    //bombs.disableBody(true, true);
    console.log('Hit bomb, restart game');
    this.cameras.main.shake(500);
    // delay 1 sec
    this.time.delayedCall(2000,function() {

        this.scene.restart();
//        this.scene.start("gameoverScene");
    },[], this);
}

removeBombs(bombs,stars) {
    bombs.disableBody(true, true);
}

moveLeft(bombs) {
    this.tweens.add({
        targets: this.bombs.getChildren().map(function (c) { return c.body.velocity }),
        x: Phaser.Math.Between(-150, -50) ,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
}
moveRight(bombs) {
    this.tweens.add({
        targets: this.bombs.getChildren().map(function (c) { return c.body.velocity }),
        x:  Phaser.Math.Between(50, 150),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
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

    // Check for reaching endPoint object
    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
        console.log('Reached End, game over');
        //this.cameras.main.shake(500);
        this.time.delayedCall(1000,function() {
            this.scene.stop("level2");
            this.scene.start("gameoverScene");
        },[], this);
    }
    
}


}