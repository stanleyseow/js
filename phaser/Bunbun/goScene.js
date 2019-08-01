class goScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'goScene' });
    }

    preload() {
        this.load.image('gameOver','assets/goScene1.png');

    }

    create () {

        this.add.image(0, 0, 'gameOver').setOrigin(0, 0);

        console.log("This is goScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1Scene");
        this.scene.stop("goScene");
        this.scene.start("level1Scene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto level1Scene");
        this.scene.stop("goScene");
        this.scene.start("level1Scene");
        }, this );


    }

}