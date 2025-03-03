class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("gem", "assets/coinGold.png");

    this.load.spritesheet("whip", "assets/whip.png", {
      frameWidth: 192,
      frameHeight: 192,
    });

    this.load.spritesheet("fire", "assets/fire.png", { frameWidth: 40, frameHeight: 70 });

    this.load.spritesheet("gen", "assets/blank-64x64.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("enemy", "assets/enemy-64x64.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("kniveImg", "assets/knife-32x32.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

  }

  create() {
    
    console.log("*** PreloadScene")

    this.anims.create({
      key: "knifeAnim",
      frames: this.anims.generateFrameNumbers("kniveImg", { start: 0, end: 15 }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-up",
      frames: this.anims.generateFrameNumbers("gen", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-left",
      frames: this.anims.generateFrameNumbers("gen", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-down",
      frames: this.anims.generateFrameNumbers("gen", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-right",
      frames: this.anims.generateFrameNumbers("gen", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy-up",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy-left",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy-down",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy-right",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "burning",
      frames: this.anims.generateFrameNumbers("fire", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "sword_up",
      frames: this.anims.generateFrameNumbers("whip", { start: 0, end: 5 }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "sword_down",
      frames: this.anims.generateFrameNumbers("whip", { start: 12, end: 17 }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "sword_left",
      frames: this.anims.generateFrameNumbers("whip", { start: 6, end: 11 }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "sword_right",
      frames: this.anims.generateFrameNumbers("whip", { start: 18, end: 23 }),
      frameRate: 20,
      repeat: 0,
    });

  

    this.scene.start("MainScene");
  }

  update() {

  }

  
} // end of class
