var config = {
  type: Phaser.AUTO,
  // pixel size * tile map size * zoom
  width: 32 * 20,
  height: 32 * 20,
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#555555",
  pixelArt: true,
  scene: [
    preload,
    storyTextbox,
    worldCam,
    world,
    blockA,
    library,
    complab,
    blockB,
    blockC,
    blockDclass,
    cafeteria,
  ],
};

var game = new Phaser.Game(config);
