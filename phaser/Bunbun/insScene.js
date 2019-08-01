class insScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'insScene' });
    }

    preload() {
        this.load.image('instruction','assets/instructionScene.png');

    }

    create () {

        this.add.image(0, 0, 'instruction').setOrigin(0, 0);

        console.log("This is insScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1Scene");
        this.scene.stop("insScene");
        this.scene.start("level1Scene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto level1Scene");
        this.scene.stop("insScene");
        this.scene.start("level1Scene");
        }, this );

    }

}