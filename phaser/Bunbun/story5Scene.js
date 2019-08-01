class story5Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story5Scene' });
    }

    preload() {
        this.load.image('story5','assets/story5Scene.png');
        this.load.spritesheet('thought', 'assets/thought.png', { frameWidth: 750, frameHeight: 460});
        this.load.audio('hungry', 'assets/music/hungry.mp3');

    }

    create () {

        this.hunger = this.sound.add('hungry', {volume: 0.5});
        //this.hunger.loop = true;
        this.hunger.play();

        this.anims.create({
            key: 'thinking',
            frames: this.anims.generateFrameNumbers('thought', { start: 0, end: 2 }),
            frameRate: 2,
            repeat: -1
        });

        this.add.image(0, 0, 'story5').setOrigin(0, 0);

        this.thought= this.add.group();

        this.thought.create( 310, 230, 'thought').play('thinking');

        console.log("This is story5Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto instructionScene");
        this.scene.stop("story5Scene");
        this.scene.start("insScene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto instructionScene");
        this.scene.stop("story5Scene");
        this.scene.start("insScene");
        }, this );


    }

}