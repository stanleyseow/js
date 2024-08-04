class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inv
    }

    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON("room1map","assets/room1.tmj");
    this.load.image("pippoyaImg","assets/pippoya.png");
    this.load.image('key', 'assets/key.png');

    }

    create() {
        console.log('*** room1 scene');
        //console.log("chest: ", this.inventory.chest)
        //console.log("horse: ", this.inventory.horse)


        //Step 3 - Create the map from main
        let map = this.make.tilemap({key:'room1map'}); 

        // Step 4 Load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        let pippoyaTiles = map.addTilesetImage("pippoya", "pippoyaImg");

        let tilesArray = [pippoyaTiles ]

        // Step 5  Load in layers by layers 
        this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
        this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);

        let start = map.findObject("objectLayer",(obj) => obj.name === "start");

        this.player = this.physics.add.sprite(start.x, start.y, 'down').play("up")
        window.player = this.player

        this.player.setCollideWorldBounds(true); // don't go out of the this.map

        // this.key1 = this.physics.add.sprite(300, 400, "key")
        // this.key2 = this.physics.add.sprite(400, 400, "key")

        this.key1 = this.physics.add.sprite(300,400, "key")
        this.key2 = this.physics.add.sprite(400,400, "key")

        // create the arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // camera follow player
        this.cameras.main.startFollow(this.player);

        //this.physics.add.overlap(this.player, [this.key1, this.key2], globalCollectKey, null, this);

        this.physics.add.overlap(this.player, [this.key1, this.key2], globalCollectKey, null, this);
        

    }

    update() {

        if ( this.player.x > 265 && this.player.x < 375 && this.player.y > 593) {
            this.world()
        }
      

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200);
            this.player.anims.play("left", true); // walk left
          } 
          else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200);
            this.player.anims.play("right", true);
          } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-200);
            this.player.anims.play("up", true);
            //console.log('up');
          } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(200);
            this.player.anims.play("down", true);
            //console.log('down');
          } else {
            this.player.anims.stop();
            this.player.body.setVelocity(0, 0);
          }



    } //// end of updates /////////

     // Function to jump to room1
  world(player, tile) {
    console.log("world function");
    let playerPos = {}
    playerPos.x = 354
    playerPos.y = 1093
    this.scene.start("world",  { playerPos: playerPos })
  }

    

}
