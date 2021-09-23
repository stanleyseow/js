class showInventory extends Phaser.Scene {

    constructor() {
        super({ key: 'showInventory', active: false });

        // Put global variable here
        this.zoomFactor = 2
    }
    
    // incoming data from other scene
    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }


    preload() {
    }

    create() {
    
    console.log('inventory: ', this.inventory);

        // Black bar 64 pixels for inventory / menu

        var rect = new Phaser.Geom.Rectangle(0, 576, 640, 64);
        var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
        graphics.fillRectShape(rect).setScrollFactor(0)

        this.chestSprite = this.add.sprite(20, 595, 'u3').play('chest').setScale(2).setScrollFactor(0)
        this.horseSprite = this.add.sprite(70, 595, 'u3').play('horse').setScale(2).setScrollFactor(0)
        this.iceballSprite = this.add.sprite(120, 595, 'u3').play('iceball').setScale(2).setScrollFactor(0)
        this.fireballSprite = this.add.sprite(170, 595, 'u3').play('fireball').setScale(2).setScrollFactor(0)

        // Recv an event
        this.events.on('inventory', this.updateInventory, this)

        this.chestNum = this.add.text(13, 615, this.inventory.chest, { font: '20px Courier', fill: '#FFFFFF' }).setScrollFactor(0);
        this.horseNum = this.add.text(63, 615, this.inventory.horse, { font: '20px Courier', fill: '#FFFFFF' }).setScrollFactor(0);
        this.iceballNum = this.add.text(113, 615, this.inventory.iceball, { font: '20px Courier', fill: '#FFFFFF' }).setScrollFactor(0);
        this.fireballNum = this.add.text(163, 615, this.inventory.fireball, { font: '20px Courier', fill: '#FFFFFF' }).setScrollFactor(0);
    }

    update() {

    } 

    updateInventory(data) {
        console.log('Received event inventory', data)
        this.inventory = {}
        this.inventory = data
        this.chestNum.setText( this.inventory.chest );
        this.horseNum.setText( this.inventory.horse );
        this.iceballNum.setText( this.inventory.iceball );
        this.fireballNum.setText( this.inventory.fireball ); 

    }
}