
class animationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'animationScene' });
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

        // this.add.sprite(100, 100, 'coin')
        // this.add.sprite(100, 300, 'coin').play('spin')
        // this.add.sprite(140, 300, 'coin').play('fastspin')

        // this.add.sprite(100, 200, 'fire').play('burn')
        // this.add.sprite(140, 200, 'fire').play('burn')
        // this.add.sprite(180, 200, 'fire').play('burn')
        // this.add.sprite(220, 200, 'fire').play('burn')
        // this.add.sprite(260, 200, 'fire').play('burn')

        // this.fireGroup = this.add.group({
        //     key: 'fire',
        //     repeat: 10,
        //     setXY: { x: 100, y: 200, stepX: Phaser.Math.Between(10,100) }
        // });

        // this.fireGroup.children.iterate( c=>{
        //     c.play('burn').setScale(2)
        // })

        this.player = this.physics.add.sprite(100, 200, 'gen').setScale(2)

        // this.add.sprite(100, 100, 'gen').play('gen-up').setScale(2)
        // this.add.sprite(250, 100, 'gen').play('gen-left').setScale(2)
        // this.add.sprite(400, 100, 'gen').play('gen-down').setScale(2)
        // this.add.sprite(550, 100, 'gen').play('gen-right').setScale(2)

        // this.add.sprite(100, 200, 'gen').play('gen-cast-up').setScale(2)
        // this.add.sprite(250, 200, 'gen').play('gen-cast-left').setScale(2)
        // this.add.sprite(400, 200, 'gen').play('gen-cast-down').setScale(2)
        // this.add.sprite(550, 200, 'gen').play('gen-cast-right').setScale(2)

        // this.add.sprite(100, 300, 'gen').play('gen-attack-up').setScale(2)
        // this.add.sprite(250, 300, 'gen').play('gen-attack-left').setScale(2)
        // this.add.sprite(400, 300, 'gen').play('gen-attack-down').setScale(2)
        // this.add.sprite(550, 300, 'gen').play('gen-attack-right').setScale(2)

        // this.add.sprite(100, 400, 'gen-spear').play('gen-spear-up').setScale(2)
        // this.add.sprite(250, 400, 'gen-spear').play('gen-spear-left').setScale(2)
        // this.add.sprite(400, 400, 'gen-spear').play('gen-spear-down').setScale(2)
        // this.add.sprite(550, 400, 'gen-spear').play('gen-spear-right').setScale(2)

        // this.add.sprite(100, 500, 'gen-bow').play('gen-shoot-up').setScale(2)
        // this.add.sprite(250, 500, 'gen-bow').play('gen-shoot-left').setScale(2)
        // this.add.sprite(400, 500, 'gen-bow').play('gen-shoot-down').setScale(2)
        // this.add.sprite(550, 500, 'gen-bow').play('gen-shoot-right').setScale(2)

        this.cursors = this.input.keyboard.createCursorKeys();

    } // end of create //

    update() {

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('gen-left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('gen-right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play('gen-up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('gen-down', true);
        }
        else {
            this.player.setVelocity(0);
            this.player.anims.stop();
        }

    } // end of update // 
}