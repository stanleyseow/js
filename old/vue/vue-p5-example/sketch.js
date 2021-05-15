new Vue({
        el: '#app',
    data: () => ({
      red: 0,
      green: 255,
      // blue color is a computed property that changes over time
      lines: [],
      p5LogoImage: null,
      startTime: Date.now(),
      // store current time in data to force computed properties to update
      currentTime: Date.now(),
    }),
    computed: {
      msSinceStart() {
        return this.currentTime - this.startTime;
      },
      blue() {
        return Math.floor(this.msSinceStart * 0.03) % 255;
      },
      p5LogoRotationAngle() {
        return this.msSinceStart * 0.0001 % Math.PI * 2;
      }
    },
    methods: {
      preload(sketch) {
        this.p5LogoImage = sketch.loadImage("p5js.png");
      },
      setup(sketch) {
        sketch.createCanvas(400, 400);
      },
      draw(sketch) {
        this.currentTime = Date.now();
  
        const { red, green, blue } = this;
        sketch.background(red, green, blue);
  
        const logoWidth = sketch.width / 3;
        const logoHeight = sketch.height / 3;
  
        // logo should be in the middle of the screen and rotated
        sketch.translate(sketch.width / 2, sketch.height / 2);
        sketch.rotate(this.p5LogoRotationAngle);
        sketch.image(this.p5LogoImage, -logoWidth / 2, -logoHeight/2, logoWidth, logoHeight);
        sketch.resetMatrix();
  
        for (let line of this.lines) {
          sketch.stroke(line.color);
          sketch.line(line.pmouseX, line.pmouseY, line.mouseX, line.mouseY);
        }
      },
      keyPressed({ keyCode }) {
        // 'g' key
        if (keyCode === 71) {
          this.toggleGreen();
        }
      },
      mouseMoved({ mouseX, mouseY, pmouseX, pmouseY }) {
        this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 0 });
      },
      mouseDragged({ mouseX, mouseY, pmouseX, pmouseY }) {
        this.pushLine({ mouseX, mouseY, pmouseX, pmouseY, color: 255 });
      },
      toggleRed() {
        this.red = 255 - this.red;
      },
      toggleGreen() {
        this.green = 255 - this.green;
      },
      pushLine(line) {
        let lines = this.lines;
        lines.push(line);
        this.lines = lines.slice(-100);
      }
    }
  });