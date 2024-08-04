class world extends Phaser.Scene {
  constructor() {
    super("world");
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
  }


  preload() {
    //this.load.spritesheet('gen', 'assets/blank-64x64.png', { frameWidth: 64, frameHeight: 64 });
    //this.load.spritesheet('enemy', 'assets/enemy-64x64.png', { frameWidth: 64, frameHeight: 64 });

  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "map1" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pippoyaTiles = map.addTilesetImage("pipoya", "pipoyaImg");

    let tilesArray = [pippoyaTiles];

    // Step 5  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);

   
    this.player = this.physics.add.sprite(500,300, "gen").play("gen-down");
    window.player = this.player;
   
    //this.enemy1 = this.physics.add.sprite(450, 840, "enemy").play("enemy-left");
    //this.enemy2 = this.physics.add.sprite(100, 300, "enemy").play("enemy-down");

    this.enemyGroup = this.physics.add.group({
      key: "enemy",
      repeat: 10,
      setXY: { x: 100, y: 100, stepX: 100, stepY: 0 }
    });
    
    this.enemyGroup.children.iterate( c =>{
      c.play("enemy-down");
    })

    // // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);

    //this.physics.add.collider(this.enemy1, this.enemy2);
    //this.physics.add.collider(this.player, [this.enemy1, this.enemy2]);


    this.physics.add.collider(this.enemyGroup, this.enemyGroup);
    //this.physics.add.collider(this.player, this.enemyGroup);

    this.enemyGroup.children.iterate( c =>{
      this.physics.add.collider(this.player, c);
    })
   
  } /////////////////// end of create //////////////////////////////

  update() {


    this.enemyGroup.children.iterate( c =>{
      this.physics.moveToObject( c, this.player, 700, 3000);
    })
    
    //this.physics.moveToObject( this.enemy1, this.player, 700, 3000);
    //this.physics.moveToObject( this.enemy2, this.player, 700, 3000);


    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('gen-left', true);
  }
  else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('gen-right', true);
  }
  else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play('gen-up', true);
  }
  else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play('gen-down', true);
  }
  else {
      this.player.setVelocity(0);
      this.player.anims.stop();
  }
  
  } /////////////////// end of update //////////////////////////////


} //////////// end of class world ////////////////////////
