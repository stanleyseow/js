var content2 = `Welcom to city1. Please collect all the gold inside the chests. 

Press spacebar to continue`;

class sceneDialog2 extends Phaser.Scene {
  constructor() {
    super({
      key: "sceneDialog2",
    });
  }

  init(data) {
    this.player = data.player;
  }

  preload() {
    this.load.scenePlugin({
      key: "rexuiplugin",
      url: "./rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }

  create() {
    console.log(this);

    createTextBox(this, 50, 500, {
      wrapWidth: 400,
    }).start(content2, 50);

    // Detect spacebar pressed
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto city1");
        this.scene.start("city1", { player: this.player });
      },
      this
    );
  }

  update() {}
}
