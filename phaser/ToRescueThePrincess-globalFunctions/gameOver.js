class gameOver extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameOver' });
    }

    preload() {

        this.load.atlas('down', 'assets/knight_walk_down.png', 'assets/knight_walk_down.json');
        this.load.image("tryagain","assets/tryagain.jpg")

        



    } // end of preload //

    create () {

        this.add.image (320,320,'tryagain')

        // console.log("gameOver")
        // this.add.text(185,300, 'TRY AGAIN', 
        //     { font: '44px Rakkas', fill: '#ffffff' });

          this.add.text(220,550, 'press spacebar to restart', 
            { font: '20px Rakkas', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        window.key = 0
        window.heart = 3

        spaceDown.on('down', function(){
            let playerPos = {};
        playerPos.x = 30
        playerPos.y = 260
        playerPos.dir = "right"
            this.scene.start("gameScene",{playerPos: playerPos});
            }, this );
            

        this.add.sprite(330, 470, "down").play("down").setScale(2);
    }

    
}
