class goScene2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'goScene2' });
    }

    preload() {
        this.load.image('gameOver2','assets/goScene2.png');

    }

    create () {

        this.add.image(0, 0, 'gameOver2').setOrigin(0, 0);

        console.log("This is goScene2");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level2Scene");
        this.scene.stop("goScene2");
        this.scene.start("level2Scene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto level2Scene");
        this.scene.stop("goScene2");
        this.scene.start("level2Scene");
        }, this );

    }

}