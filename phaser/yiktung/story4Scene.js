class story4Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story4Scene' });
    }

    preload() {
        this.load.image('story4','assets/story4Scene.png');

    }

    create () {

        this.add.image(0, 0, 'story4').setOrigin(0, 0);

        console.log("This is story4Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story5Scene");
        this.scene.stop("story4Scene");
        this.scene.start("story5Scene");
        }, this );

    }

}