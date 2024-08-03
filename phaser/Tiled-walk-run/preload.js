class preload extends Phaser.Scene {

    constructor() {
        super({
            key: 'preload'
        });

        // Put global variable here
    }

    preload() {

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');

        this.load.spritesheet("gen", "assets/green-apron.png", {
            frameWidth: 64,
            frameHeight: 64,
          });
    }

    create() {

        console.log('*** main scene');

        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

        //this.music.play()
        //window.music = this.music


        // Add image and detect spacebar keypress
        //this.add.image(0, 0, 'main').setOrigin(0, 0);

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
            key: "genrun-up",
            frames: this.anims.generateFrameNumbers("gen", { start: 105, end: 112 }),
            frameRate: 10,
            repeat: -1,
          });
      
          this.anims.create({
            key: "genrun-left",
            frames: this.anims.generateFrameNumbers("gen", { start: 118, end: 125 }),
            frameRate: 10,
            repeat: -1,
          });
      
          this.anims.create({
            key: "genrun-down",
            frames: this.anims.generateFrameNumbers("gen", { start: 131, end: 138 }),
            frameRate: 10,
            repeat: -1,
          });
      
          this.anims.create({
            key: "genrun-right",
            frames: this.anims.generateFrameNumbers("gen", { start: 144, end: 151 }),
            frameRate: 10,
            repeat: -1,
          });

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to world scene');

            this.scene.start('world',
                // Optional parameters
                {

                }
            );
        }, this);


        // Add any text in the main page
        this.add.text(50, 300, 'Walk / Run Code - Press spacebar to continue', {
            font: '20px Courier',
            fill: '#FFFFFF'
        });
        this.add.text(50, 320, 'Hold SHIFT to run', {
          font: '20px Courier',
          fill: '#FFFFFF'
      })


        // Create all the game animations here

    }


}