class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap", "assets/RafflesklMap.json");

    // // Step 2 : Preload any images here, nickname, filename

    this.load.image("kenny", "assets/kenny.png");
    this.load.image("pippoya", "assets/pippoya.png");
    this.load.image("raffles", "assets/rafflesTiless-01.png");
    this.load.image("tree", "assets/tree.png");
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "worldmap" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let kennyTiles = map.addTilesetImage("kenny03", "kenny");
    let rafflesTiles = map.addTilesetImage("raffles01", "raffles");
    let pippoyaTiles = map.addTilesetImage("pippoya05", "pippoya");
    let treeTiles = map.addTilesetImage("tree04", "tree");

    let tilesArray = [kennyTiles, rafflesTiles, pippoyaTiles, treeTiles];

    // Step 5  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.decorLayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("BuildingLayer", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // Object layers
    // var startPoint = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "startPoint"
    // );
    // var start = map.findObject("objectLayer", (obj) => obj.name === "start");
    // this.player = this.physics.add.sprite(start.x, start.y, "up");

    // Receive position fropm init()
    this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      this.playerPos.dir
    );

    window.player = this.player;

    this.player.setCollideWorldBounds(true);

    this.add.sprite(760, 483, "guard").play("guardAnim");
    this.add.sprite(570, 528, "lect").play("lectAnim");
    this.add.sprite(164, 820, "sas").play("sasAnim");
    this.add.sprite(240, 1100, "lib").play("libAnim");
    this.add.sprite(1720, 420, "cafe").play("cafeAnim");

    this.add.sprite(720, 656, "fren").play("frenAnim");
    this.add.sprite(1122, 570, "boy").play("boyAnim");
    this.add.sprite(1487, 520, "girl").play("girlAnim");
    this.add.sprite(816, 213, "boy2").play("boy2Anim");
    this.add.sprite(340, 600, "girl2").play("girl2Anim");

    // // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);

    this.decorLayer.setCollisionByExclusion(-1, true);
    this.buildingLayer.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, this.decorLayer);
    this.physics.add.collider(this.player, this.buildingLayer);
  }
  /////////////////// end of create //////////////////////////////

  update() {
    // Enter BlockA
    if (
      this.player.x > 340 &&
      this.player.x < 370 &&
      this.player.y < 1082 &&
      this.player.y > 1000
    ) {
      this.blockA();
    }

    // Enter BlockB
    if (
      this.player.x > 500 &&
      this.player.x < 540 &&
      this.player.y < 535 &&
      this.player.y > 500
    ) {
      this.blockB();
    }

    // Enter BlockC
    if (
      this.player.x > 1180 &&
      this.player.x < 1250 &&
      this.player.y < 570 &&
      this.player.y > 500
    ) {
      this.blockC();
    }

    // Enter BlockD
    if (
      this.player.x > 1610 &&
      this.player.x < 1640 &&
      this.player.y < 415 &&
      this.player.y > 350
    ) {
      this.blockD();
    }

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true);
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
  } /////////////////// end of update //////////////////////////////

  blockA(player, tile) {
    console.log("blockA function");
    let playerPos = {};
    playerPos.x = 636;
    playerPos.y = 1103;
    playerPos.dir = "up";

    this.scene.start("blockA", { playerPos: playerPos });
  }

  blockB(player, tile) {
    console.log("blockB function");
    let playerPos = {};
    playerPos.x = 634;
    playerPos.y = 1106;
    playerPos.dir = "up";

    this.scene.start("blockB", { playerPos: playerPos });
  }

  blockC(player, tile) {
    console.log("blockC function");
    let playerPos = {};
    playerPos.x = 633;
    playerPos.y = 1133;
    playerPos.dir = "up";

    this.scene.start("blockC", { playerPos: playerPos });
  }

  blockD(player, tile) {
    console.log("blockD function");
    let playerPos = {};
    playerPos.x = 65;
    playerPos.y = 536;
    playerPos.dir = "right";

    this.scene.start("blockDclass", { playerPos: playerPos });
  }
} //////////// end of class world ////////////////////////
