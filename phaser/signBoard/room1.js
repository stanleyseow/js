class room1 extends Phaser.Scene {
  constructor() {
    super("room1");

    // Put global variable here
  }

  init(data) {}

  preload() {
    this.load.tilemapTiledJSON("room1", "assets/room1.json");
    this.load.image("pippoyaPNG", "assets/pippoya.png");
  }

  create() {
    console.log("*** room1 scene");

    let map = this.make.tilemap({ key: "room1" });

    let pippoyaTiles = map.addTilesetImage("pippoya", "pippoyaPNG");

    let tilesArray = [pippoyaTiles];

    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(300, 400, "down");

    // Enable debugging
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);
  }

  update() {
    if (this.player.x > 280 && this.player.x < 370 && this.player.y > 490) {
      this.world();
    }

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play("up", true);
      //console.log('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
      this.player.anims.play("down", true);
      //console.log('down');
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }
  }

  // Function to jump to room1
  world(player, tile) {
    console.log("world function");
    this.scene.start("world");
  }
}
