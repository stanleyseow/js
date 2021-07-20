var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var groundLayer;
var platformLayer;
var coinLayer;
var player;
var stars;
var bombs;

var starText;
var starCount = 0;
var bombText;
var bombCount = 0;

var startPoint;
var endPoint;

var star1;
var star2;

var game = new Phaser.Game(config);


function preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/Tiled-6.json');
    
    this.load.spritesheet('tiles64x64', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});

    //this.load.image('goldCoin', 'assets/goldCoin.png');

    this.load.atlas('player', 'assets/player.png', 'assets/player.json');

    this.load.image('star', 'assets/star.png');

    this.load.image('bomb', 'assets/bomb.png');

}

function create() {
    map = this.make.tilemap({key: 'map'});
    
    // Must match tileSets name
   // var coinTiles = map.addTilesetImage('goldCoin');

    // Must match tileSets name
    var Tiles = map.addTilesetImage('tiles64x64');

    // create the ground layer
    groundLayer = map.createDynamicLayer('groundLayer', Tiles, 0, 0);
    platformLayer = map.createDynamicLayer('platformLayer', Tiles, 0, 0);

    // Set starting and ending position using name
    startPoint = map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    endPoint = map.findObject("ObjectLayer", obj => obj.name === "endPoint");

    //console.log('startPoint ', startPoint.x, startPoint.y);
    //console.log('endPoint ', endPoint.x, endPoint.y);
    

    // add coins as tiles
    //coinLayer = map.createDynamicLayer('coinLayer', coinTiles, 0, 0);

    // create the player sprite    
    player = this.physics.add.sprite(200, 200, 'player');
    player.setBounce(0.1); // our player will bounce from items
    
    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width, player.height-8);
    player.setCollideWorldBounds(true); // don't go out of the map  

    // Set player to starting position
    player.setPosition(startPoint.x, startPoint.y);  

    // this.tweens.add({
    //     targets: player,
    //     x: '-=100',
    //     ease: 'Sine.easeInOut',
    //     yoyo: true,
    //     repeat: 3
    // });

    console.log('player ', player.x, player.y);
    
    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // the player will collide with this layer
    groundLayer.setCollisionByProperty({ collides: true });
    platformLayer.setCollisionByProperty({ collides: true });
    
    this.physics.add.collider(groundLayer, player);
    this.physics.add.collider(platformLayer, player);

    timedEvent = this.time.addEvent({ delay: 2000, callback: dropStars, callbackScope: this, loop: true });
    timedEvent2 = this.time.addEvent({ delay: 10000, callback: clearStars, callbackScope: this, loop: true });

    // Create the physics groups for stars
    this.stars = this.physics.add.group({defaultKey: 'star'})

    // Collide platform with stars
    this.physics.add.collider(platformLayer, this.stars);
    this.physics.add.collider(groundLayer, this.stars);

    this.physics.add.overlap(player, this.stars,collectStars, null, this );

        
    // this text will show the score
    starText = this.add.text(20, 20, '0', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    starText.setScrollFactor(0);
    starText.visible = true;

    bombText = this.add.text(20,50, '0', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    bombText.setScrollFactor(0);
    bombText.visible = true;


    // player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: 'idle',
        frames: [{key: 'player', frame: 'p1_stand'}],
        frameRate: 10,
    });

    cursors = this.input.keyboard.createCursorKeys();

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  // make the camera follow the player
  this.cameras.main.startFollow(player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');

}

function collectStars(player, stars) {
    stars.disableBody(true, true);
    starCount += 1; // add 10 points to the score
    console.log(starCount);
    starText.setText(starCount); // set the text to show the current score
    return false;
}

function removeBombs(bombs,stars) {
    bombs.disableBody(true, true);
}

function dropStars ()
{
    // Add random stars
    console.log('Dropping stars');
    this.stars.createMultiple({
        key: 'star',
        repeat: 20,
        setXY: { x: 0, y: Phaser.Math.Between(0, 200), stepX: Phaser.Math.Between(100, 400) }
    })

}

function clearStars() {
    console.log('Clearing stars');    
    this.stars.clear(true,true);
    
    //this.physics.world.removeCollider(star1);
    //this.physics.world.removeCollider(star2);
}

function update() {


    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-200);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(200);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-500);        
    }


    // Check for reaching endPoint object
    if ( player.x >= endPoint.x && player.y >= endPoint.y ) {
        console.log('Reached endPoint');
    }
    
}

