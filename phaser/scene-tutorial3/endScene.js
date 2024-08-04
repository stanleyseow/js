class endScene extends Phaser.Scene {

    constructor ()
    {
        super('endScene');
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
        this.add.text(120, 410, 'Press 1 to gameOver', { font: '24px Courier', fill: '#000000' });


        var aDown = this.input.keyboard.addKey('A');
        var rDown = this.input.keyboard.addKey('R');

        var key1Down = this.input.keyboard.addKey(49);
        var key2Down = this.input.keyboard.addKey(50);
        
        key1Down.on('down', function(){
            console.log("Key 1 pressed");
                this.scene.start("gameOver");
            }, this );

        rDown.on('down', function(){
        console.log("R pressed (reload game)");
            this.scene.start("gameScene");
        }, this );

        aDown.on('down', function(){
            console.log("A pressed (main menu)");
            this.scene.start("preloadScene");
            }, this );

    }
}
