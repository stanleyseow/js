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

    this.load.spritesheet("fire", "assets/fire.png", {
      frameWidth: 40,
      frameHeight: 70,
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

    let tilesArray = [buildingTiles, streetTiles];

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

    // gen is the alias in preload
    this.player = this.physics.add.sprite(400, 400, "gen");

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
    this.cameras.main.startFollow(this.player, true);

  } /////////////////// end of create //////////////////////////////

  update() {

    const walkSpeed = 200;
    const runSpeed = 400;

    let isRunning = this.cursors.shift.isDown;
    let currentSpeed = isRunning ? runSpeed : walkSpeed;
    let isMoving = false;


    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-currentSpeed);
      this.player.anims.play(isRunning ? 'genrun-left' : 'gen-left', true);
      isMoving = true;

    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(currentSpeed);
      this.player.anims.play(isRunning ? 'genrun-right' : 'gen-right', true);
      isMoving = true;

    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-currentSpeed);
      //this.player.anims.play("gen-up", true);
      this.player.anims.play(isRunning ? 'genrun-up' : 'gen-up', true);
      isMoving = true;

    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(currentSpeed);
      //this.player.anims.play("gen-down", true);
      this.player.anims.play(isRunning ? 'genrun-down' : 'gen-down', true);
      isMoving = true;
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
