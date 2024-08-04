////////////////////////////////////////////////////////
//
// access this function using updateInventory.call(this)
// Uses a JS function to prevent repeated codes
// 
///////////////////////////////////////////////////////
function updateInventory() {
    console.log("*** updateInventory()")
    // Emit events showInventory
    this.inventory = {}
    this.inventory.key = window.key
    this.inventory.heart = window.heart
     
    console.log('*** updateInventory() Emit event', this.inventory)
    this.invEvent = (event, data) =>  { 
			    this.scene.get('showInventory').events.emit(event, data); 
		    }
    this.invEvent("inventory", this.inventory);
  }
  
  ////////////////////////////////////////////////////////
  //
  // access this function using hitAnt
  // Uses a JS function to prevent repeated codes
  // 
  ///////////////////////////////////////////////////////
  function globalHitFire(player,item) {
      console.log("*** player overlap fire");
     
      // Shake screen
     this.cameras.main.shake(100);

     //this.hitenemySnd.play();
  
      window.heart--;
      item.disableBody(true, true);
      updateInventory.call(this)
 
    if (window.heart < 1 ){
        console.log("*** player gameOver");
        this.scene.start("gameOver");
        //this.loselifeSnd.play();
    }
  }

  function globalCollectKey(player,item) {
    console.log("*** player overlap key");
   
    // Shake screen
   this.cameras.main.shake(100);

   //this.hitenemySnd.play();

    window.key++;
    item.disableBody(true, true);
    updateInventory.call(this)

}
