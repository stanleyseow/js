window.HealthBar = class HealthBar {
  constructor(scene, player, maxHealth = 1000) {
    this.scene = scene;
    this.player = player;
    this.playerStats = playerStats;
    this.maxHealth = playerStats.maxHealth;
    this.currentHealth = playerStats.currentHealth;

    // Constants for the health bar appearance
    this.width = 80;
    this.height = 8;
    this.borderThickness = 2;
    this.yOffset = -40; // Position above player

    this.createHealthBar();

    this.updateHealth(this.playerStats.currentHealth);
  }

  createHealthBar() {
    // Create a container for the health bar components
    this.bar = this.scene.add.group();

    // Create border (black outline)
    this.border = this.scene.add.rectangle(
      0,
      0,
      this.width + this.borderThickness * 2,
      this.height + this.borderThickness * 2,
      0x000000
    );

    // Create background (gray)
    this.background = this.scene.add.rectangle(
      0,
      0,
      this.width,
      this.height,
      0x808080
    );

    // Create health indicator (green)
    this.healthIndicator = this.scene.add.rectangle(
      -this.width / 2,
      0,
      this.width,
      this.height,
      0x00ff00
    );
    this.healthIndicator.setOrigin(0, 0.5);

    // Add components to the container
    this.bar.add(this.border);
    this.bar.add(this.background);
    this.bar.add(this.healthIndicator);

    // Set initial position
    this.updatePosition();
  }

  updatePosition() {
    // Position the health bar above the player
    if (this.player && this.player.body) {
      const x = this.player.x;
      const y = this.player.y + this.yOffset;

      this.border.setPosition(x, y);
      this.background.setPosition(x, y);
      this.healthIndicator.setPosition(x - this.width / 2, y);
    }
  }

  updateHealth(health) {
    // Update current health value
    this.currentHealth = Phaser.Math.Clamp(health, 0, this.maxHealth);

    // Calculate health bar width based on current health percentage
    const healthPercentage = this.currentHealth / this.maxHealth;
    const barWidth = this.width * healthPercentage;

    // Debug log
    console.log(
      "Health updated:",
      this.currentHealth,
      "/",
      this.maxHealth,
      "Percentage:",
      healthPercentage,
      "Width:",
      barWidth
    );

    // Update the health indicator width
    this.healthIndicator.width = barWidth;

    // Change color based on health percentage
    if (healthPercentage > 0.6) {
      // Green when health is above 60%
      this.healthIndicator.fillColor = 0x00ff00;
    } else if (healthPercentage > 0.3) {
      // Yellow when health is between 30% and 60%
      this.healthIndicator.fillColor = 0xffff00;
    } else {
      // Red when health is below 30%
      this.healthIndicator.fillColor = 0xff0000;
    }

    // Force a redraw of the health bar
    this.healthIndicator.setSize(barWidth, this.height);
  }

  update() {
    // Update position to follow the player
    this.updatePosition();

    // Sync health with playerStats if it has changed
    if (
      this.playerStats &&
      this.currentHealth !== this.playerStats.currentHealth
    ) {
      this.updateHealth(this.playerStats.currentHealth);
    }
  }

  destroy() {
    // Clean up the health bar
    this.bar.destroy(true);
  }
};
