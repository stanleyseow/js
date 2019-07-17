class stage3preload extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'stage3preload' });
    }

    preload() {
        this.load.image('stage3preload','assets/ticket2prs.png');

    }

    create () {

        this.add.image(0, 0, 'stage3preload').setOrigin(0, 0);
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is preloadstage3");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level3");
        this.scene.stop("stage3preload");
        this.scene.start("level3");
        }, this );

    }

}
