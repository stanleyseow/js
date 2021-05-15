// Menu scene
class Menu extends Phaser.Scene {

    constructor () {
        super({ key: 'Menu' });
    }

    create() {
        this.add.text(10, 10, 'Press 1, 2 or 3', { font: '16px Courier', fill: '#00ff00' });

        this.input.keyboard.once('keyup_ONE', function () {

            // Pass objects into the scene
            this.scene.start('Demo', { id: 0, image: 'mainScene.png' });

        }, this);

        this.input.keyboard.once('keyup_TWO', function () {

            // Pass objects into the scene
            this.scene.start('Demo', { id: 1, image: 'storyScene.png' });

        }, this);

        this.input.keyboard.once('keyup_THREE', function () {

            // Pass objects into the scene
            this.scene.start('Demo', { id: 2, image: 'gameoverScene.png' });

        }, this);

        this.events.on('shutdown', this.shutdown, this);
    }

    shutdown() {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

}

