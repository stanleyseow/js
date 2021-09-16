class city3Story extends Phaser.Scene {

    constructor() {
        super({ key: 'city3Story' });
        // Put global variable here
    }

    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {

    }

    create() {

        // Bring horse to cleric
        // Add image and detect spacebar keypress
        //this.add.image(0, 0, 'main').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');
        this.add.text(90, 600, 'Press spacebar to continue', { font: '30px Courier', fill: '#FFFFFF' });


        // city1 quest
        this.player = this.add.sprite(50, 550, 'u3').play('ranger').setScale(4);
        this.horseSprite = this.add.sprite(100, 550, 'u3').play('horse').setScale(4);
        this.cleric = this.add.sprite(600, 550, 'u3').play('cle').setScale(4);
        //this.cleric = this.add.sprite(600, 550, 'u3').play('cle').setScale(4);

        // Dragon tweens
        this.time.addEvent({ delay: 200, callback: this.moveRightLeft, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 200, callback: this.moveRightLeft2, callbackScope: this, loop: false });

        spaceDown.on('down', function () {
            console.log('Jump to city3');

            this.player.x = 300;
            this.player.y = 300
            this.scene.start('city3', { player: this.player, inventory : this.inventory  });
        }, this);

    }

    moveRightLeft() {
        //console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.horseSprite,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 1000,
            tweens: [
                {
                    x: 100,
                },
                {
                    x: 550,
                },
            ]
        });
    }

    moveRightLeft2() {
        //console.log('moveRightLeft2')
        this.tweens.timeline({
            targets: this.player,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 1000,
            tweens: [
                {
                    x: 50,
                },
                {
                    x: 500,
                },
            ]
        });
    }

}
