class world extends Phaser.Scene {
  constructor() {
    super("world");
  }

  init(data) {
    this.player = data.player;
  }

  preload() {}

  create() {
    console.log("*** world");
    console.log(this);

    let map = this.make.tilemap({ key: "map0" });

    let groundTiles = map.addTilesetImage("ultima", "u3");

    this.worldmap = map.createLayer("mapLayer", groundTiles, 0, 0).setScale(2);
    this.grass = map.createLayer("grassLayer", groundTiles, 0, 0).setScale(2);

    this.player = this.physics.add
      .sprite(this.player.x, this.player.y, "u3")
      .play("ranger")
      .setScale(2);

    this.paladin = this.physics.add
      .sprite(160, 200, "u3")
      .play("pal")
      .setScale(2);
    this.thief = this.physics.add
      .sprite(400, 180, "u3")
      .play("thi")
      .setScale(2);
    this.cleric = this.physics.add
      .sprite(100, 430, "u3")
      .play("cle")
      .setScale(2);
    this.fighter = this.physics.add
      .sprite(500, 350, "u3")
      .play("fig")
      .setScale(2);
    this.wizard = this.physics.add
      .sprite(350, 500, "u3")
      .play("wiz")
      .setScale(2);

    this.worldmap.setTileIndexCallback(11, this.city1, this);
    this.worldmap.setTileIndexCallback(12, this.castle, this);
    this.worldmap.setTileIndexCallback(14, this.bigcastle, this);

    this.worldmap.setCollisionByProperty({ mountain: true });

    // What will collider witg what layers
    this.physics.add.collider(this.worldmap, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    let speed = 128;

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
    } else {
      this.player.body.setVelocity(0);
    }
  }

  city1(player, tile) {
    console.log("city: ", tile.index);
    console.log(this);
    this.scene.start("sceneDialog2", { player: player });
  }

  castle(player, tile) {
    console.log("castle: ", tile.index);
    this.scene.start("city2", { player: player });
  }

  bigcastle(player, tile) {
    console.log("big castle: ", tile.index);
    this.scene.start("city3", { player: player });
  }
}
