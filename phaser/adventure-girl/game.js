var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true
        }
    },
    scene: [ preloadScene, level1 ]
}
var game = new Phaser.Game(config);