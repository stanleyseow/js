class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('main','assets/mainScene.png');

    }

    create () {

        this.add.image(0, 0, 'main').setOrigin(0, 0);

        console.log("This is mainScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1Scene");
        this.scene.stop("mainScene");
        this.scene.start("storyScene");
        //this.scene.start("level3Scene");
        }, this );

        key1.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level1Scene");
            }, this );

        key2.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level2Scene");
            }, this );

        key3.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level3Scene");
            }, this ); 

        key4.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level4Scene");
            }, this );

    }

}
