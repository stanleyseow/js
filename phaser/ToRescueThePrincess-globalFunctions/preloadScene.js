class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

    preload() {

       
        // // chars
        this.load.atlas('left', 'assets/knight_walk_left.png', 'assets/knight_walk_left.json');
        this.load.atlas('right', 'assets/knight_walk_right.png', 'assets/knight_walk_right.json');
        this.load.atlas('up', 'assets/knight_walk_up.png', 'assets/knight_walk_up.json');
        this.load.atlas('down', 'assets/knight_walk_down.png', 'assets/knight_walk_down.json');

        this.load.atlas('guardleft', 'assets/guard_walk_left.png', 'assets/guard_walk_left.json');
        this.load.atlas('guardright', 'assets/guard_walk_right.png', 'assets/guard_walk_right.json');
        this.load.atlas('guardup', 'assets/guard_walk_up.png', 'assets/guard_walk_up.json');
        this.load.atlas('guarddown', 'assets/guard_walk_down.png', 'assets/guard_walk_down.json');

        this.load.atlas('guardleftanim', 'assets/guard_left_anim.png', 'assets/guard_left_anim.json');

        this.load.atlas('princess', 'assets/princess.png', 'assets/princess.json');

        this.load.image("introjpg","assets/intro.jpg")

      this.load.audio("ding","assets/ding.mp3");
      this.load.audio("bgmusic","assets/bg_music.mp3");
      this.load.audio("preloadmusic","assets/preloadmusic.mp3");
      this.load.audio("hit","assets/hit.mp3");
      this.load.audio("dooropen","assets/doorOpen.mp3");
      this.load.audio("win","assets/win.mp3");
      this.load.audio("smallhit","assets/smallhit.mp3");
      this.load.audio("lose","assets/lose.mp3");
      this.load.audio("shoot1","assets/shoot1.mp3");
      
      this.load.spritesheet('knifeImg', 'assets/knife-32x32.png', {frameWidth: 32, frameHeight: 32});


    } // end of preload //

    create () {

      this.dingSnd = this.sound.add("ding").setVolume(3);
      this.hitSnd = this.sound.add("hit").setVolume(3);
      this.smallhitSnd = this.sound.add("smallhit").setVolume(2);
      this.dooropenSnd = this.sound.add("dooropen").setVolume(0.5);
      this.winSnd = this.sound.add("win").setVolume(0.2);
      this.loseSnd = this.sound.add("lose").setVolume(1);
      this.shoot1Snd = this.sound.add("shoot1").setVolume(2);

      this.add.image (320,320,'introjpg')
      this.music = this.sound.add("bgmusic",{loop: true}).setVolume(0.06);
      // this.music = this.sound.add("preloadmusic",{loop: true}).setVolume(0.06);

      this.music.play();

      this.anims.create({
        key: "knifeAnim",
        frames: this.anims.generateFrameNumbers("knifeImg", { start: 0, end: 15 }),
        frameRate: 20,
        repeat: -1,
      });


        this.anims.create({ 
            key:'left', 
           frames:[ 
              {key:'left',frame:'knight_14'},
              {key:'left',frame:'knight_15'}, 
              {key:'left',frame:'knight_16'},         
              {key:'left',frame:'knight_17'},
              {key:'left',frame:'knight_18'},
              {key:'left',frame:'knight_19'},
              {key:'left',frame:'knight_20'},
              {key:'left',frame:'knight_21'},
              {key:'left',frame:'knight_22'},
              {key:'left',frame:'knight_23'},
              {key:'left',frame:'knight_24'},
              {key:'left',frame:'knight_25'},
              {key:'left',frame:'knight_26'},
           
           ],
           frameRate:10,
           repeat:-1
           });
    
           this.anims.create({ 
            key:'right', 
           frames:[ 
              {key:'right',frame:'knight_01'},
              {key:'right',frame:'knight_02'}, 
              {key:'right',frame:'knight_03'},         
              {key:'right',frame:'knight_04'},
              {key:'right',frame:'knight_05'},
              {key:'right',frame:'knight_06'},
              {key:'right',frame:'knight_07'},
              {key:'right',frame:'knight_08'},
              {key:'right',frame:'knight_09'},
              {key:'right',frame:'knight_10'},
              {key:'right',frame:'knight_11'},
              {key:'right',frame:'knight_12'},
              {key:'right',frame:'knight_13'},
           
           ],
           frameRate:10, 
           repeat:-1
           });
    
           this.anims.create({ 
            key:'up', 
           frames:[ 
            {key:'up',frame:'knight_34'},
               {key:'up',frame:'knight_35'}, 
               {key:'up',frame:'knight_36'},         
            {key:'up',frame:'knight_37'},
               {key:'up',frame:'knight_38'},
               {key:'up',frame:'knight_39'},
               {key:'up',frame:'knight_40'},
               
           
           ],
           frameRate:10,
           repeat:-1
           });
    
           this.anims.create({ 
            key:'down', 
           frames:[ 
            {key:'down',frame:'knight_27'},
               {key:'down',frame:'knight_28'}, 
               {key:'down',frame:'knight_29'},         
            {key:'down',frame:'knight_30'},
               {key:'down',frame:'knight_31'},
               {key:'down',frame:'knight_32'},
               {key:'down',frame:'knight_33'},
               
           
           ],
           frameRate:10,
           repeat:-1
           });

           this.anims.create({
            key: "guardleftAnim",
            frames: [
              { key: "guardleft", frame: "guard_1" },
              { key: "guardleft", frame: "guard_2" },
              { key: "guardleft", frame: "guard_3" },
              { key: "guardleft", frame: "guard_4" },
              { key: "guardleft", frame: "guard_5" },
              { key: "guardleft", frame: "guard_6" },
              { key: "guardleft", frame: "guard_7" },
              { key: "guardleft", frame: "guard_8" },
              { key: "guardleft", frame: "guard_9" },
              { key: "guardleft", frame: "guard_10" },
              { key: "guardleft", frame: "guard_11" },
              { key: "guardleft", frame: "guard_12" },
              { key: "guardleft", frame: "guard_13" }
            ],
            frameRate: 10,
            repeat: -1,
          });

          this.anims.create({
            key: "guardrightAnim",
            frames: [
              { key: "guardright", frame: "guard_14" },
              { key: "guardright", frame: "guard_15" },
              { key: "guardright", frame: "guard_16" },
              { key: "guardright", frame: "guard_17" },
              { key: "guardright", frame: "guard_18" },
              { key: "guardright", frame: "guard_19" },
              { key: "guardright", frame: "guard_20" },
              { key: "guardright", frame: "guard_21" },
              { key: "guardright", frame: "guard_22" },
              { key: "guardright", frame: "guard_23" },
              { key: "guardright", frame: "guard_24" },
              { key: "guardright", frame: "guard_25" },
              { key: "guardright", frame: "guard_26" }
            ],
            frameRate: 10,
            repeat: -1,
          });

          this.anims.create({
            key: "guardupAnim",
            frames: [
              { key: "guardup", frame: "guard_34" },
              { key: "guardup", frame: "guard_35" },
              { key: "guardup", frame: "guard_36" },
              { key: "guardup", frame: "guard_37" },
              { key: "guardup", frame: "guard_38" },
              { key: "guardup", frame: "guard_39" },
              { key: "guardup", frame: "guard_40" }
              
            ],
            frameRate: 10,
            repeat: -1,
          });

          this.anims.create({
            key: "guarddownAnim",
            frames: [
              { key: "guarddown", frame: "guard_27" },
              { key: "guarddown", frame: "guard_28" },
              { key: "guarddown", frame: "guard_29" },
              { key: "guarddown", frame: "guard_30" },
              { key: "guarddown", frame: "guard_31" },
              { key: "guarddown", frame: "guard_32" },
              { key: "guarddown", frame: "guard_33" }
              
            ],
            frameRate: 10,
            repeat: -1,
          });

          this.anims.create({ 
            key:'guardleftanims', 
           frames:[ 
            {key:'guardleftanim',frame:'Asset 133'},
               {key:'guardleftanim',frame:'Asset 134'}, 
              
           
           ],
           frameRate:2, 
           repeat:-1
           });

          this.anims.create({ 
            key:'princess', 
           frames:[ 
            {key:'princess',frame:'Asset 138'},
               {key:'princess',frame:'Asset 139'}, 
              
           
           ],
           frameRate:2, 
           repeat:-1
           });

          this.add.sprite(450, 500, "guardleftanim").play("guardleftanims").setScale(0.9);
        //   this.add.sprite(100, 100, "guardright").play("guardleftAnim").setScale(1);
        //   this.add.sprite(100, 100, "guardup").play("guardleftAnim").setScale(1);
        //   this.add.sprite(100, 100, "guarddown").play("guardleftAnim").setScale(1);


        console.log("preloadScene")
        // this.add.text(70,280, 'TO RESCUE THE PRINCESS', 
        //     { font: '40px Rakkas', fill: '#ffffff' });

        this.add.text(205,195, 'Press SPACEBAR to start the game', 
            { font: '17px Rakkas', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            
            let playerPos = {};
            playerPos.x = 30
            playerPos.y = 260
            playerPos.dir = "right"
            this.scene.start("world",{playerPos: playerPos});
            }, this );
            

    }
} /// end of preloadScene class ///

window.key = 0
window.heart = 3
