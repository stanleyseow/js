class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/mainScene.png');
        this.load.spritesheet('mummy', 'assets/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
    }

    create () {

        this.add.image(0, 0, 'main').setOrigin(0, 0);
        
        this.add.text(0,570, 'Press spacebar or 1,2,3,4,5,6,7 for level', { font: '24px Courier', fill: '#000000' });

        console.log("This is mainScene");

        // Add animation for mummy
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('mummy'),
            frameRate: 20,
            yoyo: true,
            repeat: -1
        });

          // create mummies physics group
    this.mummies = this.add.group();

    // Add members to mummies group
    this.mummies.create(200, 400, 'mummy').setScale(1);
    this.mummies.create(400, 400, 'mummy').setScale(2);
    this.mummies.create(600, 400, 'mummy').setScale(4);

    // Iterate all the children and play animation
    this.mummies.children.iterate(mummy => {
        mummy.play('walk')
    })


        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        var key5 = this.input.keyboard.addKey(53);
        var key6 = this.input.keyboard.addKey(54);
        var key7 = this.input.keyboard.addKey(55);


        key1.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level1");
            }, this );

        key2.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level2");
            }, this );

        key3.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level3");
            }, this ); 
            
        key4.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level4");
            }, this );
                
                
        key5.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level5");
            }, this );        
                
        key6.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level6");
            }, this ); 
        
        key7.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level7");
            }, this ); 

        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.stop("mainScene");
        this.scene.start("level1");
        }, this );

    }

}
