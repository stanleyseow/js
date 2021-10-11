class arena extends Phaser.Scene {

    constructor() {
        super({ key: 'arena' });

        // Put global variable here, initialised on game load
        this.playerPOS = {}
    }


    init(data) {

        // Put scene variable here, initialised on scene load

        this.player = data.player
        this.inventory = data.inventory

        this.enemy = data.enemy
        this.playerPOS.x = data.player.x 
        this.playerPOS.y = data.player.y + 20

        // Reset enemyCount when entering scene
        this.enemyCount = 0;
    }

    preload() {
    }

    create() {
        console.log('*** arena');

        console.log('enemyCount: ', this.enemyCount)

        // Sound variable
        this.explodeSnd = this.sound.add('explode').setVolume(0.2);
        this.shooterSnd = this.sound.add('shooter').setVolume(0.3);
        this.pingSnd = this.sound.add('ping');

        let map = this.make.tilemap({ key: 'mapArena' });

        let groundTiles = map.addTilesetImage('ultima', 'u3');

        let groundLayer = map.createLayer('groundLayer', groundTiles, 0, 0).setScale(2);
        let itemLayer = map.createLayer('itemLayer', groundTiles, 0, 0).setScale(2);

        this.physics.world.bounds.width = map.widthInPixels
        this.physics.world.bounds.height = map.heightInPixels
        console.log(map.widthInPixels, map.heightInPixels)

        this.time.addEvent({ delay: 2000, callback: this.moveDownUp, callbackScope: this, loop: false });
        //this.time.addEvent({ delay: 4000, callback: this.moveDownUp3, callbackScope: this, loop: true });


        switch (this.enemy) {

            case 1:
                this.enemies = this.physics.add.group({
                    key: 'u3',
                    repeat: 4,
                    setXY: { x: 180, y: 120, stepX: 64 }
                });

                this.enemies.children.iterate(c => {
                    c.play('val').setScale(2)
                })
                break;

            case 2:
                this.enemies = this.physics.add.group({
                    key: 'u3',
                    repeat: 4,
                    setXY: { x: 180, y: 120, stepX: 64 }
                });

                this.enemies.children.iterate(c => {
                    c.play('thi').setScale(2)
                })
                break;
        }


        this.enemyChest = this.physics.add.sprite(300, 120, 'u3').play('chest').setScale(2);
        this.enemyChest.setVisible(false)
        this.enemyChest.body.setEnable(false)

        // player position in arena
        this.player.x = 300;
        this.player.y = 380;

        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'u3').play('ranger').setScale(2);
        //this.player.setCollideWorldBounds(true);

        this.fireball = this.physics.add.sprite(0, 0, 'u3').play('fireball').setScale(2);
        this.fireball.setVisible(false)

        this.iceball = this.physics.add.sprite(0, 0, 'u3').play('iceball').setScale(2);
        this.iceball.setVisible(false)


        itemLayer.setCollisionByProperty({ mountain: true });

        // match for bush tile +1
        itemLayer.setTileIndexCallback(6, this.worldmap, this);

        // When fireball overlap enemy  
        this.physics.add.overlap(this.fireball, this.enemies, this.killEnemy, null, this);
        this.physics.add.overlap(this.iceball, this.enemies, this.killEnemy2, null, this);

        this.physics.add.overlap(this.player, this.enemyChest, this.collectChest, null, this);

        this.physics.add.overlap(this.player, this.enemies, this.killPlayer, null, this);

        // What will collider with what layers
        this.physics.add.collider(itemLayer, this.player);
        this.physics.add.collider(itemLayer, this.enemies);

        this.cursors = this.input.keyboard.createCursorKeys();

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function () {
            this.shootFireball()
        }, this);

        var cDown = this.input.keyboard.addKey('c');
        
        cDown.on('down', function(){
            this.castSpell()
        }, this);
  
        /////////////////////////////////////  




    }

    update() {


        //this.physics.moveToObject(this.enemies.getChildren()[0], this.player, 30, 5000)
        //this.physics.moveToObject(this.enemies.getChildren()[4], this.player, 30, 5000)

        let speed = 256;

        if (this.fireball.y < 0) {
            this.fireball.setVisible(false)
        }

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

        player.x = this.playerPOS.x
        player.y = this.playerPOS.y

        this.scene.start('world', 
            { player: player,  inventory : this.inventory });
    }

    // Tween the entire group together
    moveDownUp() {
        console.log('moveDownUp tween')

        this.tweens.timeline({
            targets: this.enemies.getChildren(),
            ease: 'Linear',
            loop: -1, // loop forever
            duration: 3000,
            tweens: [
                {
                    y: 300,
                },
                {
                    y: 120,
                }
            ]
        });
    }

    shootFireball() {
        console.log('shoot fireball')

        if ( this.inventory.fireball < 1 ) {
            console.log("No more fireball")
            return
        }

        this.inventory.fireball--;
        // Update display
        this.updateDisplay()


        this.shooterSnd.play();
        this.fireball.setVisible(true)
        this.fireball.body.setEnable(true)
        this.fireball.body.setVelocityY(-500)
        this.fireball.x = this.player.x
        this.fireball.y = this.player.y
    }

    castSpell() {
        
        if ( this.inventory.iceball < 1 ) {
            console.log("No more iceball")
            return
        }

        // Radomly select a number between 0 to 4       
        let i = Phaser.Math.Between(0,4);
        console.log('Cast spell', i)

        this.inventory.iceball--;

        // Update display
        this.updateDisplay()

        this.shooterSnd.play();
        //this.cameras.main.shake(100);

        // Randomly get a children
        let enemy = this.enemies.getChildren()[i]

        // iceball starts at player
        this.iceball.x = this.player.x
        this.iceball.y = this.player.y
        this.iceball.body.setEnable(true)
        this.iceball.setVisible(true)

        this.physics.moveToObject(this.iceball, enemy, 30, 200);
        //this.iceball.setVisible(false)
        
    }

    killEnemy2(iceball, enemy) {
        console.log('hit enemy 1')
        this.explodeSnd.play();
        enemy.setVisible(false)
        enemy.body.setEnable(false)
        iceball.setVisible(false)
        iceball.body.setEnable(false)

        this.enemyCount++
        console.log('enemyCount: ', this.enemyCount)

        if (this.enemyCount > 4) {
            this.enemyChest.setVisible(true)
            this.enemyChest.body.setEnable(true)
            this.enemyCount = 0;
        }
    }

    killEnemy(fireball, enemy) {
        console.log('hit enemy 1')
        this.explodeSnd.play();
        enemy.setVisible(false)
        enemy.body.setEnable(false)
        fireball.setVisible(false)
        fireball.body.setEnable(false)

        this.enemyCount++
        console.log('enemyCount: ', this.enemyCount)

        if (this.enemyCount > 4) {
            this.enemyChest.setVisible(true)
            this.enemyChest.body.setEnable(true)
            this.enemyCount = 0;
        }
    }

    killPlayer(player, enemy) {
        console.log('Player killed');

        // Shake screen
        this.cameras.main.shake(2000);

        // Play sound
        this.explodeSnd.play();

        player.x = 300;
        player.y = 380;

        console.log('Removed all items');
        this.inventory.chest = 0;
        this.inventory.horse = 0;
        this.inventory.iceball = 0;
        this.inventory.fireball = 0;

        // Update display
        this.updateDisplay()

        player.x = this.playerPOS.x
        player.y = this.playerPOS.y

        this.scene.start('world', 
            { player: player,  inventory : this.inventory });

    }

    collectChest(player, chest) {
        console.log('Collect Chest');
        this.pingSnd.play();
        this.inventory.chest++;
        chest.body.setEnable(false)
        chest.setVisible(false)

        // Update display
        this.updateDisplay()

        return false;
    }

    updateDisplay() {
        // Emit events showInventory
        console.log('Emit event', this.inventory)
        this.invEvent = (event, data)=> this.scene.get('showInventory').events.emit( event, data);
        this.invEvent( "inventory", this.inventory);
    }

}
