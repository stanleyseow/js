var startText;

class startScene extends Phaser.Scene {
    constructor() {
        super("startScene")
    }

create() {
    this.add.text(20,20, "Loading platform tutorial game...");

    startText = this.add.text(400,300, 'Click to continue', {
        fontSize: '60px',
        fill: '#fff'
    });
    startText.setOrigin(0.5);



    // Goto playGame scene when mouse is clicked
    this.input.once('pointerdown', function(){
        this.scene.start("gameScene");
        }, this );
}

}