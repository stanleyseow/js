var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: {
    key: "main",
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var text;
var score = 0;

function preload() {
  this.load.spritesheet("u3", "assets/ultima.gif", {
    frameWidth: 16,
    frameHeight: 16,
  });
  this.load.tilemapTiledJSON("map", "assets/u3.json");
}

function create() {
  var map = this.make.tilemap({ key: "map" });

  var groundTiles = map.addTilesetImage("ultima", "u3");
  // create the ground layer
  //this.groundLayer = map.createDynamicLayer('layer1', groundTiles, 0, 50).setScale(2);

  this.anims.create({
    key: "a1",
    frames: this.anims.generateFrameNumbers("u3", { start: 0, end: 31 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "a2",
    frames: this.anims.generateFrameNumbers("u3", { start: 32, end: 63 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "a3",
    frames: this.anims.generateFrameNumbers("u3", { start: 64, end: 95 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "a4",
    frames: this.anims.generateFrameNumbers("u3", { start: 96, end: 127 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "a5",
    frames: this.anims.generateFrameNumbers("u3", { start: 128, end: 159 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "a6",
    frames: this.anims.generateFrameNumbers("u3", { start: 160, end: 191 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "a7",
    frames: this.anims.generateFrameNumbers("u3", { start: 192, end: 223 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "a8",
    frames: this.anims.generateFrameNumbers("u3", { start: 224, end: 255 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "wiz",
    frames: this.anims.generateFrameNumbers("u3", { start: 32, end: 33 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "thi",
    frames: this.anims.generateFrameNumbers("u3", { start: 34, end: 35 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "fig",
    frames: this.anims.generateFrameNumbers("u3", { start: 36, end: 37 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "cle",
    frames: this.anims.generateFrameNumbers("u3", { start: 38, end: 39 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "pal",
    frames: this.anims.generateFrameNumbers("u3", { start: 40, end: 41 }),
    frameRate: 5,
    repeat: -1,
  });

  // Call first time without a loop

  //   this.time.addEvent({
  //     delay: 1000,
  //     callback: moveLadder,
  //     callbackScope: this,
  //     loop: false,
  //   });

  // this.time.addEvent({
  //   delay: 1000,
  //   callback: moveCircle,
  //   callbackScope: this,
  //   loop: false,
  // });

  // this.time.addEvent({
  //   delay: 1000,
  //   callback: moveSquare,
  //   callbackScope: this,
  //   loop: false,
  // });

  // this.time.addEvent({
  //   delay: 0,
  //   callback: moveDownUp,
  //   callbackScope: this,
  //   loop: false,
  // });

  // this.time.addEvent({
  //   delay: 3000,
  //   callback: moveRightLeft,
  //   callbackScope: this,
  //   loop: false,
  // });

  //this.wizard = this.physics.add.sprite(400, 400, "u3").play("wiz").setScale(3);

  // this.fighter = this.physics.add
  //   .sprite(100, 300, "u3")
  //   .play("fig")
  //   .setScale(3);

  //this.thief = this.physics.add.sprite(400, 100, "u3").play("thi").setScale(3);

  this.cleric = this.physics.add.sprite(300, 400, "u3").play("cle").setScale(3);

  // this.paladin = this.physics.add
  //   .sprite(100, 100, "u3")
  //   .play("pal")
  //   .setScale(3);

  //   this.physics.add.overlap(this.cleric, this.thief, overlap1, null, this);
  //   this.physics.add.overlap(this.cleric, this.fighter, overlap2, null, this);
  //   this.physics.add.overlap(this.wizard, this.cleric, overlap3, null, this);
  //   this.physics.add.overlap(this.wizard, this.thief, overlap4, null, this);
}

function update(time, delta) {}

function overlap1() {
  console.log("Cleric Thief");
}

function overlap2() {
  console.log("Cleric Fighter");
}

function overlap3() {
  console.log("Wizard Cleric");
}

function overlap4() {
  console.log("Wizard Thief");
}

function delayOneSec() {
  console.log("1 sec later...");
  //this.player.body.setSize(this.player.width*1, this.player.height*1, true);
  this.player.body.setSize(this.player.width * 1, this.player.height * 1);
}

function moveCircle() {
  timeline = this.tweens.timeline({
    targets: this.fighter,
    loop: -1, // loop forever
    tweens: [
      {
        x: 500,
        ease: "Sine.easeInOut",
        duration: 2000,
        yoyo: true,
      },
      {
        y: 100,
        ease: "Sine.easeOut",
        duration: 1000,
        offset: 0,
      },
      {
        y: 300,
        ease: "Sine.easeIn",
        duration: 1000,
      },
      {
        y: 500,
        ease: "Sine.easeOut",
        duration: 1000,
      },
      {
        y: 300,
        ease: "Sine.easeIn",
        duration: 1000,
      },
    ],
  });
}

function moveRightLeft() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.cleric,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 2000,
    tweens: [
      {
        x: 600,
      },
      {
        x: 300,
      },
    ],
  });
}

function moveDownUp() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.thief,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 3000,
    tweens: [
      {
        y: 800,
      },
      {
        y: 100,
      },
    ],
  });
}

function moveSquare() {
  console.log("moveSquare");
  this.tweens.timeline({
    targets: this.paladin,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,

    tweens: [
      {
        y: 400,
      },
      {
        x: 400,
      },
      {
        y: 100,
      },
      {
        x: 100,
      },
    ],
  });
}

function moveLadder() {
  console.log("moveLadder");
  this.tweens.timeline({
    targets: this.wizard,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,

    tweens: [
      {
        y: 300,
      },
      {
        x: 300,
      },
      {
        y: 200,
      },
      {
        x: 200,
      },
      {
        y: 100,
      },
      {
        x: 100,
      },
      {
        x: 400,
        y: 400,
      },
    ],
  });
}
