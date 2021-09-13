var config = {
    type: Phaser.AUTO,
    width: 20 * 32,
    height: 20 * 32,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true
        }
    },
    scene: [pathfinder]
};

var game = new Phaser.Game(config);
game.finder = new EasyStar.js();
