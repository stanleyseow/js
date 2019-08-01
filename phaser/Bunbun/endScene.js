class endScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'endScene' });
    }

    preload() {
        this.load.image('end','assets/endScene.png');
        this.load.audio('laugh', 'assets/music/laugh.mp3');

    }

    create () {

        this.giggle = this.sound.add('laugh');
        //this.omgosh.loop = true;
        this.giggle.play();

        this.add.image(0, 0, 'end').setOrigin(0, 0);

        console.log("This is endScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto mainScene");
        this.scene.stop("endScene");
        this.scene.start("mainScene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto mainScene");
        this.scene.stop("endScene");
        this.scene.start("mainScene");
        }, this );

    }

}