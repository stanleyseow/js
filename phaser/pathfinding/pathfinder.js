class pathfinder extends Phaser.Scene {

    constructor() {
        super({ key: 'pathfinder' });
    }

    preload() {
        this.load.image('tileset', 'assets/gridtiles.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.image('phaserguy', 'assets/phaserguy.png');
    };

    create() {
        // Handles the clicks on the map to make the character move
        this.input.on('pointerup', this.handleClick, this);

        //this.camera = this.cameras.main;
        this.cameras.main.setBounds(0, 0, 20 * 32, 20 * 32);

        this.player = this.add.sprite(32, 32, 'phaserguy').setDepth(1).setOrigin(0, 0.5);
        console.log('player: ', this.player)

        this.cameras.main.startFollow(this.player);

        // Display map
        this.map = this.make.tilemap({ key: 'map' });
        // The first parameter is the name of the tileset in Tiled and 
        // the second parameter is the key
        // of the tileset image used when loading the file in preload.
        var tiles = this.map.addTilesetImage('tiles', 'tileset');
        this.map.createLayer(0, tiles, 0, 0);

        // marker that will follow the mouse
        this.marker = this.add.graphics();
        this.marker.lineStyle(3, 0xffffff, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

        // ### Pathfinding stuff ###
        // Initializing the pathfinder


        // We create the 2D array representing all the tiles of our map
        var grid = [];
        for (var y = 0; y < this.map.height; y++) {
            var col = [];
            for (var x = 0; x < this.map.width; x++) {
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                col.push(this.getTileID(x, y));
            }
            grid.push(col);
        }
        game.finder.setGrid(grid);

        var tileset = this.map.tilesets[0];
        var properties = tileset.tileProperties;
        var acceptableTiles = [];

        // We need to list all the tile IDs that can be walked on. Let's iterate over all of them
        // and see what properties have been entered in Tiled.
        for (var i = tileset.firstgid - 1; i < tiles.total; i++) { // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
            if (!properties.hasOwnProperty(i)) {
                // If there is no property indicated at all, it means it's a walkable tile
                acceptableTiles.push(i + 1);
                continue;
            }
            if (!properties[i].collide) acceptableTiles.push(i + 1);
            if (properties[i].cost) game.finder.setTileCost(i + 1, properties[i].cost); // If there is a cost attached to the tile, let's register it
        }
        game.finder.setAcceptableTiles(acceptableTiles);

        var spaceDown = this.input.keyboard.addKey('SPACE');
        spaceDown.on('down', function () {
            this.moveCharacter(this.globalPath)
        }, this);

    };

    update() {
        var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        // Rounds down to nearest tile
        var pointerTileX = this.map.worldToTileX(worldPoint.x);
        var pointerTileY = this.map.worldToTileY(worldPoint.y);
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);
        this.marker.setVisible(!this.checkCollision(pointerTileX, pointerTileY));
    };

    checkCollision(x, y) {
        var tile = this.map.getTileAt(x, y);
        return tile.properties.collide == true;
    };

    getTileID(x, y) {
        var tile = this.map.getTileAt(x, y);
        return tile.index;
    };

    handleClick(pointer) {
        console.log('handleClick this: ', this)
        var x = this.cameras.main.scrollX + pointer.x;
        var y = this.cameras.main.scrollY + pointer.y;
        var toX = Math.floor(x / 32);
        var toY = Math.floor(y / 32);
        var fromX = Math.floor(this.player.x / 32);
        var fromY = Math.floor(this.player.y / 32);
        console.log('going from (' + fromX + ',' + fromY + ') to (' + toX + ',' + toY + ')');

        console.log('this.player: ', this.player)
        game.player = this.player
        console.log('this.map.tileWidth', this.map.tileWidth)
        console.log('this.map.tileHeight', this.map.tileHeight)

        game.finder.findPath(fromX, fromY, toX, toY, function (path) {
            console.log('path in findPath: ', path);
            if (path === null) {
                console.warn("Path was not found.");
            } else {
                console.log('game.player: ', game.player)
                this.moveCharacter(path, game.player)
            }
        }.bind(this))
        game.finder.calculate(); // don't forget, otherwise nothing happens

    };

    moveCharacter(path, player) {
            // Sets up a list of tweens, one for each tile to walk, that will be chained 
            // by the timeline
            console.log('moveCharacter()', this)

            var tweenArr = [];
            for (var i = 0; i < path.length - 1; i++) {
                var ex = path[i + 1].x;
                var ey = path[i + 1].y;
                tweenArr.push({
                    targets: game.player,
                    x: { value: ex * 32, duration: 200 },
                    y: { value: ey * 32, duration: 200 }
                });
            }

            console.log(tweenArr)

            this.tweens.timeline({
                tweens: tweenArr
            });
        };


}class pathfinder extends Phaser.Scene {

    constructor() {
        super({ key: 'pathfinder' });
    }

    preload() {
        this.load.image('tileset', 'assets/gridtiles.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.image('phaserguy', 'assets/phaserguy.png');
    };

    create() {
        // Handles the clicks on the map to make the character move
        this.input.on('pointerup', this.handleClick, this);

        //this.camera = this.cameras.main;
        this.cameras.main.setBounds(0, 0, 20 * 32, 20 * 32);

        this.player = this.add.sprite(32, 32, 'phaserguy').setDepth(1).setOrigin(0, 0.5);
        console.log('player: ', this.player)

        this.cameras.main.startFollow(this.player);

        // Display map
        this.map = this.make.tilemap({ key: 'map' });
        // The first parameter is the name of the tileset in Tiled and 
        // the second parameter is the key
        // of the tileset image used when loading the file in preload.
        var tiles = this.map.addTilesetImage('tiles', 'tileset');
        this.map.createLayer(0, tiles, 0, 0);

        // marker that will follow the mouse
        this.marker = this.add.graphics();
        this.marker.lineStyle(3, 0xffffff, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

        // ### Pathfinding stuff ###
        // Initializing the pathfinder


        // We create the 2D array representing all the tiles of our map
        var grid = [];
        for (var y = 0; y < this.map.height; y++) {
            var col = [];
            for (var x = 0; x < this.map.width; x++) {
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                col.push(this.getTileID(x, y));
            }
            grid.push(col);
        }
        game.finder.setGrid(grid);

        var tileset = this.map.tilesets[0];
        var properties = tileset.tileProperties;
        var acceptableTiles = [];

        // We need to list all the tile IDs that can be walked on. Let's iterate over all of them
        // and see what properties have been entered in Tiled.
        for (var i = tileset.firstgid - 1; i < tiles.total; i++) { // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
            if (!properties.hasOwnProperty(i)) {
                // If there is no property indicated at all, it means it's a walkable tile
                acceptableTiles.push(i + 1);
                continue;
            }
            if (!properties[i].collide) acceptableTiles.push(i + 1);
            if (properties[i].cost) game.finder.setTileCost(i + 1, properties[i].cost); // If there is a cost attached to the tile, let's register it
        }
        game.finder.setAcceptableTiles(acceptableTiles);

        var spaceDown = this.input.keyboard.addKey('SPACE');
        spaceDown.on('down', function () {
            this.moveCharacter(this.globalPath)
        }, this);

    };

    update() {
        var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        // Rounds down to nearest tile
        var pointerTileX = this.map.worldToTileX(worldPoint.x);
        var pointerTileY = this.map.worldToTileY(worldPoint.y);
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);
        this.marker.setVisible(!this.checkCollision(pointerTileX, pointerTileY));
    };

    checkCollision(x, y) {
        var tile = this.map.getTileAt(x, y);
        return tile.properties.collide == true;
    };

    getTileID(x, y) {
        var tile = this.map.getTileAt(x, y);
        return tile.index;
    };

    handleClick(pointer) {
        console.log('handleClick this: ', this)
        var x = this.cameras.main.scrollX + pointer.x;
        var y = this.cameras.main.scrollY + pointer.y;
        var toX = Math.floor(x / 32);
        var toY = Math.floor(y / 32);
        var fromX = Math.floor(this.player.x / 32);
        var fromY = Math.floor(this.player.y / 32);
        console.log('going from (' + fromX + ',' + fromY + ') to (' + toX + ',' + toY + ')');

        console.log('this.player: ', this.player)
        game.player = this.player
        console.log('this.map.tileWidth', this.map.tileWidth)
        console.log('this.map.tileHeight', this.map.tileHeight)

        game.finder.findPath(fromX, fromY, toX, toY, function (path) {
            console.log('path in findPath: ', path);
            if (path === null) {
                console.warn("Path was not found.");
            } else {
                console.log('game.player: ', game.player)
                moveCharacter(path, game.player)
            }
        });
        game.finder.calculate(); // don't forget, otherwise nothing happens


        function moveCharacter(path, player) {
            // Sets up a list of tweens, one for each tile to walk, that will be chained 
            // by the timeline
            console.log('moveCharacter()')

            var tweenArr = [];
            for (var i = 0; i < path.length - 1; i++) {
                var ex = path[i + 1].x;
                var ey = path[i + 1].y;
                tweenArr.push({
                    targets: game.player,
                    x: { value: ex * 32, duration: 200 },
                    y: { value: ey * 32, duration: 200 }
                });
            }

            console.log(tweenArr)

            game.scene.scenes[0].tweens.timeline({
                tweens: tweenArr
            });
        };

    };




}