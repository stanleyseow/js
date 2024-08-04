class showInventory extends Phaser.Scene {

    constructor() {
        super({
            key: 'showInventory',
            active: false
        });
    }

    // incoming data from other scene
    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {}

    create() {
        // var rect = new Phaser.Geom.Rectangle(0, 0, 640, 50);
        // var graphics = this.add.graphics({
        //     fillStyle: {
        //         color: 0x000000
        //     }
        // });
        // graphics.fillRectShape(rect).setScrollFactor(0)

        // Setup heart and keys but visible to false
        this.heartimg1 = this.add.image (480,50,'heartpng').setScrollFactor(0).setVisible(false).setScale(0.1);
        this.heartimg2 = this.add.image (530,50,'heartpng').setScrollFactor(0).setVisible(false).setScale(0.1);
        this.heartimg3 = this.add.image (580,50,'heartpng').setScrollFactor(0).setVisible(false).setScale(0.1);

        this.keyimg1 = this.add.image (50,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
        this.keyimg2 = this.add.image (100,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
        this.keyimg3 = this.add.image (150,50,'keypng').setScrollFactor(0).setVisible(false).setScale(0.5);
        
        this.knifeimg1 = this.add.sprite (250,50,'knife').setScrollFactor(0).setVisible(false)
        this.knifeimg2 = this.add.sprite(300,50,'knife').setScrollFactor(0).setVisible(false)
        this.knifeimg3 = this.add.sprite (350,50,'knife').setScrollFactor(0).setVisible(false)

        this.knifeimg1.play('knifeAnim')
        this.knifeimg2.play('knifeAnim')
        this.knifeimg3.play('knifeAnim')

        // Recv an event, call the method
        this.events.on('inventory', this.updateInventory, this)
    }

    update() {
    }

    updateInventory(data) {
         console.log('Received event inventory', data)

         switch ( data.heart ) {

            case ( data.heart > 3):
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(true)
                this.heartimg3.setVisible(true)
                break;
                
            case 3: 
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(true)
                this.heartimg3.setVisible(true)
                break;

            case 2:
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(true)
                this.heartimg3.setVisible(false)
                break;

            case 1:
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(false)
                this.heartimg3.setVisible(false)
                break;
             
            case 0:
                this.heartimg1.setVisible(false)
                this.heartimg2.setVisible(false)
                this.heartimg3.setVisible(false)
                break;    

            default:
            break;
        }

        switch ( true ) { 
            case (data.key>3):
                this.keyimg1.setVisible(true)
                this.keyimg2.setVisible(true)
                this.keyimg3.setVisible(true)
                break;    

            case (data.key == 3):
                this.keyimg1.setVisible(true)
                this.keyimg2.setVisible(true)
                this.keyimg3.setVisible(true)
                break;    

            case (data.key == 2):
                this.keyimg1.setVisible(true)
                this.keyimg2.setVisible(true)
                this.keyimg3.setVisible(false)
                break;  
                
            case (data.key == 1):
                this.keyimg1.setVisible(true)
                this.keyimg2.setVisible(false)
                this.keyimg3.setVisible(false)
                break; 
            case (data.key == 0):
                    this.keyimg1.setVisible(false)
                    this.keyimg2.setVisible(false)
                    this.keyimg3.setVisible(false)
                    break;     
            default: 
                break;
        }

        switch ( data.knife ) { 

            case 3:
                this.knifeimg1.setVisible(true)
                this.knifeimg2.setVisible(true)
                this.knifeimg3.setVisible(true)

                break;    

            case 2:
                this.knifeimg1.setVisible(true)
                this.knifeimg2.setVisible(true)
                this.knifeimg3.setVisible(false)
     
                break;  
                
            case 1: 
                this.knifeimg1.setVisible(true)
                this.knifeimg2.setVisible(false)
                this.knifeimg3.setVisible(false)

                break; 
            default: 
                break;
        }
        
    }
}