class menuScene extends Phaser.Scene {

    constructor() {
        super({ key: 'menuScene' });
        console.log('*** menuScene');
        // Put global variable here
    }


    preload() {

        // Preload all the assets and maps here
        this.load.spritesheet('u3', 'assets/ultima.gif', { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('map0', 'assets/map1.json');
        this.load.tilemapTiledJSON('map1', 'assets/city1.json');
        this.load.tilemapTiledJSON('map2', 'assets/city2.json');
        this.load.tilemapTiledJSON('map3', 'assets/city3.json');
        this.load.tilemapTiledJSON('mapArena', 'assets/arena.json');
        this.load.tilemapTiledJSON('dungeon', 'assets/dungeon.json');
        this.load.tilemapTiledJSON('village', 'assets/village.json');

        this.load.image('main', 'assets/mainpage.png');

        this.load.audio('explode', 'assets/explosion.mp3');
        this.load.audio('shooter', 'assets/shooter.mp3');
        this.load.audio('ping', 'assets/ping.mp3');
        this.load.audio('bgMusic', 'assets/bgMusic.mp3');

    }

    create() {


        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        this.music = this.sound.add('bgMusic').setVolume(0.3) // 30% volume

        this.music.play()

        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'main').setOrigin(0, 0);
        var spaceDown = this.input.keyboard.addKey('SPACE');
        this.add.text(90, 600, 'Press spacebar to continue', { font: '30px Courier', fill: '#FFFFFF' });

        // Create all the animations here
        this.anims.create({
            key: 'chest',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 172, end: 172 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'fireball',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 79, end: 79 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'iceball',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 78, end: 78 }),
            frameRate: 5,
            repeat: -1
        })

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

        this.anims.create({
            key: 'wiz',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 32, end: 33 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'thi',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 34, end: 35 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'cle',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 38, end: 39 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'pal',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 40, end: 41 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'val',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 248, end: 251 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'skel',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 196, end: 199 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'guard',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 80, end: 81 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'british',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 94, end: 95 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'horse',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 21, end: 21 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'ankh',
            frames: this.anims.generateFrameNumbers('u3',
                { start: 61, end: 61 }),
            frameRate: 5,
            repeat: -1
        })


        // Small animations
        this.dragon = this.add.sprite(550, 500, 'u3').play('dragon').setScale(12);

        this.chest = this.add.sprite(30, 550, 'u3').play('chest').setScale(4);
        this.fireball = this.add.sprite(290, 550, 'u3').play('fireball').setScale(4);

        this.ranger = this.add.sprite(250, 550, 'u3').play('ranger').setScale(4);
        this.fighter = this.add.sprite(200, 550, 'u3').play('fig').setScale(4);
        this.wizard = this.add.sprite(140, 550, 'u3').play('wiz').setScale(4);
        this.cleric = this.add.sprite(90, 550, 'u3').play('cle').setScale(4);

        // Dragon tweens
        this.time.addEvent({ delay: 1000, callback: this.moveRightLeft, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 200, callback: this.moveRightLeft2, callbackScope: this, loop: false });

        // Define objects for player and inventory
        this.player = {}
        this.inventory = {}
        this.player.x = 300;
        this.player.y = 300
        this.inventory.horse = 1;
        this.inventory.chest = 1;
        this.inventory.item = 0;
        this.inventory.iceball = 0;
        this.inventory.fireball = 0;

        spaceDown.on('down', function () {
            console.log('space - Jump to world scene');

            this.scene.start('world', { player: this.player, inventory: this.inventory });
        }, this);

        // mouse or touch
        this.input.on('pointerdown', function (pointer) {
            console.log('mouse - Jump to world scene');

            this.scene.start('world', { player: this.player, inventory: this.inventory });
        }, this);

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

    moveRightLeft2() {
        //console.log('moveRightLeft2')
        this.tweens.timeline({
            targets: this.fireball,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 500,
            tweens: [
                {
                    x: 600,
                },
            ]
        });
    }

}
