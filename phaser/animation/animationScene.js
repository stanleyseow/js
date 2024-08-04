
class animationScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'animationScene' });
    }

    preload() {

        this.load.spritesheet('coin', 'assets/coin.png',{ frameWidth:32, frameHeight:32 });
        this.load.spritesheet('fire', 'assets/fire.png',
                            { frameWidth:40, frameHeight:70 });
        this.load.spritesheet('fruit', 'assets/fruits.png',
                            { frameWidth:120, frameHeight:120 });

        this.load.spritesheet('gen', 'assets/char-64x64.png',
                            { frameWidth:64, frameHeight:64 });                   

    } // end of preload //

    create (){

    console.log("animationScene")

    this.anims.create({
        key:'spinAnim',
        frames:this.anims.generateFrameNumbers('coin',
        { start:0, end:5 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'fireAnim',
        frames:this.anims.generateFrameNumbers('fire',
        { start:0, end:3 }),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'carrotAnim',
        frames:this.anims.generateFrameNumbers('fruit',
        { start:0, end:1 }),
        frameRate:5,
        repeat:-1
    });

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

    this.add.sprite(100, 200, 'fruit').play("carrotAnim")

    //this.add.sprite(100, 100, 'fire').play("fireAnim")

    this.add.sprite(100, 300, 'coin').play('spinAnim')

    this.add.sprite(100, 100, 'gen').play('gen-up').setScale(2)
    this.add.sprite(200, 100, 'gen').play('gen-down').setScale(2)
    this.add.sprite(300, 100, 'gen').play('gen-left').setScale(2)
    this.add.sprite(400, 100, 'gen').play('gen-right').setScale(2)

    } // end of create //

    update () {

    } // end of update // 
}