class animationScene extends Phaser.Scene {
  constructor() {
    super({ key: "animationScene" });
  }

  preload() {
    this.load.spritesheet("gen128", "assets/charwalk-128x128.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("slash128", "assets/charslash-128x128.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("gen-bow", "assets/char-bow-64x64.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.loadAnimations();

    this.timer1 = this.time.addEvent({
      delay: 3000,
      callback: this.shootKnife,
      callbackScope: this,
      loop: true,
    });

    this.npc1 = this.physics.add.sprite(500, 100, "gen-bow").play("gen-bow-shoot-left");
    this.npc2 = this.physics.add.sprite(500, 500, "gen-bow").play("gen-bow-shoot-left");

    this.knife1 = this.physics.add
      .sprite(this.npc1.x, this.npc1.y, "knifeImg")
      .play("knifeAnim")
      .setVisible(false);

    this.knife2 = this.physics.add
      .sprite(this.npc2.x, this.npc2.y, "knifeImg")
      .play("knifeAnim")
      .setVisible(false);

    // Player setup
    this.player = this.physics.add.sprite(100, 250, "gen128");
    this.player.hp = 100; // Starting health

    // Initialize state variables
    this.player.facing = "down";
    this.isAttacking = false;
    this.lastFired = 0;

    // Add Health Text
    this.hpText = this.add.text(16, 16, "HP: 100", {
      fontSize: "24px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 4,
    });
    this.hpText.setScrollFactor(0); // Keeps text fixed on screen if camera moves

    // Set initial walking hitbox
    this.resetPlayerBody();

    // Keyboard setup
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera setup
    //this.cameras.main.startFollow(this.player);

    // --- THE FIX: Animation Complete Listener ---
    this.player.on("animationcomplete", (animation) => {
      if (animation.key.includes("slash")) {
        this.isAttacking = false;

        // 1. Reset hitbox to normal size
        this.resetPlayerBody();

        // 2. Return to correct idle frame of walking sheet
        let idleFrame = 18; // default down
        if (this.player.facing === "up") idleFrame = 0;
        if (this.player.facing === "left") idleFrame = 9;
        if (this.player.facing === "right") idleFrame = 27;

        this.player.setTexture("gen128", idleFrame);
      }
    });

    // Add state tracking to the knives
    this.knife1.isActive = true;
    this.knife2.isActive = true;

    this.physics.add.overlap(
      this.player,
      [this.knife1, this.knife2],
      this.hitPlayer,
      null,
      this,
    );

    this.physics.add.overlap(
      this.player,
      [this.npc1, this.npc2],
      this.hitNPC,
      null,
      this,
    );
  }

  // Helper to keep body size consistent for walking
  resetPlayerBody() {
    // Narrower hitbox for the body/feet area
    this.player.body.setSize(40, 50);
    this.player.body.setOffset(44, 40);
  }

  update(time) {
    let speed = 200;

    if (this.isAttacking) {
      this.player.setVelocity(0); // Freeze movement during attack
      return;
    }
    // Only move knife1 if it hasn't hit the player
    // Inside update(time)
    if (this.knife1.isActive && this.npc1.active) {
      this.angle1 = Phaser.Math.Angle.BetweenPoints(this.npc1, this.player);
      this.physics.velocityFromRotation(this.angle1, 300, this.knife1.body.velocity);
    } else if (!this.npc1.active) {
      this.knife1.isActive = false; // Stop knife logic if NPC is dead
    }

    if (this.knife2.isActive && this.npc2.active) {
      this.angle2 = Phaser.Math.Angle.BetweenPoints(this.npc2, this.player);
      this.physics.velocityFromRotation(this.angle2, 300, this.knife2.body.velocity);
    } else if (!this.npc2.active) {
      this.knife2.isActive = false;
    }

    // Movement Logic
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.facing = "left";
      this.player.play("gen128-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.facing = "right";
      this.player.play("gen128-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.facing = "up";
      this.player.play("gen128-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.facing = "down";
      this.player.play("gen128-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop(); // Stop walk cycle
    }

    // Spacebar for Attack
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.attackAction(time);
    }
  }

  reduceHP(amount) {
    this.player.hp -= amount;

    // Prevent HP from going below 0
    if (this.player.hp < 0) this.player.hp = 0;

    // Update Display
    this.hpText.setText(`HP: ${this.player.hp}`);

    // Game Over Check
    if (this.player.hp <= 0) {
      this.physics.pause(); // Stop all movement
      this.player.setTint(0xff0000);
      this.add
        .text(400, 300, "GAME OVER", { fontSize: "64px", fill: "#ff0000" })
        .setOrigin(0.5);

      // Restart after 2 seconds
      this.time.delayedCall(5000, () => {
        this.scene.restart();
      });
    }
  }

  shootKnife() {
    if (this.resetTimer) {
      this.resetTimer.remove();
    }

    // Only shoot Knife 1 if NPC1 is still alive
    if (this.npc1.active) {
      this.knife1.enableBody(true, this.npc1.x, this.npc1.y, true, true);
      this.knife1.isActive = true;
      this.knife1.setVisible(true).setAlpha(1).clearTint();
      this.knife1.play("knifeAnim", true);
    }

    // Only shoot Knife 2 if NPC2 is still alive
    if (this.npc2.active) {
      this.knife2.enableBody(true, this.npc2.x, this.npc2.y, true, true);
      this.knife2.isActive = true;
      this.knife2.setVisible(true).setAlpha(1).clearTint();
      this.knife2.play("knifeAnim", true);
    }

    this.resetTimer = this.time.delayedCall(2500, this.resetKnife, [], this);
  }

  resetKnife() {
    // Disable physics and hide sprites
    this.knife1.isActive = false;
    this.knife2.isActive = false;

    this.knife1.setVelocity(0, 0);
    this.knife2.setVelocity(0, 0);

    this.knife1.disableBody(true, true);
    this.knife2.disableBody(true, true);
  }

  hitPlayer(player, knife) {
    if (this.isAttacking) {
      knife.isActive = false;
      knife.disableBody(true, true);
      console.log("Attack parried!");
      return;
    }

    // --- Player takes damage ---
    this.reduceHP(10); // Take 10 damage
    this.cameras.main.shake(200, 0.02);

    knife.isActive = false;
    knife.setVelocity(0);
    knife.disableBody(true, true);
    console.log("Player hit! HP remaining: " + this.player.hp);
  }

  hitNPC(player, npc) {
    if (this.isAttacking) {
      npc.disableBody(true, true);
      console.log("Player Attack NPC!!!");

      if (!this.npc1.active && !this.npc2.active) {
        this.timer1.remove();
      }
      return;
    }

    // --- Player touches NPC without attacking ---
    this.reduceHP(5); // Touching an enemy hurts!
    this.cameras.main.shake(200, 0.01);

    // Optional: Add a brief invincibility tint so HP doesn't drain instantly
    this.player.setTint(0xff0000);
    this.time.delayedCall(200, () => this.player.clearTint());
  }

  attackAction(time) {
    if (time > this.lastFired) {
      let animKey = "";

      // --- THE FIX: Enlarge Body + Change Offset based on direction ---
      switch (this.player.facing) {
        case "up":
          animKey = "up-slash";
          this.player.body.setSize(80, 80);
          this.player.body.setOffset(24, 20); // Extend box upwards
          break;
        case "down":
          animKey = "down-slash";
          this.player.body.setSize(80, 80);
          this.player.body.setOffset(24, 40); // Extend box downwards
          break;
        case "left":
          animKey = "left-slash";
          this.player.body.setSize(80, 80);
          this.player.body.setOffset(0, 30); // Extend box left
          break;
        case "right":
          animKey = "right-slash";
          this.player.body.setSize(80, 80);
          this.player.body.setOffset(48, 30); // Extend box right
          break;
      }

      if (animKey !== "") {
        this.isAttacking = true;
        this.player.play(animKey);
        this.lastFired = time + 300;
      }
    }
  }

  loadAnimations() {
    // Walking - repeat -1 (loop)
    const dirs = ["up", "left", "down", "right"];
    dirs.forEach((dir, i) => {
      this.anims.create({
        key: `gen128-${dir}`,
        frames: this.anims.generateFrameNumbers("gen128", {
          start: i * 9,
          end: i * 9 + 8,
        }),
        frameRate: 10,
        repeat: -1,
      });
    });

    // Slashes - repeat 0 (play once)
    this.anims.create({
      key: "up-slash",
      frames: this.anims.generateFrameNumbers("slash128", { start: 0, end: 5 }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "left-slash",
      frames: this.anims.generateFrameNumbers("slash128", { start: 6, end: 11 }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "down-slash",
      frames: this.anims.generateFrameNumbers("slash128", { start: 12, end: 17 }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "right-slash",
      frames: this.anims.generateFrameNumbers("slash128", { start: 18, end: 23 }),
      frameRate: 20,
      repeat: 0,
    });

    // this.anims.create({
    //   key: "gen-up",
    //   frames: this.anims.generateFrameNumbers("gen", { start: 105, end: 112 }),
    //   frameRate: 5,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: "gen-left",
    //   frames: this.anims.generateFrameNumbers("gen", { start: 118, end: 125 }),
    //   frameRate: 5,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: "gen-down",
    //   frames: this.anims.generateFrameNumbers("gen", { start: 131, end: 138 }),
    //   frameRate: 5,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: "gen-right",
    //   frames: this.anims.generateFrameNumbers("gen", { start: 144, end: 151 }),
    //   frameRate: 5,
    //   repeat: -1,
    // });

    this.anims.create({
      key: "gen-bow-up",
      frames: this.anims.generateFrameNumbers("gen-bow", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-bow-left",
      frames: this.anims.generateFrameNumbers("gen-bow", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-bow-down",
      frames: this.anims.generateFrameNumbers("gen-bow", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-bow-right",
      frames: this.anims.generateFrameNumbers("gen-bow", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-bow-shoot-left",
      frames: this.anims.generateFrameNumbers("gen-bow", { start: 221, end: 233 }),
      frameRate: 5,
      repeat: -1,
    });
  }
}
