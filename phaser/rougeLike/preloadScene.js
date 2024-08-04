class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

preload() {
    // this.mapmade with Tiled in JSON format
    this.load.tilemapTiledJSON('map1', 'assets/map1.tmj');
    // tiles in spritesheet 
    this.load.spritesheet('pipoyaImg', 'assets/pipoya.png', {frameWidth: 32, frameHeight: 32});

    this.load.spritesheet('gen', 'assets/blank-64x64.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemy', 'assets/enemy-64x64.png', { frameWidth: 64, frameHeight: 64 });


}

create() {

    this.add.text(10, 34, 'Click or space to continue', { font: '24px Courier', fill: '#FFFF00' });

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
        key: "enemy-up",
        frames: this.anims.generateFrameNumbers("enemy", {
          start: 105,
          end: 112,
        }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "enemy-left",
        frames: this.anims.generateFrameNumbers("enemy", {
          start: 118,
          end: 125,
        }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "enemy-down",
        frames: this.anims.generateFrameNumbers("enemy", {
          start: 131,
          end: 138,
        }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "enemy-right",
        frames: this.anims.generateFrameNumbers("enemy", {
          start: 144,
          end: 151,
        }),
        frameRate: 5,
        repeat: -1,
      });

    var spaceDown = this.input.keyboard.addKey('SPACE');
        
    spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        window.item2 = 0;
        this.scene.start("world");
        }, this );

}

} // end of class