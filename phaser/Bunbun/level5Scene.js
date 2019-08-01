
class level5Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level5Scene' });
        // Put global variable here
        this.carrot = 0;
        this.mole = 0;
        this.life = 5;
        this.heart1;
        this.heart2;
        this.heart3;
        this.heart4;
        this.heart5;
    }

preload() {

    // map made with Tiled in JSON format

    this.load.tilemapTiledJSON('map5', 'assets/level5.json');
    
    this.load.spritesheet('tiled', 'assets/tiledmap.png', {frameWidth: 64, frameHeight: 64});

    this.load.spritesheet('bunbun', 'assets/bunbun.png', { frameWidth: 64, frameHeight: 128});

    this.load.spritesheet('carrot', 'assets/carrot.png', { frameWidth: 64, frameHeight: 64});

    //this.load.image('carrot', 'assets/carrot.png');
    this.load.image('mole', 'assets/mole.png');

    this.load.image('background1', 'assets/bg1.png');
    this.load.image('background2', 'assets/bg2.png');

    this.load.image('heart', 'assets/heart.png');

    this.load.image('goldencarrot', 'assets/goldencarrot.png');

    this.load.audio('jump', 'assets/music/jump.mp3');
    this.load.audio('fail', 'assets/music/fail.mp3');

}

create() {

    this.jumpSound = this.sound.add('jump');
    this.hitSound = this.sound.add('fail');

    this.bg1= this.add.tileSprite(0,0, this.game.config.width, this.game.config.height,"background1");
    this.bg1.setOrigin(0.0);
    this.bg1.setScrollFactor(0);

    this.bg2= this.add.tileSprite(0,0, this.game.config.width, this.game.config.height,"background2");
    this.bg2.setOrigin(0.0);
    this.bg2.setScrollFactor(0);

    this.map5 = this.make.tilemap({key: 'map5'});

    // Must match tileSets name
    this.Tiles = this.map5.addTilesetImage('tiledmap','tiled');

    // create the ground layer
    this.groundLayer = this.map5.createDynamicLayer('groundLayer', this.Tiles, 0, 0);

    // Set starting and ending position using name
    this.startPoint3 = this.map5.findObject("Object1", obj => obj.name === "startPoint5");
    this.endPoint3 = this.map5.findObject("Object1", obj => obj.name === "endPoint5");

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

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
    this.heart4 = this.add.image (550,35,'heart').setScrollFactor(0);
    this.heart5 = this.add.image (500,35,'heart').setScrollFactor(0);
    //console.log('player ', this.player.x, this.player.y);

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ collide: true });
    
    this.physics.add.collider(this.groundLayer, this.player);


    // Add random carrots
    this.carrotGroup = this.physics.add.group({
        key: 'carrot',
        repeat: 5,
        setXY: { x: 600, y: 10, stepX: Phaser.Math.Between(500, 600) }
        });

    // Add random mole
    this.mole = this.physics.add.group({
        key: 'mole',
        repeat: 8,
        setXY: { x: 300, y: 10, stepX: Phaser.Math.Between(300, 1500) }
    });

    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.moveLeft, callbackScope: this, loop: true });
    this.timedEvent2 = this.time.addEvent({ delay: 2000, callback: this.moveRight, callbackScope: this, loop: true });

     //animate carrot
     this.anims.create({
        key: 'spinCarrot',
        frames: this.anims.generateFrameNumbers('carrot'),
        frameRate: 3,
        yoyo: true,
        repeat: -1
        });

    this.carrotGroup.children.iterate(carrot => {
        carrot.play('spinCarrot')
      })
      
    //golden carrot
    this.goldenCarrot = this.physics.add.group({
        key: 'goldencarrot',
        setXY: { x: 5659, y: 250, }
    });

    this.physics.add.overlap(this.player, this.carrotGroup,this.hitCarrot, null, this );
    this.physics.add.overlap(this.player, this.mole,this.hitMole, null, this );
    this.physics.add.overlap(this.player, this.goldenCarrot,this.hitGoldenCarrot, null, this );
    this.physics.add.overlap(this.carrotGroup, this.mole,this.removeCarrot, null, this );

    // // Collide platform with stars
    // this.physics.add.collider(this.platformLayer, this.stars);
    this.physics.add.collider(this.groundLayer, this.carrotGroup);
    this.physics.add.collider(this.groundLayer, this.mole);
    this.physics.add.collider(this.groundLayer, this.goldenCarrot);

    // this.physics.add.overlap(this.player, this.stars,this.collectStars, null, this );

    //this.add.text(30,20, 'Level 5', { font: '30px Lemon Bird', fill: '#A92C4B' }).setScrollFactor(0);
    this.add.text(30,20, 'Level 5', { font: '30px Arial Black', fill: '#A92C4B' }).setScrollFactor(0);

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
  this.cameras.main.setBounds(0, 0, this.map5.widthInPixels, this.map5.heightInPixels);

  // make the camera follow the this.player
  this.cameras.main.startFollow(this.player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#A6D2CE');

}

hitCarrot(player,carrot) {
    //carrot.disableBody(true, true);
    console.log('Hit carrot, restart game');
    //this.scene.pause();
    this.hitSound.play();
    this.cameras.main.shake(100);
    // delay 1 sec

    this.life = this.life -1;

        carrot.disableBody(true, true);

    console.log('life', this.life);

    if ( this.life === 4) {
        this.heart1.setVisible(false);

    // } else if ( this.life === 4) {
    //     this.heart1.setVisible(false);

    } else if ( this.life === 3) {
        this.heart2.setVisible(false);

    } else if ( this.life === 2) {
        this.heart3.setVisible(false);

    } else if ( this.life === 1) {
        this.heart4.setVisible(false);

    } else if ( this.life === 0) {
        this.heart5.setVisible(false);

    } 
    
    if (this.life < 0 )

        {  this.time.delayedCall(500,function() {
        this.life = 5;

        this.scene.stop("level5Scene");
        this.scene.start("goScene5");
        },[], this);
        } 
}

hitMole(player,mole) {
    //carrot.disableBody(true, true);
    console.log('Hit carrot, restart game');
    //this.scene.pause();
    this.hitSound.play();
    this.cameras.main.shake(100);
    // delay 1 sec

    this.life = this.life -1;

    console.log('this.life',this.life);

        mole.disableBody(true, true);

    if ( this.life === 4) {
        this.heart1.setVisible(false);

    // } else if ( this.life === 4) {
    //     this.heart1.setVisible(falsess);

    } else if ( this.life === 3) {
        this.heart2.setVisible(false);

    } else if ( this.life === 2) {
        this.heart3.setVisible(false);

    } else if ( this.life === 1) {
        this.heart4.setVisible(false);

    } else if ( this.life === 0) {
        this.heart5.setVisible(false);

    } 
    
    if (this.life < 0 )

        {  this.time.delayedCall(500,function() {
        this.life = 5;

        this.scene.stop("level5Scene");
        this.scene.start("goScene5");
        },[], this);
        } 
}

hitGoldenCarrot(player,goldencarrot) {

    //this.scene.pause(5000);

    console.log('Hit carrot, restart game');

        goldencarrot.disableBody(true, true);
}

removeCarrot(carrot,mole) {
    
    carrot.disableBody(true, true);
    
}

moveLeft(mole) {
    this.tweens.add({
        targets: this.mole.getChildren().map(function (c) { return c.body.velocity }),
        x: Phaser.Math.Between(-50, -50) ,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
}
moveRight(mole) {
    this.tweens.add({
        targets: this.mole.getChildren().map(function (c) { return c.body.velocity }),
        x:  Phaser.Math.Between(50, 50),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: false
    });
}


update() {

    if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);
        this.player.flipX = false; 
    }

    var pointer = this.input.activePointer;
    
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

    this.input.on('pointerdown', function (pointer) {

    if (this.input.on && this.player.body.onFloor())
    {
        this.jumpSound.play();
        this.player.body.setVelocityY(-400); 
        this.player.anims.play('jump', true);       
    }
     else {
         if (this.player.body.onFloor())
        {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);       
        }
    }
    }, this);

     if (this.space.isDown && this.player.body.onFloor())
        {
        this.jumpSound.play();
        this.player.body.setVelocityY(-400); 
        this.player.anims.play('jump', true);       
        }

    else {
        if(this.player.body.onFloor())
        {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);       
        }
    };


    var dist = 5659 - this.player.x;


    if ( dist < -50) {
        console.log('this.player.x');
        //this.cameras.main.shake(500);
        this.time.delayedCall(500,function() {
            this.scene.stop("level5Scene");
            this.scene.start("youWonScene");
        },[], this);
    }

    var dist2 = 600 - this.player.y;


    if ( dist2 < -500) {
        //console.log('this.map2');
        //this.cameras.main.shake(500);
        this.time.delayedCall(500,function() {
            this.life = 5;
            this.scene.restart();
            //this.scene.start("goScene5");
        },[], this);
    }
  
    this.bg1.tilePositionX = this.cameras.main.scrollX * .2
    this.bg2.tilePositionX = this.cameras.main.scrollX * .7

    }
}

