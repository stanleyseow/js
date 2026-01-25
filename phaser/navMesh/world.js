class world extends Phaser.Scene {
  constructor() {
    super("world");
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap", "assets/NavMeshMap.tmj");

    // // Step 2 : Preload any images here, nickname, filename

    this.load.image("kenny", "assets/kenny.png");
    this.load.image("pippoya", "assets/pippoya.png");
    this.load.image("tree", "assets/tree.png");
    this.load.image("village", "assets/village32x32.png");

    this.load.scenePlugin({
      key: "PhaserNavMeshPlugin",
      url: "phaser-navmesh-plugin.js",
      sceneKey: "navMeshPlugin",
    });
  }

  create() {
    console.log("*** world scene");

    this.loadTiledLayers();

    this.player = this.physics.add
      .sprite(this.playerPos.x, this.playerPos.y, this.playerPos.dir)
      .play("gen-up");
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.7);
    window.player = this.player;
    this.player.setCollideWorldBounds(true);

    // Remove cursor creation
    // this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    this.decorLayer.setCollisionByExclusion(-1, true);
    this.buildingLayer.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, this.decorLayer);
    this.physics.add.collider(this.player, this.buildingLayer);

    ///////////////////////////////////////////////////////////////////////////////////////////
    this.loadNavMesh();

    // Check for mouse clicks
    this.input.on("pointerdown", (pointer) => {
      // Get world coordinates
      const worldX = pointer.worldX || pointer.x + this.cameras.main.scrollX;
      const worldY = pointer.worldY || pointer.y + this.cameras.main.scrollY;

      console.log("Click at world position:", worldX, worldY);

      // Create start and end points
      const start = new Phaser.Math.Vector2(this.player.x, this.player.y);
      const end = new Phaser.Math.Vector2(worldX, worldY);

      // Clear previous debug drawing
      this.navMesh.debugDrawClear();

      // Find path
      const path = this.navMesh.findPath(start, end);

      // Show debug Rect
      if (path) {
        console.log("Path found:", path);

        // Draw the path
        this.navMesh.debugDrawPath(path, 0xffd900);

        // Store the path for movement
        this.currentPath = path;
        this.pathIndex = 0;

        // Draw debug boxes at each path point
        this.graphics.lineStyle(2, 0xff0000, 1);

        // Draw rectangle at start point
        this.graphics.strokeRect(start.x - 10, start.y - 10, 20, 20);

        // Add text for start point
        this.add
          .text(start.x + 15, start.y - 10, "Start", {
            color: "#ff0000",
            backgroundColor: "#000000",
            padding: { x: 4, y: 2 },
          })
          .setDepth(1000);

        // Draw rectangles for each path point
        path.forEach((point, index) => {
          // Draw rectangle
          this.graphics.strokeRect(point.x - 7, point.y - 7, 14, 14);

          // Fill with different colors
          if (index === 0) {
            this.graphics.fillStyle(0x0000ff, 0.5); // First point blue
          } else if (index === path.length - 1) {
            this.graphics.fillStyle(0xff0000, 0.5); // Last point red
          } else {
            this.graphics.fillStyle(0x00ff00, 0.5); // Waypoints green
          }
          this.graphics.fillRect(point.x - 7, point.y - 7, 14, 14);

          // Add text labels with index numbers
          this.add
            .text(point.x + 10, point.y - 5, `#${index}`, {
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: { x: 3, y: 1 },
            })
            .setDepth(1000);
        });

        // Draw rectangle at end/target point
        this.graphics.lineStyle(3, 0xff0000, 1);
        this.graphics.strokeRect(end.x - 12, end.y - 12, 24, 24);

        // Add text for end point
        this.add
          .text(end.x + 15, end.y - 10, "Target", {
            color: "#ff0000",
            backgroundColor: "#000000",
            padding: { x: 4, y: 2 },
          })
          .setDepth(1000);
      } else {
        console.log("No path found");

        // Still show the target even if no path found
        this.graphics.lineStyle(3, 0xff0000, 1);
        this.graphics.strokeRect(end.x - 12, end.y - 12, 24, 24);

        // Add "No Path" text
        this.add
          .text(end.x + 15, end.y - 10, "No Path!", {
            color: "#ff0000",
            backgroundColor: "#000000",
            padding: { x: 4, y: 2 },
          })
          .setDepth(1000);
      }
    });

    // Visualize the mesh
    this.visualizeNavMesh();
  }

  update() {
    this.handlePathMovement();
  }

  loadTiledLayers() {
    //Step 3 - Create the map from main
    this.map = this.make.tilemap({ key: "worldmap" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let kennyTiles = this.map.addTilesetImage("kenny03", "kenny");
    let pippoyaTiles = this.map.addTilesetImage("pippoya05", "pippoya");
    let treeTiles = this.map.addTilesetImage("tree04", "tree");
    let villageTiles = this.map.addTilesetImage("village32x32", "village");

    let tilesArray = [kennyTiles, pippoyaTiles, treeTiles, villageTiles];

    // Step 5  Load in layers by layers
    this.groundLayer = this.map.createLayer("groundLayer", tilesArray, 0, 0);
    this.decorLayer = this.map.createLayer("decorLayer", tilesArray, 0, 0);
    this.buildingLayer = this.map.createLayer("BuildingLayer", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;
  }

  loadNavMesh() {
    console.log("NavMesh plugin version info:", this.navMeshPlugin);

    // Check if navmesh layer exists
    const navLayer = this.map.getObjectLayer("navmesh");
    if (!navLayer) {
      console.error("Navigation layer 'navmesh' not found in the map!");
      return;
    }

    // Create graphics for debug visualization
    this.graphics = this.add.graphics(0, 0).setAlpha(0.5);

    try {
      // Try with smaller simplification value (was 10)
      this.navMesh = this.navMeshPlugin.buildMeshFromTiled("mesh1", navLayer, 10);
      console.log("NavMesh created successfully:", this.navMesh);

      // Enable debug visualization
      this.navMesh.enableDebug(this.graphics);
      this.graphics.setDepth(1000); // Make sure it's visible
    } catch (e) {
      console.error("Error creating navmesh:", e);
    }
  }


  handlePathMovement() {
    if (this.currentPath && this.pathIndex < this.currentPath.length) {
      const currentTarget = this.currentPath[this.pathIndex];

      if (this.hasReachedTarget(currentTarget)) {
        this.updatePathProgress();
        return;
      }

      this.moveTowardsTarget(currentTarget);
    }
  }

  hasReachedTarget(target) {
    const distance = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      target.x,
      target.y
    );
    return distance < 10;
  }

  updatePathProgress() {
    this.pathIndex++;
    if (this.pathIndex >= this.currentPath.length) {
      this.currentPath = null;
      this.player.body.setVelocity(0, 0);
    }
  }

  moveTowardsTarget(target) {
    const angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      target.x,
      target.y
    );

    const speed = 200;
    const velocityX = Math.cos(angle) * speed;
    const velocityY = Math.sin(angle) * speed;

    this.player.body.setVelocity(velocityX, velocityY);
    this.updatePlayerAnimation(velocityX, velocityY);
  }

  updatePlayerAnimation(velocityX, velocityY) {
    if (Math.abs(velocityX) > Math.abs(velocityY)) {
      velocityX > 0
        ? this.player.anims.play("gen-right", true)
        : this.player.anims.play("gen-left", true);
    } else {
      velocityY > 0
        ? this.player.anims.play("gen-down", true)
        : this.player.anims.play("gen-up", true);
    }
  }

  visualizeNavMesh() {
    // This is assuming your navMesh has a way to access polygon data
    // Implementation may vary based on your plugin version
    if (this.navMesh && this.navMesh.mesh && this.navMesh.mesh.polygons) {
      // Draw bounding boxes for all polygons
      graphics.lineStyle(1, 0x00ffff, 0.5);

      this.navMesh.mesh.polygons.forEach((polygon, index) => {
        // Get the bounds of the polygon
        let minX = Infinity,
          minY = Infinity;
        let maxX = -Infinity,
          maxY = -Infinity;

        // Find min/max coordinates
        polygon.points.forEach((point) => {
          minX = Math.min(minX, point.x);
          minY = Math.min(minY, point.y);
          maxX = Math.max(maxX, point.x);
          maxY = Math.max(maxY, point.y);
        });

        // Draw rectangle for the polygon bounds
        graphics.strokeRect(minX, minY, maxX - minX, maxY - minY);

        // Optionally add polygon index
        if (index % 3 === 0) {
          // Only show every third one to reduce clutter
          graphics.fillStyle(0x000000, 0.6);
          graphics.fillRect((minX + maxX) / 2 - 10, (minY + maxY) / 2 - 10, 20, 20);

          // Add polygon index
          graphics.fillStyle(0xffffff, 1);
          graphics.fillText(
            index.toString(),
            (minX + maxX) / 2 - 5,
            (minY + maxY) / 2 - 5,
            10
          );
        }
      });
    }
  }

  
} // end of class
