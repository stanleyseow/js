class world extends Phaser.Scene {
  constructor() {
    super("world");
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
  }


  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap", "assets/RafflesklMap.tmj");

    // this.load.image("road", "assets/road.png");
    this.load.image("kenny", "assets/kenny.png");
    this.load.image("pippoya", "assets/pippoya.png");
    this.load.image("raffles", "assets/rafflesTiless-01.png");
    this.load.image("tree", "assets/tree.png");

  }

  create() {
    console.log("*** world scene");

     // Call to update inventory items
     this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });

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

    this.player = this.physics.add.sprite(this.playerPos.x, this.playerPos.y, "down");
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    this.fire1 = this.physics.add.sprite(200, 800, "fire").play("fireAnim");

    this.fire2 = this.physics.add.sprite(200, 800, "fire").play("fireAnim");

    this.fire3 = this.physics.add.sprite(200, 800, "fire").play("fireAnim");

    this.tweens.add({
      targets: this.fire1,
      y: 400,
      flipX: true,
      yoyo: true,
      duration: 2000,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.fire2,
      x: 400,
      flipX: true,
      yoyo: true,
      duration: 2000,
      repeat: -1,
    });


    // this.enemy1 = this.physics.add.sprite(451, 840, "enemy").play("enemy-left");
    // this.enemy2 = this.physics.add.sprite(451, 840, "enemy").play("enemy-down");

    //this.enemy1 = this.physics.add.sprite(450, 840, "enemy").play("enemy-left");
    //this.enemy2 = this.physics.add.sprite(450, 840, "enemy").play("enemy-down");

    // // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);

    this.decorLayer.setCollisionByExclusion(-1, false);
    this.physics.add.collider(this.player, this.decorLayer);
    this.physics.add.collider(this.fire1, this.decorLayer);

    this.buildingLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.buildingLayer);

    // Overlap fire and call globalHitFire
    this.physics.add.overlap(this.player, [this.fire1, this.fire2, this.fire3 ], globalHitFire, null, this);


    // start another scene in parallel
    this.scene.launch("showInventory");


  } /////////////////// end of create //////////////////////////////

  update() {
    if (this.player.x > 485 && this.player.x < 517 && this.player.y < 566) {
      this.room1();
    }

    if (this.player.x > 319 && this.player.x < 351 && this.player.y < 1078) {
      console.log("Player touch door");
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
