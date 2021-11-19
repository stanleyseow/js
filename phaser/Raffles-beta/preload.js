class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });

    // Put global variable here
  }

  preload() {
    this.load.atlas("guard", "assets/guard.png", "assets/guard.json");
    this.load.atlas("lect", "assets/lecturer.png", "assets/lecturer.json");
    this.load.atlas("sas", "assets/sas.png", "assets/sas.json");
    this.load.atlas("lib", "assets/library.png", "assets/library.json");
    this.load.atlas("cafe", "assets/cafe.png", "assets/cafe.json");

    this.load.atlas("boy", "assets/boynpc.png", "assets/boynpc.json");
    this.load.atlas("girl", "assets/girlnpc.png", "assets/girlnpc.json");
    this.load.atlas("boy2", "assets/npcb.png", "assets/npcb.json");
    this.load.atlas("girl2", "assets/npcg.png", "assets/npcg.json");
    this.load.atlas("fren", "assets/friend.png", "assets/friend.json");

    this.load.atlas("left", "assets/left.png", "assets/left.json");
    this.load.atlas("right", "assets/right.png", "assets/right.json");
    this.load.atlas("up", "assets/up.png", "assets/up.json");
    this.load.atlas("down", "assets/down.png", "assets/down.json");
  }

  create() {
    console.log("*** preload scene");

    let frame = 3;

    this.anims.create({
      key: "left",
      frames: [
        { key: "left", frame: "left(2)" },
        { key: "left", frame: "left(3)" },
        { key: "left", frame: "left(1)" },
        { key: "left", frame: "left(4)" },
      ],
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: [
        { key: "right", frame: "right(2)" },
        { key: "right", frame: "right(3)" },
        { key: "right", frame: "right(1)" },
        { key: "right", frame: "right(4)" },
      ],
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: [
        { key: "up", frame: "up(2)" },
        { key: "up", frame: "up(4)" },
        { key: "up", frame: "up(1)" },
        { key: "up", frame: "up(3)" },
      ],
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: [
        { key: "down", frame: "down(1)" },
        { key: "down", frame: "down(2)" },
        { key: "down", frame: "down(3)" },
        { key: "down", frame: "down(4)" },
      ],
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "guardAnim",
      frames: [
        { key: "guard", frame: "guard1" },
        { key: "guard", frame: "guard2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.anims.create({
      key: "lectAnim",
      frames: [
        { key: "lect", frame: "lecturer1" },
        { key: "lect", frame: "lecturer2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.anims.create({
      key: "sasAnim",
      frames: [
        { key: "sas", frame: "sas1" },
        { key: "sas", frame: "sas2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.anims.create({
      key: "libAnim",
      frames: [
        { key: "lib", frame: "library1" },
        { key: "lib", frame: "library2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.anims.create({
      key: "boyAnim",
      frames: [
        { key: "boy", frame: "boy1" },
        { key: "boy", frame: "boy2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.anims.create({
      key: "girlAnim",
      frames: [
        { key: "girl", frame: "girl1" },
        { key: "girl", frame: "girl2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.anims.create({
      key: "boy2Anim",
      frames: [
        { key: "boy2", frame: "npcb1" },
        { key: "boy2", frame: "npcb2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.anims.create({
      key: "girl2Anim",
      frames: [
        { key: "girl2", frame: "npcg1" },
        { key: "girl2", frame: "npcg2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.anims.create({
      key: "cafeAnim",
      frames: [
        { key: "cafe", frame: "cafeteria1" },
        { key: "cafe", frame: "cafeteria2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.anims.create({
      key: "frenAnim",
      frames: [
        { key: "fren", frame: "friend1" },
        { key: "fren", frame: "friend2" },
      ],
      frameRate: frame,
      repeat: -1,
    });

    this.add.sprite(100, 100, "guard").play("guardAnim").setScale(4);
    this.add.sprite(200, 100, "lect").play("lectAnim").setScale(4);
    this.add.sprite(300, 100, "sas").play("sasAnim").setScale(4);
    this.add.sprite(400, 100, "lib").play("libAnim").setScale(4);
    this.add.sprite(500, 100, "cafe").play("cafeAnim").setScale(4);

    this.add.sprite(100, 400, "fren").play("frenAnim").setScale(4);
    this.add.sprite(200, 400, "boy").play("boyAnim").setScale(4);
    this.add.sprite(300, 400, "girl").play("girlAnim").setScale(4);
    this.add.sprite(400, 400, "boy2").play("boy2Anim").setScale(4);
    this.add.sprite(500, 400, "girl2").play("girl2Anim").setScale(4);

    let scale = 1;
    this.add.sprite(100, 500, "guard").play("guardAnim").setScale(scale);
    this.add.sprite(130, 500, "lect").play("lectAnim").setScale(scale);
    this.add.sprite(160, 500, "sas").play("sasAnim").setScale(scale);
    this.add.sprite(190, 500, "lib").play("libAnim").setScale(scale);
    this.add.sprite(220, 500, "cafe").play("cafeAnim").setScale(scale);
    this.add.sprite(250, 500, "fren").play("frenAnim").setScale(scale);
    this.add.sprite(280, 500, "boy").play("boyAnim").setScale(scale);
    this.add.sprite(310, 500, "girl").play("girlAnim").setScale(scale);
    this.add.sprite(340, 500, "boy2").play("boy2Anim").setScale(scale);
    this.add.sprite(370, 500, "girl2").play("girl2Anim").setScale(scale);

    var spaceDown = this.input.keyboard.addKey("SPACE");
    var key1 = this.input.keyboard.addKey(49);
    var key2 = this.input.keyboard.addKey(50);
    var key3 = this.input.keyboard.addKey(51);
    var key4 = this.input.keyboard.addKey(52);
    var key5 = this.input.keyboard.addKey(53);
    var key6 = this.input.keyboard.addKey(54);
    var key7 = this.input.keyboard.addKey(55);

    let playerPos = {};

    key1.on(
      "down",
      function () {
        console.log("Jump to blockA");
        playerPos.x = 636;
        playerPos.y = 1103;
        playerPos.dir = "up";

        this.scene.start("blockA", { playerPos: playerPos });
      },
      this
    );

    key2.on(
      "down",
      function () {
        console.log("Jump to library");
        playerPos.x = 1100;
        playerPos.y = 440;
        playerPos.dir = "right";

        this.scene.start("library", { playerPos: playerPos });
      },
      this
    );

    key3.on(
      "down",
      function () {
        console.log("Jump to comp lab");
        playerPos.x = 187;
        playerPos.y = 450;
        playerPos.dir = "right";

        this.scene.start("complab", { playerPos: playerPos });
      },
      this
    );

    key4.on(
      "down",
      function () {
        console.log("Jump to block B");
        playerPos.x = 634;
        playerPos.y = 1106;
        playerPos.dir = "up";

        this.scene.start("blockB", { playerPos: playerPos });
      },
      this
    );

    key5.on(
      "down",
      function () {
        console.log("Jump to block C");
        playerPos.x = 633;
        playerPos.y = 1133;
        playerPos.dir = "up";

        this.scene.start("blockC", { playerPos: playerPos });
      },
      this
    );

    key6.on(
      "down",
      function () {
        console.log("Jump to block D class");
        playerPos.x = 65;
        playerPos.y = 536;
        playerPos.dir = "right";

        this.scene.start("blockDclass", { playerPos: playerPos });
      },
      this
    );

    key7.on(
      "down",
      function () {
        console.log("Jump to cafeteria");
        playerPos.x = 59;
        playerPos.y = 536;
        playerPos.dir = "right";

        this.scene.start("cafeteria", { playerPos: playerPos });
      },
      this
    );

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world");
        let playerPos = {};
        playerPos.x = 687;
        playerPos.y = 1230;
        playerPos.dir = "up";
        this.scene.start("storyTextbox", { playerPos: playerPos });
      },
      this
    );

    // Add any text in the main page
    this.add.text(10, 200, "Press spacebar to continue", {
      font: "20px Courier",
      fill: "#FFFFFF",
    });
    this.add.text(10, 230, "1 - blockA, 2 - library, 3- complab, 4 - block B", {
      font: "20px Courier",
      fill: "#FFFFFF",
    });
    this.add.text(10, 260, "5 - block C, 6 - BlockD class, 7 - cafeteria", {
      font: "20px Courier",
      fill: "#FFFFFF",
    });

    // Create all the game animations here
  }
}
