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

var game = new Phaser.Game(config);


function preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/Tiled-5.json');
    
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

    // add coins as tiles
    //coinLayer = map.createDynamicLayer('coinLayer', coinTiles, 0, 0);

    // create the player sprite    
    player = this.physics.add.sprite(200, 200, 'player');
    player.setBounce(0.1); // our player will bounce from items
    
    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width, player.height-8);
    player.setCollideWorldBounds(true); // don't go out of the map    
      
    // Set player to starting position
    player.setPosition(game.height, 0);  


    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // the player will collide with this layer
    groundLayer.setCollisionByProperty({ collides: true });
    platformLayer.setCollisionByProperty({ collides: true });
    
    this.physics.add.collider(groundLayer, player);
    this.physics.add.collider(platformLayer, player);

    //  "firstgid":17 , this is the index number
    //coinLayer.setTileIndexCallback(17, collectCoin, this);
    //this.physics.add.overlap(player, coinLayer,collectCoin, null, this );

    // Add random stars
    stars = this.physics.add.group({
        key: 'star',
        repeat: 40,
        setXY: { x: 200, y: 0, stepX: Phaser.Math.Between(100, 200) }
    });

    // Collide platform with stars
    this.physics.add.collider(platformLayer, stars);
    this.physics.add.collider(groundLayer, stars);

    this.physics.add.overlap(player, stars,collectStars, null, this );

     // Add random bomb
     bombs = this.physics.add.group({
        key: 'bomb',
        repeat: 30,
        setXY: { x: 300, y: 0, stepX: Phaser.Math.Between(200, 300) }
    });

    // Collide platform with stars
    this.physics.add.collider(platformLayer, bombs);
    this.physics.add.collider(groundLayer, bombs);

    this.physics.add.overlap(bombs, stars, removeBombs, null, this );


    // this text will show the score
    starText = this.add.text(20, 20, '1', {
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

// this function will be called when the player touches a coin
// function collectCoin(sprite, tile) {
//     coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
//     // score++; // add 10 points to the score
//     // text.setText(score); // set the text to show the current score
//     return false;
// }

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

    
}

