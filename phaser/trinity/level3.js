// collect stars, no enemies
class level3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level3' });
        // Put global variable here
        this.starCount = 0;
    }

preload() {

     // map made with Tiled in JSON format
     this.load.tilemapTiledJSON('map', 'assets/level3.json');
    
     this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 64, frameHeight: 64});
 
     this.load.spritesheet('player','assets/maria.png', {frameWidth: 40, frameHeight: 48});
 
     this.load.spritesheet('mummy', 'assets/corpse1.png', { frameWidth: 37, frameHeight: 45 });

     this.load.spritesheet('mummy2', 'assets/corpse2.png', { frameWidth: 37, frameHeight: 45 });
 
     this.load.image('star', 'assets/photo.png');
 
     this.load.image('coin', 'assets/bread.png');
 
     this.load.image('bg_b', 'assets/bg_b.png');
 
     this.load.image('bg_f', 'assets/bg_f.png');

}

create() {

    // Add the two background for parallax effect
    // create an tiled sprite with the size of our game screen
    this.bg_b = this.add.tileSprite(1, -10, game.config.width, game.config.height, "bg_b");
    this.bg_b.setOrigin(0, 0);
    this.bg_b.setScrollFactor(0);

    // Add a second background layer.
    this.bg_f = this.add.tileSprite(1, 150, game.config.width, game.config.height, "bg_f");
    this.bg_f.setOrigin(0, 0);
    this.bg_f.setScrollFactor(0);


    let map = this.make.tilemap({key: 'map'});
    
    // Must match tileSets name
    let Tiles = map.addTilesetImage('tiles','tiles');

    // create the ground layer
    this.groundLayer = map.createDynamicLayer('groundLayer', Tiles, 0, 0);

    // Set starting and ending position using object names in tiles
    this.startPoint = map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint = map.findObject("ObjectLayer", obj => obj.name === "endPoint");

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

    //console.log('player ', this.player.x, this.player.y);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.groundLayer, this.player);

    // Add random stars
    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 10,
        setXY: { x: 0, y: 0, stepX: Phaser.Math.Between(200, 200) }
    });

    // Collide platform with photo
    this.physics.add.collider(this.groundLayer, this.stars);

    this.physics.add.overlap(this.player, this.stars,this.collectStars, null, this );

    this.add.text(0,560, 'Level 3', { font: '24px Courier', fill: '#FFFFFF' }).setScrollFactor(0);

    // this text will show the score
    this.starText = this.add.text(20, 40, 'Stars 0', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    this.starText.setScrollFactor(0);
    this.starText.visible = true;

    this.anims.create({
        key: 'idle',
        frames: [{
            key: 'player',
            frame: 5
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

 // Add animation for mummy
 this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('mummy'),
    frameRate: 20,
    yoyo: true,
    repeat: -1
});

// Add animation for mummy2
this.anims.create({
key: 'walk',
frames: this.anims.generateFrameNumbers('mummy2'),
frameRate: 10,
yoyo: true,
repeat: -1
});

// create mummies physics group
this.mummies = this.physics.add.group();

this.mummies2 = this.physics.add.group();

// Add members to mummies group
this.mummies.create(400, 600, 'mummy').setScale(1);
this.mummies.create(800, 600, 'mummy').setScale(1);
this.mummies.create(1200, 600, 'mummy').setScale(1);
this.mummies.create(1600, 600, 'mummy').setScale(1);
this.mummies.create(2000, 600, 'mummy').setScale(1);

this.mummies.create(400, 600, 'mummy2').setScale(1);
this.mummies.create(800, 600, 'mummy2').setScale(1);
this.mummies.create(1200, 600, 'mummy2').setScale(1);
this.mummies.create(1600, 600, 'mummy2').setScale(1);
this.mummies.create(2000, 600, 'mummy2').setScale(1);

// Iterate all the children and play animation
this.mummies.children.iterate(mummy => {
mummy.play('walk')
})

this.mummies2.children.iterate(mummy2 => {
mummy2.play('walk')
})

// Add colider to ground and platform
this.physics.add.collider(this.groundLayer, this.mummies);
this.cursors = this.input.keyboard.createCursorKeys();

// set bounds so the camera won't go outside the game world
this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
// make the camera follow the this.player
this.cameras.main.startFollow(this.player);

}

collectStars(player, stars) {
stars.disableBody(true, true);
this.starCount += 1; 
console.log(this.starCount);
this.starText.setText(this.starCount); // set the text to show the current score
return false;
}

removeBombs(bombs,stars) {
bombs.disableBody(true, true);
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

// Make mummies2 walk at speed 
this.mummies2.setVelocityX(80);

// Check for end of screen at right , reset to left
this.mummies2.children.iterate(mummy2 => {
 if ( mummy2.x > this.physics.world.bounds.width + 50 ) {
      mummy2.x = -10;      
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
    this.player.body.setVelocityY(-500);        
}

    //console.log('Current this.player pos ', this.player.x, this.player.y);

    // Check for more then 5 stars
    if ( this.starCount > 10 ) {
        console.log('Collected 1 star, jump to gameoverScene');
        this.scene.stop("level3");
        this.scene.start("gameoverScene");
    }

    // Check for reaching endPoint object
    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
        console.log('Reached endPoint, loading next level');
        this.scene.stop("level3");
        this.scene.start("gameoverScene");
    }
    
    // Parallax scrolling codes
    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.bg_b.tilePositionX = this.cameras.main.scrollX * .2;
    this.bg_f.tilePositionX = this.cameras.main.scrollX * .7;
}


}