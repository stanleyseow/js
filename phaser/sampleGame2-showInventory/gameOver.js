class gameOver extends Phaser.Scene {
    constructor() {
      super("gameOver");
  
      // Put global variable here
    }


    preoad() {
        this.load.image("gameOverImg","assets/gameOver.jpg")
    }

    create() {


    this.add.image(400,300, "gameOverImg")

    // Bring gameOver scene to top
    this.scene.bringToTop("gameOver");

    
    // Check for spacebar or any key here
    let spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
        let playerPos = {}
        playerPos.x = 100
        playerPos.y = 1100

        //reset inventory
        window.heart = 3
        window.key = 0
        this.scene.start("world",  { playerPos: playerPos })
      },
      this
    );

    // Add any text in the main page
    this.add.text(90, 300, "GAME OVER", {
      font: "40px Courier",
      fill: "#FFFFFF",
    });
    this.add.text(90, 500, "press space to restart game", {
        font: "20px Courier",
        fill: "#FFFFFF",
      });

    }

    update() {}

}

