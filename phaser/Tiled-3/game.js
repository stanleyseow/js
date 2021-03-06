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

var game = new Phaser.Game(config);


function preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/Tiled-4.json');
    
    this.load.spritesheet('tiles', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});

    this.load.image('coin', 'assets/goldCoin.png');

    this.load.atlas('player', 'assets/player.png', 'assets/player.json');

}

function create() {
    map = this.make.tilemap({key: 'map'});
    
    // Must match tileSets name
    var coinTiles = map.addTilesetImage('coinGold','coin');

    // Must match tileSets name
    var Tiles = map.addTilesetImage('tiles64x64', 'tiles');


    // create the ground layer
    groundLayer = map.createDynamicLayer('groundLayer', Tiles, 0, 0);
    platformLayer = map.createDynamicLayer('platformLayer', Tiles, 0, 0);

    // add coins as tiles
    coinLayer = map.createDynamicLayer('coinLayer', coinTiles, 0, 0);

    // create the player sprite    
    player = this.physics.add.sprite(200, 200, 'player');
    player.setBounce(0.5); // our player will bounce from items
    
    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width, player.height-8);
    player.setCollideWorldBounds(true); // don't go out of the map    

    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);
    platformLayer.setCollisionByExclusion([-1]);
    
    this.physics.add.collider(groundLayer, player);
    this.physics.add.collider(platformLayer, player);

    //  "firstgid":17 , this is the index number
    //coinLayer.setTileIndexCallback(17, collectCoin, this);
    this.physics.add.overlap(player, coinLayer, collectCoin, null, this);

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
function collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    // score++; // add 10 points to the score
    // text.setText(score); // set the text to show the current score
    return false;
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




