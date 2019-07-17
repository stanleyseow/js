class goScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'goScene' });
    }

    preload() {
        this.load.image('gameOver','assets/goScene.png');

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

    }

}