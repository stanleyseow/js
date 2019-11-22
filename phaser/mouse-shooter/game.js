//create scene object
var scene1=new Scene();

//create config for game object
var config={
    type:Phaser.AUTO,
    width:768,
    height:512,
    scene:scene1,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:0}
        }
    }
};
//create phaser game
var game=new Phaser.Game(config);