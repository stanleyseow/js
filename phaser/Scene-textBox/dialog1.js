
let content = `Welcome to dialog1.
Please collect all the gold inside the chests. 

Press spacebar to continue`;

class dialog1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'dialog1'
        })
    }


    preload() {

        console.log('preload', this);

        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
            sceneKey: 'rexUI'
        });

        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    }

    create() {

        console.log('dialog1', this);

        createTextBox(this, 50, 400, {
            wrapWidth: 400,
        })
            .start(content, 50);

        // Detect spacebar pressed
        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            console.log("Spacebar pressed ");
            this.scene.start('dialog2');
        }, this);

    }

    update() {

    }
}


