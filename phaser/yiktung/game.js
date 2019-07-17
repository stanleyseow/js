let config = {
    type: Phaser.AUTO,
    width: 750,
    height: 460,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 600},
            debug: false
        }
    },

    //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
    scene: [mainScene, storyScene, story2Scene, story3Scene, story4Scene, story5Scene, insScene, goScene, goScene2, goScene3, goScene4, level1Scene,level2Scene, level3Scene,level4Scene, youWonScene, endScene]


};

let game = new Phaser.Game(config);