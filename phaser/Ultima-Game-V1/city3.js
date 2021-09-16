class city3 extends Phaser.Scene {

    constructor() {
        super({ key: 'city3' });

        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    }

    create() {
        console.log('*** city3');

        this.pingSnd = this.sound.add('ping');

        let map = this.make.tilemap({ key: 'map3' });

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        let cityfloor = map.createLayer('floorLayer', groundTiles, 0, 0).setScale(2);
        let castleLayer = map.createLayer('cityLayer', groundTiles, 0, 0).setScale(2);


        // Cleric will receive the chest
        this.british = this.physics.add.sprite(315, 150, 'u3')
                .play('british').setScale(4).setImmovable(true);

        this.guardGroup1 = this.physics.add.group({
            key: "u3",
            repeat: 6,
            setXY: { x: 250, y: 200, stepY: 50}
        })

        this.guardGroup2 = this.physics.add.group({
            key: "u3",
            repeat: 6,
            setXY: { x: 380, y: 200, stepY: 50}
        })

        this.guardGroup1.children.iterate( g => g.play('guard').setScale(3).setImmovable(true))
        this.guardGroup2.children.iterate( g => g.play('guard').setScale(3).setImmovable(true))

        this.spriteChest = this.add.sprite(270, 150, 'u3').play('chest').setScale(2);
        this.spriteChest.setVisible(false)

        // player position in city2
        this.player.x = 310;
        this.player.y = 500;

        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'u3').play('ranger').setScale(2);

        castleLayer.setTileIndexCallback(5, this.worldmap, this);
        this.physics.add.overlap(castleLayer, this.player);

        // Overlap with cleric
        this.physics.add.overlap(this.player, this.british, this.returnChest, null, this);
        

        castleLayer.setCollisionByProperty({ walls: true });

        // What will collider with what layers
        this.physics.add.collider(castleLayer, this.player);

        this.physics.add.collider(this.player, this.british);
        this.physics.add.collider(this.player, this.guardGroup1);
        this.physics.add.collider(this.player, this.guardGroup2);

        //this.physics.add.collider(this.player, this.cleric, this.returnChest, null, this);


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
        console.log('Tile id: ', tile.index);

        if (tile.index !== 5) return;
        //console.log('Jump to Worldmap');

        // Set position beside city2 in worldmap
        player.x = 300;
        player.y = 200;
        this.scene.start('world', {
            player: player,  inventory : this.inventory
        });

    }

    returnChest(player, tile) {
        console.log('Return chest to british');
   
        if ( this.inventory.chest > 0 ) {
            this.pingSnd.play();
            this.inventory.chest--;
            console.log("chest: ", this.inventory.chest)
            this.spriteChest.setVisible(true)      
            this.scene.start('city3Story', {
                player: player,  inventory : this.inventory
        });  
        }
        
        return false;
    }


}
