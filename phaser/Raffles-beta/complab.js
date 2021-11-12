class complab extends Phaser.Scene {
  constructor() {
    super("complab");
  }

  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("complab", "assets/BlockA-computerLab.json");

    // this.load.image("road", "assets/road.png");
    this.load.image("atlasPng", "assets/atlas32x32.png");
    this.load.image("modernPng", "assets/mordern32x32.png");
  }

  create() {
    console.log("*** lobbyA scene");

    let map = this.make.tilemap({ key: "complab" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let atlasTiles = map.addTilesetImage("atlas32x32", "atlasPng");
    let modernTiles = map.addTilesetImage("mordern32x32", "modernPng");

    let tileArray = [atlasTiles, modernTiles];

    this.bgLayer = map.createLayer("backgroundLayer", tileArray, 0, 0);
    this.frameLayer = map.createLayer("frameLayer", tileArray, 0, 0);
    this.carpetLayer = map.createLayer("carpetLayer", tileArray, 0, 0);
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

    this.add.sprite(1046, 440, "lect").play("lectAnim");

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);
  }

  update() {
    // check for BlockA exit
    if (this.player.x < 117 && this.player.y > 400 && this.player.y < 500) {
      this.blockA();
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
  blockA(player, tile) {
    console.log("Jump to blockA");
    let playerPos = {};
    playerPos.x = 1152;
    playerPos.y = 450;
    playerPos.dir = "left";

    this.scene.start("blockA", { playerPos: playerPos });
  }
}
