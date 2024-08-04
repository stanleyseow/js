class room4 extends Phaser.Scene {

    constructor() {
        super('room4');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
    
    }

    preload() {
        var map = this.load.tilemapTiledJSON('room4','assets/room4.json')

        this.load.image('dungeonpng', 'assets/dungeon1.png')
         this.load.image('wallpng', 'assets/wall.png')
         this.load.image("heartpng","assets/heart.png")
         this.load.audio("win","assets/win.wav");
    }

    create() {
        console.log('*** room4 scene');
        console.log("keys",window.key);

        this.shoot1Snd = this.sound.add("shoot1").setVolume(0.1);

        var map = this.make.tilemap({key:'room4'});

        var tileset1= map.addTilesetImage('dungeon','dungeonpng');
        var tileset2= map.addTilesetImage('wall','wallpng');

        let tilesArray = [tileset1,tileset2]
        
        this.floorLayer = map.createLayer('floor',tilesArray,0,0).setScale(2)
        this.decoLayer = map.createLayer('deco',tilesArray,0,0).setScale(2)
        this.wallLayer = map.createLayer('wall',tilesArray,0,0).setScale(2)
        this.deco2Layer = map.createLayer('deco 2',tilesArray,0,0).setScale(2)
        this.doorLayer = map.createLayer('door',tilesArray,0,0).setScale(2)

        this.physics.world.bounds.width = this.floorLayer.width*2;
        this.physics.world.bounds.height = this.floorLayer.height*2;

        this.physics.add.sprite(250, 160, "princess").play("princess").setScale(0.7);

        // load player into phytsics
        this.player = this.physics.add.sprite(350, 250, 'up').setScale(0.9)
        this.player.body.setSize(this.player.width * 0.5, this.player.height)
        this.player.setCollideWorldBounds(true); // don't go out of the this.map

        this.knife = this.physics.add.sprite(this.player.x , this.player.y - 32, 'knife').play('knifeAnim')
        this.knife.setVisible(false)
        this.knife.setCollideWorldBounds(true)

        this.wallLayer.setCollisionByExclusion(-1, true);
        this.doorLayer.setCollisionByExclusion(-1, true);

        this.physics.add.collider(this.player,this.wallLayer);
        this.physics.add.collider(this.player,this.doorLayer);


        // spacebar
        this.spaceDown = this.input.keyboard.addKey('SPACE');

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

        this.add.text(100,430, 'YOU HAS SAVE THE PRINCESS', 
                { font: '35px Rakkas', fill: '#ffffff' });

            this.add.text(260,500, 'press spacebar to restart', 
                { font: '20px Rakkas', fill: '#ffffff' });

                var spaceDown = this.input.keyboard.addKey('SPACE');

            spaceDown.on('down', function(){
                let playerPos = {};
                playerPos.x = 30
                playerPos.y = 260
                playerPos.dir = "right"
                this.scene.start("scene1",{playerPos: playerPos});
                }, this );

            window.key = 0
            window.heart = 3
    }

    update() {

        if(
            this.player.x > 283 &
            this.player.x < 306 &
            this.player.y > 516 &
            this.player.y < 520 
        ){
            this.gameScene();
        }

      // Move all common movement to globalFunctions
      movement.call(this)

    }///////// end of update //////////
    
}
