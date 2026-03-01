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

    // Initialize state variables
    this.player.facing = "down";
    this.isAttacking = false;
    this.lastFired = 0;

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
    if (this.knife1.isActive) {
      this.angle1 = Phaser.Math.Angle.BetweenPoints(this.npc1, this.player);
      this.physics.velocityFromRotation(this.angle1, 300, this.knife1.body.velocity);
    }

    // Only move knife2 if it hasn't hit the player
    if (this.knife2.isActive) {
      this.angle2 = Phaser.Math.Angle.BetweenPoints(this.npc2, this.player);
      this.physics.velocityFromRotation(this.angle2, 300, this.knife2.body.velocity);
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

  shootKnife() {
    // 1. CRITICAL: Cancel any pending reset timers so they don't
    // hide the knife we are about to shoot.
    if (this.resetTimer) {
      this.resetTimer.remove();
    }

    // 2. Prepare Knife 1
    this.knife1.enableBody(true, this.npc1.x, this.npc1.y, true, true);
    this.knife1.isActive = true;
    this.knife1.setVisible(true).setAlpha(1).clearTint();
    this.knife1.play("knifeAnim", true);

    // 3. Prepare Knife 2
    this.knife2.enableBody(true, this.npc2.x, this.npc2.y, true, true);
    this.knife2.isActive = true;
    this.knife2.setVisible(true).setAlpha(1).clearTint();
    this.knife2.play("knifeAnim", true);

    // 4. Store the timer in a variable so we can cancel it next time
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
    // If the player is currently in the middle of a slash animation
    if (this.isAttacking) {
      // OPTIONAL: Play a "clink" sound or show a spark here

      // Deflect the knife:
      // We disable it immediately so it doesn't trigger again
      knife.isActive = false;
      knife.disableBody(true, true); // Hide it immediately

      console.log("Attack parried!");
      return; // Exit the function so the player doesn't get hurt
    }

    // --- Normal Hit Logic (when not attacking) ---
    knife.isActive = false;
    knife.setVelocity(0);
    knife.disableBody(true, true); // Keep it visible but stuck
    knife.setTint(0xff0000);

    // Optional: Add player knockback or health reduction here
    console.log("Player hit!");
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
