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

        this.load.audio('world', 'assets/U3ASSORT.mid' )

    }

    create () {

        this.anims.create({
            key: 'ranger',
            frames: this.anims.generateFrameNumbers('u3', 
                { start:31, end:31}),
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

        this.player = this.physics.add.sprite(300,300,'u3').play('ranger').setScale(2);

        
        
        // Fixed initial position into map
        this.player.x = 300;
        this.player.y = 400;
        console.log('Jump to world scene');
        this.scene.start('world', { player : this.player } );
    }

}
