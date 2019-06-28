


class endScene extends Phaser.Scene {
    constructor() {
        super("endScene")
    }

create() {

        var gameoverText;
        gameoverText = this.add.text(400,300, 'Game Over', {
            fontSize: '70px',
            fill: '#fff'
        });

        gameoverText.setOrigin(0.5);
        gameoverText.visible = true;

        // Text for key input
        this.add.text(210, 410, 'Press A to go main page', { font: '24px Courier', fill: '#ff00ff' });
        this.add.text(210, 450, 'Press R to restart game', { font: '24px Courier', fill: '#ff00ff' });

        // Read keys A or R
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
            this.scene.start("startScene");
            }, this );

    console.log("Game Over")



    }

}