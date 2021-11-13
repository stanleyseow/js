class city2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'city2' });
        

        // Put global variable here
    }


    init(data){
        this.life = data.life;
        this.gold = data.gold;
        this.player = data.player
    }

    preload() {
    }

    create () {
        console.log('*** city2');

        let map = this.make.tilemap({key: 'map2'});

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        this.cityfloor = map.createDynamicLayer('floorLayer', groundTiles, 128, 128).setScale(2);
        this.citymap = map.createDynamicLayer('cityLayer', groundTiles, 128, 128).setScale(2);


        this.anims.create({
            key: 'ranger',
            frames: this.anims.generateFrameNumbers('u3', 
                { start:31, end:31}),
            frameRate: 5,
            repeat : -1
        })

        // player position in city2
        this.player.x = 300;
        this.player.y = 380;

        this.player = this.physics.add.sprite(this.player.x,this.player.y,'u3').play('ranger').setScale(2);

        this.citymap.setTileIndexCallback(5, this.worldmap, this);
        this.citymap.setTileIndexCallback(61, this.collectChest, this);

        this.physics.add.overlap(this.citymap, this.player );
        //this.physics.add.overlap(this.citymap, this.player, this.worldmap, null, this);

        this.citymap.setCollisionByProperty({ walls: true });
    
        // What will collider with what layers
        this.physics.add.collider(this.citymap, this.player);


        this.cursors = this.input.keyboard.createCursorKeys();

    }
    
    update() {

        if ( this.cursors.left.isDown ) {
            this.player.body.setVelocityX(-64);
        } else if ( this.cursors.right.isDown ) {
            this.player.body.setVelocityX(64);
        } else if ( this.cursors.up.isDown ) {
            this.player.body.setVelocityY(-64);
        } else if ( this.cursors.down.isDown ) {
            this.player.body.setVelocityY(64);
        } else {
            this.player.body.setVelocity(0);
        }

    }

    worldmap(player,tile) {
        //console.log('Tile id: ', tile.index );

        if (tile.index !== 5) return;
        //console.log('Jump to Worldmap');

        // Set position beside city2 in worldmap
        player.x = 520;
        player.y = 560;
        this.scene.start('world', { player : player });

    }
    
    collectChest(player,tile) {
        //console.log('Tile id: ', tile.index );
        console.log('Collect Chest');
        this.citymap.removeTileAt(tile.x, tile.y);
        return false;
    }


}
