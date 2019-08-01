class goScene3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'goScene3' });
    }

    preload() {
        this.load.image('gameOver3','assets/goScene3.png');

    }

    create () {

        this.add.image(0, 0, 'gameOver3').setOrigin(0, 0);

        console.log("This is goScene3");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level3Scene");
        this.scene.stop("goScene3");
        this.scene.start("level3Scene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto level3Scene");
        this.scene.stop("goScene3");
        this.scene.start("level3Scene");
        }, this );

    }

}