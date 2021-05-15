class level1End extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1End' });
    }


    preload() {
        this.load.image('level1End','assets/level1End.png');

    }

    create () {

        this.add.image(0, 0, 'level1End').setOrigin(0, 0);

        this.add.text(0, 570, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is level1End");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level2");
        this.scene.stop("level1End");
        this.scene.start("level2");
        }, this );

    }

}
