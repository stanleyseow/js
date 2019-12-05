

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d8d',
    pixelArt: true,
    parent: 'phaser-example',
    scene: [ Menu, Demo ]
};

var game = new Phaser.Game(config);
