class world extends Phaser.Scene {

    constructor() {
        super({
            key: 'world'
        });

        // Put global variable here
    }

    // incoming data from scene below
    init(data) {

    }

    preload() {

    }

    create() {

        console.log('*** world scene');

        let map = this.make.tilemap({
            key: 'world'
        });

        // Load the game tiles 
        // 1st parameter is name in Tiled, 
        // 2nd parameter is key in Preload
        let brickTiles = map.addTilesetImage('bricks', 'bricksPng');
        let containerTiles = map.addTilesetImage('container', 'containerPng');
        let foodTiles = map.addTilesetImage('food', 'foodPng');
        let roofTiles = map.addTilesetImage('roofs', 'roofsPng');
        let terrainTiles = map.addTilesetImage('terrain-map-v8', 'terrainPng');
        let treeTiles = map.addTilesetImage('trees', 'treesPng');
        let accTiles = map.addTilesetImage('vacc', 'accPng');
        let gardenTiles = map.addTilesetImage('vgard', 'gardenPng');
        let houseTiles = map.addTilesetImage('vhouse', 'mansionPng');
        let marketTiles = map.addTilesetImage('vmkt', 'marketPng');
        let streetTiles = map.addTilesetImage('vstreets', 'streetsPng');
        let tenTiles = map.addTilesetImage('vten', 'tenPng');
        let vwindowsTiles = map.addTilesetImage('vwindoors', 'vwindowsPng');
        let windoorsTiles = map.addTilesetImage('windoors', 'windoorsPng');

        let arrayTiles = [ brickTiles,containerTiles,foodTiles, roofTiles, terrainTiles,treeTiles, accTiles,gardenTiles,houseTiles,
                           marketTiles,streetTiles, tenTiles, vwindowsTiles,windoorsTiles ]

        let Trn1 = map.createLayer('Trn_1',arrayTiles , 0, 0).setScale(0.3)
        let Trn2 = map.createLayer('Trn_2',arrayTiles, 0, 0).setScale(0.3)
        let Trn3 = map.createLayer('Trn_3',arrayTiles, 0, 0).setScale(0.3)
        let Building1 = map.createLayer('Bldg_1',arrayTiles, 0, 0).setScale(0.3)
        let Building2 = map.createLayer('Bldg_2',arrayTiles, 0, 0).setScale(0.3)
        let Building3 = map.createLayer('Bldg_3',arrayTiles, 0, 0).setScale(0.3)
        let Building4 = map.createLayer('Bldg_4',arrayTiles, 0, 0).setScale(0.3)
       
    } /////////////////// end of create //////////////////////////////

    update() {


    } /////////////////// end of update //////////////////////////////


} //////////// end of class world ////////////////////////