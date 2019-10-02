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

var ladder = false;

var game = new Phaser.Game(config);

function preload() {
    this.load.tilemapTiledJSON('map', 'assets/Tiled-9.json');
    this.load.spritesheet('tiles', 'assets/tiles64x64.png', {
        frameWidth: 64,
        frameHeight: 64
    });
    this.load.atlas('player', 'assets/player.png', 'assets/player.json');
    this.load.image('gold', 'assets/goldCoin.png');
    this.load.image('ladder', 'assets/ladder64x64.png');
}

function create() {
    this.map = this.make.tilemap({
        key: 'map'
    });

    // Must match tileSets name above ( tiles64x64 )
    this.Tiles = this.map.addTilesetImage('tiles64x64', 'tiles');
    this.Coins = this.map.addTilesetImage('goldCoin', 'gold');
    this.Ladders = this.map.addTilesetImage('ladder64x64', 'ladder');
    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundLayer', this.Tiles, 0, 0);
    this.platformLayer = this.map.createDynamicLayer('platformLayer', this.Tiles, 0, 0);
    this.ladderLayer = this.map.createDynamicLayer('ladderLayer', this.Ladders, 0, 0);
    this.coinLayer = this.map.createDynamicLayer('coinLayer', this.Coins, 0, 0);

    window.ladder = this.coinLayer;

    // create the this.player sprite    
    this.player = this.physics.add.sprite(0, 0, 'player');
    this.player.setBounce(0.1); // our this.player will bounce from items
    this.player.setOrigin(0.5, 0);
    this.player.setCollideWorldBounds(true); // don't go out of the map  
    this.player.setPosition(0, 0);

    window.player = this.player;

    //this.physics.add.overlap(this.coinLayer, this.player );
    //this.coinLayer.setTileIndexCallback(17, allowBox,this );

    // See JSON file for ladder, "firstgid":18
    this.ladderLayer.setTileIndexCallback(18, allowClimb, this);
    this.physics.add.overlap(this.ladderLayer, this.player);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({
        collides: true
    });
    this.platformLayer.setCollisionByProperty({
        collides: true
    });

    // Collides with platform and ground
    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.platformLayer, this.player);

    // this.player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {
            prefix: 'p1_walk',
            start: 1,
            end: 11,
            zeroPad: 2
        }),
        frameRate: 10,
        repeat: -1
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: 'idle',
        frames: [{
            key: 'player',
            frame: 'p1_stand'
        }],
        frameRate: 10,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the this.player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');

}

function allowClimb(sprite, tile) {
    //console.log('Allow Climb');
    this.distance = Math.abs(this.player.x - (tile.pixelX + tile.width / 2));
    //console.log(this.player.x, tile.pixelX, this.distance);

    this.onLadder = true;
}

function update() {

    this.player.body.debugBodyColor = this.player.body.onOverlap ? 0x00ffff : 0xffff00;

    if (this.onLadder) {
        //console.log('Gravity 0');
        this.player.setGravityY(0);
        // Prevent any gravity on body
        this.player.body.setAllowGravity(false);
    } else {
        //console.log('Gravity 300');
        this.player.setGravityY(300);
        // Re-enable gravity on body
        this.player.body.setAllowGravity(true);
    }

    if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play('walk', true);
        this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
        this.player.anims.play('walk', true);
        this.player.flipX = false;
    } else if (this.cursors.up.isDown && this.onLadder == false) {
        // Jump
        this.player.body.setVelocityY(-300);
    } else if (this.cursors.up.isDown && this.onLadder == true) {
        // On ladder, climb up , -Y
        this.player.anims.play('idle', true);
        this.player.setGravityY(0);
        this.player.setVelocityY(-100);
    } else if (this.cursors.down.isDown && this.onLadder == true) {
        // On ladder, climb down , +Y
        this.player.anims.play('idle', true);
        this.player.setGravityY(0);
        this.player.setVelocityY(100);
    } else if (this.onLadder) {
        // Disable gravity on body
        this.player.body.setVelocityX(0);
        this.player.body.setVelocityY(0);
        this.player.anims.play('idle', true);
    } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play('idle', true);
    }

    // Reset onLadder flag 
    this.onLadder = false;
}