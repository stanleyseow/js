new Vue({
    el: '#app',
    data: {
        width: 400,
        height: 400,
        color: [255,0,0],
        posX: 200,
        posY: 200,
        speed: 20
      },
    methods: {
      setup(p5) {
        p5.createCanvas(this.width, this.height);
      },
      draw(p5) {
          p5.background(this.color);
          this.currentTime = Date.now();
          //p5.text(this.currentTime,50,50);
          p5.ellipse(this.posX,this.posY,50);

          this.posX = this.posX + this.speed;

          if ( this.posX > this.width ) {
                this.speed = -20;
          } else if ( this.posX < 0 ) {
            this.speed = 20;
          }
      },
      keypressed(p5){
      }
    }
  });