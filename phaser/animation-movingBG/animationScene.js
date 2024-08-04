
class animationScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'animationScene' });
    }

    preload() {
    
        this.load.image("background", "assets/background.png");
        this.load.image("logo", "assets/logo.png");


        this.load.spritesheet('gen', 'assets/green-apron.png',
            { frameWidth:64, frameHeight:64 });

        this.load.spritesheet('enemy', 'assets/enemy.png',
            { frameWidth:64, frameHeight:64 });

    } // end of preload //

    create (){

    console.log("animationScene")

    this.background = this.add
    .tileSprite(0, 0, this.width, this.height, "background")
    .setOrigin(0)
    .setScrollFactor(0, 1);

    this.showLogo();

    this.addAnim();
    
    this.add.sprite(150, 100, 'gen').play('gen-up').setScale(2)
    this.add.sprite(300, 100, 'gen').play('gen-left').setScale(2)
    this.add.sprite(450, 100, 'gen').play('gen-down').setScale(2)
    this.add.sprite(600, 100, 'gen').play('gen-right').setScale(2)

    this.add.sprite(150, 400, 'enemy').play('enemy-up').setScale(2)
    this.add.sprite(300, 400, 'enemy').play('enemy-left').setScale(2)
    this.add.sprite(450, 400, 'enemy').play('enemy-down').setScale(2)
    this.add.sprite(600, 400, 'enemy').play('enemy-right').setScale(2)

    } // end of create //

    update () {

        this.background.tilePositionY -= 2;
        this.background.tilePositionX += 2;

    } // end of update // 

    addAnim() {
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
    }

    showLogo() {
        this.gameLogoShadow = this.add
          .image(400, 300, "logo")
          .setScale(0.7)
          .setOrigin(0.5);
        this.gameLogoShadow.setOrigin(0.48);
        this.gameLogoShadow.tint = 0x3e4e43;
        this.gameLogoShadow.alpha = 0.6;

        this.gameLogo = this.add
          .image(400, 300, "logo")
          .setScale(0.7)
          .setOrigin(0.5);
    
        // this.tweens.add({
        //   targets: [this.gameLogo, this.gameLogoShadow],
        //   duration: 500,
        //   y: {
        //     from: -200,
        //     to: 400,
        //   },
        // });
    
        this.tweens.add({
          targets: [this.gameLogo, this.gameLogoShadow],
          duration: 1500,
          y: {
            from: 200,
            to: 400,
          },
          repeat: -1,
          yoyo: true,
        });
      }
    
}