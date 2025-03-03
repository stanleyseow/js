let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true
        }
    },
    scene: [PreloadScene, MainScene]
};

let game = new Phaser.Game(config);
let lastFired = 0;
let playerStats = {
    health: 1000,
    maxHealth: 1000,
    experience: 0,
    level: 1,
    nextLevel: 100,
    damage: 10
};


