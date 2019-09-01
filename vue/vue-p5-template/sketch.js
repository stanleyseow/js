new Vue({
    el: '#app',
    data: {
        width: 400,
        height: 400,
        color: [255,0,0],
        x: 200,
        y: 200,
      },
      computed: {
      },
    methods: {
      preload(p5){
      },
      setup(p5) {
        p5.createCanvas(this.width, this.height);
        p5.frameRate(15);
      },
      draw(p5) {
          p5.background(this.color);
          p5.ellipse(this.x,this.y,100);
          this.x = Math.floor(p5.random(195,205));
          this.y = Math.floor(p5.random(195,205));
      },
      keypressed( {keyCode} ) {
        console.log(keyCode);
         if (keyCode  === 32) {
          console.log('SPACE is pressed');
        }
      }
    }
  });