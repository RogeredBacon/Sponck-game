// class Game extends Phaser.Scene {

///JS Functions

// constructor(){
// 		super({key: 'Game'});
// 	}

/// Phaser

const gameWindowWidth = window.innerWidth - 5;
const gameWindowHight = window.innerHeight - 5;

const playerState = {
	1: 'Playing',
	2: 'Stunned'
};

let time = Date.now();

let playerLeftLives = ['', '', ''];
let playerRightLives = ['', '', ''];

var config = {
	type: Phaser.AUTO,
	width: gameWindowWidth,
	height: gameWindowHight,
	physics: {
		default: 'arcade'
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

function preload() {
	//function where images are loaded
	this.load.image('ground', 'assets/giphy.gif');
	this.load.image('playerRight', 'assets/player_right.png');
	this.load.image('playerLeft', 'assets/player_left.png');
	this.load.image('ball', 'assets/ball.png', 1, 1);

	this.load.image('blockPink1', 'assets/pink_block_full.png');
	this.load.image('blockPink2', 'assets/pink_block_2.png');
	this.load.image('blockPink3', 'assets/pink_block_3.png');

	this.load.image('blockGreen1', 'assets/green_block_full.png');

	this.load.image('blockYellow1', 'assets/yellow_block_full.png');

	this.load.image('toli','assets/toli.png',10,10)

	this.load.image('heart', 'assets/heart_pixelart.png');

}
Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
};
// Sort out angle randomly but also to prevent soft locks

const arrayX = [-400, -350, -250, 250, 350, 400];
const arrayY = [-100, -300, 300, 100];
const array0to1 = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const blocksNamesArray = ['blockPink1', 'blockGreen1', 'blockYellow1'];

var ball;
var velocityX = arrayX.random();
var velocityY = arrayY.random();
var cursor;
var playerRight;
var playerLeft;

var blockPointPlayer = '';
var scoreRight = 0;
var scoreLeft = 0;
var scoreTextPlayerRight;
var scoreTextPlayerLeft;

//Blocks

var block;

var blockPink1;
var blockPink2;
var blockPink3;

var blockGreen1;

var createBlocksTimer;
let blocksCreated = 0;

//background

var graphics;

function create() {
	// this.add.image(400, 200, 'ground');

	cursor = this.input.keyboard.createCursorKeys();

	this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

	playerRight = this.physics.add.sprite(
		gameWindowWidth - 20,
		gameWindowHight / 2,
		'playerRight'
	);
	playerRight.setCollideWorldBounds(true);
	playerRight.state = playerState[0];

	playerLeft = this.physics.add.sprite(20, gameWindowHight / 2, 'playerLeft');
	playerLeft.setCollideWorldBounds(true);
	playerLeft.state = playerState[0];

	// this.ball = this.add.image(config.width/2 -50, config.height/2,'ball')
	// this.ball.setScale(0.5);
	ball = this.physics.add.sprite(
		gameWindowWidth / 2,
		gameWindowHight / 2,
		'ball'
	);
	ball.width = 250;

	ball.setCollideWorldBounds(true);
	ball.setBounce(1);

	//it do horizontal and vertical movement.
	ball.setVelocityY(velocityY);
	ball.setVelocityX(velocityX);

	this.physics.add.collider(ball, playerLeft, hitPlayerLeft, null, this);
	this.physics.add.collider(ball, playerRight, hitPlayerRight, null, this);

	// UI - Scores + Lives + Timer

	scoreTextPlayerLeft = this.add.text(gameWindowWidth * 0.05, 16, 'score: 0', {
		fontSize: '2em',
		fill: '#F00'
	});
	scoreTextPlayerRight = this.add.text(gameWindowWidth - 150, 16, 'score: 0', {
		fontSize: '2em',
		fill: '#00F'
	});

	for (let index = 1; index < playerLeftLives.length + 1; index++) {
		let life = this.physics.add.sprite(
			gameWindowWidth * 0.05 * index,
			gameWindowHight * 0.92,
			'heart'
		);
		life.scale = 0.3;
		playerLeftLives[index - 1] = life;
	}

	for (let index = 1; index < playerRightLives.length + 1; index++) {
		let life = this.physics.add.sprite(
			gameWindowWidth - index * 50,
			gameWindowHight * 0.92,
			'heart'
		);
		life.scale = 0.3;
		playerRightLives[index - 1] = life;
	}

	//Blocks
	blockPink1 = this.physics.add.sprite(
		gameWindowWidth * 0.5,
		gameWindowHight * 0.2,
		'blockPink1'
	);
	this.physics.add.collider(ball, blockPink1, hitBlock, hitBlock, this);
	blockPink1.setCollideWorldBounds(true);
	blockPink1.setBounce(0.5);

	blockGreen1 = this.physics.add.sprite(
		gameWindowWidth * 0.8,
		gameWindowHight * 0.5,
		'blockGreen1'
	);
	this.physics.add.collider(ball, blockGreen1, hitBlock, null, this);
	blockGreen1.setCollideWorldBounds(true);
	blockGreen1.setBounce(0.5);

	/////Time Event

	var milisecondVar = [3000, 5000, 8000];

	// this.time.delayedCall(3000, createAPinkBlock, [], this);
	createBlocksTimer = this.time.addEvent({
		delay: milisecondVar.random(),
		callback: createAPinkBlock,
		callbackScope: this,
		loop: true
	});
	// createBlocksTimer = this.time.addEvent({ delay: 1000, callback: createAPinkBlock, callbackScope: this, loop: true });

	this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

	///// change to another scene:
	this.keyR = this.input.keyboard.on('keyup', function(e) {
		if (e.key == 'r') {
			console.log('r is down');
			game.scene.start('TitleScene');
		}
	});
}

function update() {
	if (this.keyP.isDown) {
		console.log('p is down');
		game.scene.pause('default');
	}

	//repeated events at certain time intervals
	if (cursor.up.isDown) {
		// move up if the up key is pressed
		playerRight.setVelocityY(-1200);
	} else if (cursor.down.isDown) {
		// move down if the down key is pressed
		playerRight.setVelocityY(1200);
	} //stop if no key is pressed.
	else {
		playerRight.setVelocityY(0);
	}

	if (this.keyW.isDown) {
		playerLeft.setVelocityY(-1200);
	} else if (this.keyS.isDown) {
		playerLeft.setVelocityY(1200);
	} else {
		playerLeft.setVelocityY(0);
	}

	if (ball.x >= gameWindowWidth - 20 && playerRight.state == playerState[0]) {
		lifeLost(playerRight, playerRightLives);
		// scoreLeft += 1;
		// scoreTextPlayerLeft.setText('Score: ' + scoreLeft);
		// ball.velocityX *= -1
		// ball.velocityY *= -1
		ball.x -= 50;
	}

	if (ball.x <= 20 && playerLeft.state == playerState[0]) {
		lifeLost(playerLeft, playerLeftLives);
		// scoreRight += 1;
		// scoreTextPlayerRight.setText('Score: ' + scoreRight);
		// ball.velocityX *= -1
		// ball.velocityY *= -1
		ball.x += 50;
	}

	if (playerLeft.state == playerState[1]) {
		playerStunned(playerLeft);
	} else if (playerRight.state == playerState[1]) {
		playerStunned(playerRight);
	}
}

function hitPlayerLeft(ball, playerLeft) {
	velocityX = velocityX - 100;
	velocityX = velocityX * -1;
	velocityY = velocityY * -1; //changes the angle whe hit
	ball.setVelocityX(velocityX);
	ball.setVelocityY(velocityY);

	blockPointPlayer = 'left';

	if (velocityX > 2000 || velocityX < -2000) {
		velocityX = 2000;
		ball.setVelocityX(velocityX);
	}

	if (velocityY == 0) {
		velocityY = arrayY.random();
	}

	playerLeft.setVelocityX(0);
}

function hitPlayerRight(ball, playerRight) {
	velocityX = velocityX + 100;
	velocityX = velocityX * -1;
	velocityY = velocityY * -1; //changes the angle whe hit
	ball.setVelocityX(velocityX);

	blockPointPlayer = 'right';

	if (velocityX > 2000 || velocityX < -2000) {
		velocityX = -2000;
		ball.setVelocityX(velocityX);
	}

	if (velocityY == 0) {
		velocityY = arrayY.random();
	}
	playerRight.setVelocityX(0);
}

function hitBlock(ball, block) {
	velocityX = velocityX + 10;
	velocityX = velocityX * -1;
	velocityY = velocityY * -1;
	ball.setVelocityY(velocityY);
	ball.setVelocityX(velocityX);

	var timedEvent;
	timedEvent = this.time.delayedCall(
		1000,
		function() {
			block.destroy();
		},
		[],
		this
	);
	// timedEvent = this.time.addEvent({ delay: 2000, callback: blockChange, callbackScope: this })

	if (blockPointPlayer === '') {
		console.log('block hit num found');
	} else if (blockPointPlayer === 'right') {
		scoreRight += 100;
		scoreTextPlayerRight.setText('Score: ' + scoreRight);
		blockPointPlayer = '';
	} else if (blockPointPlayer === 'left') {
		scoreLeft += 100;
		scoreTextPlayerLeft.setText('Score: ' + scoreLeft);
		blockPointPlayer = '';
	}
}

//doesnt work:
function blockHitBlock(block1, block2) {
	velocityX = velocityX + 10;
	velocityX = velocityX * -1;
	velocityY = velocityY * -1;
	block1.setVelocityY(velocityY);
	block1.setVelocityX(velocityX);
	s;
	block2.setVelocityY(velocityY);
	block2.setVelocityX(velocityX);
}

// Player life lost and 'stunned' logic

const playerStunned = player => {
	player.visible = false;
	setTimeout(() => {
		player.visible = true;
		player.state = playerState[0];
	}, 3000);
};

const lifeLost = (player, lives) => {
	const direction = [-20, 20];
	player.state = playerState[1];
	lives[lives.length - 1].setAcceleration(0, 100);
	lives[lives.length - 1].setVelocityX(direction.random());
	lives[lives.length - 1].setVelocityY(-150);
	lives.pop();
	console.log('life lost');
};

//Blocks

////////////// Time Event

function createAPinkBlock() {
	block = this.physics.add.sprite(
		gameWindowWidth * array0to1.random(),
		gameWindowHight * array0to1.random(),
		// blocksNamesArray.random()
		'toli'
	);
	this.physics.add.collider(ball, block, hitBlock, null, this);

	block.setCollideWorldBounds(true);
	block.setBounce(0.5);

	blocksCreated++;

	if (blocksCreated === 30) {
		createBlocksTimer.remove(false);
	}
}

// }// scene closer
