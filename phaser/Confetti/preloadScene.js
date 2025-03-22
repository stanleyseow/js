class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

    preload () {
        this.load.spritesheet('raster', 'assets/sunset-raster.png', {
            frameWidth: 16,
            frameHeight: 16
          });
    }


    create () {

        console.log("preloadScene")


        const TAU = 2 * Math.PI;
        this.add.particles(0, 0, 'raster', {
            frequency: 1000 / 60,
            lifespan: { min: 4000, max: 6000 },
            speed: 100,
            gravityY: 100,
            frame: [0, 4, 8, 12, 16],
            x: { min: 0, max: 800 },
            scaleX: {
              onEmit: (particle) => {
                return 1;
              },
              onUpdate: (particle) => {
                // 4 cycles per lifespan
                return Math.cos(TAU * 4 * particle.lifeT);
              }
            },
            rotate: {
              onEmit: (particle) => {
                return 0;
              },
              onUpdate: (particle) => {
                // 2 cycles per lifespan
                return 2 * 360 * Math.sign(particle.velocityX) * particle.lifeT;
              }
            }
          });
    
        this.add.text(10,500, 'Confetti Demo, press spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            this.scene.start("mainScene");
            }, this );

    }

}
