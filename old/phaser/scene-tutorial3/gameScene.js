
class gameScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameScene' });
    }

    create ()
    {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xff9933, 1);

        graphics.fillRect(100, 200, 600, 300);
        graphics.fillRect(200, 100, 100, 100);

        this.add.text(220, 110, 'B', { font: '96px Courier', fill: '#000000' });
        this.add.text(120, 310, 'Click to go endScene', { font: '24px Courier', fill: '#000000' });

        this.input.once('pointerdown', function(){
        console.log("Clicked, goto endScene");
        this.scene.stop("gameScene");
        this.scene.start("endScene");
        }, this );

    }
}