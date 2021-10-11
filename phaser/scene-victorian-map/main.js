class main extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });

        // Put global variable here
    }

    preload() {

        // Preload all the assets and maps here

        this.load.tilemapTiledJSON('world', 'assets/victorian.json');


        this.load.spritesheet('bricksPng', 'assets/bricks.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('containerPng', 'assets/container.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('foodPng', 'assets/food.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('roofsPng', 'assets/roofs.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('treesPng', 'assets/trees-green.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('terrainPng', 'assets/terrain-map-v8.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('accPng', 'assets/victorian-accessories.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('gardenPng', 'assets/victorian-garden.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('mansionPng', 'assets/victorian-mansion.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('marketPng', 'assets/victorian-market.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('streetsPng', 'assets/victorian-streets.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('vwindowsPng', 'assets/victorian-windows-doors.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('windoorsPng', 'assets/windows-doors.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('tenPng', 'assets/victorian-tenement.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        // Preload any images here
        //this.load.image('main', 'assets/mainpage.png');

        // Preload any sound and music here
        //this.load.audio('ping', 'assets/ping.mp3');
        //this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** main scene');

        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )


        // Add image and detect spacebar keypress
        //this.add.image(0, 0, 'main').setOrigin(0, 0);

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
        this.add.text(90, 600, 'Press spacebar to continue', {
            font: '30px Courier',
            fill: '#FFFFFF'
        });


        // Create all the game animations here

    }

}