var config = {
	type:Phaser.AUTO,
	width: window.innerWidthh,
	height: 600,
	physics: {
		default: 'arcade',
	},
	scene: [Game]
};

var mainGame = new Phaser.Game(config);















// import TitleScene from './scenes/titleScene';

// let titleScene = new TitleScene();

// let config = {
//     type: Phaser.AUTO,
//     width: window.innerWidth,
//     height: 600,
    
// };

// let game = new Phaser.game(config);

// game.scene.add('TitleScene',titleScene);
// game.scene.start('TitleScene');