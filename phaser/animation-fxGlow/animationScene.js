class animationScene extends Phaser.Scene {
  constructor() {
    super("animationScene" );
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

    this.load.spritesheet("peter", "assets/peter.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("monkiddo", "assets/monkiddo-72x72.png", {
      frameWidth: 72,
      frameHeight: 72,
    });

  } // end of preload //

  create() {
    console.log("animationScene");

    this.anims.create({
      key: "slowfire",
      frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "spin",
      frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "fastspin",
      frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
      frameRate: 20,
      repeat: -1,
    });

  
    this.anims.create({
      key: "monkiddo-left",
      frames: this.anims.generateFrameNumbers("monkiddo", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "monkiddo-up",
      frames: this.anims.generateFrameNumbers("monkiddo", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "monkiddo-down",
      frames: this.anims.generateFrameNumbers("monkiddo", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "monkiddo-right",
      frames: this.anims.generateFrameNumbers("monkiddo", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });


    this.add.sprite(300, 100, "monkiddo").setScale(2).play("monkiddo-left")
    this.add.sprite(400, 100, "monkiddo").setScale(2).play("monkiddo-up")
    this.add.sprite(500, 100, "monkiddo").setScale(2).play("monkiddo-down")
    this.add.sprite(600, 100, "monkiddo").setScale(2).play("monkiddo-right")

    this.player = this.physics.add.sprite(100, 100, "monkiddo").setScale(2).play("monkiddo-down")
    this.cursors = this.input.keyboard.createCursorKeys();


    const fx1 = this.player.postFX.addGlow(0xffffff, 4, 0, false, 0.1, 32);
    const fx2 = this.player.postFX.addGlow(0x00ff00, 0, 0);

      this.tweens.add({
        targets: fx2,
        outerStrength: 10,
        yoyo: true,
        loop: -1,
        ease: 'sine.inout'
    });

 } // end of create //

  update() {

    if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('monkiddo-left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.anims.play('monkiddo-right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-160);
            this.player.anims.play('monkiddo-up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(160);
            this.player.anims.play('monkiddo-down', true);
        } else {
          this.player.setVelocity(0);
          this.player.anims.stop()
        }

  } // end of update //
}
