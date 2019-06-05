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
        this.input.once('pointerdown', function(){
        console.log("Clicked, goto gameScene (reload game)");
        this.scene.stop("endScene");
        this.scene.start("gameScene");
        }, this );
    }
}
