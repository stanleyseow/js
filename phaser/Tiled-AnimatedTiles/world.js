class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {}

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("map", "assets/AnimatedTiles.tmj");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("cavePng", "assets/cave.png");
    this.load.image("objectsPng", "assets/objects.png");
    this.load.image("overworldPng", "assets/overworld.png");

    this.load.scenePlugin({
      key: 'AnimatedTiles',
      //url: 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js',
      url: 'AnimatedTiles.js',
      sceneKey: 'animatedTiles'
  });

  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "map" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let caveTiles = map.addTilesetImage("cave", "cavePng");
    let objectsTiles = map.addTilesetImage("objects", "objectsPng");
    let overworldTiles = map.addTilesetImage("overworld", "overworldPng");

    let tilesArray = [caveTiles, objectsTiles, overworldTiles];

    // Step 5  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.waterLayer = map.createLayer("waterLayer", tilesArray, 0, 0);
    this.fireLayer = map.createLayer("fireLayer", tilesArray, 0, 0);

    // Init animations on map
    this.animatedTiles.init(map);


    // Add main player here with physics.add.sprite

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);


  } /////////////////// end of create //////////////////////////////

  update() {
    //this.animatedTiles.updateAnimatedTiles();

  } /////////////////// end of update //////////////////////////////

  

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
  }
} //////////// end of class world ////////////////////////
