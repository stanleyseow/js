var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32*40,
    height: 32*40,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    //pixelArt: true,
    scene: [main, world, room1]
};

var game = new Phaser.Game(config);
