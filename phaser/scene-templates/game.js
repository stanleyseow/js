var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
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
    scene: [main, world, room1]
};

var game = new Phaser.Game(config);
