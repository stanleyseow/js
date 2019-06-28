class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
//        this.backgroud = this.add.image(0, 0, "background");
        //this.background.setOrigin(0, 0);
        
        // Use tileSprite instead of image
        this.background = this.add.tileSprite(0,0,config.width*2, config.height*2, "background")

//        this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, "ship1");
//        this.ship1.setScale(2);
//
//        this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2");
//
//        this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, "ship3");

        this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship1");
        this.ship1.setScale(2);
        this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
        this.ship2.setScale(2);
        this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");
        this.ship3.setScale(2);
        
        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship1"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create( {
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create( {
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        
        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");
        
        this.add.text(20, 20, "playing game", {
            font: "25px Arial",
            fill: "yellow"
        });
    }

    update() {
        this.moveShip(this.ship1, 3);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 2);
        
        // moving the bg
        this.background.tilePositionY -= 0.5;

    }

    moveShip(ship, speed) {
        ship.y += speed;
        // move x randomly a bit
        //ship.x = Phaser.Math.Between(ship.x - 10, ship.x + 10);
        if ( ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {
        ship.y = 0;
        var randomX = Phaser.Math.Between(0,config.width);
        ship.x = randomX;
        
    }
}
