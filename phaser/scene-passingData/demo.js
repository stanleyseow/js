
// Demo scene
class Demo extends Phaser.Scene {

    constructor () {
        super({ key: 'Demo' });
    }

    // receive data passed to scene
    init(data) {
        console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;
    }

    preload(){
        this.load.image('pic' + this.imageID, 'assets/' + this.imageFile);
    }

    create(){
        this.add.text(10, 10, 'Click to Return', { font: '16px Courier', fill: '#00ff00' });
        this.add.text(10, 30, this.imageID );
        this.add.text(10, 50, this.imageFile );

        this.add.image(400, 400, 'pic' + this.imageID).setScale(0.5);

        this.input.once('pointerup', function () {
            this.scene.start('Menu');
        }, this);
    }

}
