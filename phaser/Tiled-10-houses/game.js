var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 400
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
var ladderLayer;
var item1Layer;
var item2Layer;
var player;
var stars;
var bombs;

var starText;
var starCount = 0;
var bombText;
var bombCount = 0;

var startPoint;
var endPoint;

var ladder = false;

var game = new Phaser.Game(config);


function preload() {

    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/rooftop.json');
    
    this.load.spritesheet('tiles64x64', 'assets/tiles64x64.png', {frameWidth: 64, frameHeight: 64});

    this.load.atlas('player', 'assets/player.png', 'assets/player.json');

    // key must match filename
    this.load.image('ladder64x64', 'assets/ladder64x64.png');

}

function create() {
    map = this.make.tilemap({key: 'map'});
    
    // Add coin tiles & layers 
    //var coinTiles = map.addTilesetImage('goldCoin');
    //coinLayer = map.createDynamicLayer('coinLayer', coinTiles, 0, 0);

    // key must match filename
    var ladderTiles = map.addTilesetImage('ladder64x64');
    // ladderLayer must match Tiled layer name
    ladderLayer = map.createStaticLayer('ladderLayer', ladderTiles, 0, 0);

    // Must match tileSets name above ( tiles64x64 )
    var Tiles = map.addTilesetImage('tiles64x64');
    groundLayer = map.createStaticLayer('groundLayer', Tiles, 0, 0);
    houseLayer = map.createStaticLayer('houseLayer', Tiles, 0, 0);
    item1Layer = map.createDynamicLayer('item1Layer', Tiles, 0, 0);
    item2Layer = map.createDynamicLayer('item2Layer', Tiles, 0, 0);


    // Ladders
    // var Ladders = map.addTilesetImage('ladder');
    // ladderLayer = map.createStaticLayer('ladderLayer', Ladders, 0, 0);
    
    // create the player sprite    
    player = this.physics.add.sprite(0, 0, 'player');
    player.setBounce(0.1); // our player will bounce from items
    
    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width*0.8, player.height*0.8);
    player.setCollideWorldBounds(true); // don't go out of the map  


    // See JSON file for ladder, "firstgid":17
    ladderLayer.setTileIndexCallback(17, allowClimb,this );
    this.physics.add.overlap(ladderLayer, player );

    
    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // the player will collide with this layer
    groundLayer.setCollisionByProperty({ collides: true });
    houseLayer.setCollisionByProperty({ collides: true });

    // Collides with platform and ground
    this.physics.add.collider(groundLayer, player);
    this.physics.add.collider(houseLayer, player);
    
    // Check for overlap with item1 & 2
    this.physics.add.overlap(player, item1Layer,collectItem1, null, this );
    this.physics.add.overlap(player, item2Layer,collectItem2, null, this );

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

    this.cursors = this.input.keyboard.createCursorKeys();

  // set bounds so the camera won't go outside the game world
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  // make the camera follow the player
  this.cameras.main.startFollow(player);

  // set background color, so the sky is not black    
  this.cameras.main.setBackgroundColor('#ccccff');

}


function allowClimb(sprite, tile) {
    //console.log('Allow Climb');
    this.distance = Math.abs(player.x - (tile.pixelX + tile.width / 2)); 
    this.onLadder = true;
}


// this function will be called when the player touches a coin
function collectItem1(sprite, tile) {
    item1Layer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    // score++; // add 10 points to the score
    // text.setText(score); // set the text to show the current score
    return false;
}

// this function will be called when the player touches a coin
function collectItem2(sprite, tile) {
    item2Layer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    // score++; // add 10 points to the score
    // text.setText(score); // set the text to show the current score
    return false;
}

function update() {

    if ( this.onLadder ) {
        //console.log('Gravity 0');
        player.setGravityY(0);
    } else {
        //console.log('Gravity 300');
        player.setGravityY(400);
    }
    if (this.cursors.left.isDown )
    {
        player.body.setVelocityX(-200);
        player.anims.play('walk', true); 
        player.flipX = true;    
    }
    else if (this.cursors.right.isDown)
    {
        player.body.setVelocityX(200);
        player.anims.play('walk', true);
        player.flipX = false; 
    }
    else if (this.cursors.up.isDown && this.onLadder == false )
    {
        // Jump
        player.body.setVelocityY(-300);       
    }
    else if ( this.cursors.up.isDown && this.onLadder == true )
    {
        // Climb up , -Y
        player.anims.play('idle', true);
        player.setGravityY(0);
        player.setVelocityY(-100);
    }
    else if ( this.cursors.down.isDown && this.onLadder == true )
    {
        // Climb down , +Y
        player.anims.play('idle', true);
        player.setGravityY(0);
        player.setVelocityY(100);
    }
    else if ( this.onLadder )
    {
        player.body.setVelocityX(0);
        player.body.setVelocityY(0);
        player.anims.play('idle', true);
    } else 
    {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
    
    // Reset onLadder flag 
    this.onLadder = false;


    
}



function render() {
    this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');
}