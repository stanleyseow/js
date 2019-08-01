class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.tilemapTiledJSON('mainGround', 'assets/mainSceneTiles.json');
        this.load.spritesheet('mainTiles', 'assets/tiledMainScene.png', {frameWidth: 750, frameHeight: 141});
        this.load.image('mainScene','assets/firstScene.png');
        this.load.spritesheet('randomcarrot1', 'assets/randomcarrot1.png', { frameWidth: 128, frameHeight: 128});
        this.load.audio('bgm', 'assets/music/backgroundMusic.mp3');
    }

    create () {

        this.bgmusic = this.sound.add('bgm', {volume: 0.2});
        this.bgmusic.loop = true;
        this.bgmusic.play();

        this.cameras.main.setBackgroundColor('#A6D2CE');

        console.log("This is mainScene");

        this.mainGround = this.make.tilemap({key: 'mainGround'});
        this.mainTiles= this.mainGround.addTilesetImage('tiledMainScene','mainTiles');
        this.groundLayer = this.mainGround.createDynamicLayer('groundLayer', this.mainTiles, 0, 37);
        this.groundLayer.setCollisionByProperty({ collide: true });

        
        //this.randomCarrot1 = this.physics.add.sprite(140,270, 'randomcarrot1');
        //this.randomCarrot1 = this.physics.add.group({
            //key: 'randomcarrot1' });
        //this.randomCarrot1 = this.add.image(140,270,'randomcarrot1');

        //this.physics.add.collider(400,400, this.randomCarrot1);
        //this.physics.add.collider(this.groundLayer, this.randomCarrot1);
        this.anims.create({
            key: 'spinCarrot1',
            frames: this.anims.generateFrameNumbers('randomcarrot1', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'spinCarrot2',
            frames: this.anims.generateFrameNumbers('randomcarrot1', { start: 2, end: 3 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'spinCarrot3',
            frames: this.anims.generateFrameNumbers('randomcarrot1', { start: 4, end: 5 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'spinCarrot4',
            frames: this.anims.generateFrameNumbers('randomcarrot1', { start: 7, end: 6 }),
            frameRate: 2,
            repeat: -1
        });

        // this.anims.create({
        //     key: 'spinCarrot1',
        //     frames: this.anims.generateFrameNumbers('randomcarrot1'),
        //     frameRate: 2,
        //     yoyo: true,
        //     repeat: -1
        //     });
    
        this.randomCarrot1= this.add.group();

        this.randomCarrot1.create(90,270,'randomcarrot1').play('spinCarrot1');
        this.randomCarrot1.create(250,270,'randomcarrot1').play('spinCarrot2');
        this.randomCarrot1.create(500,270,'randomcarrot1').play('spinCarrot3');
        this.randomCarrot1.create(700,270,'randomcarrot1').play('spinCarrot4');
        //this.randomCarrot1.play('spinCarrot1');
        //this.randomCarrot1.children.iterate(randomcarrot1 => {randomcarrot1.play('spinCarrot1')})

        this.add.image(0, 0, 'mainScene').setOrigin(0, 0);
    
        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        var key5 = this.input.keyboard.addKey(53);
        var key6 = this.input.keyboard.addKey(54);
        var key7 = this.input.keyboard.addKey(55);
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1Scene");
        this.scene.stop("mainScene");
        this.scene.start("storyScene");
        //this.scene.start("level3Scene");
        }, this );

        var pointer = this.input.activePointer;
        'x: ' + pointer.worldX,
        'y: ' + pointer.worldY,
        'isDown: ' + pointer.isDown,
        'rightButtonDown: ' + pointer.rightButtonDown()

        this.input.on('pointerdown', function (pointer) {

        console.log("Spacebar pressed, goto level5Scene");
        this.scene.stop("mainScene");
        this.scene.start("storyScene");
        }, this );

        key1.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level1Scene");
            }, this );

        key2.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level2Scene");
            }, this );

        key3.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level3Scene");
            }, this ); 

        key4.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level4Scene");
            }, this );

        key5.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level5Scene");
            }, this );

        key6.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("youWonScene");
            }, this );

        key7.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("endScene");
            }, this );
    }

}
