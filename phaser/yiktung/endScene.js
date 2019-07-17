class endScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'endScene' });
    }

    preload() {
        this.load.image('end','assets/endScene.png');

    }

    create () {

        this.add.image(0, 0, 'end').setOrigin(0, 0);

        console.log("This is endScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto mainScene");
        this.scene.stop("endScene");
        this.scene.start("mainScene");
        }, this );

    }

}