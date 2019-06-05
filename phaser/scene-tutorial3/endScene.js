class endScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'endScene' });
    }

    create ()
    {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffcc33, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(300, 100, 100, 100);

        this.add.text(320, 110, 'C', { font: '96px Courier', fill: '#000000' });
        this.add.text(120, 310, 'Press A to go main page', { font: '24px Courier', fill: '#000000' });
        this.add.text(120, 350, 'Press R to restart game', { font: '24px Courier', fill: '#000000' });

        var aDown = this.input.keyboard.addKey('A');
        var rDown = this.input.keyboard.addKey('R');
        
        rDown.on('down', function(){
        console.log("R pressed (reload game)");
        this.scene.stop("endScene");
        this.scene.start("gameScene");
        }, this );

        aDown.on('down', function(){
            console.log("A pressed (main menu)");
            this.scene.stop("endScene");
            this.scene.start("preloadScene");
            }, this );

    }
}
