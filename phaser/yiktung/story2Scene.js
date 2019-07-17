class story2Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'story2Scene' });
    }

    preload() {
        this.load.image('story2','assets/story2Scene.png');

    }

    create () {

        this.add.image(0, 0, 'story2').setOrigin(0, 0);

        console.log("This is story2Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto story3Scene");
        this.scene.stop("story2Scene");
        this.scene.start("story3Scene");
        }, this );

    }

}