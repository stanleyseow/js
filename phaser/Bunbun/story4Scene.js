class story4Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story4Scene' });
    }

    preload() {
        this.load.spritesheet('story4','assets/story4Scene.png', { frameWidth: 750, frameHeight: 460});
        this.load.spritesheet('bling', 'assets/bling.png', { frameWidth: 750, frameHeight: 460});
        this.load.audio('omg', 'assets/music/omg.mp3');

    }

    create () {

        this.omgosh = this.sound.add('omg');
        //this.omgosh.loop = true;
        this.omgosh.play();

        this.anims.create({
            key: 'biggerbling',
            frames: this.anims.generateFrameNumbers('bling', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'storybling',
            frames: this.anims.generateFrameNumbers('story4', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        this.bling= this.add.group();

        this.bling.create( 375, 230, 'bling').play('biggerbling');

        this.story4= this.add.group();

        this.story4.create( 375, 230, 'story4').play('storybling');

        //this.add.image(0, 0, 'story4').setOrigin(0, 0);

        console.log("This is story4Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story5Scene");
        this.scene.stop("story4Scene");
        this.scene.start("story5Scene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto story5Scene");
        this.scene.stop("story4Scene");
        this.scene.start("story5Scene");
        }, this );

    }

}