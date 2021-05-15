var stats;
var rowCount;

var country = [];
var year2 = [];
var capital = []
var pop = [];

function preload() {
    // Pull csv files from another site
    stats = loadTable(
        "https://raw.githubusercontent.com/stanleyseow/js/gh-pages/data/CapitalCityPop.csv",
        "csv",
        "header"
    );
}

function setup() {
    createCanvas(800, 400);
    rowCount = stats.getRowCount();

    for (let i = 0; i < rowCount; i++) {
        country[i] = stats.getString(i, 0);
        year2[i] = stats.getNum(i, 1);
        capital[i] = stats.getString(i, 2);
        pop[i] = stats.getNum(i, 3);

    }

}

function draw() {
    background(255);
    strokeWeight(1);
    for (let i = 0; i < rowCount; i++) {
        var yr2005 = 0;
        var yr2010 = 0;
        var yr2018 = 0;

    if (year2[i] == 2005) {
            yr2005 = pop[i];
            console.log('2005: ', capital[i], year2[i], pop[i]);
            stroke('magenta');
            line(i*3,height-0,i*3,height-pop[i]);
        }
        
        if (year2[i] == 2010) {
            yr2010 = pop[i];
            console.log('2010: ', capital[i], year2[i], pop[i]);
            stroke('green');
            line(i*3+1,height-0,i*3+1,height-pop[i]);
        }
        if (year2[i] == 2018) {
            yr2018 = pop[i];
            console.log('2018: ', capital[i], year2[i], pop[i]);
            stroke('blue');
            line(i*3+2,height-0,i*3+2,height-pop[i]);


        }
                    
            console.log('Growth %: ', ((yr2018 - yr2010) / yr2010) * 100);


    }
    console.log("Row Count = " + rowCount);
    noLoop();
}
