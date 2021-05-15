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
			this.font = p5.loadFont(
				"https://raw.githubusercontent.com/stanleyseow/js/gh-pages/media/NeutraText-Bold.otf"
			);
		},
		setup(p5) {
			p5.createCanvas(this.width, this.height);
			p5.frameRate(60);
			p5.textFont(this.font);
			p5.textSize(100);
			p5.textStyle("BOLD");
		},
		draw(p5) {
			p5.background(this.color);
			p5.noStroke();
			p5.fill("black");
			p5.textSize(100);
			p5.text("JS", this.x, this.y);
			//p5.rect(this.x, this.y, 50, 50)
		},
		keypressed({ keyCode }) {
			console.log(keyCode);
			if (keyCode === 37) {
				this.x = this.x - 10;
			} else if (keyCode === 39) {
				this.x = this.x + 10;
			} else if (keyCode === 38) {
				this.y = this.y - 10;
			} else if (keyCode === 40) {
				this.y = this.y + 10;
			}
		},
		mouseclicked(p5) {
			this.x = this.x + 10;
		}
	}
});
