

var config = {
    type: Phaser.AUTO,
    width: 16*20*2,
    height: 16*20*2,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: '#000000',
    pixelArt: true,
    //parent: 'phaser-example',
    scene: [menuScene, world, city1, city2, city3, arena]
};

var game = new Phaser.Game(config);
