class world extends Phaser.Scene {

    constructor() {
        super({ key: 'world' });
        // Put global variable here
    }
    
    // incoming data from scene below
    init(data) {
        this.player = data.player
        this.chest = data.chest
        this.horse = data.horse
    }

    preload() {

    }

    create() {

        console.log('*** world');
        console.log(this);

        let map = this.make.tilemap({ key: 'map0' });

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        this.grass = map.createLayer('grassLayer', groundTiles, 0, 0).setScale(2);
        this.mapLayer = map.createLayer('mapLayer', groundTiles, 0, 0).setScale(2);

        let moongatePos = map.findObject("objectLayer", obj => obj.name === "moonGate");
        let playerPos = map.findObject("objectLayer", obj => obj.name === "player");
        let paladinPos = map.findObject("objectLayer", obj => obj.name === "paladin");
        let fighterPos = map.findObject("objectLayer", obj => obj.name === "fighter");
        let thiefPos = map.findObject("objectLayer", obj => obj.name === "thief");
        let valkriePos = map.findObject("objectLayer", obj => obj.name === "valkrie");

        this.add.text(10, 10, 'C:' + this.chest, { font: '30px Courier', fill: '#FFFFFF' });
        this.add.text(10, 40, 'H:' + this.horse, { font: '30px Courier', fill: '#FFFFFF' });
        // console.log('chest: ', this.chest);
        // console.log('horse: ', this.horse);

        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'u3').play('ranger').setScale(2);
        
        // debug for player
        window.player = this.player;

        this.paladin = this.physics.add.sprite(paladinPos.x*2, paladinPos.y*2, 'u3').play('pal').setScale(2);
        this.fighter = this.physics.add.sprite(fighterPos.y*2, fighterPos.y*2, 'u3').play('fig').setScale(2);

        console.log('paladin', this.paladin.x, this.paladin.y)
        console.log('fighter', this.fighter.x, this.fighter.y)

        this.cleric = this.physics.add.sprite(200, 180, 'u3').play('cle').setScale(2);

        this.wizard = this.physics.add.sprite(250, 250, 'u3').play('wiz').setScale(2);

        this.thief = this.physics.add.sprite(thiefPos.x*2, thiefPos.y*2, 'u3').play('thi').setScale(2);
        this.val = this.physics.add.sprite(valkriePos.x*2,valkriePos.y*2, 'u3').play('val').setScale(2);

        // Cleric move right & left
        this.time.addEvent({ delay: 1000, callback: this.moveRightLeft, callbackScope: this, loop: false });

        // Fighter move up & down
        this.time.addEvent({ delay: 1000, callback: this.moveDownUp, callbackScope: this, loop: false });

        // move in square
        this.time.addEvent({ delay: 1000, callback: this.moveSquare, callbackScope: this, loop: false });

        this.mapLayer.setTileIndexCallback(10, this.dungeon, this);

        this.mapLayer.setTileIndexCallback(11, this.city1, this);
        this.mapLayer.setTileIndexCallback(12, this.castle, this);
        this.mapLayer.setTileIndexCallback(14, this.bigcastle, this);

        this.mapLayer.setCollisionByProperty({ mountain: true });
        //this.mapLayer.setCollisionByProperty({ water: true });


        // What will collider witg what layers
        this.physics.add.collider(this.mapLayer, this.player);
        this.physics.add.collider(this.mapLayer, this.thief);


        this.physics.add.overlap(this.player, this.val, this.arenaAreaVal, null, this)
        this.physics.add.overlap(this.player, this.thief, this.arenaAreaThi, null, this)


        this.cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

        console.log(this.sys.game.canvas.width, this.sys.game.canvas.height)

        console.log(map.widthInPixels, map.heightInPixels)

    }

    update() {

        this.physics.moveToObject(this.thief, this.player, 30, 7000);

        // Can fly over mountains
        this.physics.moveToObject(this.val, this.player, 30, 7000);


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
        this.scene.start('dungeon', { player: player, chest: this.chest, horse: this.horse });
    }

    city1(player, tile) {
        console.log('city: ', tile.index)
        this.scene.start('city1', { player: player, chest: this.chest, horse: this.horse });
    }

    castle(player, tile) {
        console.log('castle: ', tile.index)
        this.scene.start('city2', { player: player, chest: this.chest, horse: this.horse })
    }

    bigcastle(player, tile) {
        console.log('big castle: ', tile.index)
        this.scene.start('city3', { player: player, chest: this.chest, horse: this.horse })
    }

    arenaAreaVal(player, tile) {
        console.log('Jumping to arena scene')
        this.scene.start('arena', {
            player: player, 
            chest: this.chest,
            horse: this.horse,
            enemy: 1
        })
    }

    arenaAreaThi(player, tile) {
        console.log('Jumping to arena scene')
        this.scene.start('arena', {
            player: player, 
            chest: this.chest,
            horse: this.horse, 
            enemy: 2
        })
    }

    moveRightLeft() {
        console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.cleric,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 2000,
            tweens: [
                {
                    x: 500,
                },
                {
                    x: 200,
                },
            ]
        });
    }

    moveDownUp() {
        console.log('moveDownUp')
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
        console.log('moveDownUp')
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
