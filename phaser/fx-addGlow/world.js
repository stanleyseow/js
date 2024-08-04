class world extends Phaser.Scene {
  constructor() {
    super("world");
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
  }

  preload() {

    this.load.image("maps", "assets/Example_pipoya.png");
  }

  create() {
    console.log("*** world scene");

    this.add.image(320, 320, "maps")

    this.player = this.physics.add.sprite(200, 200, "gen").play("gen-down")
    window.player = this.player;

    this.npc = this.physics.add.sprite(200, 300, "gen").play("gen-down").anims.stop();

    this.fire1 = this.physics.add.sprite(300, 300, "fire").play("fireAnim");
    this.fire2 = this.physics.add.sprite(400, 300, "fire").play("fireAnim");


    //this.player.setCollideWorldBounds(true); // don't go out of the this.map

    const fx1 = this.player.postFX.addGlow(0xffffff, 4, 0, false, 0.1, 32);
    this.tweens.add({
      targets: fx1,
      outerStrength: 30,
      yoyo: true,
      loop: -1,
      ease: "sine.inout",
    });

    const fx2 = this.npc.postFX.addGlow(0x00ff00, 0, 0);
    this.tweens.add({
      targets: fx2,
      outerStrength: 10,
      yoyo: true,
      loop: -1,
      ease: "sine.inout",
    });

    // // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);

    //this.decorLayer.setCollisionByExclusion(-1, true)
    //this.buildingLayer.setCollisionByExclusion(-1, true)

    // this.physics.add.collider(this.player, this.decorLayer);
    // this.physics.add.collider(this.player, this.buildingLayer);

    // this.physics.add.overlap(
    //   this.player, // player
    //   this.paladin,  // enemy
    //   this.overlapPaladin,    // function to call
    //   null,
    //   this
    // );

    // this.physics.add.overlap(
    //   this.player, // player
    //   this.cleric,  // enemy
    //   this.overlapCleric,    // function to call
    //   null,
    //   this
    // );

    // console.log("Launching showInventory")
    // this.scene.launch("showInventory")


    this.physics.add.overlap(this.player, [this.fire1, this.fire2], this.hitFire, null, this);

  } /////////////////// end of create //////////////////////////////

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("gen-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("gen-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("gen-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("gen-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }
  } /////////////////// end of update //////////////////////////////

  hitFire( player, fire ) {
    console.log("hit fire");

    // shake screen
    this.cameras.main.shake(300); 

    fire.disableBody(true, true);

  }
  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1");
  }
  

  updateInventory() {
    // Emit events showInventory
    this.inventory = {};
    this.inventory.heart = window.heart;
    this.inventory.key = window.key;

    console.log("Emit event", this.inventory);
    this.invEvent = (event, data) =>
      this.scene.get("showInventory").events.emit(event, data);
    this.invEvent("inventory", this.inventory);
  }
} //////////// end of class world ////////////////////////
