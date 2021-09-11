class arena extends Phaser.Scene {

    constructor() {
        super({ key: 'arena' });

        // Put global variable here
        this.enemyCount = 0;
        this.playerPOS = {}
    }


    init(data) {
        this.player = data.player
        this.enemy = data.enemy
        this.horse = data.horse
        this.chest = data.chest

        this.playerPOS.x = data.player.x
        this.playerPOS.y = data.player.y
    }

    preload() {
    }

    create() {

        // Sound variable
        this.explodeSnd = this.sound.add('explode');
        this.shooterSnd = this.sound.add('shooter');
        this.pingSnd = this.sound.add('ping');

        console.log('*** arena');

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
                //this.enemy2 = this.physics.add.sprite(192, 128, 'u3').play('val').setScale(2);
                //this.enemy2 = this.physics.add.sprite(448, 128, 'u3').play('val').setScale(2);

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
                //this.enemy1 = this.physics.add.sprite(192, 128, 'u3').play('thi').setScale(2);
                //this.enemy2 = this.physics.add.sprite(448, 128, 'u3').play('thi').setScale(2);

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


        itemLayer.setCollisionByProperty({ mountain: true });

        // match for bush tile
        itemLayer.setTileIndexCallback(6, this.worldmap, this);

        // When fireball overlap enemy  
        this.physics.add.overlap(this.fireball, this.enemies, this.killEnemy, null, this);

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

        this.scene.start('world', {
            player: player,
            chest: this.chest,
            horse: this.horse
        });

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

    moveDownUp2() {
        //console.log('moveDownUp2')
        this.enemies.children.iterate(c => {
            var value = Phaser.Math.Between(50, 100);
            c.body.setVelocityY(value)
        })
    }

    moveDownUp3() {
        //console.log('moveDownUp3')
        this.enemies.children.iterate(c => {
            var value = Phaser.Math.Between(-50, -100);
            c.body.setVelocityY(value)
        })
    }

    shootFireball() {
        console.log('shoot fireball')
        this.shooterSnd.play();
        this.fireball.setVisible(true)
        this.fireball.body.setEnable(true)
        this.fireball.body.setVelocityY(-500)
        this.fireball.x = this.player.x
        this.fireball.y = this.player.y
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
        console.log('killed player');

        this.cameras.main.shake(500);
        this.explodeSnd.play();

        player.x = 300;
        player.y = 380;

        console.log('removed all items');
        this.chest = 0;
        this.horse = 0;

        // this.scene.start('world', {
        //     player: player,
        //     chest: this.chest,
        //     horse: this.horse
        // });

    }

    collectChest(player, chest) {
        console.log('Collect Chest');
        this.pingSnd.play();
        this.chest++;
        chest.body.setEnable(false)
        chest.setVisible(false)
        return false;
    }

}
