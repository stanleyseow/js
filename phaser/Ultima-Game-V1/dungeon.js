class dungeon extends Phaser.Scene {

    constructor() {
        super({ key: 'dungeon' });


        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.chest = data.chest
        this.horse = data.horse
    }

    preload() {
    }

    create() {
        console.log('*** dungeon');

        let map = this.make.tilemap({ key: 'dungeon' });

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        let mapOffset = 160 

        let floorLayer = map.createLayer('floorLayer', groundTiles, mapOffset, mapOffset).setScale(2);
        let dungeonLayer = map.createLayer('dungeonLayer', groundTiles, mapOffset, mapOffset).setScale(2);

        let playerPos = map.findObject("objectLayer", obj => obj.name === "playerPos");
        let enemy1Pos = map.findObject("objectLayer", obj => obj.name === "enemy1Pos");
        let enemy2Pos = map.findObject("objectLayer", obj => obj.name === "enemy2Pos");

        console.log(playerPos.x, playerPos.y)

        // player position in city2
        this.player.x = playerPos.x * 2 + mapOffset
        this.player.y = playerPos.y * 2 + mapOffset

        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'u3').play('ranger').setScale(2);
        window.player = this.player


        this.skel1 = this.physics.add.sprite(enemy1Pos.x*2+mapOffset ,enemy1Pos.y*2+mapOffset, 'u3').play('skel').setScale(2);
        this.skel2 = this.physics.add.sprite(enemy2Pos.x*2+mapOffset ,enemy2Pos.y*2+mapOffset, 'u3').play('skel').setScale(2);


        // match for grass tile
        dungeonLayer.setTileIndexCallback(5, this.worldmap, this);


        // mountain will collide with player
        dungeonLayer.setCollisionByProperty({ mountain: true });

        // What will collider with what layers
        this.physics.add.collider(this.player, dungeonLayer);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {


        this.physics.moveToObject(this.skel1, this.player, 30, 3000)
        this.physics.moveToObject(this.skel2, this.player, 30, 3000)


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
        player.x = 852;
        player.y = 255;
        this.scene.start('world', {
            player: player,
            chest: this.chest,
            horse: this.horse
        });

    }

}
