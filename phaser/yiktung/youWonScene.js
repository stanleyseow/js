class youWonScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'youWonScene' });
    }

    preload() {
        this.load.image('youWon','assets/youWonScene.png');

    }

    create () {

        this.add.image(0, 0, 'youWon').setOrigin(0, 0);

        console.log("This is youWonScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto endScene");
        this.scene.stop("youWon");
        this.scene.start("endScene");
        }, this );

    }

}