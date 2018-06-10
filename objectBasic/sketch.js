var bee1 = new Bee(0, 0, 30, 'red');
var bee2 = new Bee(-50, -50, 30, 'green');
var bee3 = new Bee(100, 100, 30, 'blue');


function setup() {
    createCanvas(600, 600)


}

function draw() {
    //background(200);
    bee1.move();
    bee1.display();

    bee2.move();
    bee2.display();

    bee3.move();
    bee3.display();
}

// Object constructor , blueprint of a house
function Bee(x, y, size, colour) {
    this.x = x; // property of x
    this.y = y; // property of y
    this.size = size; // property of size


    // move methods
    this.move = function () {
        this.x = x + random(100, 400);
        this.y = y + random(100, 400);
    }

    // display methods

    this.display = function () {
        if (colour == 'red') {
            r = 255;
            g = 0;
            b = 0;
        } else if (colour == 'green') {
            r = 0;
            g = 255;
            b = 0;

        } else if (colour == 'blue') {
            r = 0;
            g = 0;
            b = 255;
        }
        fill(r, g, b);
        ellipse(this.x, this.y, this.size, this.size);
    }

}
