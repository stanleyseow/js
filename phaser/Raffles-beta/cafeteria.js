class cafeteria extends Phaser.Scene {
  constructor() {
    super("cafeteria");
  }

  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("cafeteria", "assets/cafeteria.json");

    // this.load.image("road", "assets/road.png");
    this.load.image("atlasPng", "assets/atlas32x32.png");
    this.load.image("modernPng", "assets/mordern32x32.png");
    this.load.image("interiorPng", "assets/interior32x32.png");
  }

  create() {
    console.log("*** cafeteria scene");

    let map = this.make.tilemap({ key: "cafeteria" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let atlasTiles = map.addTilesetImage("atlas32x32", "atlasPng");
    let modernTiles = map.addTilesetImage("mordern32x32", "modernPng");
    let interiorTiles = map.addTilesetImage("interior32x32", "interiorPng");

    let tileArray = [atlasTiles, modernTiles, interiorTiles];

    this.bgLayer = map.createLayer("groundLayer", tileArray, 0, 0);
    this.frameLayer = map.createLayer("frameLayer", tileArray, 0, 0);
    this.furnitueLayer = map.createLayer("furnitureLayer", tileArray, 0, 0);
    this.itemLayer = map.createLayer("itemLayer", tileArray, 0, 0);

    this.physics.world.bounds.width = this.bgLayer.width;
    this.physics.world.bounds.height = this.bgLayer.height;

    this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      this.playerPos.dir
    );

    // enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // Add NPC here
    this.add.sprite(292, 286, "cafe").play("cafeAnim");

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);
  }

  update() {
    // check for cafeteria to blockD class
    if (this.player.x < 50 && this.player.y > 495 && this.player.y < 590) {
      this.blockD();
    }

    // check for cafeteria exit
    if (this.player.x > 1225 && this.player.y > 429 && this.player.y < 522) {
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

  blockD(player, tile) {
    console.log("blockD function");
    let playerPos = {};
    playerPos.x = 1205;
    playerPos.y = 540;
    playerPos.dir = "left";

    this.scene.start("blockDclass", { playerPos: playerPos });
  }

  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 1625;
    playerPos.y = 420;
    playerPos.dir = "down";

    this.scene.start("world", { playerPos: playerPos });
  }
}
