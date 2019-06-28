
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#392542',
    scene: [preloadScene, gameScene, endScene]

};

let game = new Phaser.Game(config);



