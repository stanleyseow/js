class preloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "preloadScene" });
  }

  preload() {
    this.load.spritesheet("knifeImg", "assets/knife-32x32.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.anims.create({
      key: "knifeAnim",
      frames: this.anims.generateFrameNumbers("knifeImg", { start: 0, end: 15 }),
      frameRate: 20,
      repeat: -1,
    });

    console.log("preloadScene");
    this.add.text(10, 500, "Weapon Slash, press spacebar to continue", {
      font: "24px Courier",
      fill: "#ffffff",
    });

    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        this.scene.start("animationScene");
      },
      this,
    );
  }
}
