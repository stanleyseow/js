class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/mainScene.png');
        this.load.spritesheet('mummy', 'assets/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
        this.load.atlas('sprites', 'assets/buttonSprite.png', 'assets/buttonSprite.json');
    }

    create () {

        this.add.image(0, 0, 'main').setOrigin(0, 0);
        

        // add tutorial and start button
		this.btnhelp = this.addButton(400-80, 400, 'sprites', this.doTutor, this, 'btn_quest_hl', 'btn_quest', 'btn_quest_hl', 'btn_quest');
		this.btnstart = this.addButton(400+80, 400, 'sprites', this.doStart, this, 'btn_play_hl', 'btn_play', 'btn_play_hl', 'btn_play');


        this.add.text(0,570, 'Press spacebar or levels (1-9)', { font: '24px Courier', fill: '#000000' });

        console.log("This is mainScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        var key5 = this.input.keyboard.addKey(53);
        var key6 = this.input.keyboard.addKey(54);
        var key7 = this.input.keyboard.addKey(55);
        var key8 = this.input.keyboard.addKey(56);
        var key9 = this.input.keyboard.addKey(57);

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

        key8.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level8");
            }, this );     

        key9.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level9");
            }, this );  

        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto main2Scene");
        this.scene.start("main2Scene");
        }, this );
  

    }

    doTutor()
    {
        console.log('Called main2Scene');
		this.scene.start('main2Scene');
    }
	
	doStart()
    {
        console.log('Called level1');
		this.scene.start('level1');
    }


}
