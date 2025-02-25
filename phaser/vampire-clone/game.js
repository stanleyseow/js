let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let player, cursors, enemies, whips, experienceGems;
let lastFired = 0;
let playerStats = {
    health: 1000,
    maxHealth: 1000,
    experience: 0,
    level: 1,
    nextLevel: 100,
    damage: 10
};

function preload() {

    this.load.image('gem', 'assets/coinGold.png');
    this.load.spritesheet('sword', 'assets/whip.png', {frameWidth: 192, frameHeight: 192});
    this.load.spritesheet('player', 'assets/anna.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('enemy', 'assets/fire.png',{ frameWidth:40, frameHeight:70 });

}

function create() {
    // Player setup
    player = this.physics.add.sprite(400, 300, 'player');
    player.setCollideWorldBounds(true);
    player.setScale(0.8);

    player.facing = 'down'; // Default direction

    // Input
    cursors = this.input.keyboard.createCursorKeys();

    // Groups
    enemies = this.physics.add.group();
    whips = this.physics.add.group();
    experienceGems = this.physics.add.group();

    this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", { start: 9, end: 17 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", { start: 27, end: 35 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("player", { start: 18, end: 26 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: 'sword_up',
        frames: this.anims.generateFrameNumbers('sword',
        { start: 0, end:5  }),
        frameRate: 20,
        repeat: 0
    })

    this.anims.create({
        key: 'sword_down',
        frames: this.anims.generateFrameNumbers('sword',
        { start: 12, end:17  }),
        frameRate: 20,
        repeat: 0
    })

    this.anims.create({
        key: 'sword_left',
        frames: this.anims.generateFrameNumbers('sword',
        { start: 6, end:11  }),
        frameRate: 20,
        repeat: 0
    })

    this.anims.create({
        key: 'sword_right',
        frames: this.anims.generateFrameNumbers('sword',
        { start: 18, end:23  }),
        frameRate: 20,
        repeat: 0
    })

    // Collisions
    this.physics.add.overlap(player, enemies, playerHit, null, this);
    this.physics.add.overlap(whips, enemies, whipHit, null, this);
    this.physics.add.overlap(player, experienceGems, collectGem, null, this);

    // Spawn enemies periodically
    this.time.addEvent({
        delay: 1000,
        callback: spawnEnemy,
        callbackScope: this,
        loop: true
    });

    // UI
    this.healthText = this.add.text(16, 16, 'Health: 1000', { fontSize: '24px', fill: '#fff' });
    
    this.expText = this.add.text(16, 50, 'Exp: 0', { fontSize: '24px', fill: '#fff' });
    this.facingText = this.add.text(16, 80, '', { fontSize: '24px', fill: '#fff' });
}

function update(time) {
    // Player movement
    let speed = 200;
    player.setVelocity(0);
    this.facingText.setText(`${player.facing}`);

    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
        player.facing = 'left';
        player.anims.play("left", true); 
    } else if (cursors.right.isDown) {
        player.setVelocityX(speed);
        player.facing = 'right';
        player.anims.play("right", true); 
    } else if (cursors.up.isDown) {
        player.setVelocityY(-speed);
        player.facing = 'up';
        player.anims.play("up", true); 
    } else if (cursors.down.isDown) {
        player.setVelocityY(speed);
        player.facing = 'down';
        player.anims.play("down", true); 
    } else {
        player.setVelocityY(0);
        player.anims.stop()
    }

    // Whip attack (spacebar)
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), 250)) {
        attack(time);
    }

    // Enemy movement
    enemies.getChildren().forEach(enemy => {
        this.physics.moveToObject(enemy, player, 100);
    });
}

function attack(time) {
    if (time > lastFired) {
        let offsetX = 0; 
        let offsetY = 0;
        
        //const animKey = player.facing === 'left' ? 'sword_left' : 'sword_right';
        switch ( player.facing ) {
            case 'up':
                animKey = 'sword_up';
                offsetY = -30
                break;
            case 'down':
                animKey = 'sword_down';
                offsetY = 30
                break;
            case 'left':
                animKey = 'sword_left';
                offsetX = -40
                break;
            case 'right':
                animKey = 'sword_right';
                offsetX = 30
                break;
        }
        
        // Create whip at appropriate position
        let whip = whips.create(
            player.x + offsetX,
            player.y + offsetY,
            'sword'
        ).setScale(0.5)
        
        whip.damage = playerStats.damage;
        whip.setActive(true);
        whip.setVisible(true);

        // Play animation and handle destruction
        whip.play(animKey).on('animationcomplete', () => {
            whip.destroy();
        });

        // Optional: Flip sprite if attacking left
        if (player.facing === 'left') {
            whip.setFlipX(true);
        }

        lastFired = time + 250;
    }
}

function spawnEnemy() {
    let x = Phaser.Math.Between(0, 800);
    let y = Phaser.Math.Between(0, 600);
    let enemy = enemies.create(x, y, 'enemy');
    enemy.setScale(0.6);
    enemy.health = 20;
}

function whipHit(whip, enemy) {
    enemy.health -= whip.damage;
    if (enemy.health <= 0) {
        enemy.destroy();
        spawnGem(enemy.x, enemy.y);
    }
}

function spawnGem(x, y) {
    let gem = experienceGems.create(x, y, 'gem');
    gem.setScale(0.4);
}

function collectGem(player, gem) {
    gem.destroy();
    playerStats.experience += 25;

    this.expText.setText(`Exp: ${playerStats.experience}`);
    
    if (playerStats.experience >= playerStats.nextLevel) {
        levelUp()
    }
}

function levelUp() {
    playerStats.level++;
    playerStats.experience = 0;
    playerStats.nextLevel *= 1.5;
    playerStats.damage *= 1.2;
    playerStats.health = 1000;
    console.log("playerStats: ",playerStats );
    //this.healthText.setText(`Health: ${playerStats.health}`)
}

function playerHit(player, enemy) {
    playerStats.health -= 10;
    this.cameras.main.shake(200);
    enemy.destroy();
    this.healthText.setText(`Health: ${playerStats.health}`);
    
    if (playerStats.health <= 0) {
        this.scene.pause();
    }
}
