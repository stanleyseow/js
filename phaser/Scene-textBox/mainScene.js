
class mainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'mainScene' });
    }

    preload() {

        this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('fire', 'assets/fire.png', { frameWidth: 40, frameHeight: 70 });

        this.load.spritesheet('crowd', 'assets/characters-52x72.png', { frameWidth: 52, frameHeight: 72 });

        this.load.spritesheet('monkiddo', 'assets/monkiddo.png', { frameWidth: 72, frameHeight: 72 });

        this.load.spritesheet('gen', 'assets/char-blank2-64x64.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('gen-spear', 'assets/char-spear-64x64.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('gen-bow', 'assets/char-bow-64x64.png', { frameWidth: 64, frameHeight: 64 });



    } // end of preload //

    create() {

        console.log("animationScene")

        this.anims.create({
            key: 'gen-up',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 105, end: 112 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-left',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 118, end: 125 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-down',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 131, end: 138 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-right',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 144, end: 151 }),
            frameRate: 5,
            repeat: -1
        });



        this.player = this.physics.add.sprite(100, 200, 'gen').setScale(2)
        this.player.setOrigin(0); // Align to top-left for easier grid math
        this.tileSize = 32;


        this.cursors = this.input.keyboard.createCursorKeys();

    } // end of create //

    update() {


    } // end of update // 
}