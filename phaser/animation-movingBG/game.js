
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: [ preloadScene, animationScene, ]

};

let game = new Phaser.Game(config);