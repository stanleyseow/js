class Knife extends Phaser.Physics.Arcade.Sprite {
    constructor ( scene, x, y) {
        super(scene, x, y, 'knifeImg')

        // Create the knife object and add to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    // Shoot method
    shoot(x,y, dir) {
        //console.log("Shoot", this, x, y, dir)
        this.speed = 500
        this.dir = dir;
        this.play('knifeAnim');

        switch (this.dir) {
            // 0 - left, 1 - right, 2, up - 3 - down
            case 0 : 
                this.setVelocityX(-this.speed)
                break;
            case 1 : 
                this.setVelocityX(this.speed)
                break;
            case 2 : 
                this.setVelocityY(-this.speed)
                break;
            case 3 : 
                this.setVelocityY(this.speed)
                break;
            default:
                break;    
        }
    }

    // destroy knife
    destroy() {
        // console.log("destroy: ", this)
        this.disableBody(true,true)
    }

    // preupdate 
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // Reset the knifes  when it reaches end of screen
        // Not needed if collider is turn on with timeouts
        if (this.x < 0 || this.x > 1200) {
            this.disableBody(true,true)
            
        }
    }


}