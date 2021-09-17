class clericStory extends Phaser.Scene {

    constructor() {
        super({ key: 'clericStory' });
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


        this.ankhSprite = this.add.sprite(-55, 0, 'u3').play('ankh').setScale(4);
        this.player = this.add.sprite(0, 0, 'u3').play('ranger').setScale(4);
        this.horseSprite = this.add.sprite(55, 0, 'u3').play('horse').setScale(4);

        this.wizard = this.add.sprite(600, 550, 'u3').play('wiz').setScale(4);

        // Use container to group a few objects together
        this.container = this.add.container(100, 50);
        this.container.add([ this.player, this.ankhSprite,this.horseSprite ]);

        // Dragon tweens
        this.time.addEvent({ delay: 200, callback: this.moveRightLeft, callbackScope: this, loop: false });
        //this.time.addEvent({ delay: 200, callback: this.moveRightLeft2, callbackScope: this, loop: false });

        spaceDown.on('down', function () {
            console.log('Jump to city3');

            this.player.x = 300
            this.player.y = 460
            this.scene.start('world', { player: this.player, inventory : this.inventory  });
        }, this);

    }

    moveRightLeft() {
        //console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.container,
            loop: -1, 
            ease: 'Linear',
            duration: 1000,
            tweens: [
                 {
                    y: 300,
                },
                {
                    x: 250,
                },
                {
                    y: 550,
                },
                {
                    x: 450,
                },
                {
                    x: 100,
                    y: 50
                }
            ]
        });
    }

    moveRightLeft2() {
        //console.log('moveRightLeft2')
        this.tweens.timeline({
            targets: this.ankhSprite,
            loop: -1, 
            ease: 'Linear',
            duration: 500,
            tweens: [
                {
                    y: 200,
                },
                {
                    x: 300,
                },
                {
                    y: 400,
                },
                {
                    x: 550,
                },
                {
                    y: 550,
                },
                {
                    x: 100,
                    y: 50
                }
            ]
        });
    }

}
