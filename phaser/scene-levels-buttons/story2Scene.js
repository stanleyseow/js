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

        this.add.text(0, 570, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is story2Scene");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.scene.stop("story2Scene");
        this.scene.start("level1");
        }, this );

    }

}
