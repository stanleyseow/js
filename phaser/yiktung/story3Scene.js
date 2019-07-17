class story3Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story3Scene' });
    }

    preload() {
        this.load.image('story3','assets/story3Scene.png');

    }

    create () {

        this.add.image(0, 0, 'story3').setOrigin(0, 0);

        console.log("This is story3Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story4Scene");
        this.scene.stop("story3Scene");
        this.scene.start("story4Scene");
        }, this );

    }

}