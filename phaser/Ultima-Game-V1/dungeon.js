class dungeon extends Phaser.Scene {

    constructor() {
        super({ key: 'dungeon' });

        // Put global variable here
        this.zoomFactor = 2
    }

    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    }

    create() {
        console.log('*** dungeon');

        this.pingSnd = this.sound.add('ping');

        let map = this.make.tilemap({ key: 'dungeon' });

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        let mapOffset = 160 

        let floorLayer = map.createLayer('floorLayer', groundTiles, mapOffset, mapOffset).setScale(2);
        this.dungeonLayer = map.createLayer('dungeonLayer', groundTiles, mapOffset, mapOffset).setScale(2);

        let playerPos = map.findObject("objectLayer", obj => obj.name === "playerPos");
        let enemy1Pos = map.findObject("objectLayer", obj => obj.name === "enemy1Pos");
        let enemy2Pos = map.findObject("objectLayer", obj => obj.name === "enemy2Pos");

        console.log(playerPos.x, playerPos.y)

        // player position in city2
        this.player.x = playerPos.x * this.zoomFactor + mapOffset
        this.player.y = playerPos.y * this.zoomFactor + mapOffset

        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'u3').play('ranger').setScale(this.zoomFactor);
        window.player = this.player

        this.skel1 = this.physics.add.sprite(enemy1Pos.x * this.zoomFactor + mapOffset ,
                                                enemy1Pos.y * this.zoomFactor+ mapOffset, 'u3').play('skel').setScale(this.zoomFactor);
        this.skel2 = this.physics.add.sprite(enemy2Pos.x * this.zoomFactor + mapOffset ,
                                                enemy2Pos.y * this.zoomFactor + mapOffset, 'u3').play('skel').setScale(this.zoomFactor);

        // match for grass tile
        this.dungeonLayer.setTileIndexCallback(5, this.worldmap, this);

        this.dungeonLayer.setTileIndexCallback(80, this.collectFireball, this);


        // mountain will collide with player
        this.dungeonLayer.setCollisionByProperty({ mountain: true });

        // What will collider with what layers
        this.physics.add.collider(this.player, this.dungeonLayer);

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

        // Set position beside city2 in worldmap
        player.x = 852;
        player.y = 255;
        this.scene.start('world', {
            player: player,  inventory : this.inventory
        });

    }

    collectFireball(player, tile ) {

        this.pingSnd.play();
        
        this.inventory.fireball++;
        console.log('Collect fireball', this.inventory.fireball);

        console.log('Emit event', this.inventory)
        this.invEvent = (event, data)=> this.scene.get('showInventory').events.emit( event, data);
        this.invEvent( "inventory", this.inventory);

        this.dungeonLayer.removeTileAt(tile.x, tile.y);
        return false;
    }

}
