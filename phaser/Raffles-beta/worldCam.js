class worldCam extends Phaser.Scene {
  constructor() {
    super({
      key: "worldCam",
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
    console.log("*** worldCam scene");

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

    this.add.sprite(1122, 570, "boy").play("boyAnim");
    this.add.sprite(1487, 520, "girl").play("girlAnim");
    this.add.sprite(816, 213, "boy2").play("boy2Anim");
    this.add.sprite(340, 600, "girl2").play("girl2Anim");

    this.friend = this.physics.add.sprite(720, 656, "fren").play("frenAnim");

    // // create the arrow keys
    // this.cursors = this.input.keyboard.createCursorKeys();

    // // // camera follow player
    // this.cameras.main.startFollow(this.player);

    // Add any text in the main page
    this.add.text(450, 1300, "Click to move camera", {
      font: "30px Courier",
      fill: "#FFFFFF",
    });

    this.add.text(450, 1330, "Spacebar to continue", {
      font: "30px Courier",
      fill: "#FFFFFF",
    });

    // Moving camera on click
    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(678, 1230);

    let pos = 0;
    this.input.on(
      "pointerdown",
      function () {
        const cam = this.cameras.main;

        if (pos === 0) {
          cam.pan(354, 1000, 1000);
          cam.zoomTo(1, 2000);
          pos++;
        } else if (pos === 1) {
          cam.pan(525, 450, 1000);
          cam.zoomTo(2, 2000);
          pos++;
        } else if (pos === 2) {
          cam.pan(1192, 480, 1000);
          cam.zoomTo(3, 2000);
          pos++;
        } else if (pos === 3) {
          cam.pan(1625, 320, 1000);
          cam.zoomTo(2, 2000);
          pos++;
        } else if (pos === 4) {
          cam.pan(678, 1230, 1000, "Sine.easeInOut");
          cam.zoomTo(0.5, 1000);
          pos = 0;
        }
      },
      this
    );

    // Detect spacebar pressed
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto world");
        this.scene.start("world", { playerPos: this.playerPos });
      },
      this
    );
  }
  /////////////////// end of create //////////////////////////////

  update() {} /////////////////// end of update //////////////////////////////
} //////////// end of class world ////////////////////////
