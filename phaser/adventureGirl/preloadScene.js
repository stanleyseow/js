class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

preload() {
    // this.mapmade with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/map.tmj');
    // tiles in spritesheet 
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
    // simple coin image
    this.load.image('coin', 'assets/coinGold.png');
    // this.playeranimations
    //this.load.atlas('player', 'assets/player.png', 'assets/player.json');
    // this.load.atlas('girl', 'assets/girl.png', 'assets/girl.json');

    // Anna is 64x64 9 frames per animation
    this.load.spritesheet('girl', 'assets/anna.png', {frameWidth: 64, frameHeight: 64});

    this.load.spritesheet('fire', 'assets/fire.png',{ frameWidth:40, frameHeight:70 });
   
   this.load.audio("bgmusic", "assets/bg_music.mp3");

}

create() {

   this.music = this.sound.add("bgmusic",{loop: true}).setVolume(0.3);
   this.music.play();

    this.add.text(10, 10, 'This is preload Scene', { font: '24px Courier', fill: '#FFFF00' });
    this.add.text(10, 34, 'Click or space to continue', { font: '24px Courier', fill: '#FFFF00' });

    var spaceDown = this.input.keyboard.addKey('SPACE');
        
    this.input.on('pointerdown', function (pointer) {
        this.scene.start("level1");
        }, this);

    spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        window.item2 = 0;
        this.scene.start("level1");
        }, this );

}

} // end of class