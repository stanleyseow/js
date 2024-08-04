var game;
window.onload=function()
{
var config = {
    type: Phaser.AUTO,
    ////// pixel size * tile map size * zoom 
    width: 20 * 32,
    height: 20 * 32,
    /////////////////////////////////////////
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
    backgroundColor: '#422835', 
    pixelArt: true,
    //// Add all scenes below in the array
    scene: [preloadScene,scene1,scene2,instructions,instructions2,world,room1,room2,room3,room4,gameOver,showInventory]
};

var game = new Phaser.Game(config);

window.key= 2
window.heart = 3
window.knife = 3

}