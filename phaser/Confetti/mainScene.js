
class mainScene extends Phaser.Scene {
    constructor ()
    {
        super('mainScene');
    }

    preload() {
    
        this.load.spritesheet('gen', 'assets/green-apron.png',
            { frameWidth:64, frameHeight:64 });

        this.load.spritesheet('enemy', 'assets/enemy.png',
            { frameWidth:64, frameHeight:64 });

    } // end of preload //

    create (){

    console.log("mainScene")

    this.anims.create({
        key:'gen-up',
        frames:this.anims.generateFrameNumbers('gen',
        { start:105, end:112 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-left',
        frames:this.anims.generateFrameNumbers('gen',
        { start:118, end:125 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-down',
        frames:this.anims.generateFrameNumbers('gen',
        { start:131, end:138 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-right',
        frames:this.anims.generateFrameNumbers('gen',
        { start:144, end:151 }),
        frameRate:5,
        repeat:-1
    });

    
    this.anims.create({
        key:'attack-left',
        frames:this.anims.generateFrameNumbers('gen',
        { start:169, end:174 }),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'attack-right',
        frames:this.anims.generateFrameNumbers('gen',
        { start:195, end:200 }),
        frameRate:10,
        repeat:-1
    });


    this.anims.create({
        key:'enemy-up',
        frames:this.anims.generateFrameNumbers('enemy',
        { start:105, end:112 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'enemy-left',
        frames:this.anims.generateFrameNumbers('enemy',
        { start:118, end:125 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'enemy-down',
        frames:this.anims.generateFrameNumbers('enemy',
        { start:131, end:138 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'enemy-right',
        frames:this.anims.generateFrameNumbers('enemy',
        { start:144, end:151 }),
        frameRate:5,
        repeat:-1
    });

    
    this.add.sprite(100, 100, 'gen').play('gen-up').setScale(1)
    this.add.sprite(200, 100, 'gen').play('gen-left').setScale(1)
    this.add.sprite(300, 100, 'gen').play('gen-down').setScale(1)
    this.add.sprite(400, 100, 'gen').play('gen-right').setScale(1)
    this.add.sprite(100, 200, 'gen').play('attack-left').setScale(1)
    this.add.sprite(200, 200, 'gen').play('attack-right').setScale(1)

    // this.add.sprite(100, 200, 'enemy').play('enemy-up').setScale(2)
    // this.add.sprite(250, 200, 'enemy').play('enemy-left').setScale(2)
    // this.add.sprite(400, 200, 'enemy').play('enemy-down').setScale(2)
    // this.add.sprite(550, 200, 'enemy').play('enemy-right').setScale(2)

    // gen is the alias in preload 
    this.player = this.physics.add.sprite(50, 50, "gen");
    window.player = this.player

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follow player
    this.cameras.main.startFollow(this.player);

    } // end of create //

    update () {

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