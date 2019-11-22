class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    fire(x, y) {
        this.body.reset(x, y);
        this.body.setAllowGravity(false);
        
        this.setActive(true);
        this.setVisible(true);
        this.enableBody();
        this.setVelocityX(400);

        console.log('bullet (x,y) ', this.x, this.y);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // Reset the bullets when it reaches end of screen
        if (this.x > 2600) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 20,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet(x, y) {
        let bullet = this.getFirstDead(false);

        if (bullet) {
            bullet.fire(x, y);
        }
    }
}