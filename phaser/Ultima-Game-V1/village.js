class village extends Phaser.Scene {

    constructor() {
        super({ key: 'village' });

        // Put global variable here
        this.dropHorseCnt = 0;
        this.dropChestCnt = 0;
        this.dropFireballCnt = 0;
        this.dropIceballCnt = 0;

    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
    }

    create() {
        console.log('*** village');

        console.log('dropHorse: ', this.dropHorseCnt);
        console.log('dropChest: ', this.dropChestCnt);
        console.log('dropFireball: ', this.dropFireballCnt);
        console.log('dropIceball: ', this.dropIceballCnt);

        this.pingSnd = this.sound.add('ping');
        this.moongateSnd = this.sound.add('moongate');

        let map = this.make.tilemap({ key: 'village' });

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        let cityfloor = map.createLayer('floorLayer', groundTiles, 0, 0).setScale(2);
        this.itemLayer = map.createLayer('itemLayer', groundTiles, 0, 0).setScale(2);

        // player position in village
        this.player.x = 500;
        this.player.y = 250;

        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'u3').play('ranger').setScale(2);

        this.moongate = this.physics.add.sprite(400, 400, 'u3').play('moongate').setScale(2);
        this.moongate.setVisible(false)
        this.moongate.body.setEnable(false)

        // match for grass tile
        this.itemLayer.setTileIndexCallback(5, this.worldmap, this);


        // Setup tile to collect items from player

        // greenArea
        this.itemLayer.setTileIndexCallback(69, this.dropHorse, this);

        // blueArea
        this.itemLayer.setTileIndexCallback(70, this.dropChest, this);

        // redArea
        this.itemLayer.setTileIndexCallback(71, this.dropFireball, this);
        
        // purpleArea
        this.itemLayer.setTileIndexCallback(72, this.dropIceball, this);

        // Enter moongate
        this.physics.add.overlap(this.moongate, this.player, this.enterMoongate, null,this);

        this.itemLayer.setCollisionByProperty({ walls: true });
        this.itemLayer.setCollisionByProperty({ greenArea: true });
        this.itemLayer.setCollisionByProperty({ blueArea: true });
        this.itemLayer.setCollisionByProperty({ redArea: true });
        this.itemLayer.setCollisionByProperty({ purpleArea: true });

        // What will collider with what layers
        this.physics.add.collider(this.itemLayer, this.player);

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

        // Set position beside village in worldmap
        player.x = 170;
        player.y = 690;
        this.scene.start('world', {
            player: player,  inventory : this.inventory
        });
    }

    enterMoongate(player, tile) {
        console.log('enter moongate');

        // Disable body to prevent overlap() running over n over again
        this.moongate.body.setEnable(false)
        
        this.moongateSnd.play()
        this.cameras.main.shake(500);

        //  play once , on complete, jump to dungeon
        this.moongateSnd.once('complete', () => {
            console.log('Sound completed');
            this.scene.start('dungeon', {player: player,  inventory : this.inventory})     
        });
        
        

    }
    
    dropHorse(player, tile) {

        console.log('Drop horse', tile.x, tile.y)

        if ( this.inventory.horse < 1 ) {
            console.log('No horse to drop')
            return
        }

        // remove tile , replaced with item
        this.itemLayer.removeTileAt(tile.x, tile.y)
        this.itemLayer.putTileAt(22, tile.x, tile.y)

        this.pingSnd.play();
        this.cameras.main.shake(200);

        this.player.x = 420
        this.player.y = 147 

        this.inventory.horse--;
        this.dropHorseCnt++

        this.updateDisplay();

        this.checkDropCounter();

        

        return false;
    }

    dropChest(player, tile) {

        console.log('Drop chest')

        if ( this.inventory.chest < 1 ) {
            console.log('No chest to drop', this.player.x, this.player.y)
            return
        }

        // remove tile , replaced with item
        this.itemLayer.removeTileAt(tile.x, tile.y)
        this.itemLayer.putTileAt(61, tile.x, tile.y)

        this.pingSnd.play();
        this.cameras.main.shake(200);

        this.player.x = 420
        this.player.y = 210

        this.inventory.chest--;
        this.dropChestCnt++

        this.updateDisplay();

        this.checkDropCounter();

        return false;
    }

    dropFireball(player, tile) {

        console.log('Drop fireball')

        if ( this.inventory.fireball < 1 ) {
            console.log('No fireball to drop', this.player.x, this.player.y)
            return
        }

        // remove tile , replaced with item
        this.itemLayer.removeTileAt(tile.x, tile.y)
        this.itemLayer.putTileAt(80, tile.x, tile.y)

        this.pingSnd.play();
        this.cameras.main.shake(200);

        this.player.x = 420
        this.player.y = 271

        this.inventory.fireball--;
        this.dropFireballCnt++

        this.updateDisplay();

        this.checkDropCounter();

        return false;
    }

    dropIceball(player, tile) {

        console.log('Drop iceball')

        if ( this.inventory.iceball < 1 ) {
            console.log('No iceball to drop', this.player.x, this.player.y)
            return
        }

        // remove tile , replaced with item
        this.itemLayer.removeTileAt(tile.x, tile.y)
        this.itemLayer.putTileAt(79, tile.x, tile.y)

        this.pingSnd.play();
        this.cameras.main.shake(200);

        this.player.x = 420
        this.player.y = 335

        this.inventory.iceball--;
        this.dropIceballCnt++

        this.updateDisplay();

        this.checkDropCounter();

        return false;
    }

    updateDisplay() {
        // Emit events showInventory
        console.log('Emit event', this.inventory)
        this.invEvent = (event, data)=> this.scene.get('showInventory').events.emit( event, data);
        this.invEvent( "inventory", this.inventory);
    }

    checkDropCounter() {
            
        // Set condition for item drops
        if ( this.dropHorseCnt >= 0 && this.dropChestCnt >= 1 
            && this.dropFireballCnt >= 0 && this.dropIceballCnt >= 0 ) {

                // Reset drops
                this.dropHorseCnt = 0;
                this.dropChestCnt = 0;
                this.dropFireballCnt = 0;
                this.dropIceballCnt = 0;

                // Show and open moongate
                this.moongate.setVisible(true)
                this.moongate.body.setEnable(true)
        }
    }        

}
