window.onload = function() {

    // object containing configuration options
    let config = {
        type: Phaser.AUTO,
        parent	: 'phaser-app',
        width: 750,
        height: 460,
    
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 600},
                debug: false
            }
        },
    
        //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
        scene: [mainScene, storyScene, story2Scene, story3Scene, story4Scene, story5Scene, insScene, 
            goScene, goScene2, goScene3, goScene4, goScene5,
            level1Scene,level2Scene, level3Scene,level4Scene, level5Scene,
            youWonScene, endScene]
    
    };
    game = new Phaser.Game(config);
}


let game = new Phaser.Game(config);


function resizeApp ()
{
    // Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
    let game_ratio = 360 / 640;
	
    // Make div full height of browser and keep the ratio of game resolution
    let div = document.getElementById('phaser-app');
    div.style.width = (window.innerHeight * game_ratio) + 'px';
    div.style.height = window.innerHeight + 'px';
	
    // Check if device DPI messes up the width-height-ratio
    let canvas	= document.getElementsByTagName('canvas')[0];
	
    let dpi_w	= parseInt(div.style.width) / canvas.width;
    let dpi_h	= parseInt(div.style.height) / canvas.height;		
	
    let height	= window.innerHeight * (dpi_w / dpi_h);
    let width	= height * game_ratio;
	
    // Scale canvas	
    canvas.style.width	= width + 'px';
    canvas.style.height	= height + 'px';
}

window.addEventListener('resize', resizeApp);