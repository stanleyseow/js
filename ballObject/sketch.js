var ball1 = new Ball(0, 0, 10, 'red');
var ball2 = new Ball(-50, -50, 20, 'green');
var ball3 = new Ball(100, 100, 50, 'blue');


function setup() {
    createCanvas(600, 600);

}

function draw() {
    //background(200);
    ball1.move();
    ball1.display();

    ball2.move();
    ball2.display();

    ball3.move();
    ball3.display();
}

// Object constructor , blueprint of a house
function Ball(x, y, size, colour) {
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
