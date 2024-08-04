class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

    preload() {
        this.load.spritesheet('gen', 'assets/char-blank2-64x64.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('gen-bow', 'assets/char-bow-64x64.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('knifeImg', 'assets/knife-32x32.png', {frameWidth: 32, frameHeight: 32});
    } // end of preload //

    create () {

        console.log("preloadScene")
        this.add.text(10,500, 'NPC shoot player, press spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });

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
                key: 'gen-bow-up',
                frames: this.anims.generateFrameNumbers('gen-bow',
                    { start: 105, end: 112 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-bow-left',
                frames: this.anims.generateFrameNumbers('gen-bow',
                    { start: 118, end: 125 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-bow-down',
                frames: this.anims.generateFrameNumbers('gen-bow',
                    { start: 131, end: 138 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-bow-right',
                frames: this.anims.generateFrameNumbers('gen-bow',
                    { start: 144, end: 151 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-bow-shoot-left',
                frames: this.anims.generateFrameNumbers('gen-bow',
                    { start: 221, end: 233 }),
                frameRate: 5,
                repeat: -1
            });
    
    
          this.anims.create({
            key: "knifeAnim",
            frames: this.anims.generateFrameNumbers("knifeImg", { start: 0, end: 15 }),
            frameRate: 20,
            repeat: -1,
          });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("npcShoot");
            }, this );

    }

}
