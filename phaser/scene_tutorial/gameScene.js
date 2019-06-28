class gameScene extends Phaser.Scene {
    constructor() {
        super("gameScene")
    }


create() {
    this.add.text(20,20,"Playing game", {font:"25px Arial", fill:"yellow"})
    console.log("This is gameScene")
    }    
}