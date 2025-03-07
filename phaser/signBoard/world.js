class world extends Phaser.Scene {
  constructor() {
    super("world");
  }

  // incoming data from scene below
  init(data) {}

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap", "assets/RafflesklMap.json");

    // this.load.image("road", "assets/road.png");
    this.load.image("kenny", "assets/kenny.png");
    this.load.image("pippoya", "assets/pippoya.png");
    this.load.image("raffles", "assets/rafflesTiless-01.png");
    this.load.image("tree", "assets/tree.png");
    this.load.image("TY_city1Img", "assets/TY_city1.png");
    this.load.image("TY_city2Img", "assets/TY_city2.png");
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
    let city1Tiles = map.addTilesetImage("TY_city1", "TY_city1Img");

    let tilesArray = [kennyTiles, rafflesTiles, pippoyaTiles, treeTiles, city1Tiles];

    // Step 5  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.decorLayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("BuildingLayer", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(200, 200, "down");

    // Enable debugging
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);

    this.decorLayer.setCollisionByExclusion(-1, true);
    this.buildingLayer.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, this.decorLayer);
    this.physics.add.collider(this.player, this.buildingLayer);

    this.SIGN1 = map.findObject("objectLayer", (obj) => obj.name === "sign1");
    this.SIGN2 = map.findObject("objectLayer", (obj) => obj.name === "sign2");
    this.SIGN3 = map.findObject("objectLayer", (obj) => obj.name === "sign3");

    this.popUp1Area = new Phaser.Geom.Rectangle(
      this.SIGN1.x,
      this.SIGN1.y,
      this.SIGN1.width,
      this.SIGN1.height
    );

    this.popUp2Area = new Phaser.Geom.Rectangle(
      this.SIGN2.x,
      this.SIGN2.y,
      this.SIGN2.width,
      this.SIGN2.height
    );

    this.popUp3Area = new Phaser.Geom.Rectangle(
      this.SIGN3.x,
      this.SIGN3.y,
      this.SIGN3.width,
      this.SIGN3.height
    );

    this.dialogText = this.add
    .text(0, 0, "", { font: "16px Arial Black", fill: "#ff00ff", stroke: '#000000', strokeThickness: 4 })
    .setOrigin(0.5)  // Center the text
    .setDepth(100)   // Make sure it's above other elements
    .setVisible(false); // Hide it initially

  } /////////////////// end of create //////////////////////////////

  update() {

    this.dialogText.setVisible(false);


    // Now handle dialog text display
    if (this.popUp1Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("This is popup1");
      this.dialogText.setVisible(true);
    } 
    else if (this.popUp2Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("This is popup2");
      this.dialogText.setVisible(true);
    }
    else if (this.popUp3Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("This is popup3");
      this.dialogText.setVisible(true);
    }
    
    // Update the text position to be above the player
    if (this.dialogText.visible) {
      this.dialogText.x = this.player.x;
      this.dialogText.y = this.player.y - 40; // 40 pixels above the player
    }

    if (
      this.player.x > 325 &&
      this.player.x < 345 &&
      this.player.y > 1072 &&
      this.player.y < 1095
    ) {
      this.room1();
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
  } /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1");
  }


} //////////// end of class world ////////////////////////
