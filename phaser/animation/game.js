var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('coin', 'assets/coin.png', {
        frameWidth: 32,
        frameHeight: 32
    });
    this.load.spritesheet("fire", "assets/fire.png", {
        frameWidth: 40,
        frameHeight: 70
    });
}

function create() {

    this.anims.create({
        key: 'slowSpin',
        frames: this.anims.generateFrameNumbers('coin', {
            start: 0,
            end: 6
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('coin', {
            start: 0,
            end: 6
        }),
        frameRate: 16,
        repeat: -1
    });

    this.anims.create({
        key: 'fastSpin',
        frames: this.anims.generateFrameNumbers('coin', {
            start: 0,
            end: 6
        }),
        frameRate: 30,
        repeat: -1
    });

    this.anims.create({
        key: "burn",
        frames: this.anims.generateFrameNumbers("fire", {
            start: 0,
            end: 4
        }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: "burn2",
        frames: this.anims.generateFrameNumbers("fire", {
            start: 0,
            end: 4
        }),
        frameRate: 5,
        repeat: -1
    });

    // create coin physics group
    this.coins = this.physics.add.group();

    // Add members to this.coins group with different animation
    this.coins.create(100, 300, 'coin').setScale(0.5);
    this.coins.create(200, 300, 'coin').setScale(1).play('fastSpin');
    this.coins.create(300, 300, 'coin').setScale(2);
    this.coins.create(500, 300, 'coin').setScale(4).play('spin');

    // create second coin physics group
    this.coins2 = this.physics.add.group();

    // Add members to this.coins group
    this.coins2.create(100, 500, 'coin').setScale(0.5);
    this.coins2.create(200, 500, 'coin').setScale(1);
    this.coins2.create(300, 500, 'coin').setScale(2);
    this.coins2.create(500, 500, 'coin').setScale(4);

    // iterate all the members in the group and play animation
    this.coins2.children.iterate(coin => {
        coin.play('slowSpin')
    })


    // group with all active firecamps.

    this.fireGroup = this.physics.add.group({
        key: 'fire',
        repeat: 5,
        setXY: {
            x: 50,
            y: 50,
            stepX: Phaser.Math.Between(50, 80)
        }
    });

    this.fireGroup2 = this.physics.add.group({
        key: 'fire',
        repeat: 5,
        setXY: {
            x: 50,
            y: 150,
            stepX: Phaser.Math.Between(70, 150)
        }
    });

    // iterate all the members in the group and play animation
    // this.fireGroup.children.iterate(fire => {
    //     fire.play('burn')
    // })

    // iterate all the members in the group and play animation
    this.fireGroup2.children.iterate(fire => {
        fire.play('burn2')
    })

}

function update() {}