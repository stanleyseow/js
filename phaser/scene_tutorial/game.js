var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundcolor: 0x0000ff,
    scene: [preloadScene, gameScene]
};


var game = new Phaser.Game(config);

