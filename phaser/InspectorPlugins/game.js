/* global Phaser, PhaserPluginInspector, Tweakpane */

var {
    AddAnimationState,
    AddArcadeBody,
    AddGameObject,
    AddGroup,
    AddKeys,
    AddTimerEvent
  } = PhaserPluginInspector;
  
  var config = {
    plugins: PhaserPluginInspector.DefaultPluginsConfig,
    scale: {
      parent: 'parent',
      width: 800,
      height: 600
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      init: init,
      preload: preload,
      create: create,
      update: update
    },
    loader: {
      baseURL: "https://labs.phaser.io",
      crossOrigin: "anonymous"
    },
    title: "Phaser 3 Inspector Plugin",
    url: "https://github.com/samme/phaser-plugin-inspector"
  };
  
  var player;
  var stars;
  var bombs;
  var platforms;
  var cursors;
  var score;
  var gameOver;
  var scoreText;
    
  new Phaser.Game(config);
  
  function init() {
    score = 0;
    gameOver = false;
  }
  
  function preload() {
    this.load.image("sky", "src/games/firstgame/assets/sky.png");
    this.load.image("ground", "src/games/firstgame/assets/platform.png");
    this.load.image("star", "src/games/firstgame/assets/star.png");
    this.load.image("bomb", "src/games/firstgame/assets/bomb.png");
    this.load.spritesheet("dude", "src/games/firstgame/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }
  
  function create() {
    var { pane } = this.inspectorScene;
  
    this.add.image(400, 300, "sky").setName("sky");
  
    platforms = this.physics.add.staticGroup().setName("platforms");
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");
  
    player = this.physics.add.sprite(100, 450, "dude").setName("player");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  
    AddGameObject(player, pane);
    AddAnimationState(player.anims, pane);
    AddArcadeBody(player.body, pane);
  
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });
  
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  
    cursors = this.input.keyboard.createCursorKeys();
  
    const keysFolder = AddKeys(cursors, pane);
    
    // This folder needs to be disposed manually
    this.events.once('shutdown', () => { keysFolder.dispose(); });
  
    stars = this.physics.add
      .group({
        key: "star",
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      })
      .setName("stars");
  
    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  
    bombs = this.physics.add.group({ maxSize: 10 }).setName("bombs");
    
    AddGroup(bombs, pane);
  
    const bombsTimer = this.time.addEvent({
      delay: 10000,
      repeat: 9,
      callback: dropBomb,
      callbackContext: this
    });
    
    const timerEventFolder = AddTimerEvent(bombsTimer, pane);
    
    // This folder needs to be disposed manually
    this.events.once('shutdown', () => { timerEventFolder.dispose(); })
  
    scoreText = this.add
      .text(16, 16, "score: 0", {
        fontSize: "32px",
        fill: "#fd0"
      })
      .setName("score");
  
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
  
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, bombs, hitBomb, null, this);
  }
  
  function update() {
    if (gameOver) {
      return;
    }
  
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("turn");
    }
  
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
  
  function collectStar(player, star) {
    star.disableBody(true, true);
  
    score += 10;
    scoreText.setText("Score: " + score);
  
    if (stars.countActive(true) === 0) {
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
    }
  }
  
  function hitBomb(player, bomb) {
    this.physics.pause();
  
    player.setTint(0xff0000);
    player.anims.play("turn");
  
    gameOver = true;
  }
  
  function dropBomb() {
    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
  
    var bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
  



