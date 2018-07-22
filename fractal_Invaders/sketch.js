var pxSize = 3; // resolution of each Invader (in pixels)
var invSize = 5; // must be an odd number!
var halfAxis = (invSize - 1) / 2; // fixes a middle vertical simmetry

function setup() {
    createCanvas(300, 300);
    frameRate(2);
}

function draw() {
    background(200);
    scale(8);
    translate(10,10);
    //push();
    genInvaders();
    //pop();
}

function genInvaders() {
    for (var xx = halfAxis * pxSize; xx >= 0; xx -= pxSize) {
        for (var yy = 0; yy < invSize * pxSize; yy += pxSize) {
      
            var n = parseInt(random(0, 10));
            //console.log('n = ' + n);
            //console.log('xx yy = ' + xx + ',' + yy);

            if ((n % 2) == 0) {
                fill(0);

                rect(xx, yy, pxSize, pxSize);
                if (xx !== parseInt(halfAxis * pxSize)) {
                    rect(2 * halfAxis * pxSize - xx, yy, pxSize, pxSize);
                }
            }
        }
    }



}
