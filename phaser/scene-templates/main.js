class main extends Phaser.Scene {

    constructor() {
        super({ key: 'main' });
        
        // Put global variable here
    }

    preload() {

        // Preload all the assets and maps here

        this.load.spritesheet('u3', 'assets/ultima.gif', { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('worldMap', 'assets/world.json');
        
        // Preload any images here
        this.load.image('main', 'assets/mainpage.png');

        // Preload any sound and music here
        this.load.audio('ping', 'assets/ping.mp3');
        this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** main scene');
        
        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

        this.music.play()
        window.music = this.music


        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'main').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to world scene');

            // Optional - Pass any parameters to the world scene 
            this.player.x = 300;
            this.player.y = 300

            this.music.stop()

            this.scene.start('world', 
            // Optional parameters
            // { player: this.player }
            );
        }, this);


        // Add any text in the main page
        this.add.text(90, 600, 'Press spacebar to continue', { font: '30px Courier', fill: '#FFFFFF' });
        

        // Create all the game animations here

        this.anims.create({
            key: 'dragon',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 232, end: 235 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'ranger',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 31, end: 31 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'fig',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 36, end: 37 }),
            frameRate: 5,
            repeat: -1
        })

        // Display animations on this page with this.add.sprite
        this.dragon = this.add.sprite(550, 500, 'u3').play('dragon').setScale(12);

        this.player = this.add.sprite(250, 550, 'u3').play('ranger').setScale(4);
        this.fighter = this.add.sprite(200, 550, 'u3').play('fig').setScale(4);

        // Move Dragon left and right with tweens
        this.time.addEvent({ delay: 1000, callback: this.moveRightLeft, callbackScope: this, loop: false });

    }

    moveRightLeft() {
        //console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.dragon,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 2500,
            tweens: [
                {
                    x: 350,
                },
                {
                    x: 550,
                },
            ]
        });
    }


}
