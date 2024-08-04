
////////////////////////////////////////////////////////
//
// access this function using updateInventory.call(this)
// Uses a JS function to prevent repeated codes
// 
///////////////////////////////////////////////////////
function updateInventory() {
    console.log("*** updateInventory()", this)
    // Emit events showInventory
    this.inventory = {}
    this.inventory.heart = window.heart
    this.inventory.key = window.key
    this.inventory.knife = window.knife

    console.log('*** updateInventory() Emit event', this.inventory)
    this.invEvent = (event, data) =>  { this.scene.get('showInventory').events.emit(event, data); }
    this.invEvent("inventory", this.inventory);
  }
  
  ////////////////////////////////////////////////////////
  //
  // access this function using guardCaught
  // Uses a JS function to prevent repeated codes
  // 
  ///////////////////////////////////////////////////////
  function guardCaught(player,guard) {
      console.log("*** player hit guard");
  
      this.hitSnd.play();
  
      // Shake screen
    this.cameras.main.shake(150);
  
      window.heart--
      guard.disableBody(false, true);
      //this.updateInventory()
      updateInventory.call(this)
  
    if (window.heart == 0){
      this.scene.start("gameOver");
      this.loseSnd.play();
    }
  }

  function killGuard(knife,guard) {
    console.log("*** knife hit guard");

    this.smallhitSnd.play();

    // Shake screen
    this.cameras.main.shake(150);

    guard.disableBody(false, true);
    //knife.disableBody(false, true);
    //this.updateInventory()
    updateInventory.call(this)

}

function destroyKnife(knife) {
  console.log("Destroy knife objects", knife)
  knife.destroy();
}

function movement() {

    if (this.cursors.left.isDown && this.spaceDown.isDown)
    {
      this.knife = new Knife(this, this.player.x, this.player.y)
      this.knife.shoot(this.player.x,this.player.y, 0)

      this.physics.add.collider(this.knife,this.wallLayer);
      this.physics.add.overlap( this.knife,
        [this.guard,this.guard2,this.guard3],
        killGuard,
        null,
        this
      )

      this.time.delayedCall(5000, destroyKnife, [this.knife], this)
    } 
    else if (this.cursors.right.isDown && this.spaceDown.isDown)
    {
      this.knife = new Knife(this, this.player.x, this.player.y)
      this.knife.shoot(this.player.x,this.player.y, 1)

      this.physics.add.collider(this.knife,this.wallLayer);
      this.physics.add.overlap( this.knife,
        [this.guard,this.guard2,this.guard3],
        killGuard,
        null,
        this
      )

      this.time.delayedCall(5000, destroyKnife, [this.knife], this)
    }
    else if (this.cursors.up.isDown && this.spaceDown.isDown)
    {
      this.knife = new Knife(this, this.player.x, this.player.y)
      this.knife.shoot(this.player.x,this.player.y, 2)

      this.physics.add.collider(this.knife,this.wallLayer);
      this.physics.add.overlap( this.knife,
        [this.guard,this.guard2,this.guard3],
        killGuard,
        null,
        this
      )

      this.time.delayedCall(5000, destroyKnife, [this.knife], this)
    }
    else if (this.cursors.down.isDown && this.spaceDown.isDown)
    {
      this.knife = new Knife(this, this.player.x, this.player.y)
      this.knife.shoot(this.player.x,this.player.y, 3)

      this.physics.add.collider(this.knife,this.wallLayer);
      this.physics.add.overlap( this.knife,
        [this.guard,this.guard2,this.guard3],
        killGuard,
        null,
        this
      )

      this.time.delayedCall(5000, destroyKnife, [this.knife], this)

    }
    else if (this.cursors.left.isDown) 
    {
        this.player.setVelocityX(-200);
        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(200);
        this.player.anims.play('right', true);
    }
    
    else if (this.cursors.up.isDown)
    {
        this.player.setVelocityY(-200);
        this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown)
    {
        this.player.setVelocityY(200);
        this.player.anims.play('down', true);
    } else {
        this.player.setVelocity(0);
        this.player.anims.stop()
    }
}