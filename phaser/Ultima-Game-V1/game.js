
var config = {
    type: Phaser.AUTO,
    width: 16*20*2,
    height: 16*20*2,
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
    pixelArt: true,
    //parent: 'phaser-example',
    scene: [menuScene, world, city1, city1Story, city2, city3,city3Story, 
                arena, clericStory, dungeon, village, showInventory]
};

var game = new Phaser.Game(config);


