class story5Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story5Scene' });
    }

    preload() {
        this.load.image('story5','assets/story5Scene.png');

    }

    create () {

        this.add.image(0, 0, 'story5').setOrigin(0, 0);

        console.log("This is story5Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto instructionScene");
        this.scene.stop("story5Scene");
        this.scene.start("insScene");
        }, this );

    }

}