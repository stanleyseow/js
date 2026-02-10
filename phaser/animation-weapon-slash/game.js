
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    backgroundColor: '#000000',
    scene: [ preloadScene, animationScene, ]

};

let game = new Phaser.Game(config);
let lastFired = 0;
