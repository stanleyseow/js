class youWonScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'youWonScene' });
    }

    preload() {
        this.load.image('youWon','assets/youWonScene.png');
        this.load.audio('won', 'assets/music/win.mp3');

    }

    create () {

        this.win = this.sound.add('won', {volume: 0.2});
        this.win.play();

        this.add.image(0, 0, 'youWon').setOrigin(0, 0);

        console.log("This is youWonScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto endScene");
        this.scene.stop("youWon");
        this.scene.start("endScene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto endScene");
        this.scene.stop("youWon");
        this.scene.start("endScene");
        }, this );

    }

}