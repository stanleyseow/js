class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }
    create () {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xff3300, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(100, 100, 100, 100);

        this.add.text(120, 110, 'A', { font: '96px Courier', fill: '#000000' });
        this.add.text(120, 310, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is preloadScene spacebar V3");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto gameScene");
        //this.scene.stop("preloadScene");
        this.scene.start("gameScene");
        }, this );

    }

}
