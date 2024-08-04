class preload extends Phaser.Scene {
  constructor() {
    super("preload");

    // Put global variable here
  }

  preload() {

    this.load.atlas("left", "assets/left.png", "assets/left.json");
    this.load.atlas("right", "assets/right.png", "assets/right.json");
    this.load.atlas("up", "assets/up.png", "assets/up.json");
    this.load.atlas("down", "assets/down.png", "assets/down.json");

    this.load.spritesheet("fire", "assets/fire.png", {
      frameWidth: 40,
      frameHeight: 70,
    });

    this.load.spritesheet("enemy", "assets/enemy.png", {
      frameWidth: 64,
      frameHeight: 64,
    });


    this.load.audio("gameOver","assets/lose.mp3");
    this.load.audio("hitFire","assets/ding.mp3");
    this.load.audio("bgMusic","assets/bg_music.mp3");

  }

  create() {
    console.log("*** preload scene");

    this.music = this.sound.add("bgMusic",{loop: true}).setVolume(0.05);
    this.music.play();

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
      key: "left",
      frames: [
        { key: "left", frame: "left_13" },
        { key: "left", frame: "left_14" },
        { key: "left", frame: "left_15" },
        { key: "left", frame: "left_16" },
        { key: "left", frame: "left_17" },
        { key: "left", frame: "left_18" },
        { key: "left", frame: "left_19" },
        { key: "left", frame: "left_20" },
        { key: "left", frame: "left_21" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: [
        { key: "right", frame: "right_13" },
        { key: "right", frame: "right_14" },
        { key: "right", frame: "right_15" },
        { key: "right", frame: "right_16" },
        { key: "right", frame: "right_17" },
        { key: "right", frame: "right_18" },
        { key: "right", frame: "right_19" },
        { key: "right", frame: "right_20" },
        { key: "right", frame: "right_21" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: [
        { key: "up", frame: "up-07" },
        { key: "up", frame: "up-08" },
        { key: "up", frame: "up-09" },
        { key: "up", frame: "up-10" },
        { key: "up", frame: "up-11" },
        { key: "up", frame: "up-12" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: [
        { key: "down", frame: "down-01" },
        { key: "down", frame: "down-02" },
        { key: "down", frame: "down-03" },
        { key: "down", frame: "down-04" },
        { key: "down", frame: "down-05" },
        { key: "down", frame: "down-06" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "fireAnim",
      frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
        let playerPos = {}
        playerPos.x = 100
        playerPos.y = 1100
        this.scene.start("world",  { playerPos: playerPos })
      },
      this
    );

    // Add any text in the main page
    this.add.text(90, 600, "Press spacebar to continue", {
      font: "30px Courier",
      fill: "#FFFFFF",
    });

    // Create all the game animations here
  }
}
