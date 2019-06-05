var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);
let player;
let controls;

function preload() {

    // Load player
    this.load.spritesheet('dude',
        'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        }
    );

    // Load the tiles image
    this.load.image("tiles", "assets/tilesets/tuxmon-sample-32px-extruded.png");

    // Load the exported TiledJSON map
    this.load.tilemapTiledJSON("map", "assets/tuxemon-town.json");

}

function create() {

    const map = this.make.tilemap({
        key: "map"
    });

    // Parameters are the name you gave the tileset in Tiled 
    // and then the key of the tileset image above in preload()

    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({
        collides: true
    });


//     player = this.physics.add.sprite(100, 100, 'dude');
//
//    // Do not go out of screen
//    player.setCollideWorldBounds(true);
//    this.physics.add.collider(player, worldLayer);
//    
//    this.anims.create({
//        key: 'left',
//        frames: this.anims.generateFrameNumbers('dude', {
//            start: 0,
//            end: 3
//        }),
//        frameRate: 10,
//        repeat: -1
//    });
//
//    this.anims.create({
//        key: 'turn',
//        frames: [{
//            key: 'dude',
//            frame: 4
//        }],
//        frameRate: 20
//    });
//
//    this.anims.create({
//        key: 'right',
//        frames: this.anims.generateFrameNumbers('dude', {
//            start: 5,
//            end: 8
//        }),
//        frameRate: 10,
//        repeat: -1
//    });

    

 const camera = this.cameras.main;

  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5
  });

  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    

}

function update(time, delta) {

//    if (cursors.left.isDown) {
//        player.setVelocityX(-160);
//        //player.anims.play('turn');
//    } else if (cursors.right.isDown) {
//        player.setVelocityX(160);
//        //player.anims.play('turn');
//    } else if (cursors.up.isDown) {
//        player.setVelocityY(-160);
//        //player.anims.play('turn');
//    } else if (cursors.down.isDown) {
//        player.setVelocityY(160);
//        //player.anims.play('turn');
//    } else {
//        player.setVelocityX(0);
//        player.setVelocityY(0);
//        //player.anims.play('turn');
//    }


    controls.update(delta);
    
}
