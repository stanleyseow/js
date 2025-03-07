class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
  }

  create() {
    console.log("*** MainScene: ", playerStats)
    
    // Player setup
    this.player = this.physics.add.sprite(400, 300, "gen").play("gen-down");
    this.player.setCollideWorldBounds(true);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1);

    this.player.facing = "down"; // Default direction

    // Added healthBar
    this.healthBar = new HealthBar(this, this.player);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Groups
    this.enemies = this.physics.add.group();
    this.enemies2 = this.physics.add.group();
    this.whips = this.physics.add.group();
    this.knives = this.physics.add.group();
    
    this.experienceGems = this.physics.add.group();

    this.physics.add.overlap(this.player, this.enemies, this.playerHit, null, this);
    this.physics.add.overlap(this.player, this.enemies2, this.playerHit2, null, this);
    //this.physics.add.overlap(this.player, this.knives, this.playerHit2, null, this);

    //this.physics.add.overlap(this.knives, this.enemies,this.enemyHit2, null, this);
    //this.physics.add.overlap(this.knives, this.enemies2, this.enemyHit2, null, this);

    this.physics.add.overlap(this.whips, this.enemies, this.whipHit, null, this);
    this.physics.add.overlap(this.whips, this.enemies2, this.whipHit2, null, this);

    this.physics.add.overlap(this.player, this.experienceGems, this.collectGem, null, this);

    // Spawn enemies periodically
    this.time.addEvent({
      delay: 3000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 5000,
      callback: this.spawnEnemy2,
      callbackScope: this,
      loop: true,
    });


    // UI
    this.healthText = this.add.text(16, 16, "", {
      fontSize: "24px",
      fill: "#fff",
    });
    this.healthText.setText(`Health: ${playerStats.currentHealth}`);

    this.expText = this.add.text(16, 50, "Exp: 0", { fontSize: "24px", fill: "#fff" });
    this.levelText = this.add.text(16, 80, "Level: 1", { fontSize: "24px", fill: "#fff" });
    this.facingText = this.add.text(16, 110, "", { fontSize: "24px", fill: "#fff" });
  }

  update(time) {

    // update healthBar
    this.healthBar.update();

    // Player movement
    let speed = 200;
    this.facingText.setText(`${this.player.facing}`);

    // this.knives.getChildren().forEach(knife => {
    //   console.log("Knife updating:", knife.x, knife.y);
    // });


    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.facing = "left";
      this.player.anims.play("gen-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.facing = "right";
      this.player.anims.play("gen-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.facing = "up";
      this.player.anims.play("gen-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.facing = "down";
      this.player.anims.play("gen-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }

    // Whip attack (spacebar)
    if (
      this.input.keyboard.checkDown(
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        250)) {
      this.attack(time);
    }

    // throw knives ( shift )
    // if (
    //   this.input.keyboard.checkDown(
    //     this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
    //     250)) {
    //   this.throwKnife();
    // }

    // Enemy movement, follow player
    this.enemies.getChildren().forEach((enemy) => {
      this.physics.moveToObject(enemy, this.player, 100);
    });

    // this.enemies2.getChildren().forEach((e) => {
    //   //this.physics.moveToObject(k, this.player, 100);
    //   let angle = Phaser.Math.Angle.BetweenPoints(e, this.player);
    //   this.physics.velocityFromRotation(angle, 300, k.body.velocity);
    //  });

    

  } // end of update()

  attack(time) {
    if (time > lastFired) {
      let offsetX = 0;
      let offsetY = 0;

      let animKey = "";

      switch (this.player.facing) {
        case "up":
          animKey = "sword_up";
          offsetY = -30;
          break;
        case "down":
          animKey = "sword_down";
          offsetY = 30;
          break;
        case "left":
          animKey = "sword_left";
          offsetX = -50;
          break;
        case "right":
          animKey = "sword_right";
          offsetX = 30;
          break;
      }

      // Create whip at appropriate position
      const whip = this.physics.add.sprite(this.player.x + offsetX, this.player.y + offsetY, "whip").setScale(0.5);

      whip.damage = playerStats.damage;
      whip.setActive(true);
      whip.setVisible(true);

      this.whips.add(whip);

      // Play animation and handle destruction
      whip.play(animKey).on("animationcomplete", () => {
        whip.destroy();
      });

      lastFired = time + 250;
    }
  }

  spawnEnemy() {
    let x = Phaser.Math.Between(0, 800);
    let y = Phaser.Math.Between(0, 600);

    const enemy = this.physics.add.sprite(x, y, "fire").play("burning");
    enemy.setScale(0.6);
    enemy.health = 20;

    // Add it to the physics group for collision handling
    this.enemies.add(enemy);
  }

  spawnEnemy2() {


    let x = Phaser.Math.Between(0, 800);
    let y = Phaser.Math.Between(0, 600);

    const enemy = this.physics.add.sprite(x, y, "enemy").play("enemy-down");
    enemy.setScale(1);
    enemy.health = 20;

    this.enemies2.add(enemy);
    this.throwKnife(enemy);
  }

  throwKnife(enemy) {
    // Create and throw a knife at the player from enemy2
      const knife = this.physics.add.sprite(enemy.x, enemy.y, "knifeImg").play("knifeAnim");
      knife.damage = playerStats.damage;
      knife.setScale(1); // Scale the knife as needed
    
      // Calculate direction from enemy to player
      const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
      
      // Set velocity based on angle
      const speed = 200; // Adjust speed as needed
      knife.body.velocity.x = Math.cos(angle) * speed;
      knife.body.velocity.y = Math.sin(angle) * speed;
      
      // Rotate knife to face direction of travel
      knife.rotation = angle + Math.PI/2; // Add offset if needed based on your knife sprite
      
      // Add collision with player
      this.physics.add.overlap(this.player, knife, this.handleKnifeHit, null, this);
      this.physics.add.overlap(this.enemies, knife, this.handleKnifeHitEnemy, null, this);
      //this.knives.add(knife);

  }

  handleKnifeHitEnemy(enemy, knife) {
    console.log("Knife hit enemy!");

    this.cameras.main.shake(200);
    //this.physics.add.collider(player, knife);
    // Damage the player
    //player.health -= 10; // Or whatever damage amount you want
    
    // Remove the knife
    knife.destroy();
    enemy.destroy();
  }

  handleKnifeHit(player, knife) {
    //console.log("Knife hit player!", player, knife);

    //this.cameras.main.shake(200);
    this.physics.add.collider(player, knife);
    // Damage the player
    //player.health -= 10; // Or whatever damage amount you want
    
    // Remove the knife
    //knife.destroy();
  }

  whipHit(whip, enemy) {
    enemy.health -= whip.damage;
    if (enemy.health <= 0) {
      enemy.destroy();
      this.spawnGem(enemy.x, enemy.y);
    }
  }

  whipHit2(whip, enemy) {
    enemy.health -= whip.damage;
    if (enemy.health <= 0) {
      enemy.destroy();
      this.spawnGem(enemy.x, enemy.y);
    } 
  } 

  spawnGem(x, y) {
    let gem = this.physics.add.sprite(x, y, "gem");
    gem.setScale(0.4);
    this.experienceGems.add(gem);
  }

  collectGem(player, gem) {
    gem.destroy();
    playerStats.experience += 25;

    this.expText.setText(`Exp: ${playerStats.experience}`);

    if (playerStats.experience >= playerStats.nextLevel) {
      this.levelUp();
    }
  }

  levelUp() {
    playerStats.level++;
    playerStats.experience = 0;
    playerStats.nextLevel *= 1.2;
    playerStats.damage *= 1.2;
    playerStats.currentHealth = 1000;
    console.log("playerStats: ", playerStats);
    this.levelText.setText(`Level: ${playerStats.level}`)
    this.healthText.setText(`Health: ${playerStats.currentHealth}`)
  }

  playerHit(player, enemy) {
    console.log("currentHealth: ", playerStats.currentHealth)
    playerStats.currentHealth -= 50;
    this.cameras.main.shake(200);
    enemy.destroy();
    this.healthText.setText(`Health: ${playerStats.currentHealth}`);

    if (playerStats.currentHealth <= 0) {
      console.log("Player is dead!!!")
      this.scene.pause();
    }
  }

  playerHit2(player, enemy) {
    console.log("currentHealth: ", playerStats.currentHealth)
    playerStats.currentHealth -= 50;
    this.cameras.main.shake(200);
    enemy.destroy();
    this.healthText.setText(`Health: ${playerStats.currentHealth}`);

    if (playerStats.currentHealth <= 0) {
      this.scene.pause();
    }
  }

  enemyHit2(knife, enemy) {
    enemy.destroy();
    knife.destroy();
  }


} // end of class
