// static enemies
class level2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level2' });
        this.starCount = 0;

    }

preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map2', 'assets/level2.json');
    
    this.load.spritesheet('tiles', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});

    //this.load.image('goldCoin', 'assets/goldCoin.png');

    //this.load.atlas('player', 'assets/this.player.png', 'assets/this.player.json');
    this.load.spritesheet('player','assets/dude2.png', { frameWidth: 64, frameHeight: 96} );

    this.load.image('coin', 'assets/goldCoin.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');

}

create() {

    this.add.text(0,0, 'Level 2 - static bombs', { font: '24px Courier', fill: '#000000' }).setScrollFactor(0);

    this.map2 = this.make.tilemap({key: 'map2'});
    
    // Must match tileSets name
    this.Tiles = this.map2.addTilesetImage('tiles64x64','tiles');

    // create the ground layer
    this.groundLayer = this.map2.createDynamicLayer('groundLayer', this.Tiles, 0, 0);
    this.platformLayer = this.map2.createDynamicLayer('platformLayer', this.Tiles, 0, 0);

    // Set starting and ending position using name
    this.startPoint2 = this.map2.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint2 = this.map2.findObject("ObjectLayer", obj => obj.name === "endPoint");

    // Add coin image at the end 
    this.add.image(this.endPoint2.x, this.endPoint2.y, 'coin').setOrigin(0, 0);

    //console.log('startPoint ', this.startPoint.x, this.startPoint.y);
    //console.log('endPoint ', this.endPoint.x, this.endPoint.y);
    
    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.1); // our this.player will bounce from items
    
    // small fix to our this.player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height);
    this.player.setCollideWorldBounds(true); // don't go out of the map  

    // Set this.player to starting position
    this.player.setPosition(this.startPoint2.x, this.startPoint2.y);  

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
        repeat: 4,
        setXY: { x: 200, y: 0, stepX: Phaser.Math.Between(300, 400) }
    });

    // Collide platform with stars
    this.physics.add.collider(this.platformLayer, this.bombs);
    this.physics.add.collider(this.groundLayer, this.bombs);

    //this.physics.add.overlap(this.stars, this.bombs, this.removeBombs, null, this );
    this.physics.add.overlap(this.player, this.bombs, this.hitBombs, null, this );


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
    console.log('Called mainScene from level2');
    this.scene.start('mainScene');
}

collectStars(player, stars) {
    stars.disableBody(true, true);
    this.starCount += 1; // add 10 points to the score
    console.log(this.starCount);
    //this.starText.setText(starCount); // set the text to show the current score
    return false;
}

hitBombs(player,bombs) {
    bombs.disableBody(true, true);
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

    let x = Math.abs(this.endPoint2.x - this.player.x);
    let y = Math.abs(this.endPoint2.y - this.player.y);
    //console.log(x,y);

    // Check for reaching endPoint object
    if ( x < 50 && y < 50 ) {
        console.log('Reached endPoint, loading next level');
        this.scene.stop("level2");
        this.scene.start("level3");
    }
    
}


}