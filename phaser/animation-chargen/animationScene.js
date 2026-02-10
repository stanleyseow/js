
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


        this.load.spritesheet('gen128', 'assets/charwalk-128x128.png',
            { frameWidth:128, frameHeight:128 });
        
        this.load.spritesheet('slash128', 'assets/charslash-128x128.png',
            { frameWidth:128, frameHeight:128 });

       // this.load.spritesheet('chars', 'assets/char8-52x72.png', { frameWidth: 52, frameHeight: 72 });


    } // end of preload //

    create (){

    console.log("*** animationScene ***")

  // Load sprite sheet

// this.physics.add.sprite(100, 100, "chars").play("char1-down")
// this.physics.add.sprite(200, 100, "chars").play("char1-left")
// this.physics.add.sprite(300, 100, "chars").play("char1-right")
// this.physics.add.sprite(400, 100, "chars").play("char1-up")

// this.physics.add.sprite(100, 200, "chars").play("char2-down")
// this.physics.add.sprite(200, 200, "chars").play("char2-left")
// this.physics.add.sprite(300, 200, "chars").play("char2-right")
// this.physics.add.sprite(400, 200, "chars").play("char2-up")

// this.physics.add.sprite(100, 300, "chars").play("char8-down")
// this.physics.add.sprite(200, 300, "chars").play("char8-left")
// this.physics.add.sprite(300, 300, "chars").play("char8-right")
// this.physics.add.sprite(400, 300, "chars").play("char8-up")

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
        key:'gen128-up',
        frames:this.anims.generateFrameNumbers('gen128',
        { start:0, end:8 }),
        frameRate:5,
        repeat:-1
    });

     this.anims.create({
        key:'gen128-left',
        frames:this.anims.generateFrameNumbers('gen128',
        { start:9, end:17 }),
        frameRate:5,
        repeat:-1
    });

       this.anims.create({
        key:'gen128-down',
        frames:this.anims.generateFrameNumbers('gen128',
        { start:18, end:26 }),
        frameRate:5,
        repeat:-1
    });

       this.anims.create({
        key:'gen128-right',
        frames:this.anims.generateFrameNumbers('gen128',
        { start:26, end:34 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'up-slash',
        frames:this.anims.generateFrameNumbers('slash128',
        { start:0, end:5 }),
        frameRate:5,
        repeat:-1
    });

     this.anims.create({
        key:'left-slash',
        frames:this.anims.generateFrameNumbers('slash128',
        { start:6, end:11 }),
        frameRate:5,
        repeat:-1
    });

       this.anims.create({
        key:'down-slash',
        frames:this.anims.generateFrameNumbers('slash128',
        { start:12, end:17 }),
        frameRate:5,
        repeat:-1
    });

       this.anims.create({
        key:'right-slash',
        frames:this.anims.generateFrameNumbers('slash128',
        { start:18, end:23 }),
        frameRate:5,
        repeat:-1
    });





    // this.anims.create({
    //     key:'enemy-up',
    //     frames:this.anims.generateFrameNumbers('enemy',
    //     { start:105, end:112 }),
    //     frameRate:5,
    //     repeat:-1
    // });

    // this.anims.create({
    //     key:'enemy-left',
    //     frames:this.anims.generateFrameNumbers('enemy',
    //     { start:118, end:125 }),
    //     frameRate:5,
    //     repeat:-1
    // });

    // this.anims.create({
    //     key:'enemy-down',
    //     frames:this.anims.generateFrameNumbers('enemy',
    //     { start:131, end:138 }),
    //     frameRate:5,
    //     repeat:-1
    // });

    // this.anims.create({
    //     key:'enemy-right',
    //     frames:this.anims.generateFrameNumbers('enemy',
    //     { start:144, end:151 }),
    //     frameRate:5,
    //     repeat:-1
    // });

    
    this.add.sprite(100, 100, 'gen').play('gen-up').setScale(2)
    this.add.sprite(250, 100, 'gen').play('gen-left').setScale(2)
    this.add.sprite(400, 100, 'gen').play('gen-down').setScale(2)
    this.add.sprite(550, 100, 'gen').play('gen-right').setScale(2)

    this.add.sprite(100, 200, 'gen128').play('gen128-up').setScale(2)
    this.add.sprite(250, 200, 'gen128').play('gen128-left').setScale(2)
    this.add.sprite(400, 200, 'gen128').play('gen128-down').setScale(2)
    this.add.sprite(550, 200, 'gen128').play('gen128-right').setScale(2)


    this.add.sprite(100, 300, 'slash128').play('up-slash').setScale(2)
    this.add.sprite(250, 300, 'slash128').play('left-slash').setScale(2)
    this.add.sprite(400, 300, 'slash128').play('down-slash').setScale(2)
    this.add.sprite(550, 300, 'slash128').play('right-slash').setScale(2)


    // this.add.sprite(100, 200, 'enemy').play('enemy-up').setScale(2)
    // this.add.sprite(250, 200, 'enemy').play('enemy-left').setScale(2)
    // this.add.sprite(400, 200, 'enemy').play('enemy-down').setScale(2)
    // this.add.sprite(550, 200, 'enemy').play('enemy-right').setScale(2)

    // gen is the alias in preload 
    //this.player = this.physics.add.sprite(10, 10, "gen");

    // debug player
    //window.player = this.player

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follow player
    //this.cameras.main.startFollow(this.player);

    } // end of create //

    update () {

    } // end of update // 
}