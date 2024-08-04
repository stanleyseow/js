class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }

  preload() {
    this.load.spritesheet("food", "assets/food.png", {
      frameWidth: 32,
      frameHeight: 32,
    });


    this.load.spritesheet("heart", "assets/heart.png", {frameWidth: 64,frameHeight: 64,});
    this.load.spritesheet("heart2", "assets/heart2.png", {frameWidth: 35,frameHeight: 40,});

    this.load.spritesheet("gen", "assets/chargen-64x64.png", {frameWidth: 64,frameHeight: 64,});

    // this.load.spritesheet("heart", "assets/heart.png", {
    //   frameWidth: 64,
    //   frameHeight: 64,
    // });

    this.load.audio("sound1", "assets/sound1.wav");
    this.load.audio("blaster", "assets/blaster.wav");
  }

  create() {
    // load the this.map
    var map = this.make.tilemap({ key: "map" });

    this.sound1 = this.sound.add("sound1")
    this.blasterSnd = this.sound.add("blaster")

    // this.blasterSnd = this.sound.add("blaster");
    // this.doorSnd = this.sound.add("openDoor");

    window.map = map;

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage("tiles");
    // create the ground layer
    this.groundLayer = map.createLayer("World", groundTiles, 0, 0);
    this.itemLayer = map.createLayer("itemLayer", groundTiles, 0, 0);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // this.timedEvent = this.time.addEvent({
    //   delay: 1000,
    //   callback: this.delayOneSec,
    //   callbackScope: this,
    //   loop: false,
    // });


    this.anims.create({
      key: 'gen-up',
      frames: this.anims.generateFrameNumbers('gen',
          { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1
  });

  this.anims.create({
      key: 'gen-left',
      frames: this.anims.generateFrameNumbers('gen',
          { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1
  });

  this.anims.create({
      key: 'gen-down',
      frames: this.anims.generateFrameNumbers('gen',
          { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1
  });

  this.anims.create({
      key: 'gen-right',
      frames: this.anims.generateFrameNumbers('gen',
          { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1
  });

    this.anims.create({
      key: "fireAnim",
      frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("girl", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("girl", { start: 9, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("girl", { start: 18, end: 26 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "carrotAnim",
      frames: this.anims.generateFrameNumbers("food", { frames: [0, 32, 64] }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "heartAnim",
      frames: this.anims.generateFrameNumbers("heart",  { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "heart2Anim",
      frames: this.anims.generateFrameNumbers("heart2",  { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    // Object layers
    let start = map.findObject("objectLayer", (obj) => obj.name === "start");

    // create the this.playersprite
    //this.player = this.physics.add.sprite(100, 200, 'girl')
    this.player = this.physics.add.sprite(start.x, start.y, "girl");
    this.player.setScale(2);
    this.player.body.setSize(28, 50);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map
    window.player = this.player;

    // this.anims.create({
    //   key: "heartAnim",
    //   frames: this.anims.generateFrameNumbers("heart", { start: 0, end: 2 }),
    //   frameRate: 5,
    //   repeat: -1,
    // });

        // load fire objects
        let fire1 = map.findObject("objectLayer", (obj) => obj.name === "fire1");
        let fire2 = map.findObject("objectLayer", (obj) => obj.name === "fire2");

    // this.carrot = this.physics.add
    //   .sprite(fire1.x, fire1.y, "food")
    //   .play("carrotAnim")
    //   .setScale(2);

    if ( window.item1 == 0) {
      this.enemy1 = this.physics.add.sprite(fire1.x,fire1.y,"heart").play("heartAnim")
    }

    if ( window.item2 == 0) {
      this.enemy2 = this.physics.add.sprite(fire2.x,fire2.y,"heart2").play("heart2Anim")
    }
    //this.char = this.physics.add.sprite(fire1.x,fire1.y,"gen").play("gen-left")
    //this.char2 = this.physics.add.sprite(fire2.x,fire2.y,"gen").play("gen-down")


    this.tweens.add({
      targets: this.char,
      x: 100,
      flipX: true,
      //flipY: true,
      yoyo: true,
      duration: 2000,
      repeat: -1
    })

    this.tweens.add({
      targets: this.enemy1,
      x: 100,
      flipX: true,
      //flipY: true,
      yoyo: true,
      duration: 2000,
      repeat: -1
    })

    this.tweens.add({
      targets: this.char2,
      y: 200,
      flipX: true,
      //flipY: true,
      yoyo: true,
      duration: 3000,
      repeat: -1,
      onYoyo: () => {
        console.log('onYoyo');
        this.char2.play ("gen-down")
    },
    onRepeat: () => {
        console.log('onRepeat');
        this.char2.play ("gen-up")
        
    },
    })


    // this.enemy1 = this.physics.add
    //   .sprite(fire1.x, fire1.y, "food")
    //   .play("heartAnim")

    // this.enemy2 = this.physics.add
    //   .sprite(fire2.x, fire2.y, "fire")
    //   .play("fireAnim");

    //     this.tweens.add({
    //       targets: this.enemy1,
    //       x: 100,
    //       //flipX: true,
    //       yoyo: true,
    //       duration: 1000,
    //       repeat: -1
    //   })

    //   this.tweens.add({
    //     targets: this.enemy2,
    //     y: 200,
    //     //flipY: true,
    //     yoyo: true,
    //     duration: 2000,
    //     repeat: -1
    // })


    this.physics.add.overlap(this.player, this.enemy1, this.hitFire1, null, this)
    this.physics.add.overlap(this.player, this.enemy2, this.hitFire2, null, this)

    // this.physics.add.overlap(this.player, [this.enemy1, this.enemy2], this.hitFire, null, this)

    // this.physics.add.overlap(
    //   this.player,
    //   this.enemy1,
    //   this.hitFire,
    //   null,
    //   this
    // );

    // this.physics.add.overlap(
    //   this.player,
    //   this.enemy2,
    //   this.hitFire,
    //   null,
    //   this
    // );

    // this.physics.add.overlap(
    //   this.player,
    //   this.fireGroup,
    //   this.hitFire,
    //   null,
    //   this
    // );
    // this.physics.add.overlap(
    //   this.player,
    //   this.fireGroup2,
    //   this.hitFire,
    //   null,
    //   this
    // );

    //this.itemLayer.setTileIndexCallback([0,1,2,3,4,5,6,7,8,9], this.debugIndex, this);

    this.itemLayer.setTileIndexCallback(7, this.removeItem, this);
    this.itemLayer.setTileIndexCallback(4, this.removeItem, this);

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({ walls: false });
    this.groundLayer.setCollisionByProperty({ pillars: false });

    // this.playerwill collide with the level tiles
    this.physics.add.collider(this.player, this.itemLayer);
    this.physics.add.collider(this.groundLayer, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor("#ccccff");

    // this text will show the score
    var text = this.add.text(20, 570, "0", {
      fontSize: "20px",
      fill: "#ffffff",
    });
    // fix the text to the camera
    text.setScrollFactor(0);

    /////////////////////////////////
  } // end of create()

  update(time, delta) {
    // this.fireGroup.children.iterate((fire) => {
    //   this.physics.moveToObject(fire, this.player, 30, 3000);
    // });

    // this.fireGroup2.children.iterate((fire) => {
    //   this.physics.moveToObject(fire, this.player, 30, 3000);
    // });

    if ( window.item1 == 1 && window.item2 == 1 ) {
      this.newLevel()
    }

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); // walk left
      this.player.flipX = false; // flip the sprite to the left
      //console.log('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("left", true);
      this.player.flipX = true; // use the original sprite looking to the right
      //console.log('right');
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
      //console.log('idle');
    }
  } // end of update()

  // call this function when overlap 
  hitFire1(player,item) {
    console.log("hit fire")
    this.sound1.play()
    this.cameras.main.shake(500) // 500ms
    item.disableBody(true,true)
    window.item1 = 1
    return false;
  }

  hitFire2(player,item) {
    console.log("hit fire")
    this.blasterSnd.play()
    this.cameras.main.shake(500) // 500ms
    item.disableBody(true,true)
    window.item2 = 1
    return false;
  }

  newLevel() {
    console.log("Jump to new scene")
    this.scene.start("preloadScene")
  }

  // hitFire(player, item) {
  //   console.log("player hit fire");
  //   this.cameras.main.shake(500); // shake screen 500ms
  //   item.disableBody(true, true); // remove the item

  //   return false;
  // }

  // delayOneSec() {
  //   console.log("1 sec later...adjust body size");
  //   this.player.body.setSize(28, 50);
  //   //this.player.body.setOffset(8,8)
  // }

  // this function will be called when the this.playertouches a coin
  // hitFire(player, fire) {
  //   console.log("Hit fire!!!");
  //   this.cameras.main.shake(200);
  //   fire.disableBody(true, true); // remove fire
  //   return false;
  // }

  removeItem(player, tile) {
    console.log("remove item", tile.index);
    this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
    return false;
  }

  // debugIndex(item, tile) {
  //   console.log(item);
  //   console.log(tile.index);
  // }
} // end of class
