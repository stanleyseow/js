class npcShoot extends Phaser.Scene {
    constructor() {
        super({ key: 'npcShoot' });
    }

    preload() {

        this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('fire', 'assets/fire.png', { frameWidth: 40, frameHeight: 70 });

        this.load.spritesheet('gen', 'assets/char-blank2-64x64.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('gen-bow', 'assets/char-bow-64x64.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('knifeImg', 'assets/knife-32x32.png', {frameWidth: 32, frameHeight: 32});


    } // end of preload //

    create() {

        console.log("npc shoot knife")

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


        this.anims.create({
            key: 'gen-bow-up',
            frames: this.anims.generateFrameNumbers('gen-bow',
                { start: 105, end: 112 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-bow-left',
            frames: this.anims.generateFrameNumbers('gen-bow',
                { start: 118, end: 125 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-bow-down',
            frames: this.anims.generateFrameNumbers('gen-bow',
                { start: 131, end: 138 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-bow-right',
            frames: this.anims.generateFrameNumbers('gen-bow',
                { start: 144, end: 151 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-bow-shoot-left',
            frames: this.anims.generateFrameNumbers('gen-bow',
                { start: 221, end: 233 }),
            frameRate: 5,
            repeat: -1
        });


      this.anims.create({
        key: "knifeAnim",
        frames: this.anims.generateFrameNumbers("knifeImg", { start: 0, end: 15 }),
        frameRate: 20,
        repeat: -1,
      });

        this.player = this.physics.add.sprite(200, 300, 'gen')

        this.npc1 = this.physics.add.sprite(600, 100, 'gen-bow').play("gen-bow-shoot-left")
        this.npc2 = this.physics.add.sprite(600, 400, 'gen-bow').play("gen-bow-shoot-left")

        this.knife1 = this.physics.add.sprite(580, 100, "knifeImg").play("knifeAnim")
        this.knife2 = this.physics.add.sprite(580, 400, "knifeImg").play("knifeAnim")


        this.timer1= this.time.addEvent({
            delay: 2000,
            callback: this.shootKnife,
            callbackScope: this,
            loop: true,
          });


        this.timer2= this.time.addEvent({
            delay: 4000,
            callback: this.resetKnife,
            callbackScope: this,
            loop: true,
          });
      

        this.cursors = this.input.keyboard.createCursorKeys();

    } // end of create //

    update() {

        this.angle1= Phaser.Math.Angle.BetweenPoints(this.npc1, this.player);
        this.angle2 = Phaser.Math.Angle.BetweenPoints(this.npc2, this.player);

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


    shootKnife (){
        let deg1 = Phaser.Math.RadToDeg(this.angle1)
        let deg2 = Phaser.Math.RadToDeg(this.angle2)
        console.log("shoot knife degree: ",90-deg1, 90-deg2)

        this.physics.velocityFromRotation(this.angle1, 300, this.knife1.body.velocity);
        this.physics.velocityFromRotation(this.angle2, 300, this.knife2.body.velocity);
 
      }

      resetKnife() {
        console.log("Reset knife location")
        this.knife1.x = this.npc1.x
        this.knife1.y = this.npc1.y
        this.knife2.x = this.npc2.x
        this.knife2.y = this.npc2.y
      }
}