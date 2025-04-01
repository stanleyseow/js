
class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }

    preload() {

        this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('fire', 'assets/fire.png', { frameWidth: 40, frameHeight: 70 });

        this.load.spritesheet('gen', 'assets/char-blank-64x64.png', { frameWidth: 64, frameHeight: 64 });
        

    } // end of preload //

    create() {

        console.log("mainScene")

        this.anims.create({
            key: 'gen-up',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 105, end: 112 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-left',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 118, end: 125 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-down',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 131, end: 138 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-right',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 144, end: 151 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'burn',
            frames: this.anims.generateFrameNumbers('fire',
                { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        // add spinning coin animation
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin',
                { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'fastspin',
            frames: this.anims.generateFrameNumbers('coin',
                { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        })




        let player = this.add.sprite(0, 0, 'gen').setScale(2).play('gen-down')
        let coin = this.add.sprite(50, 0, 'coin').setScale(0.75).play('spin')
        let coin2 = this.add.sprite(50, -30, 'coin').setScale(0.75).play('fastspin')
        let fire = this.add.sprite(-50, 10, 'fire').setScale(0.75).play('burn')
        let nameText = this.add.text(0, -50, 'PlayerName', { 
            fontSize: '20px', 
            fill: '#ffffff' 
        }).setOrigin(0.5, 0.5)  // Center the text

        // In create(), after adding other container elements
        let coordsText = this.add.text(0, 70, 'x: 0, y: 0', { 
            fontSize: '16px', 
            fill: '#ffffff' 
        }).setOrigin(0.5, 0.5)

        this.player = this.add.container(200, 200);
        this.player.add(player)
        this.player.add(coin)
        this.player.add(coin2)
        this.player.add(fire)
        this.player.add(nameText)
        this.player.add(coordsText)  // Add the coords text to container

        // add physics for container first
        this.physics.add.existing(this.player);
        
        // then set the container size
        this.player.body.setSize(player.width*1.4, player.height*1.6);
        // Center the physics body by offsetting it by half the difference between body size and original size
        this.player.body.setOffset(-(player.width*1.4)/2, -(player.height*1.4)/2);
   
        this.cursors = this.input.keyboard.createCursorKeys();

    } // end of create //

    update() {
        // Get the first child (player sprite) from the container
        const playerSprite = this.player.first;

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-160);
            playerSprite.anims.play('gen-left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(160);
            playerSprite.anims.play('gen-right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-160);
            playerSprite.anims.play('gen-up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(160);
            playerSprite.anims.play('gen-down', true);
        }
        else {
            this.player.body.setVelocity(0);
            playerSprite.anims.stop();
        }

        // In update(), at the end before the closing brace
        // Update coordinates text
        const coords = this.player.list[5];  // Get the coords text (last element)
        coords.setText(`x: ${Math.floor(this.player.x)}, y: ${Math.floor(this.player.y)}`);

    } // end of update // 
}