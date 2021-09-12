class world extends Phaser.Scene {

    constructor() {
        super({ key: 'world' });
        
        // Put global variable here
    }
    
    // incoming data from scene below
    init(data) {
        this.player = data.player
    }

    preload() {

    }

    create() {

        console.log('*** world scene');

        this.music = this.sound.add('bgMusic').setVolume(0.3)

        // Create the map from main
        let map = this.make.tilemap({ key: 'worldMap' });

        // Load the game tiles 
        // 1st parameter is name in Tiled, 
        // 2nd parameter is key in Preload
        let gameTiles = map.addTilesetImage('ultima', 'u3');

        //let grass = map.createLayer('grassLayer', gameTiles, 0, 0).setScale(2);
        let mapLayer = map.createLayer('mapLayer', gameTiles, 0, 0).setScale(2);


        // Add any text to the game
        this.add.text(10, 10, 'Add any text here', 
            { font: '30px Courier', fill: '#00FFFF' });

        // Add main player here with physics.add.sprite
        this.player = this.physics.add.sprite(300,300, 'u3').play('ranger').setScale(2);
        
        // debug for player
        window.player = this.player;

        // Add other characters or items below
        this.fighter = this.physics.add.sprite(150,220, 'u3').play('fig').setScale(2);


        // Add time event / movement here 
        this.time.addEvent({ delay: 1000, callback: this.moveRightLeft, callbackScope: this, loop: false });

        // get the tileIndex number in json, +1 
        //mapLayer.setTileIndexCallback(11, this.room1, this);

        // Add custom properties in Tiled called "mouintain" as bool
        mapLayer.setCollisionByProperty({ mountain: false });
        mapLayer.setCollisionByProperty({ water: true });
        

        // What will collider witg what layers
        this.physics.add.collider(mapLayer, this.player);

        // create the arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // camera follow player
        //this.cameras.main.startFollow(this.player);

    } /////////////////// end of create //////////////////////////////

    update() {

        let speed = 256;

        // move the player up, down, left, right
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

    } /////////////////// end of update //////////////////////////////


    // Function to jump to room1
    room1(player, tile) {
        console.log('room1 function')
        this.scene.start('room1', { player: player });
    }

    // Tweens
    moveRightLeft() {
        console.log('moveRightLeft')
        this.tweens.timeline({
            targets: this.fighter,
            loop: -1, // loop forever
            ease: 'Linear',
            duration: 2000,
            tweens: [
                {
                    x: 450,
                },
                {
                    x: 150,
                },
            ]
        });
    }

} //////////// end of class world ////////////////////////
