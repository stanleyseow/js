class world extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'world' });
        
        // Put global variable here

    }


    init(data){
        this.chest = data.chest;
        this.horse = data.horse;
        this.player = data.player
    }

    preload() {

    }

    create () {

        console.log('*** world');
        console.log(this);

        let map = this.make.tilemap({key: 'map0'});

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        this.worldmap = map.createDynamicLayer('mapLayer', groundTiles, 0, 0).setScale(2);
        this.grass = map.createDynamicLayer('grassLayer', groundTiles, 0, 0).setScale(2);

        this.add.text(10,10, 'C:' + this.chest, { font: '30px Courier', fill: '#FFFFFF' });
        this.add.text(10,40, 'H:' + this.horse, { font: '30px Courier', fill: '#FFFFFF' });
        console.log('chest: ', this.chest);
        console.log('horse: ', this.horse);
        this.player = this.physics.add.sprite(this.player.x,this.player.y,'u3').play('ranger').setScale(2);

        this.paladin = this.physics.add.sprite(160,200,'u3').play('pal').setScale(2);
        this.thief = this.physics.add.sprite(400,180,'u3').play('thi').setScale(2);
        this.cleric = this.physics.add.sprite(200,400,'u3').play('cle').setScale(2);
        this.fighter = this.physics.add.sprite(500,500,'u3').play('fig').setScale(2);
        this.wizard = this.physics.add.sprite(350,500,'u3').play('wiz').setScale(2);

        // Cleric move right & left
        this.time.addEvent({ delay: 1000, callback: this.moveRightLeft, callbackScope: this, loop: false });
        
        // Fighter move up & down
        this.time.addEvent({ delay: 1000, callback: this.moveDownUp, callbackScope: this, loop: false });

        this.worldmap.setTileIndexCallback(11, this.city1, this);
        this.worldmap.setTileIndexCallback(12, this.castle, this);
        this.worldmap.setTileIndexCallback(14, this.bigcastle, this);

        this.worldmap.setCollisionByProperty({ mountain: true });
    
        // What will collider witg what layers
        this.physics.add.collider(this.worldmap, this.player);

        this.cursors = this.input.keyboard.createCursorKeys();

        //this.physics.add.overlap(this.cleric, this.player, this.overlap1, null, this )


    }
    
    update() {

        let speed = 128;

        if ( this.cursors.left.isDown ) {
                this.player.body.setVelocityX(-speed);
        } else if ( this.cursors.right.isDown ) {
            this.player.body.setVelocityX(speed);
        } else if ( this.cursors.up.isDown ) {
            this.player.body.setVelocityY(-speed);
        } else if ( this.cursors.down.isDown ) {
            this.player.body.setVelocityY(speed);
        } else {
            this.player.body.setVelocity(0);
        }

    } /////////////////// end of update //////////////////////////////////////

    city1(player,tile) {
        console.log('city: ',tile.index)
        console.log(this);
        this.scene.start('city1', { player : player, chest: this.chest, horse: this.horse });
    }
    
    castle(player,tile) {
        console.log('castle: ',tile.index)
        this.scene.start('city2', { player : player, chest: this.chest, horse: this.horse })
    }

    bigcastle(player,tile) {
        console.log('big castle: ',tile.index)
        this.scene.start('city3', { player : player, chest: this.chest, horse: this.horse })

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
                x: 400,
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
            targets: this.fighter,
            ease: 'Linear',
            loop: -1, // loop forever
            duration: 2000,
            tweens: [
            {
                y: 200,
            },
            {
                y: 500,
            },
        ]
        });
    }

    // overlap1() {
    //     console.log('Overlap Cleric');
    //     //this.cameras.main.shake(800);
    //     this.scene.restart()

    //     // this.time.delayedCall(1000,
    //     //     function() { this.scene.restart();},
    //     //     [],
    //     //     this);
    // }


} //////////// end of class world ////////////////////////
