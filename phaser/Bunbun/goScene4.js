class goScene4 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'goScene4' });
    }

    preload() {
        this.load.image('gameOver4','assets/goScene4.png');

    }

    create () {

        this.add.image(0, 0, 'gameOver4').setOrigin(0, 0);

        console.log("This is goScene4");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level4Scene");
        this.scene.stop("goScene4");
        this.scene.start("level4Scene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto level4Scene");
        this.scene.stop("goScene4");
        this.scene.start("level4Scene");
        }, this );

    }

}