class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
    }

    preload() {

    }

    create() {
        console.log('*** room1 scene');
        
    }

    update() {

    }

    

}
