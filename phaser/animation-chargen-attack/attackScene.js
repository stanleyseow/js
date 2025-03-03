
class attackScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'attackScene' });
    }

    preload() {
    
        this.load.spritesheet(
                 'gen', 'assets/char-blank-64x64.png',
                     { frameWidth:64, frameHeight:64}                     
                    )

        // this.load.spritesheet('gen_sword', 'assets/char-gen-attack.png', {
        //     frameWidth: 128,    // Double width for attack frames
        //     frameHeight: 128,   // Double height for attack frames
        // });


        this.load.spritesheet('sword', 'assets/sword-192x192.png', {
            frameWidth: 192,    // Double width for attack frames
            frameHeight: 192,   // Double height for attack frames
        });



    } // end of preload //

    create (){

    console.log("charGen attack")

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
        key: 'sword_up',
        frames: this.anims.generateFrameNumbers('sword',
        { start: 0, end:5  }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'sword_left',
        frames: this.anims.generateFrameNumbers('sword',
        { start: 6, end:11  }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'sword_down',
        frames: this.anims.generateFrameNumbers('sword',
        { start: 12, end:17  }),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key: 'sword_right',
        frames: this.anims.generateFrameNumbers('sword',
        { start: 18, end:23  }),
        frameRate: 8,
        repeat: -1
    })

    
    // this.add.sprite(100, 100, 'gen').play('line1').setScale(1)
    // this.add.sprite(150, 100, 'gen').play('line2').setScale(1)
    // this.add.sprite(200, 100, 'gen').play('line3').setScale(1)
    // this.add.sprite(250, 100, 'gen').play('line4').setScale(1)

    this.add.sprite(100, 200, 'gen').play('gen-up').setScale(1)
    this.add.sprite(150, 200, 'gen').play('gen-left').setScale(1)
    this.add.sprite(200, 200, 'gen').play('gen-down').setScale(1)
    this.add.sprite(250, 200, 'gen').play('gen-right').setScale(1)

    //this.add.sprite(100, 300, 'gen').play('line99').setScale(1)
    this.add.sprite(100, 300, 'gen').play('sword_up').setScale(1)
    this.add.sprite(300, 300, 'gen').play('sword_down').setScale(1)
    this.add.sprite(500, 300, 'gen').play('sword_left').setScale(1)
    this.add.sprite(600, 300, 'gen').play('sword_right').setScale(1)
    
    // gen is the alias in preload 
    this.player = this.physics.add.sprite(100, 500, "gen").play("gen-down")
    this.add.sprite(100-32, 500, 'gen').play('sword_left').setScale(1)
    this.add.sprite(100+32, 500, 'gen').play('sword_right').setScale(1)
    window.player = this.player

    this.player = this.physics.add.sprite(300, 500, "gen").play("gen-down")
    this.add.sprite(300, 500-32, 'gen').play('sword_up').setScale(1)
    this.add.sprite(300, 500+32, 'gen').play('sword_down').setScale(1)
    window.player = this.player

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follow player
    //this.cameras.main.startFollow(this.player);

    } // end of create //

    update () {

    } // end of update // 
}