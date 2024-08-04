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


  


    // Call first time without a loop
    this.time.addEvent({ delay: 1000, callback: moveWizard, callbackScope: this, loop: false });
    this.time.addEvent({ delay: 1000, callback: moveThief, callbackScope: this, loop: false });
    //this.time.addEvent({ delay: 1000, callback: movePaladin, callbackScope: this, loop: false });
    
    // this.time.addEvent({ delay: 1000, callback: moveCircle, callbackScope: this, loop: false });
    // this.time.addEvent({ delay: 1000, callback: moveRightLeft, callbackScope: this, loop: false });

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

    
    this.wizard = this.physics.add.sprite(100,100,'u3').play('wiz').setScale(4);
    this.thief = this.physics.add.sprite(100,100,'u3').play('thi').setScale(4);
    this.paladin = this.physics.add.sprite(100,100,'u3').play('pal').setScale(4);

    //this.physics.add.overlap(this.cleric, this.thief, overlap1, null, this )

   
}

function update(time, delta) {

}

function overlap1() {
    console.log('Cleric Thief');
}


function delayOneSec() {
    console.log('1 sec later...')
    //this.player.body.setSize(this.player.width*1, this.player.height*1, true);
    this.player.body.setSize( this.player.width*1, this.player.height*1 );
}

// move left right ( modify X only )
function moveWizard() {
    console.log('moveDownUp')
    this.tweens.timeline({
        targets: this.wizard,
        loop: -1, 
        ease: 'Linear',
        duration: 2000,
        tweens: [
        {
            x: 700,
        },
        {
            x: 100,
        },
    ]
    });
}

// move down up ( modify Y only )
function moveThief() {
    console.log('moveDownUp')
    this.tweens.timeline({
        targets: this.thief,
        ease: 'Linear',
        loop: -1, // loop forever
        duration: 5000,
        tweens: [
        {
            x: 500,
            y: 500,
        },
        {
            x: 100,
            y: 100,
        },
    ]
    });
}

// Move Square ( modify X & y)
function movePaladin() {
    console.log('moveSquare')
    this.tweens.timeline({
        targets: this.paladin,
        ease: 'Linear',
        loop: -1, // loop forever
        duration: 1000,

        tweens: [
        {
            x: 500,
        },
        {
            y: 500,
        },
        {
            x: 100,
        },
        {
            y: 100,
        },
    ]
    });
}



