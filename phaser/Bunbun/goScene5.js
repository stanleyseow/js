class goScene5 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'goScene5' });
    }

    preload() {
        this.load.image('gameOver5','assets/goScene5.png');

    }

    create () {

        this.add.image(0, 0, 'gameOver5').setOrigin(0, 0);

        console.log("This is goScene5");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level5Scene");
        this.scene.stop("goScene5");
        this.scene.start("level5Scene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto level5Scene");
        this.scene.stop("goScene5");
        this.scene.start("level5Scene");
        }, this );

    }

}