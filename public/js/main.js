
import TitleScene from './titleScene.js'
import SponckGame from './game.js'

let titleScene = new TitleScene();
let sponckGame = new SponckGame();


var config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: 600,
	physics: {
		default: 'arcade',
	},
	scene: [TitleScene,SponckGame]
	
};

let game = new Phaser.Game(config);
// game.scene.add('TitleScene', titleScene);
// game.scene.start('TitleScene');

// game.scene.add('SponckGame', sponckGame);