class storyScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyScene' });
    }

    preload() {
        this.load.image('story1','assets/storyScene.png');

    }

    create () {

        this.add.image(0, 0, 'story1').setOrigin(0, 0);

        console.log("This is storyScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story2Scene");
        this.scene.stop("storyScene");
        this.scene.start("story2Scene");
        }, this );

    }

}