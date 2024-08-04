
class animationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'animationScene' });
    }

    preload() {

        this.load.spritesheet('monkiddo', 'assets/monkiddo72x72.png',
            { frameWidth: 72, frameHeight: 72 });

    } // end of preload //

    create() {

        console.log("animationScene")

        this.anims.create({
            key: 'right-monkiddo',
            frames: this.anims.generateFrameNumbers('monkiddo',
                { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up-monkiddo',
            frames: this.anims.generateFrameNumbers('monkiddo',
                { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down-monkiddo',
            frames: this.anims.generateFrameNumbers('monkiddo',
                { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left-monkiddo',
            frames: this.anims.generateFrameNumbers('monkiddo',
                { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });


        // this.add.sprite(100,100, 'monkiddo').play('left-monkiddo').setScale(2)
        // this.add.sprite(200,100, 'monkiddo').play('up-monkiddo').setScale(2)
        // this.add.sprite(300,100, 'monkiddo').play('down-monkiddo').setScale(2)
        // this.add.sprite(400,100, 'monkiddo').play('right-monkiddo').setScale(2)

        this.player = this.physics.add.sprite(100, 400, 'monkiddo').play('right-monkiddo')
        this.player2 = this.physics.add.sprite(400, 100, 'monkiddo').play('down-monkiddo')


        this.tweens.add({
            targets: this.player,
            x: 700,
            flipX: true,
            yoyo: true,
            duration: 3000,
            repeat: -1
        });

        this.tweens.add({
            targets: this.player2,
            y: 500,
            flipY: true,
            yoyo: true,
            duration: 3000,
            repeat: -1
        });


        //this.cursors = this.input.keyboard.createCursorKeys();

    } // end of create //

    update() {

        // if (this.cursors.left.isDown)
        // {
        //     this.player.setVelocityX(-160);
        //     this.player.anims.play('left-monkiddo', true);
        // }
        // else if ( this.cursors.right.isDown)
        // {
        //     this.player.setVelocityX(160);
        //     this.player.anims.play('right-monkiddo', true);
        // }
        // else if ( this.cursors.up.isDown)
        // {
        //     this.player.setVelocityY(-160);
        //     this.player.anims.play('up-monkiddo', true);
        // }
        // else if ( this.cursors.down.isDown)
        // {
        //     this.player.setVelocityY(160);
        //     this.player.anims.play('down-monkiddo', true);
        // }
        // else
        // {
        //     this.player.setVelocity(0);
        // }

    } // end of update // 
}