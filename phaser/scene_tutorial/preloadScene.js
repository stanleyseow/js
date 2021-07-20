class preloadScene extends Phaser.Scene {
    constructor() {
        super("preloadScene")
    }

create() {
    this.add.text(20,20, "Loading game...");

    this.add.text(20,40, "Click to continue...");
    console.log("This is preloadScene");

    // Goto playGame scene when mouse is clicked
    this.input.once('pointerdown', function(){
        this.scene.start("gameScene");
        }, this );
}

}