class stage2preload extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'stage2preload' });
    }

    preload() {
        this.load.image('stage2preload','assets/ticket2jpn.png');

    }

    create () {

        this.add.image(0, 0, 'stage2preload').setOrigin(0, 0);
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is preloadstage2");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level2");
        this.scene.stop("stage2preload");
        this.scene.start("level2");
        }, this );

    }

}
