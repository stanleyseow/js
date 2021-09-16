class village extends Phaser.Scene {

    constructor() {
        super({ key: 'village' });


        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    }

    create() {
        console.log('*** village');

        let map = this.make.tilemap({ key: 'village' });

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        let cityfloor = map.createLayer('floorLayer', groundTiles, 0, 0).setScale(2);
        let itemLayer = map.createLayer('itemLayer', groundTiles, 0, 0).setScale(2);

        // player position in village
        this.player.x = 500;
        this.player.y = 250;

        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'u3').play('ranger').setScale(2);

        // match for grass tile
        itemLayer.setTileIndexCallback(5, this.worldmap, this);

        //itemLayer.setTileIndexCallback(93, this.collectHorse, this);

        this.physics.add.overlap(itemLayer, this.player);

        itemLayer.setCollisionByProperty({ walls: true });

        // What will collider with what layers
        this.physics.add.collider(itemLayer, this.player);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

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

    }

    worldmap(player, tile) {
        //console.log('Tile id: ', tile.index );

        if (tile.index !== 5) return;
        //console.log('Jump to Worldmap');

        // Set position beside city2 in worldmap
        player.x = 170;
        player.y = 690;
        this.scene.start('world', {
            player: player,  inventory : this.inventory
        });

    }

    // collectHorse(player, tile) {
    //     this.inventory.horse++;
    //     console.log('Collect Horse', this.inventory.horse);

    //     this.citymap.removeTileAt(tile.x, tile.y);
    //     return false;
    // }

}
