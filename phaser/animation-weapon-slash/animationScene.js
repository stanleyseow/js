class animationScene extends Phaser.Scene {
    constructor() {
        super({ key: "animationScene" });
    }

    preload() {
        this.load.spritesheet("gen128", "assets/charwalk-128x128.png", {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.load.spritesheet("slash128", "assets/charslash-128x128.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
    }

    create() {
        this.loadAnimations();

        // Player setup
        this.player = this.physics.add.sprite(100, 100, "gen128");
        
        // Initialize state variables
        this.player.facing = "down"; 
        this.isAttacking = false;
        this.lastFired = 0;

        // Set initial walking hitbox
        this.resetPlayerBody();

        // Keyboard setup
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Camera setup
        this.cameras.main.startFollow(this.player);

        // --- THE FIX: Animation Complete Listener ---
        this.player.on('animationcomplete', (animation) => {
            if (animation.key.includes('slash')) {
                this.isAttacking = false;
                
                // 1. Reset hitbox to normal size
                this.resetPlayerBody();

                // 2. Return to correct idle frame of walking sheet
                let idleFrame = 18; // default down
                if (this.player.facing === "up") idleFrame = 0;
                if (this.player.facing === "left") idleFrame = 9;
                if (this.player.facing === "right") idleFrame = 27;
                
                this.player.setTexture("gen128", idleFrame);
            }
        });
    }

    // Helper to keep body size consistent for walking
    resetPlayerBody() {
        // Narrower hitbox for the body/feet area
        this.player.body.setSize(40, 50); 
        this.player.body.setOffset(44, 40); 
    }

    update(time) {
        if (this.isAttacking) {
            this.player.setVelocity(0); // Freeze movement during attack
            return; 
        }

        let speed = 200;

        // Movement Logic
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.facing = "left";
            this.player.play("gen128-left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.facing = "right";
            this.player.play("gen128-right", true);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.player.facing = "up";
            this.player.play("gen128-up", true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.player.facing = "down";
            this.player.play("gen128-down", true);
        } else {
            this.player.setVelocity(0);
            this.player.anims.stop(); // Stop walk cycle
        }

        // Spacebar for Attack
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.attackAction(time);
        }
    }

    attackAction(time) {
        if (time > this.lastFired) {
            let animKey = "";

            // --- THE FIX: Enlarge Body + Change Offset based on direction ---
            switch (this.player.facing) {
                case "up":
                    animKey = "up-slash";
                    this.player.body.setSize(80, 80);
                    this.player.body.setOffset(24, 20); // Extend box upwards
                    break;
                case "down":
                    animKey = "down-slash";
                    this.player.body.setSize(80, 80);
                    this.player.body.setOffset(24, 40); // Extend box downwards
                    break;
                case "left":
                    animKey = "left-slash";
                    this.player.body.setSize(80, 80);
                    this.player.body.setOffset(0, 30);  // Extend box left
                    break;
                case "right":
                    animKey = "right-slash";
                    this.player.body.setSize(80, 80);
                    this.player.body.setOffset(48, 30); // Extend box right
                    break;
            }

            if (animKey !== "") {
                this.isAttacking = true;
                this.player.play(animKey);
                this.lastFired = time + 300;
            }
        }
    }

    loadAnimations() {
        // Walking - repeat -1 (loop)
        const dirs = ['up', 'left', 'down', 'right'];
        dirs.forEach((dir, i) => {
            this.anims.create({
                key: `gen128-${dir}`,
                frames: this.anims.generateFrameNumbers("gen128", { start: i * 9, end: i * 9 + 8 }),
                frameRate: 10,
                repeat: -1
            });
        });

        // Slashes - repeat 0 (play once)
        this.anims.create({
            key: "up-slash",
            frames: this.anims.generateFrameNumbers("slash128", { start: 0, end: 5 }),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: "left-slash",
            frames: this.anims.generateFrameNumbers("slash128", { start: 6, end: 11 }),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: "down-slash",
            frames: this.anims.generateFrameNumbers("slash128", { start: 12, end: 17 }),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: "right-slash",
            frames: this.anims.generateFrameNumbers("slash128", { start: 18, end: 23 }),
            frameRate: 20,
            repeat: 0,
        });
    }
}