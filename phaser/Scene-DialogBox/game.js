var config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  backgroundColor: "#000000",
  pixelArt: true,
  parent: "phaser-example",
  scene: [menuScene, sceneDialog1, world, sceneDialog2, city1, city2, city3],
};

var game = new Phaser.Game(config);
