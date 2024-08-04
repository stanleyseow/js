class world extends Phaser.Scene {

    constructor() {
        super({ key: 'world' });
        // Put global variable here
        this.zoomFactor = 2
        console.log("Constructor world")

    }
    
    // incoming data from scene below
    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {

    }

    create() {

        console.log('*** world');
        console.log('inventory: ', this.inventory);

        let map = this.make.tilemap({ key: 'map0' });

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        this.grass = map.createLayer('grassLayer', groundTiles, 0, 0).setScale(this.zoomFactor);
        this.mapLayer = map.createLayer('mapLayer', groundTiles, 0, 0).setScale(this.zoomFactor);

        let moongatePos = map.findObject("objectLayer", obj => obj.name === "moonGate");
        let playerPos = map.findObject("objectLayer", obj => obj.name === "player");
        let paladinPos = map.findObject("objectLayer", obj => obj.name === "paladin");
        let fighterPos = map.findObject("objectLayer", obj => obj.name === "fighter");
        let thiefPos = map.findObject("objectLayer", obj => obj.name === "thief");
        let valkriePos = map.findObject("objectLayer", obj => obj.name === "valkrie");
        let clericPos = map.findObject("objectLayer", obj => obj.name === "cleric");

        //this.add.text(10, 10, 'C:' + this.chest, { font: '30px Courier', fill: '#FFFFFF' }).setScrollFactor(0);
        //this.add.text(10, 40, 'H:' + this.horse, { font: '30px Courier', fill: '#FFFFFF' }).setScrollFactor(0);
        

        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'u3').play('ranger').setScale(this.zoomFactor);
        
        //this.player.setCollideWorldBounds(true); // don't go out of the this.map  

        // debug for player
        window.player = this.player;

        this.paladin = this.physics.add.sprite(paladinPos.x * this.zoomFactor, 
                        paladinPos.y * this.zoomFactor, 'u3').play('pal').setScale(this.zoomFactor);
        this.fighter = this.physics.add.sprite(fighterPos.y * this.zoomFactor, 
                        fighterPos.y * this.zoomFactor, 'u3').play('fig').setScale(this.zoomFactor);
        this.cleric = this.physics.add.sprite(270 , 500, 'u3').play('cle').setScale(this.zoomFactor);
        this.wizard = this.physics.add.sprite(250, 750, 'u3').play('wiz').setScale(this.zoomFactor);
        this.thief = this.physics.add.sprite(thiefPos.x*2, thiefPos.y*2, 'u3').play('thi').setScale(this.zoomFactor);
        this.val = this.physics.add.sprite(valkriePos.x*2,valkriePos.y*2, 'u3').play('val').setScale(this.zoomFactor);

        // New tweens for 3.60
        this.tweens.add({
            targets: this.cleric,
            x: 470,
            yoyo: true,
            duration: 3000,
            repeat: -1
          })

          this.tweens.add({
            targets: this.fighter,
            y: 200,
            yoyo: true,
            duration: 3000,
            repeat: -1
          })

          this.tweens.add({
            targets: this.paladin,
            y: 300,
            yoyo: true,
            duration: 2000,
            repeat: -1
          })

        // move in circles
        //this.time.addEvent({ delay: 1000, callback: this.moveSquare, callbackScope: this, loop: false });

        this.mapLayer.setTileIndexCallback(10, this.dungeon, this);

        this.mapLayer.setTileIndexCallback(11, this.city1, this);
        this.mapLayer.setTileIndexCallback(12, this.castle, this);
        this.mapLayer.setTileIndexCallback(13, this.village, this);
  
        this.mapLayer.setTileIndexCallback(15, this.bigcastle, this);

        // this.mapLayer.setCollisionByProperty({ mountain: true });
        // this.mapLayer.setCollisionByProperty({ water: true });


        // What will collider witg what layers
        this.physics.add.collider(this.mapLayer, this.player);
        this.physics.add.collider(this.mapLayer, this.thief);


        this.physics.add.overlap(this.player, this.val, this.arenaAreaVal, null, this)
        this.physics.add.overlap(this.player, this.thief, this.arenaAreaThi, null, this)
        this.physics.add.overlap(this.player, this.cleric, this.clericQuest, null, this)


        this.cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player

        // set bounds so the camera won't go outside the game world + 64 for inventory
        this.cameras.main.setBounds(
        0,
        0,
        map.widthInPixels * this.zoomFactor,
        (map.heightInPixels * this.zoomFactor) + 64
      );

        this.cameras.main.startFollow(this.player);

        // mini map
        this.minimap = this.cameras.add( 480, 10 ,150, 150)
                .setZoom(0.2).setName('mini')
        this.minimap.setBackgroundColor(0x000000);
        this.minimap.startFollow(this.player)

        // start another scene in parallel
        this.scene.launch('showInventory', { player: player,inventory : this.inventory })

        console.log('game canvas (w,h): ', this.sys.game.canvas.width, this.sys.game.canvas.height)
        console.log('InPixels (w,h): ', map.widthInPixels, map.heightInPixels)

    }

    update() {

        //this.physics.moveToObject(this.thief, this.player, 30, 7000);

        // Can fly over mountains
        //this.physics.moveToObject(this.val, this.player, 30, 7000);


        let speed = 256;

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        } else {
            this.player.body.setVelocity(0);
        }

    } /////////////////// end of update //////////////////////////////////////

    dungeon(player, tile) {
        console.log('dungeon ')
        this.scene.start('dungeon', { player: player,inventory : this.inventory });
    }

    village(player, tile) {
        console.log('village ')
        this.scene.start('village', { player: player,inventory : this.inventory });
    }

    city1(player, tile) {
        console.log('city: ')
        this.scene.start('city1Story', { player: player, inventory : this.inventory });
    }

    castle(player, tile) {
        console.log('castle ')
        this.scene.start('city2', { player: player, inventory : this.inventory })
    }

    bigcastle(player, tile) {
        console.log('big castle ')
        this.scene.start('city3', { player: player, inventory : this.inventory })
    }

    arenaAreaVal(player, tile) {
        console.log('Jumping to arena scene')
        this.scene.start('arena', {
            player: player, 
            inventory : this.inventory,
            enemy: 1
        })
    }

    arenaAreaThi(player, tile) {
        console.log('Jumping to arena scene')
        this.scene.start('arena', {
            player: player, 
            inventory : this.inventory,
            enemy: 2
        })
    }

    clericQuest(player, tile) {
        console.log('Jumping to arena scene')
        this.scene.start('clericStory', {
            player: player, 
            inventory : this.inventory,
        })
    }

} //////////// end of class world ////////////////////////
