
class animationScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'animationScene' });
    }

    preload() {

        this.load.spritesheet('coin', 'assets/coin.png',
        { frameWidth:32, frameHeight:32 });

        this.load.spritesheet('fire', 'assets/fire.png',
        { frameWidth:40, frameHeight:70 });

        this.load.spritesheet('heart', 'assets/heart.png',
        { frameWidth:35, frameHeight:40 });

        this.load.spritesheet('monkiddo', 'assets/monKiddo-64x64.png',
        { frameWidth:64, frameHeight:64 });

        this.load.spritesheet('fruit', 'assets/fruits.png',
                            { frameWidth:120, frameHeight:120 });



    } // end of preload //

    create (){

    console.log("animationScene")



    this.anims.create({
        key:'spin',
        frames:this.anims.generateFrameNumbers('coin',
        { start:0, end:5 }),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'fastspin',
        frames:this.anims.generateFrameNumbers('coin',
        { start:0, end:5 }),
        frameRate:20,
        repeat:-1
    });

    this.anims.create({
        key:'slowflame',
        frames:this.anims.generateFrameNumbers('fire',
        { start:0, end:3 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'fastflame',
        frames:this.anims.generateFrameNumbers('fire',
        { start:0, end:3 }),
        frameRate:20,
        repeat:-1
    });

    this.anims.create({
        key:'jumpheart',
        frames:this.anims.generateFrameNumbers('heart',
        { start:0, end:1 }),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'left',
        frames:this.anims.generateFrameNumbers('monkiddo',
        { start:0, end:2 }),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'up',
        frames:this.anims.generateFrameNumbers('monkiddo',
        { start:3, end:5 }),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'down',
        frames:this.anims.generateFrameNumbers('monkiddo',
        { start:6, end:8 }),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'right',
        frames:this.anims.generateFrameNumbers('monkiddo',
        { start:9, end:11 }),
        frameRate:10,
        repeat:-1
    });


    this.anims.create({
        key:'carrotOrange',
        frames: [
            { key: 'fruit', frame: 0 },
            { key: 'fruit', frame: 1 },
            // { key: 'fruit', frame: 3 },
            // { key: 'fruit', frame: 4 },
            // { key: 'fruit', frame: 5 },
            { key: 'fruit', frame: 6 },
            { key: 'fruit', frame: 7 },
        ],
        //this.anims.generateFrameNumbers('fruitImg', { frames: [ 6, 7 ] }),
        frameRate:5,
        repeat:-1
    });

    // this.add.sprite(100, 100, 'coin').play('spin').setScale(2)
    // this.add.sprite(100, 200, 'coin').play('fastspin').setScale(2)


    this.add.sprite(300, 300, 'fruit').play('carrotOrange')
    // this.add.sprite(100, 300, 'fire').play('slowflame')
    // // this.add.sprite(100, 400, 'fire').play('fastflame')

    // this.add.sprite(100, 500, 'heart').play('jumpheart').setScale(2)

    // this.add.sprite(100, 300, 'monkiddo').play('left')
    // this.add.sprite(200, 300, 'monkiddo').play('up')
    // this.add.sprite(300, 300, 'monkiddo').play('down')
    // this.add.sprite(400, 300, 'monkiddo').play('right')

    } // end of create //

    update () {

    } // end of update // 
}