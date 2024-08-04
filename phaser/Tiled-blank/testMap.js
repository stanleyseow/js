
class testMap extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'testMap' });
    }

    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON("world", "assets/map1.tmj");

        // Step 2 : Preload any images here
        this.load.image("buildingIMG", "assets/Buildings32x32.png");
        this.load.image("streetIMG", "assets/Street32x32.png");

        this.load.spritesheet('fire', 'assets/fire.png',
        { frameWidth:40, frameHeight:70 });

        this.load.spritesheet('gen', 'assets/green-apron.png',
            { frameWidth:64, frameHeight:64 });


    } // end of preload //

    create (){
    console.log("Tiled Tutorial")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world" });  
    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildingTiles = map.addTilesetImage("Buildings32x32", "buildingIMG");
    let streetTiles = map.addTilesetImage("Street32x32", "streetIMG");

    //Step 5  create an array of tiles
   let tilesArray = [
      buildingTiles,
      streetTiles
    ];

    // Step 6  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);

    this.anims.create({
        key:'flame',
        frames:this.anims.generateFrameNumbers('fire',
        { start:0, end:3 }),
        frameRate:20,
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


    let fire1 = map.findObject("objectLayer", obj => obj.name === "fire1")
    let fire2 = map.findObject("objectLayer", obj => obj.name === "fire2")

    this.add.sprite(fire1.x, fire1.y, 'fire').play('flame')
    this.add.sprite(fire2.x, fire2.y, 'fire').play('flame')

    this.player = this.physics.add.sprite(50,50, "gen");

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