class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });

    // Put global variable here
  }

  preload() {

    this.load.spritesheet('gen', 'assets/char-blank-64x64.png',
      { frameWidth:64, frameHeight:64 });

  }

  create() {
    console.log("*** preload scene");


    this.anims.create({
      key: "gen-up",
      frames: this.anims.generateFrameNumbers("gen", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-left",
      frames: this.anims.generateFrameNumbers("gen", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-down",
      frames: this.anims.generateFrameNumbers("gen", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-right",
      frames: this.anims.generateFrameNumbers("gen", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.add.text(50, 50, "navMesh Testing, click to move, no keyboard, press space to continue", {
      font: "20px Courier",
      fill: "#FFFFFF",
    });

    let spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world");
        let playerPos = {};
        playerPos.x = 687;
        playerPos.y = 1230;
        playerPos.dir = "gen";
        this.scene.start("world", { playerPos: playerPos });
      },
      this
    );

  }
}
