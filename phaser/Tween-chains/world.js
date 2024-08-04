class world extends Phaser.Scene {
  constructor() {
    super("world");
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap", "assets/RafflesklMap.json");

    // this.load.image("road", "assets/road.png");
    this.load.image("kenny", "assets/kenny.png");
    this.load.image("pippoya", "assets/pippoya.png");
    this.load.image("raffles", "assets/rafflesTiless-01.png");
    this.load.image("tree", "assets/tree.png");

  }

  create() {
    console.log("*** world scene");

    this.hitSnd = this.sound.add("hitSnd")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: 'worldmap' });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let kennyTiles = map.addTilesetImage("kenny03", "kenny");
    let rafflesTiles = map.addTilesetImage("raffles01", "raffles");
    let pippoyaTiles = map.addTilesetImage("pippoya05", "pippoya");
    let treeTiles = map.addTilesetImage("tree04", "tree");

    let tilesArray = [kennyTiles, rafflesTiles, pippoyaTiles, treeTiles]

    // Step 5  Load in layers by layers 
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    //this.decorLayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    //this.buildingLayer = map.createLayer("BuildingLayer", tilesArray, 0, 0);


    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(255, 255, 'down').setScale(2)
    window.player = this.player

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    //const fx1 = this.player.postFX.addGlow(0xffffff, 4, 0, false, 0.1, 32);
    //const fx2 = this.player.postFX.addGlow(0x00ff00, 0, 0);

    //   this.tweens.add({
    //     targets: fx2,
    //     outerStrength: 10,
    //     yoyo: true,
    //     loop: -1,
    //     ease: 'sine.inout'
    // });

    this.anims.create({
      key: 'wiz',
      frames: this.anims.generateFrameNumbers('u3', 
          { start:32, end:33}),
      frameRate: 5,
      repeat : -1
  })
  

    ////////////////////////////
    // Call to update inventory
    // this.time.addEvent({
    //   delay: 500,
    //   callback: this.updateInventory,
    //   callbackScope: this,
    //   loop: false,
    // });

    
    this.fighter = this.physics.add.sprite(100, 100, "u3").play("fig").setScale(2);
    this.thief = this.physics.add.sprite(400, 100, "u3").play("thi").setScale(2);
    this.paladin = this.physics.add.sprite(100, 100, "u3").play("pal").setScale(2);
    this.wizard = this.physics.add.sprite(200, 200, "u3").play("wiz").setScale(2);
    this.cleric = this.physics.add.sprite(300, 300, "u3").play("cle").setScale(2);

    // new chain replaces timeline in 3.60
    // this.tweens.chain({
    //   loop: -1,
    //   tweens: [
    //     {
    //       targets: this.paladin,
    //       y: 500,
    //       ease: "Sine.easeInOut",
    //       duration: 2000,
    //     },
    //     {
    //       targets: this.paladin,
    //       x: 100,
    //       ease: "Sine.easeInOut",
    //       duration: 2000,
    //     },
    //   ],
    // })

    //cleric
    this.tweens.chain({
      loop: -1, // loop forever
      tweens: [
        {
          targets: this.cleric,
          ease: "Linear",
          duration: 2000,
          x: 500,
        },
        {
          targets: this.cleric,
          ease: "Linear",
          duration: 2000,
          x: 100,
        },
      ]
    });


    // fighter
    // this.tweens.chain({
    //   loop: -1, // loop forever
    //   tweens: [
    //     {
    //       targets: this.fighter,
    //       ease: "Linear",
    //       duration: 2000,
    //       x: 400,
    //       y: 400
    //     },
    //     {
    //       targets: this.thief,
    //       ease: "Sine.easeInOut",
    //       duration: 2000,
    //       x: 100,
    //       y: 400
    //     },
    //     {
    //       targets: this.fighter,
    //       ease: "Linear",
    //       duration: 2000,
    //       x: 100,
    //       y: 100,
    //     },
  
    //     {
    //       targets: this.thief,
    //       ease: "Sine.easeInOut",
    //       duration: 2000,
    //       x: 400,
    //       y: 100,
    //     },
    //   ]
    // });


  //this.physics.add.collider(this.player, this.thief);
  //this.physics.add.collider(this.player, this.wizard);

  //this.physics.add.overlap(this.cleric, this.fighter, overlap2, null, this);
  //   this.physics.add.overlap(this.wizard, this.cleric, overlap3, null, this);
  //   this.physics.add.overlap(this.wizard, this.thief, overlap4, null, this);

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

// // camera follow player
this.cameras.main.startFollow(this.player);


//this.decorLayer.setCollisionByExclusion(-1, true)
//this.buildingLayer.setCollisionByExclusion(-1, true)

// this.physics.add.collider(this.player, this.decorLayer);
// this.physics.add.collider(this.player, this.buildingLayer);

// this.physics.add.overlap(
//   this.player, // player
//   this.paladin,  // enemy
//   this.overlapPaladin,    // function to call 
//   null,
//   this
// );

// this.physics.add.overlap(
//   this.player, // player
//   this.cleric,  // enemy
//   this.overlapCleric,    // function to call 
//   null,
//   this
// );

    // console.log("Launching showInventory")
    // this.scene.launch("showInventory")

  } /////////////////// end of create //////////////////////////////

update() {


  //this.physics.moveToObject( this.cleric, this.player, 30, 5000);

  if (this.player.x > 322 && this.player.x < 345 && this.player.y < 1085 && this.player.y > 975) {
    console.log("Door1")
    this.room1();
  }

  if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-200);
    this.player.anims.play("left", true); // walk left
  }
  else if (this.cursors.right.isDown) {
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
  this.scene.start("room1")
}
overlapCleric(player, enemy) {
  console.log("*** Player overlap cleric");

  // shake the screen 
  this.cameras.main.shake(100);

}

overlapPaladin(player, enemy) {
  console.log("*** Player overlap paladin");

  // disable enemy after overlap
  enemy.disableBody(true, true);

  // Play a sound
  this.hitSnd.play();

  // shake the screen 
  this.cameras.main.shake(500);

}

moveDownUp() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.thief,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 3000,
    tweens: [
      {
        y: 800,
      },
      {
        y: 100,
      },
    ],
  });
}



updateInventory() {
  // Emit events showInventory
  this.inventory = {}
  this.inventory.heart = window.heart
  this.inventory.key = window.key

  console.log('Emit event', this.inventory)
  this.invEvent = (event, data) => this.scene.get('showInventory').events.emit(event, data);
  this.invEvent("inventory", this.inventory);
}

} //////////// end of class world ////////////////////////
