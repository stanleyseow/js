class preload extends Phaser.Scene {
  constructor() {
    super("preload");

    // Put global variable here
  }

  preload() {}

  create() {
    console.log("*** preload scene");


    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
        let playerPos = {}
        playerPos.x = 100
        playerPos.y = 550
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
