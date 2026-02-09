
let content2 = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Press spacebar to continue`;

class dialog2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'dialog2'
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

        console.log('create', this);

        createTextBox(this, 50, 200, {
            wrapWidth: 600,
        })
            .start(content2, 50);

        // Detect spacebar pressed
        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            console.log("Spacebar pressed ");
            this.scene.start('dialog1');
        }, this);

    }

    update() {

    }
}


