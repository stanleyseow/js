import Phaser, { Game } from 'phaser';
import { WIDTH, HEIGHT } from './constants/config';
import Init from './scenes/Init';
import Town from './scenes/Town';
import House_1 from './scenes/House-1';
import House_2 from './scenes/House-2';

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [Init, Town, House_1, House_2],
};

const game = new Game(config);
