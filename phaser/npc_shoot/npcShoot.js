class npcShoot extends Phaser.Scene {
  constructor() {
    super({ key: "npcShoot" });
  }

  preload() {
    this.load.spritesheet("coin", "assets/coin.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("fire", "assets/fire.png", { frameWidth: 40, frameHeight: 70 });

    this.load.spritesheet("gen", "assets/char-blank2-64x64.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("gen-bow", "assets/char-bow-64x64.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("knifeImg", "assets/knife-32x32.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  } // end of preload //

  create() {
    console.log("npc shoot knife");

    this.timer1 = this.time.addEvent({
        delay: 3000,
        callback: this.shootKnife,
        callbackScope: this,
        loop: true,
      });

    this.player = this.physics.add.sprite(100, 300, "gen");

    this.npc1 = this.physics.add.sprite(1000, 100, "gen-bow").play("gen-bow-shoot-left");
    this.npc2 = this.physics.add.sprite(1000, 600, "gen-bow").play("gen-bow-shoot-left");

    this.knife1 = this.physics.add.sprite(this.npc1.x, this.npc1.y, "knifeImg").play("knifeAnim").setVisible(false);
    this.knife2 = this.physics.add.sprite(this.npc2.x, this.npc2.y, "knifeImg").play("knifeAnim").setVisible(false);



    this.cursors = this.input.keyboard.createCursorKeys();
  } // end of create //

  update() {
    this.angle1 = Phaser.Math.Angle.BetweenPoints(this.npc1, this.player);
    this.angle2 = Phaser.Math.Angle.BetweenPoints(this.npc2, this.player);

    this.physics.velocityFromRotation(this.angle1, 300, this.knife1.body.velocity);
    this.physics.velocityFromRotation(this.angle2, 300, this.knife2.body.velocity);


    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("gen-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("gen-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("gen-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("gen-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }
  } // end of update //

  shootKnife() {
    let deg1 = Phaser.Math.RadToDeg(this.angle1);
    let deg2 = Phaser.Math.RadToDeg(this.angle2);
    console.log("shoot knife degree: ", 90 - deg1, 90 - deg2);

    this.knife1.setVisible(true);
    this.knife2.setVisible(true);

    // remove knife after 5 seconds
    this.time.delayedCall(5000, this.resetKnife, [], this);
  }

  resetKnife() {
    console.log("Reset knifes");
    this.knife1.x = this.npc1.x;
    this.knife1.y = this.npc1.y;
    this.knife2.x = this.npc2.x;
    this.knife2.y = this.npc2.y;
  }
}
