
class testMap extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'testMap' });
    }

    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON("world", "assets/citymap.tmj");

        // Step 2 : Preload any images here
        this.load.image("buildingPng", "assets/Buildings32x32.png");
        this.load.image("streetPng", "assets/Street32x32.png");
        this.load.image("forestPng", "assets/forest_tiles.png");


        this.load.spritesheet('gen', 'assets/char-blank2-64x64.png',{ frameWidth:64, frameHeight:64 });
        this.load.spritesheet('gen-spear', 'assets/char-spear-64x64.png',{ frameWidth:64, frameHeight:64 });
        this.load.spritesheet('gen-bow', 'assets/char-bow-64x64.png',{ frameWidth:64, frameHeight:64 });

    } // end of preload //

    create (){

    console.log("animationScene")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildingTiles = map.addTilesetImage("Buildings32x32", "buildingPng");
    let streetTiles = map.addTilesetImage("Street32x32", "streetPng");
    let forestTiles = map.addTilesetImage("forest_tile", "forestPng");


    //Step 5  create an array of tiles
    let tilesArray = [
      buildingTiles,
      streetTiles,
      forestTiles,
    ];

    // Step 6  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer2",tilesArray,0,0);
    this.itemLayer = map.createLayer("itemLayer",tilesArray,0,0);
    this.buildingLayer = map.createLayer("buildingLayer",tilesArray,0,0);




    this.anims.create({
        key:'gen-cast-up',
        frames:this.anims.generateFrameNumbers('gen',
        { start:0, end:6 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-cast-left',
        frames:this.anims.generateFrameNumbers('gen',
        { start:13, end:19 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-cast-down',
        frames:this.anims.generateFrameNumbers('gen',
        { start:26, end:32 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-cast-right',
        frames:this.anims.generateFrameNumbers('gen',
        { start:39, end:45 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-spear-up',
        frames:this.anims.generateFrameNumbers('gen-spear',
        { start:52, end:59 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-spear-left',
        frames:this.anims.generateFrameNumbers('gen-spear',
        { start:65, end:72 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-spear-down',
        frames:this.anims.generateFrameNumbers('gen-spear',
        { start:78, end:85 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-spear-right',
        frames:this.anims.generateFrameNumbers('gen-spear',
        { start:91, end:98 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-shoot-up',
        frames:this.anims.generateFrameNumbers('gen-bow',
        { start:208, end:220 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-shoot-left',
        frames:this.anims.generateFrameNumbers('gen-bow',
        { start:221, end:233 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-shoot-down',
        frames:this.anims.generateFrameNumbers('gen-bow',
        { start:234, end:246 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-shoot-right',
        frames:this.anims.generateFrameNumbers('gen-bow',
        { start:247, end:259 }),
        frameRate:5,
        repeat:-1
    });


    this.anims.create({
        key:'gen-attack-up',
        frames:this.anims.generateFrameNumbers('gen',
        { start:156, end:161 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-attack-left',
        frames:this.anims.generateFrameNumbers('gen',
        { start:169, end:174 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-attack-down',
        frames:this.anims.generateFrameNumbers('gen',
        { start:182, end:187 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-attack-right',
        frames:this.anims.generateFrameNumbers('gen',
        { start:195, end:200 }),
        frameRate:5,
        repeat:-1
    });


    this.anims.create({
        key:'gen-up',
        frames:this.anims.generateFrameNumbers('gen',
        { start:105, end:112 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-left',
        frames:this.anims.generateFrameNumbers('gen',
        { start:118, end:125 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-down',
        frames:this.anims.generateFrameNumbers('gen',
        { start:131, end:138 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'gen-right',
        frames:this.anims.generateFrameNumbers('gen',
        { start:144, end:151 }),
        frameRate:5,
        repeat:-1
    });

    // this.add.sprite(100, 100, 'coin')
    // this.add.sprite(100, 300, 'coin').play('spin')
    // this.add.sprite(140, 300, 'coin').play('fastspin')

    // this.add.sprite(100, 200, 'fire').play('burn')
    // this.add.sprite(140, 200, 'fire').play('burn')
    // this.add.sprite(180, 200, 'fire').play('burn')
    // this.add.sprite(220, 200, 'fire').play('burn')
    // this.add.sprite(260, 200, 'fire').play('burn')
    
    // this.fireGroup = this.add.group({
    //     key: 'fire',
    //     repeat: 10,
    //     setXY: { x: 100, y: 200, stepX: Phaser.Math.Between(10,100) }
    // });

    // this.fireGroup.children.iterate( c=>{
    //     c.play('burn').setScale(2)
    // })

    this.player = this.physics.add.sprite(100, 200, 'gen').setScale(2)

    this.add.sprite(100, 100, 'gen').play('gen-up').setScale(2)
    this.add.sprite(250, 100, 'gen').play('gen-left').setScale(2)
    this.add.sprite(400, 100, 'gen').play('gen-down').setScale(2)
    this.add.sprite(550, 100, 'gen').play('gen-right').setScale(2)

    // this.add.sprite(100, 200, 'gen').play('gen-cast-up').setScale(2)
    // this.add.sprite(250, 200, 'gen').play('gen-cast-left').setScale(2)
    // this.add.sprite(400, 200, 'gen').play('gen-cast-down').setScale(2)
    // this.add.sprite(550, 200, 'gen').play('gen-cast-right').setScale(2)

    // this.add.sprite(100, 300, 'gen').play('gen-attack-up').setScale(2)
    // this.add.sprite(250, 300, 'gen').play('gen-attack-left').setScale(2)
    // this.add.sprite(400, 300, 'gen').play('gen-attack-down').setScale(2)
    // this.add.sprite(550, 300, 'gen').play('gen-attack-right').setScale(2)

    // this.add.sprite(100, 400, 'gen-spear').play('gen-spear-up').setScale(2)
    // this.add.sprite(250, 400, 'gen-spear').play('gen-spear-left').setScale(2)
    // this.add.sprite(400, 400, 'gen-spear').play('gen-spear-down').setScale(2)
    // this.add.sprite(550, 400, 'gen-spear').play('gen-spear-right').setScale(2)

    // this.add.sprite(100, 500, 'gen-bow').play('gen-shoot-up').setScale(2)
    // this.add.sprite(250, 500, 'gen-bow').play('gen-shoot-left').setScale(2)
    // this.add.sprite(400, 500, 'gen-bow').play('gen-shoot-down').setScale(2)
    // this.add.sprite(550, 500, 'gen-bow').play('gen-shoot-right').setScale(2)

    this.cursors = this.input.keyboard.createCursorKeys();

     // make the camera follow the player
     this.cameras.main.startFollow(this.player);

    } // end of create //

    update () {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('gen-left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.anims.play('gen-right', true);
        } else if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-160);
            this.player.anims.play('gen-up', true);
        } else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(160);
            this.player.anims.play('gen-down', true);
        } else {
            this.player.setVelocity(0);
            this.player.anims.stop();
        }

    } // end of update // 
}