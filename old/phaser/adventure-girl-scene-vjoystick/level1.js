
class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
    }


preload() {
    var url;

    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);

}

create() {
    // load the this.map
    var map = this.make.tilemap({key: 'map'});

    window.map = map;

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    this.groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    this.itemLayer = map.createDynamicLayer('itemLayer', groundTiles, 0, 0);


    
    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // Object layers
    var startPoint = map.findObject("objectLayer", obj => obj.name === "startPoint");
    var endPoint = map.findObject("objectLayer", obj => obj.name === "endPoint");
    
    // load fire objects
    var fire1 = map.findObject("objectLayer", obj => obj.name === "fire1");
    var fire2 = map.findObject("objectLayer", obj => obj.name === "fire2");
    var fire3 = map.findObject("objectLayer", obj => obj.name === "fire3");
    var fire4 = map.findObject("objectLayer", obj => obj.name === "fire4");

    // left and right zones
    this.leftZone =  map.findObject("objectLayer", obj => obj.name === "leftZone");
    this.rightZone = map.findObject("objectLayer", obj => obj.name === "rightZone");

    // create the this.playersprite    
    //this.player = this.physics.add.sprite(100, 200, 'girl')
    this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'girl')
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map  
        
    window.player = this.player;
    
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.delayOneSec , callbackScope: this, loop: false });
    
     this.anims.create({
		key:'fireAnim',
		frames:this.anims.generateFrameNumbers('fire',
		{ start:0, end:3 }),
		frameRate:10,
		repeat:-1
    });
    
    this.anims.create({
		key:'up',
		frames:this.anims.generateFrameNumbers('girl',
		{ start:0, end:8 }),
		frameRate:10,
		repeat:-1
    });

    this.anims.create({
		key:'left',
		frames:this.anims.generateFrameNumbers('girl',
		{ start:9, end:17 }),
		frameRate:10,
		repeat:-1
    });

    this.anims.create({
		key:'down',
		frames:this.anims.generateFrameNumbers('girl',
		{ start:18, end:26 }),
		frameRate:10,
		repeat:-1
    });

	
    // this.enemy1 = this.physics.add.sprite(fire1.x, fire1.y, 'fire').play('fireAnim');
    // this.enemy2 = this.physics.add.sprite(fire2.x, fire2.y, 'fire').play('fireAnim');
    // this.enemy3 = this.physics.add.sprite(fire3.x, fire3.y, 'fire').play('fireAnim');
    // this.enemy4 = this.physics.add.sprite(fire4.x, fire4.y, 'fire').play('fireAnim');
    
    // this.physics.add.overlap(this.player, this.enemy1, this.hitFire, null, this )
    // this.physics.add.overlap(this.player, this.enemy2, this.hitFire, null, this )
    // this.physics.add.overlap(this.player, this.enemy3, this.hitFire, null, this )
    // this.physics.add.overlap(this.player, this.enemy4, this.hitFire, null, this )


    this.fireGroup = this.physics.add.group({
        key: 'fire',
        repeat: 4,
        setXY: { x: 700, y: 150, stepX: 100}
    })

    this.fireGroup2 = this.physics.add.group({
        key: 'fire',
        repeat: 4,
        setXY: { x: 700, y: 550, stepX: 100}
    })

    this.fireGroup.children.iterate( fire => fire.play('fireAnim'))
    this.fireGroup2.children.iterate( fire => fire.play('fireAnim'))
    
    // Fire cannot collider wih each other
    this.physics.add.collider(this.fireGroup, this.fireGroup);
    this.physics.add.collider(this.fireGroup2, this.fireGroup2);
    this.physics.add.collider(this.fireGroup, this.fireGroup2);

    this.physics.add.collider(this.groundLayer, this.fireGroup);
    this.physics.add.collider(this.groundLayer, this.fireGroup2);

    this.physics.add.overlap(this.player, this.fireGroup, this.hitFire, null, this )
    this.physics.add.overlap(this.player, this.fireGroup2, this.hitFire, null, this )

    
    this.itemLayer.setTileIndexCallback(7, this.removeItem, this);
    this.itemLayer.setTileIndexCallback(4, this.removeItem, this);

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({walls:true})
    this.groundLayer.setCollisionByProperty({pillars:true})

    // this.playerwill collide with the level tiles 
    this.physics.add.collider(this.itemLayer, this.player);
    this.physics.add.collider(this.groundLayer, this.player);


    
    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');

    // this text will show the score
    var text = this.add.text(20, 570, '0', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    text.setScrollFactor(0);

    // vJoystick
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 100,
        y: 400,
        radius: 50,
        base: this.add.circle(0, 0, 50, 0x888888),
        thumb: this.add.circle(0, 0, 25, 0xcccccc),
        // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        // forceMin: 16,
        // enable: true
    })
    .on('update', this.dumpJoyStickState, this);

    this.text = this.add.text(10, 500);
    this.dumpJoyStickState();

/////////////////////////////////
} // end of create()


update(time, delta) {
    
        this.fireGroup.children.iterate(fire => {
            this.physics.moveToObject(fire, this.player, 30, 3000)
        })

        this.fireGroup2.children.iterate(fire => {
            this.physics.moveToObject(fire, this.player, 30, 3000)
        })


    this.leftZone = 
       new Phaser.Geom.Rectangle( this.leftZone.x, this.leftZone.y, this.leftZone.width, this.leftZone.height );

    if ( this.leftZone.contains( this.player.x + this.player.width/2, this.player.y + this.player.height/2 ) ) {
        console.log('left zone')
    }

} // end of update()

dumpJoyStickState() {
    this.cursorKeys = this.joyStick.createCursorKeys();
    var s = 'Key down: ';
    for (var name in this.cursorKeys) {
        if (this.cursorKeys[name].isDown) {
            s += name + ' ';
        }
    }

    if ( this.cursorKeys.down.isDown ) {
        this.player.body.setVelocityY(200);  
        this.player.anims.play('down', true); 
    } else if ( this.cursorKeys.up.isDown ) {
        this.player.body.setVelocityY(-200); 
        this.player.anims.play('up', true); 
    } else if ( this.cursorKeys.left.isDown ) {
        this.player.body.setVelocityX(-200);  
        this.player.anims.play('left', true); 
        this.player.flipX = false; 
    } else if ( this.cursorKeys.right.isDown ) {
        this.player.body.setVelocityX(200); 
        this.player.anims.play('left', true); 
        this.player.flipX = true;  
    } else {
        this.player.body.setVelocity(0);
    }

    s += '\n';
    s += ('Force: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
    s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
    this.text.setText(s);
}

delayOneSec() {
    console.log('1 sec later...adjust body size')
    this.player.body.setSize( 28, 50 );
    //this.player.body.setOffset(8,8)
}

// this function will be called when the this.playertouches a coin
hitFire(player, fire) {
    console.log('Hit fire!!!');
    this.cameras.main.shake(200);
    fire.disableBody(true,true); // remove fire
    return false;
}

removeItem(player, tile) {
    console.log('remove item', tile.index );
    this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
    return false;
}

}  // end of class