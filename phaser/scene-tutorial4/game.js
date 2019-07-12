
let config = {
    type: Phaser.AUTO,
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
    scene: [mainScene,main2Scene, storyScene, story2Scene, level1, level2, level3,level4,level5,level6, gameoverScene]


};

let game = new Phaser.Game(config);



