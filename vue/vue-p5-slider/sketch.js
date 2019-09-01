// Using p5 as a VUE components
// All variables are at data objects
// Use this.width/this.height for p5
// components

new Vue({
  el: "#app",
	data: {
		width: 400,
		height: 400,
		color: [255, 200, 0],
		x: 200,
    y: 200,
    font: ''
	},
	methods: {

    preload(p5) {
      this.font = p5.loadFont('NeutraText-Bold.otf');
    },
		setup(p5) {
			p5.createCanvas(this.width, this.height);
      p5.textFont(this.font);
      p5.textSize(100);
      p5.textStyle('BOLD');
      p5.ellipseMode('CENTER');
		},
		draw(p5) {
			p5.background(this.color);
			p5.noStroke();
      p5.fill('black');
      p5.text('JS', 280, 380)
      p5.ellipse(this.x-50, this.y-50, 100);
      
      p5.stroke(255);
      p5.line(0, 0, p5.mouseX, p5.mouseY);


		},
		keypressed(p5) {
		},
		mouseclicked(p5) {
		}
	}
});