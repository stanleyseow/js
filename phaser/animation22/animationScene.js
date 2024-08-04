class animationScene extends Phaser.Scene {
  constructor() {
    super("animationScene");
  }

  preload() {
    this.load.spritesheet("coin", "assets/coin.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("fire", "assets/fire.png", {
      frameWidth: 40,
      frameHeight: 70,
    });

    // this.load.spritesheet("peter", "assets/peter.png", {
    //   frameWidth: 64,
    //   frameHeight: 64,
    // });

    this.load.spritesheet("monkiddo", "assets/monkiddo-72x72.png", {
      frameWidth: 72,
      frameHeight: 72,
    });

  } // end of preload //

  create() {
    console.log("animationScene");

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("monkiddo", 
        { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("monkiddo", 
        { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("monkiddo", 
        { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("monkiddo", 
        { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "slowfire",
      frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "coinSpin",
      frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "fastSpin",
      frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
      frameRate: 20,
      repeat: -1,
    });

    // this.fireGroup = this.add.group({
    //   key: 'fire',
    //   repeat: 10,
    //   setXY: { x: 50, y: 50, stepX: Phaser.Math.Between(50,100)}
    // });

    // this.fireGroup2 = this.add.group({
    //   key: 'fire',
    //   repeat: 10,
    //   setXY: { x: 50, y: 100, stepX: Phaser.Math.Between(50,100)}
    // });

    // this.fireGroup.children.iterate(c => {
    //   c.play('slowfire')
    // })

    // this.fireGroup2.children.iterate(c => {
    //   c.play('slowfire')
    // })


    this.add.sprite(100, 100, "coin").play("coinSpin")
    this.add.sprite(100, 200, "coin").setScale(2).play("fastSpin")

    // this.add.sprite(200, 200, "fire").setScale(3).play("slowfire")

    // this.add.sprite(300, 300, "peter").setScale(3).play("up")
    // this.add.sprite(400, 300, "peter").setScale(3).play("left")
    // this.add.sprite(500, 300, "peter").setScale(3).play("down")
    // this.add.sprite(600, 300, "peter").setScale(3).play("right")

    this.add.sprite(300, 100, "monkiddo").setScale(2).play("right")
    this.add.sprite(400, 100, "monkiddo").setScale(2).play("up")
    this.add.sprite(500, 100, "monkiddo").setScale(2).play("down")
    this.add.sprite(600, 100, "monkiddo").setScale(2).play("left")

    this.player = this.physics.add.sprite(300, 300, "monkiddo").setScale(2).play("down")
    this.cursors = this.input.keyboard.createCursorKeys();


  } // end of create //

  update() {

    if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
         else if (this.cursors.right.isDown)
       {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-160);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(160);
            this.player.anims.play('down', true);
        } else {
          this.player.setVelocity(0);
          this.player.anims.stop()
        }

  } // end of update //
}
