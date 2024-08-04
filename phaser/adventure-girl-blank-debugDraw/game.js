var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true
        }
    },
    plugins: {
        scene: [
          { key: 'DebugDrawPlugin', plugin: PhaserDebugDrawPlugin, mapping: 'debugDraw' }
        ]
    },
    scale: {
        //mode: Phaser.Scale.NONE,
        mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ preloadScene, level1 ]
}
var game = new Phaser.Game(config);