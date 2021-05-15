var game;
window.onload = function(){
  let gameConfig = {
    type: Phaser.CANVAS,
    width: 384,
    height: 240,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
          gravity: {
            y: 0
          }
      }
    },
    scene: [preloadGame, playGame]
  }
  game = new Phaser.Game(gameConfig);
}
