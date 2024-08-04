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
  // access this function with globalHitFire
  // Uses a JS function to prevent repeated codes
  // 
  ///////////////////////////////////////////////////////
  function globalHitFire(player,item) {
      console.log("*** player overlap fire");
      this.hitFireSnd = this.sound.add("hitFire").setVolume(2);
      this.gameOverSnd = this.sound.add("gameOver").setVolume(0.5);

      this.hitFireSnd.play();

      // Shake screen
     this.cameras.main.shake(100);
     //this.hitenemySnd.play();
  
		  // deduct heart
      window.heart--;

      item.disableBody(true, true);
      
      // Call globalFunctions.js updateInventory
      updateInventory.call(this)
 
    if (window.heart == 0){
	    console.log("*** player gameOver");
      this.scene.start("gameOver");
      this.gameOverSnd.play();
    }
  }
  
  ////////////////////////////////////////////////////////
  //
  // access this function with globalCollectKey
  // Uses a JS function to prevent repeated codes
  // 
  /////////////////////////////////////////////////////// 
 function globalCollectKey(player,item) {
    console.log("*** player overlap key");
   
    // Shake screen
   this.cameras.main.shake(100);

   //this.hitenemySnd.play();

	// increase key count
    window.key++;
    item.disableBody(true, true);
    updateInventory.call(this)
}
