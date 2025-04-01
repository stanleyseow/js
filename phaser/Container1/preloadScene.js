class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }


    create () {

        console.log("preloadScene")
        this.add.text(10,500, 'Container Examples, click or spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });

        let spaceDown = this.input.keyboard.addKey('SPACE');
        spaceDown.on('down', function(){
            this.scene.start("mainScene");
        }, this );

        this.input.on("pointerdown", function (pointer) {
            this.scene.start("mainScene");
        }, this )

    }

}
