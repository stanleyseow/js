
class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
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
    
    this.timedEvent = this.time.addEvent({ delay: 100, callback: this.delayOneSec , callbackScope: this, loop: false });
    
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

	
    this.enemy1 = this.physics.add.sprite(fire1.x, fire1.y, 'fire').play('fireAnim');
    this.enemy2 = this.physics.add.sprite(fire2.x, fire2.y, 'fire').play('fireAnim');
    this.enemy3 = this.physics.add.sprite(fire3.x, fire3.y, 'fire').play('fireAnim');
    this.enemy4 = this.physics.add.sprite(fire4.x, fire4.y, 'fire').play('fireAnim');

    //this.itemLayer.setCollisionByProperty({item3:true})
    
    this.itemLayer.setTileIndexCallback(7, this.removeItem, this);
    this.itemLayer.setTileIndexCallback(4, this.removeItem, this);

    // the this.player will collide with this layer
    this.groundLayer.setCollisionByProperty({walls:true})
    this.groundLayer.setCollisionByProperty({pillars:true})

    // this.playerwill collide with the level tiles 
    this.physics.add.collider(this.itemLayer, this.player);
    this.physics.add.collider(this.groundLayer, this.player);

    this.physics.add.overlap(this.player, this.enemy1, this.hitFire, null, this )
    this.physics.add.overlap(this.player, this.enemy2, this.hitFire, null, this )
    this.physics.add.overlap(this.player, this.enemy3, this.hitFire, null, this )
    this.physics.add.overlap(this.player, this.enemy4, this.hitFire, null, this )
    
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
}

delayOneSec() {
    console.log('100 msec later...adjust body size')
    this.player.body.setSize( 28, 50 );
}

// this function will be called when the this.playertouches a coin
hitFire(player, fire) {
    console.log('hit fire at ', fire.x, fire.y);
    fire.disableBody(true,true); // remove fire
    return false;
}

removeItem(player, tile) {
    console.log('remove item', tile.index );
    this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
    return false;
}

update(time, delta) {

    if ( this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play('left', true); // walk left
        this.player.flipX = false; // flip the sprite to the left
        //console.log('left');
    } else if ( this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(200);
        this.player.anims.play('left', true);
        this.player.flipX = true; // use the original sprite looking to the right
        //console.log('right');
    } else if ( this.cursors.up.isDown )
    {
        this.player.body.setVelocityY(-200);  
        this.player.anims.play('up', true);
        //console.log('up');  
    } else if ( this.cursors.down.isDown )
    {
        this.player.body.setVelocityY(200);  
        this.player.anims.play('down', true);  
        //console.log('down');
    } else {
        this.player.anims.stop();
        this.player.body.setVelocity(0,0); 
        //console.log('idle');
    }

    this.leftZone = 
       new Phaser.Geom.Rectangle( this.leftZone.x, this.leftZone.y, this.leftZone.width, this.leftZone.height );

    if ( this.leftZone.contains( this.player.x + this.player.width/2, this.player.y + this.player.height/2 ) ) {
        console.log('left zone')
    }

}

}  // end of class