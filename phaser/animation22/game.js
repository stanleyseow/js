
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#ffffff',
    scene: [ preloadScene, animationScene, ]

};

let game = new Phaser.Game(config);