class main2Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'main2Scene' });
    }


    preload() {
        this.load.image('main2','assets/main2Scene.png');

    }

    create () {

        this.add.image(0, 0, 'main2').setOrigin(0, 0);

        // graphics.fillStyle(0xff3300, 1);

        // graphics.fillRect(100, 200, 600, 300);
        // graphics.fillRect(100, 100, 100, 100);
        // this.add.text(120, 110, 'A', { font: '96px Courier', fill: '#000000' });

        this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is main2Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("main2Scene");
        this.scene.start("storyScene");
        }, this );

    }

}
