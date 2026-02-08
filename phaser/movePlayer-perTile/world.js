class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    // Step 2 : Preload any images here
    this.load.image("building", "assets/Buildings32x32.png");
    this.load.image("street", "assets/Street32x32.png");

    this.load.spritesheet("gen", "assets/char-blank-64x64.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    console.log("*** world scene");

    // Loadmaps, hides all the complexity in the functions
    this.loadMaps();

    // Load animations
    this.loadAnimations();

    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(100, 200, "gen").setScale(1);
    this.player.setOrigin(0, 0); // Align to top-left for easier grid math
    this.tileSize = 32;
    this.isMoving = false;

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);
  } /////////////////// end of create //////////////////////////////

  update() {
    if (!this.isMoving) {
      if (this.cursors.left.isDown) {
        this.movePlayer(-1, 0, "gen-left");
      } else if (this.cursors.right.isDown) {
        this.movePlayer(1, 0, "gen-right");
      } else if (this.cursors.up.isDown) {
        this.movePlayer(0, -1, "gen-up");
      } else if (this.cursors.down.isDown) {
        this.movePlayer(0, 1, "gen-down");
      }
    }
  } /////////////////// end of update //////////////////////////////

  movePlayer(dirX, dirY, animKey) {
    // Check if a tween is already running so we don't 'stack' movements
    if (this.isMoving) return;

    this.isMoving = true;

    this.player.anims.play(animKey, true);

    this.tweens.add({
      targets: this.player,
      x: this.player.x + dirX * this.tileSize,
      y: this.player.y + dirY * this.tileSize,
      duration: 200, // Speed of movement
      onComplete: () => {
        this.player.x = Phaser.Math.Snap.To(this.player.x, this.tileSize);
        this.player.y = Phaser.Math.Snap.To(this.player.y, this.tileSize);
        this.isMoving = false;
        this.player.anims.stop();
      },
    });
  }

  loadMaps() {
    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world1" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    let streetTiles = map.addTilesetImage("Street32x32", "street");

    // Step 5  create an array of tiles
    let tilesArray = [buildingTiles, streetTiles];

    // Step 6  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);

    this.streetLayer = map.createLayer("streetLayer", tilesArray, 0, 0);

    this.buildingLayer = map.createLayer("buildingLayer", tilesArray, 0, 0);
  }

  loadAnimations() {
    this.anims.create({
      key: "gen-up",
      frames: this.anims.generateFrameNumbers("gen", { start: 105, end: 112 }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-left",
      frames: this.anims.generateFrameNumbers("gen", { start: 118, end: 125 }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-down",
      frames: this.anims.generateFrameNumbers("gen", { start: 131, end: 138 }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-right",
      frames: this.anims.generateFrameNumbers("gen", { start: 144, end: 151 }),
      frameRate: 16,
      repeat: -1,
    });
  }
} //////////// end of class world ////////////////////////
