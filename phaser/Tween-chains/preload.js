class preload extends Phaser.Scene {
  constructor() {
    super("preload");

    // Put global variable here
  }

  preload() {

    this.load.atlas( 'left', 'assets/left.png', 'assets/left.json');
    this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
    this.load.atlas( 'up', 'assets/up.png', 'assets/up.json');
    this.load.atlas( 'down', 'assets/down.png', 'assets/down.json');
    this.load.spritesheet("u3", "assets/ultima.gif", {frameWidth: 16,frameHeight: 16,
    });
    

    this.load.audio( "hitSnd", "assets/hit.mp3")
    
  }

  create() {
    console.log("*** preload scene");

    this.anims.create({
      key: 'left',
      frames: [
        { key: 'left', frame: 'left_13'},
        { key: 'left', frame: 'left_14'},
        { key: 'left', frame: 'left_15'},
        { key: 'left', frame: 'left_16'},
        { key: 'left', frame: 'left_17'},
        { key: 'left', frame: 'left_18'},
        { key: 'left', frame: 'left_19'},
        { key: 'left', frame: 'left_20'},
        { key: 'left', frame: 'left_21'},
      ],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'right', frame: 'right_13'},
        { key: 'right', frame: 'right_14'},
        { key: 'right', frame: 'right_15'},
        { key: 'right', frame: 'right_16'},
        { key: 'right', frame: 'right_17'},
        { key: 'right', frame: 'right_18'},
        { key: 'right', frame: 'right_19'},
        { key: 'right', frame: 'right_20'},
        { key: 'right', frame: 'right_21'}, 
      ],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'up',
      frames: [
        { key: 'up', frame: 'up-07'},
        { key: 'up', frame: 'up-08'},
        { key: 'up', frame: 'up-09'},
        { key: 'up', frame: 'up-10'},
        { key: 'up', frame: 'up-11'},
        { key: 'up', frame: 'up-12'},
      ],
      frameRate: 10,
      repeat: -1
    })

     this.anims.create({
      key: 'down',
      frames: [
        { key: 'down', frame: 'down-01'},
        { key: 'down', frame: 'down-02'},
        { key: 'down', frame: 'down-03'},
        { key: 'down', frame: 'down-04'},
        { key: 'down', frame: 'down-05'},
        { key: 'down', frame: 'down-06'},
      ],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "a1",
      frames: this.anims.generateFrameNumbers("u3", { start: 0, end: 31 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "a2",
      frames: this.anims.generateFrameNumbers("u3", { start: 32, end: 63 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "a3",
      frames: this.anims.generateFrameNumbers("u3", { start: 64, end: 95 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "a4",
      frames: this.anims.generateFrameNumbers("u3", { start: 96, end: 127 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "a5",
      frames: this.anims.generateFrameNumbers("u3", { start: 128, end: 159 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "a6",
      frames: this.anims.generateFrameNumbers("u3", { start: 160, end: 191 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "a7",
      frames: this.anims.generateFrameNumbers("u3", { start: 192, end: 223 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "a8",
      frames: this.anims.generateFrameNumbers("u3", { start: 224, end: 255 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "wiz",
      frames: this.anims.generateFrameNumbers("u3", { start: 32, end: 33 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "thi",
      frames: this.anims.generateFrameNumbers("u3", { start: 34, end: 35 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "fig",
      frames: this.anims.generateFrameNumbers("u3", { start: 36, end: 37 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "cle",
      frames: this.anims.generateFrameNumbers("u3", { start: 38, end: 39 }),
      frameRate: 5,
      repeat: -1,
    });
  
    this.anims.create({
      key: "pal",
      frames: this.anims.generateFrameNumbers("u3", { start: 40, end: 41 }),
      frameRate: 5,
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
        playerPos.x = 452
        playerPos.y = 1002
        this.scene.start(
          "world",
          { player: playerPos}
        );
      },
      this
    );

    // Add any text in the main page
    this.add.text(90, 600, "Tween chain version 3.60 ", {
      font: "30px Courier",
      fill: "#FFFFFF",
    });

    // Create all the game animations here
  }
}
