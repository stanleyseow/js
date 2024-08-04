class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }

  preload() {
    // Step 1
    // this is the exported JSON map file
    this.load.tilemapTiledJSON("level1", "assets/Tutorial.tmj");

    // Step 2
    this.load.image("buildingIMG", "assets/Buildings32x32.png");
    this.load.image("streetIMG", "assets/Street32x32.png");
    this.load.image("pipoyaIMG", "assets/pipoya.png");
    this.load.image("tuxmonIMG", "assets/tuxmon-32x32.png");

    this.load.spritesheet("fire", "assets/fire.png", {
      frameWidth: 40,
      frameHeight: 70,
    });

    this.load.spritesheet("gen", "assets/green-apron.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    console.log("*** world scene");

    // Create the map from main
    let map = this.make.tilemap({ key: "level1" });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildingTiles = map.addTilesetImage("Buildings32x32", "buildingIMG");
    let streetTiles = map.addTilesetImage("Street32x32", "streetIMG");
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoyaIMG");
    let tuxmonTiles = map.addTilesetImage("tuxmon-32x32", "tuxmonIMG");

    let tilesArray = [buildingTiles, streetTiles, pipoyaTiles, tuxmonTiles];

    //Load in layers by layers
    this.groundLayer = map.createLayer("ground Layer", tilesArray, 0, 0);
    this.coneLayer = map.createLayer("coneLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("buildingLayer", tilesArray, 0, 0);

    let fire1 = map.findObject("objectLayer", (obj) => obj.name === "fire1");
    let fire2 = map.findObject("objectLayer", (obj) => obj.name === "fire2");
    let fire3 = map.findObject("objectLayer", (obj) => obj.name === "fire3");
    let fire4 = map.findObject("objectLayer", (obj) => obj.name === "fire4");

    this.anims.create({
      key: "fireAnim",
      frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.fire1 = this.add.sprite(fire1.x, fire1.y, "fire").play("fireAnim");
    this.fire2 = this.add.sprite(fire2.x, fire2.y, "fire").play("fireAnim");
    this.fire3 = this.add.sprite(fire3.x, fire3.y, "fire").play("fireAnim");
    this.fire4 = this.add.sprite(fire4.x, fire4.y, "fire").play("fireAnim");

    this.anims.create({
      key: "gen-up",
      frames: this.anims.generateFrameNumbers("gen", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-left",
      frames: this.anims.generateFrameNumbers("gen", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-down",
      frames: this.anims.generateFrameNumbers("gen", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-right",
      frames: this.anims.generateFrameNumbers("gen", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    // gen is the alias in preload
    this.player = this.physics.add.sprite(300, 300, "gen");

    // debug player
    window.player = this.player;

    // Add any text to the game
    // this.add.text(10, 10, "Add any text here", {
    //   font: "30px Courier",
    //   fill: "#00FFFF",
    // });

    // Add main player here with physics.add.sprite

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);
  } /////////////////// end of create //////////////////////////////

  update() {
    let speed = 200;

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play("gen-left", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play("gen-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play("gen-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play("gen-down", true);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }
  } /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1", {
      player: player,
      inventory: this.inventory,
    });
  }
} //////////// end of class world ////////////////////////
