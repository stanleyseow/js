class menuScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'menuScene' });
        console.log('*** menuScene');
        // Put global variable here
    }


    preload() {

        // Preload all the assets here
        this.load.spritesheet('u3', 'assets/ultima.gif', {frameWidth: 16, frameHeight: 16});
        this.load.tilemapTiledJSON('map0', 'assets/map1.json');
        this.load.tilemapTiledJSON('map1', 'assets/city1.json');
        this.load.tilemapTiledJSON('map2', 'assets/city2.json');
        this.load.tilemapTiledJSON('map3', 'assets/city3.json');

        this.load.image('main','assets/mainpage.png');
    }

    create () {

        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'main').setOrigin(0, 0);
        var spaceDown = this.input.keyboard.addKey('SPACE');
        this.add.text(90,600, 'Press spacebar to continue', { font: '30px Courier', fill: '#FFFFFF' });


        this.anims.create({
            key: 'dragon',
            frames: this.anims.generateFrameNumbers('u3', 
                { start:232, end:235}),
            frameRate: 5,
            repeat : -1
        })

        this.anims.create({
            key: 'ranger',
            frames: this.anims.generateFrameNumbers('u3', 
                { start:31, end:31}),
            frameRate: 5,
            repeat : -1
        })

        this.anims.create({
            key: 'fig',
            frames: this.anims.generateFrameNumbers('u3', 
                { start:36, end:37}),
            frameRate: 5,
            repeat : -1
        })

        this.anims.create({
            key: 'wiz',
            frames: this.anims.generateFrameNumbers('u3', 
                { start:32, end:33}),
            frameRate: 5,
            repeat : -1
        })
    
        this.anims.create({
            key: 'thi',
            frames: this.anims.generateFrameNumbers('u3', 
                { start:34, end:35}),
            frameRate: 5,
            repeat : -1
        })
    
        
    
        this.anims.create({
            key: 'cle',
            frames: this.anims.generateFrameNumbers('u3', 
                { start:38, end:39}),
            frameRate: 5,
            repeat : -1
        })
    
        this.anims.create({
            key: 'pal',
            frames: this.anims.generateFrameNumbers('u3', 
                { start:40, end:41}),
            frameRate: 5,
            repeat : -1
        })

        // Small animations
        this.dragon = this.add.sprite(550,500,'u3').play('dragon').setScale(12);
        this.player = this.add.sprite(250,550,'u3').play('ranger').setScale(4);
        this.fighter = this.add.sprite(200,550,'u3').play('fig').setScale(4);
        this.wizard = this.add.sprite(140,550,'u3').play('wiz').setScale(4);
        this.cleric = this.add.sprite(90,550,'u3').play('cle').setScale(4);
        
        // Dragon tweens
        this.time.addEvent({ delay: 1000, callback: this.moveRightLeft, callbackScope: this, loop: false });

        console.log(this);
        
        
        spaceDown.on('down', function(){
        console.log('Jump to world scene');

        this.player.x = 300;
        this.player.y = 300
        this.horse = 0;
        this.chest = 0;
        this.scene.start('world', { player : this.player, chest: this.chest, horse: this.horse } );
        }, this );


        // Fixed initial position into map
        // this.player.x = 300;
        // this.player.y = 300;
        // console.log('Jump to world scene');
        // this.scene.start('world', { player : this.player } );
    }

    moveRightLeft() {
        console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.dragon,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 2500,
            tweens: [
            {
                x: 350,
            },
            {
                x: 550,
            },
        ]
        });
    }

}
