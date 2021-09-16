class world extends Phaser.Scene {

    constructor() {
        super({ key: 'world' });
        // Put global variable here
        this.zoomFactor = 2
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
        console.log(this);

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
        console.log('chest: ', this.inventory.chest);
        console.log('horse: ', this.inventory.horse);
        console.log('item: ', this.inventory.item);

        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'u3').play('ranger').setScale(this.zoomFactor);
        
        //this.player.setCollideWorldBounds(true); // don't go out of the this.map  

        // debug for player
        window.player = this.player;

        this.paladin = this.physics.add.sprite(paladinPos.x * this.zoomFactor, 
                        paladinPos.y * this.zoomFactor, 'u3').play('pal').setScale(this.zoomFactor);
        this.fighter = this.physics.add.sprite(fighterPos.y * this.zoomFactor, 
                        fighterPos.y * this.zoomFactor, 'u3').play('fig').setScale(this.zoomFactor);



        this.cleric = this.physics.add.sprite(clericPos.x * this.zoomFactor , 
                                                clericPos.y * this.zoomFactor, 'u3').play('cle').setScale(this.zoomFactor);


        this.wizard = this.physics.add.sprite(250, 250, 'u3').play('wiz').setScale(this.zoomFactor);

        this.thief = this.physics.add.sprite(thiefPos.x*2, thiefPos.y*2, 'u3').play('thi').setScale(this.zoomFactor);
        this.val = this.physics.add.sprite(valkriePos.x*2,valkriePos.y*2, 'u3').play('val').setScale(this.zoomFactor);

        // Cleric move right & left
        this.time.addEvent({ delay: 1000, callback: this.moveRightLeft, callbackScope: this, loop: false });

        // Fighter move up & down
        this.time.addEvent({ delay: 1000, callback: this.moveDownUp, callbackScope: this, loop: false });

        // move in square
        this.time.addEvent({ delay: 1000, callback: this.moveSquare, callbackScope: this, loop: false });

        this.mapLayer.setTileIndexCallback(10, this.dungeon, this);

        this.mapLayer.setTileIndexCallback(11, this.city1, this);
        this.mapLayer.setTileIndexCallback(12, this.castle, this);
        this.mapLayer.setTileIndexCallback(13, this.village, this);
  
        this.mapLayer.setTileIndexCallback(15, this.bigcastle, this);

        this.mapLayer.setCollisionByProperty({ mountain: true });
        //this.mapLayer.setCollisionByProperty({ water: true });


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

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(
        0,
        0,
        map.widthInPixels * this.zoomFactor,
        map.heightInPixels * this.zoomFactor
      );

        this.cameras.main.startFollow(this.player);

        // mini map
        this.minimap = this.cameras.add( 430, 10 ,200, 100).setZoom(0.2).setName('mini');
        this.minimap.setBackgroundColor(0x002244);
        this.minimap.startFollow(this.player)


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
        console.log('dungeon: ')
        this.scene.start('dungeon', { player: player,inventory : this.inventory });
    }

    village(player, tile) {
        console.log('village: ')
        this.scene.start('village', { player: player,inventory : this.inventory });
    }

    city1(player, tile) {
        console.log('city: ', tile.index)
        this.scene.start('city1Story', { player: player, inventory : this.inventory });
    }

    castle(player, tile) {
        console.log('castle: ', tile.index)
        this.scene.start('city2', { player: player, inventory : this.inventory })
    }

    bigcastle(player, tile) {
        console.log('big castle: ', tile.index)
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

    moveRightLeft() {
        //console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.cleric,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 2000,
            tweens: [
                {
                    x: 240,
                },
                {
                    x: 200,
                },
                {
                    x: 240,
                },
            ]
        });
    }

    moveDownUp() {
        //console.log('moveDownUp')
        this.tweens.timeline({
            targets: [this.fighter,this.paladin],
            ease: 'Linear',
            loop: -1, // loop forever
            duration: 2000,
            tweens: [
                {
                    y: 400,
                },
                {
                    y: 200,
                },
                {
                    y: 400,
                },
            ]
        });
    }

    moveSquare() {
        //console.log('moveDownUp')
        this.tweens.timeline({
            // 200,200 starting point
            targets: [this.wizard],
            ease: 'Linear',
            loop: -1, // loop forever
            duration: 1000,
            tweens: [
                {
                    y: 450,
                },
                {
                    x: 450,
                },
                {
                    y: 250,
                },
                {
                    x: 250,
                },
            ]
        });
    }

} //////////// end of class world ////////////////////////
