var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);

var text;
var score = 0;

function preload() {

    this.load.spritesheet('u3', 'assets/ultima.gif', {frameWidth: 16, frameHeight: 16});
    this.load.tilemapTiledJSON('map', 'assets/u3.json');

}

function create() {


    var map = this.make.tilemap({key: 'map'});
    var groundTiles = map.addTilesetImage('ultima', 'u3');
    // create the ground layer
    //this.groundLayer = map.createDynamicLayer('layer1', groundTiles, 0, 50).setScale(2);

    this.anims.create({
        key: 'a1',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:0, end:31}),
        frameRate: 5,
        repeat : -1
    })
 
    this.anims.create({
        key: 'a2',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:32, end:63}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'a3',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:64, end:95}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'a4',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:96, end:127}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'a5',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:128, end:159}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'a6',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:160, end:191}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'a7',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:192, end:223}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'a8',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:224, end:255}),
        frameRate: 5,
        repeat : -1
    })


    this.anims.create({
        key: 'ranger',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:31, end:31}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'wiz',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:32, end:33}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'thi',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:34, end:35}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'fig',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:36, end:37}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'cle',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:38, end:39}),
        frameRate: 5,
        repeat : -1
    })

    this.anims.create({
        key: 'pal',
        frames: this.anims.generateFrameNumbers('u3', 
            { start:40, end:41}),
        frameRate: 5,
        repeat : -1
    })

    this.player = this.physics.add.sprite(400,400,'u3').play('ranger').setScale(3);

    this.wizard = this.physics.add.sprite(10,10,'u3').play('wiz').setScale(3);
    this.fighter = this.physics.add.sprite(10,700,'u3').play('fig').setScale(3);
    this.thief = this.physics.add.sprite(700,10,'u3').play('thi').setScale(3);
    this.cleric = this.physics.add.sprite(700,700,'u3').play('cle').setScale(3);
    this.paladin = this.physics.add.sprite(400,10,'u3').play('pal').setScale(3);

    // this.physics.add.overlap(this.cleric, this.thief, overlap1, null, this )
    // this.physics.add.overlap(this.cleric, this.fighter, overlap2, null, this )
    // this.physics.add.overlap(this.wizard, this.cleric, overlap3, null, this )
    // this.physics.add.overlap(this.wizard, this.thief, overlap4, null, this )

}

function update(time, delta) {

    this.physics.moveToObject( this.wizard, this.player, 30, 1000);
    this.physics.moveToObject( this.fighter, this.player, 30, 2000);
    this.physics.moveToObject( this.thief, this.player, 30, 3000);
    this.physics.moveToObject( this.paladin, this.player, 30, 4000);
    this.physics.moveToObject( this.cleric, this.player, 30, 5000);

}



