
let config = {
    type: Phaser.AUTO,
    parent	: 'phaser-app',
    width: 800,
    height: 600,
    backgroundColor: '#000055',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: true
        }
    },
    //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
    scene: [level6]


};

let game = new Phaser.Game(config);







