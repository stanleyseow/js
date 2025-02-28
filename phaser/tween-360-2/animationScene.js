
class animationScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'animationScene' });
    }

    preload() {
    
        this.load.spritesheet('gen', 'assets/green-apron.png',
            { frameWidth:64, frameHeight:64 });

        this.load.spritesheet('enemy', 'assets/enemy.png',
            { frameWidth:64, frameHeight:64 });

    } // end of preload //

    create (){

    console.log("animationScene")

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

    
    // this.add.sprite(100, 10, 'gen').play('gen-up').setScale(2)
    // this.add.sprite(200, 10, 'gen').play('gen-left').setScale(2)
    // this.add.sprite(300, 10, 'gen').play('gen-down').setScale(2)
    // this.add.sprite(400, 10, 'gen').play('gen-right').setScale(2)

    // gen is the alias in preload 
    this.player = this.physics.add.sprite(100, 300, "gen").play("gen-right")
    this.player2 = this.physics.add.sprite(300, 100, "gen").play("gen-down")

    this.tweens.add({
        targets: this.player,
        x: 400,
        flipX: true,
        yoyo: true,
        duration: 1800,
        repeat: -1,
        })

        this.tweens.add({
            targets: this.player2,
            y: 400,
            yoyo: true,
            duration: 1800,
            repeat: -1,
    
                onYoyo: () => {
                    console.log('updown onYoyo...');
                    this.player2.play("gen-up")  
                },
                onRepeat: () => {
                    console.log('updown onRepeat...');
                    this.player2.play("gen-down")  
                }         
            })

        

        


    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();
    // Camera follow player
    //this.cameras.main.startFollow(this.player);

    } // end of create //

    update () {

        // if (this.cursors.left.isDown) {
        //     this.player.setVelocityX(-160);
        //     this.player.anims.play('gen-left', true);
        // }
        // else if (this.cursors.right.isDown) {
        //     this.player.setVelocityX(160);
        //     this.player.anims.play('gen-right', true);
        // }
        // else if (this.cursors.up.isDown) {
        //     this.player.setVelocityY(-160);
        //     this.player.anims.play('gen-up', true);
        // }
        // else if (this.cursors.down.isDown) {
        //     this.player.setVelocityY(160);
        //     this.player.anims.play('gen-down', true);
        // }
        // else {
        //     this.player.setVelocity(0);
        //     this.player.anims.stop();
        // }

    } // end of update // 
}