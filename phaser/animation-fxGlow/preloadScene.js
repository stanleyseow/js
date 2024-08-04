class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super("preloadScene");
    }


    create () {

        console.log("preloadScene")
        this.add.text(50,500, 'GLOW-FX 3.60 - Press spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("animationScene");
            }, this );

    }

}
