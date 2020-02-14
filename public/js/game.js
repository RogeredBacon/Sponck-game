const gameWindowWidth = window.innerWidth - 5;
const gameWindowHight = window.innerHeight - 5;

let gameStarted = false;

const playerState = {
	1: 'Playing',
	2: 'Stunned'
};

let time = Date.now();

let playerLeftLives = ['', '', '', '', ''];
let playerRightLives = ['', '', '', '', ''];

var config = {
	type: Phaser.AUTO,
	width: gameWindowWidth,
	height: gameWindowHight,
	audio: {
		disableWebAudio: true
	},
	physics: {
		default: 'arcade'
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

const pingConfig = {
	mute: false,
	volume: 1,
	rate: 1,
	detune: 0,
	seek: 0,
	loop: false,
	delay: 0
};

const paddleConfig = {
	mute: false,
	volume: 0.8,
	rate: 1,
	detune: 0,
	seek: 0,
	loop: false,
	delay: 0
};

const soundtrackConfig = {
	mute: false,
	volume: 1,
	rate: 1,
	detune: 0,
	seek: 0,
	loop: false,
	delay: 0
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
	this.load.image('blockGreen2', 'assets/green_block_2.png');

	this.load.image('blockYellow1', 'assets/yellow_block_full.png');

	this.load.image('toli', 'assets/toli.png');
	this.load.image('amir', 'assets/amir.png');
	this.load.image('james', 'assets/james.png');
	this.load.image('javier', 'assets/javier.png');
	this.load.image('jo', 'assets/jo.png');
	this.load.image('tomy', 'assets/tomy.png');
	this.load.image('mani', 'assets/mani.png');
	this.load.image('sara', 'assets/sara.png');
	this.load.image('renata', 'assets/renata.png');
	this.load.image('mariola', 'assets/mariola.png');
	this.load.image('keemo', 'assets/keemo.png');

	this.load.image('particle', 'assets/particle.png');
	this.load.image('heart', 'assets/heart_pixelart.png');
	this.load.image('explosion', 'assets/explosion.png');

	// Here be sounds
	this.load.audio('paddleBall', 'assets/sounds/paddle.wav');
	this.load.audio('pingPickup', 'assets/sounds/p-ping.mp3');
	this.load.audio('explosion1', 'assets/sounds/explosion1.wav');
	this.load.audio('explosion2', 'assets/sounds/explosion2.wav');
	this.load.audio('gameStart', 'assets/sounds/gameStart.wav');
	this.load.audio('loseLife', 'assets/sounds/loseLife.wav');
	this.load.audio('gameOver', 'assets/sounds/gameOver.wav');
	this.load.audio('soundtrack', 'assets/sounds/Theia-Trash80.mp3');
}
Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
};

// Sort out angle randomly but also to prevent soft locks

const arrayX = [-400, -350, -250, 250, 350, 400];
const arrayY = [-100, -300, 300, 100];
const array0to1 = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
var milisecondVar = [3000, 5000, 8000];

const blocksNamesArray = ['blockPink1', 'blockGreen1', 'blockYellow1'];
const blocksWomenPry = [
	'toli',
	'amir',
	'james',
	'javier',
	'jo',
	'tomy',
	'mani',
	'sara',
	'mariola',
	'renata',
	'keemo'
];

let blocksArray = blocksNamesArray;

var ball;
var velocityX = 0; //arrayX.random();
var velocityY = 0; //arrayY.random();
var cursor;
var playerRight;
var playerLeft;

var blockPointPlayer = '';
var scoreRight = 0;
var scoreLeft = 0;
var scoreTextPlayerRight;
var scoreTextPlayerLeft;
var gameOverText;
var winnerText;
var instructions;
var welcomeMessage;

//Blocks

var block;
var createBlocks = false;

var blockPink1;
var blockPink2;
var blockPink3;

var blockGreen1;

var createBlocksTimer;
var blocksCreated = 0;

//background
var graphics;

// Sounds
let pingPickup;
let paddleSound;
let explosion1;
let explosion2;
let explosionArray;
let loseLife;
let gameStart;
let gameOver;
let soundtrack;

//efects
var particlesBlock;

function create() {
	paddleSound = this.sound.add('paddleBall');
	pingPickup = this.sound.add('pingPickup');
	explosion1 = this.sound.add('explosion1');
	explosion2 = this.sound.add('explosion2');
	loseLife = this.sound.add('loseLife');
	gameStart = this.sound.add('gameStart');
	gameOver = this.sound.add('gameOver');
	soundtrack = this.sound.add('soundtrack');

	explosionArray = [explosion1, explosion2];

	cursor = this.input.keyboard.createCursorKeys();

	this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

	///particles

	particlesBlock = this.add.particles('explosion');

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

	ball = this.physics.add.sprite(
		gameWindowWidth / 2,
		gameWindowHight / 2,
		'ball'
	);
	// ball.width = 50;

	ball.setCollideWorldBounds(true);
	ball.setCircle(10);
	ball.setDamping(0.95);
	ball.setBounce(1);

	//it do horizontal and vertical movement.
	ball.setVelocityY(velocityX);
	ball.setVelocityX(velocityX);

	this.physics.add.collider(ball, playerLeft, hitPlayerLeft, null, this);
	this.physics.add.collider(ball, playerRight, hitPlayerRight, null, this);


	//text

	welcomeMessage = this.add.text(
		gameWindowWidth * 0.25, 
		gameWindowHight * 0.5, 
		"Your goal is to survive the longest\nDon't let the commet go past you\nor you will be frozen in time and space!\nWinner is the last human standing...",
		{
		fontSize: '3em',
		fill: '#ff1a75',
		fontFamily: 'Orbitron, "sans-serif"',
		align: 'left',
		lineSpacing: 25,
	});
	welcomeMessage.setOrigin(0.5);
	welcomeMessage.visible = true;

	instructions = this.add.text(
		gameWindowWidth * 0.75, 
		gameWindowHight * 0.5, 
		'Player Left: W and S\nPlayer Right: Up and Down\nPress P for pause\nPress Space to start or resume the game',
		{
		fontSize: '3em',
		fill: '#ff1a75',
		fontFamily: 'Orbitron, "sans-serif"',
		// shadow: {
		// 	offsetX: 10,
		// 	offsetY: 10,
		// 	color: '#fff',
		// 	blur: 10,
		// 	stroke: false,
		// 	fill: true
		// },
		align: 'right',
		lineSpacing: 25,
	});
	instructions.setOrigin(0.5);
	instructions.visible = true;
	instructions.setDepth(99);
	

	winnerText = this.add.text(gameWindowWidth * 0.5, gameWindowHight * 0.7, '', {
		fontSize: '2em',
		fill: '#F4FF00',
		fontFamily: 'Orbitron, "sans-serif"'
	});
	winnerText.setOrigin(0.5);
	winnerText.visible = false;
	winnerText.setDepth(98);

	scoreTextPlayerLeft = this.add.text(gameWindowWidth * 0.05, 16, 'score: 0', {
		fontSize: '2em',
		fill: '#F4FF00',
		fontFamily: 'Orbitron, "sans-serif"'
	});
	scoreTextPlayerRight = this.add.text(gameWindowWidth - 150, 16, 'score: 0', {
		fontSize: '2em',
		fill: '#00FF00',
		fontFamily: 'Orbitron, "sans-serif"'
	});

	gameOverText = this.add.text(gameWindowWidth * 0.5, gameWindowHight * 0.5, 'Game Over', {
		fontSize: '10em',
		fill: '#F4FF00',
		fontFamily: 'Orbitron, "sans-serif"'
	});
	gameOverText.setOrigin(0.5);
	gameOverText.visible = false;
	gameOverText.setDepth(97);

	// UI - Scores + Lives + Timer


	for (let index = 1; index < playerLeftLives.length + 1; index++) {
		let life = this.physics.add.sprite(
			50 * index,
			gameWindowHight * 0.92,
			'heart'
		);
		life.scale = 0.3;
		life.setDepth(100);
		playerLeftLives[index - 1] = life;
	}

	for (let index = 1; index < playerRightLives.length + 1; index++) {
		let life = this.physics.add.sprite(
			gameWindowWidth - index * 50,
			gameWindowHight * 0.92,
			'heart'
		);
		life.scale = 0.3;
		life.setDepth(100);
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
	blockPink1.setName('pink');
	blockPink1.setAngularVelocity(20);

	blockGreen1 = this.physics.add.sprite(
		gameWindowWidth * 0.8,
		gameWindowHight * 0.75,
		'blockGreen1'
	);
	this.physics.add.collider(ball, blockGreen1, hitBlock, null, this);
	blockGreen1.setCollideWorldBounds(true);
	blockGreen1.setBounce(0.5);
	blockGreen1.setName('green');
	blockGreen1.setAngularVelocity(20);

	/////Time Event
	createBlocksTimer = this.time.addEvent({
		delay: milisecondVar.random(),
		callback: createAPinkBlock,
		callbackScope: this,
		loop: true,
		paused: true
	});

	///////////////background

	//tail
	var particles = this.add.particles('particle');
	var emitter = particles.createEmitter();
	emitter.setQuantity(5);
	emitter.startFollow(ball);
	emitter.setSpeed(100);
	emitter.setGravity(500, 500);

	//circle
	var particles2 = this.add.particles('particle');
	var emitter2 = particles.createEmitter();
	emitter2.setQuantity(20);
	emitter2.startFollow(ball);
	emitter2.setSpeed(6000);
	emitter2.setGravity(500, 500);	
  
}

function update() {
	if (this.keyE.isDown) {
		blocksArray = blocksWomenPry;
	}

	if (cursor.space.isDown) {
		soundtrack.play(soundtrackConfig);
		velocityY = arrayY.random();
		velocityX = arrayX.random();
		ball.setVelocityY(velocityY);
		ball.setVelocityX(velocityX);
		createBlocksTimer.paused = false;
		welcomeMessage.visible = false;
		instructions.visible = false;
	}

	if (this.keyP.isDown) {
		velocityY = 0;
		velocityX = 0;
		ball.setVelocityY(velocityY);
		ball.setVelocityX(velocityX);
		createBlocksTimer.paused = true;
		instructions.visible = true;
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

	if (ball.x >= gameWindowWidth - 6 && playerRight.state == playerState[0]) {
		lifeLost(playerRight, playerRightLives);
		// scoreLeft += 1;
		// scoreTextPlayerLeft.setText('Score: ' + scoreLeft);
		// ball.velocityX *= -1
		// ball.velocityY *= -1
		// ball.x -= 100;
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

	// this.time.delayedCall(3000, createAPinkBlock, [], this);
}

function hitPlayerLeft(ball, playerLeft) {
	paddleSound.play(paddleConfig);
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
	ball.setGravityY(arrayY.random());
	playerLeft.setVelocityX(0);
}

function hitPlayerRight(ball, playerRight) {
	paddleSound.play(paddleConfig);
	const yVel = [100, -100];
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
	ball.setGravityY(arrayY.random());
	playerRight.setVelocityX(0);
}

function hitBlock(ball, block) {
	pingPickup.play(pingConfig);
	const angVel = [10, -10, 50, -50, 100, -100];
	velocityX = velocityX + 10;
	velocityX = velocityX * -1;
	velocityY = velocityY * -1;
	ball.setVelocityY(velocityY);
	ball.setVelocityX(velocityX);
	if (block.name == 'pink') {
		block.setTexture('blockPink3');
	} else if (block.name == 'green') {
		block.setTexture('blockGreen2');
	}
	block.setAngularVelocity(angVel.random());

	var timedEvent;
	timedEvent = this.time.delayedCall(
		1000,
		function() {
			//explosion
			var emitter3 = particlesBlock.createEmitter({
				alpha: { start: 1, end: 0 },
				scale: { start: 1.5, end: 4.5 },
				//tint: { start: 0xff945e, end: 0xff945e },
				speed: 20,
				accelerationY: block.accelerationY * -1,
				angle: { min: -85, max: -95 },
				rotate: { min: -180, max: 180 },
				lifespan: { min: 50, max: 250 },
				blendMode: 'ADD',
				frequency: 20,
				maxParticles: 6,
				// x: 400,
				// y: 300
				z: 1
			});
			emitter3.startFollow(block);

			explosionArray.random().play();

			block.destroy();
		},
		[],
		this
	);

	if (blockPointPlayer === '') {
		console.log('Cofee is better than tea');
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

// Player life lost and 'stunned' logic

const playerStunned = player => {
	player.visible = false;
	setTimeout(() => {
		player.visible = true;
		player.state = playerState[0];
	}, 3000);
};

const lifeLost = (player, lives) => {
	loseLife.play();
	if (lives.length != 0) {
		// if (false) {
		const direction = [-20, 20];
		player.state = playerState[1];
		lives[lives.length - 1].setGravityY(700);
		lives[lives.length - 1].setVelocityX(direction.random());
		lives[lives.length - 1].setVelocityY(-400);
		lives.pop();
		console.log('life lost');
	} else {
		gameOver.play();
		this.winnerText.visible = true;

		this.gameOverText.visible = true;

		this.ball.destroy();
		this.block.destroy();
		this.playerLeft.destroy();
		this.playerRight.destroy();
		this.createBlocksTimer.remove(false);
		soundtrack.destroy();

		console.log('Game Over');
		if (player == playerLeft) {
			this.winnerText.setText(
				'Player Right won! With ' + scoreRight + ' points!'
			);
			console.log('Player Right won! With ' + scoreRight + ' points!');
		} else {
			this.winnerText.setText(
				'Player Left won! With ' + scoreLeft + ' points!'
			);
			console.log('Player Left won! With ' + scoreLeft + ' points!');
		}
	}
};

//Blocks

////////////// Time Event

function createAPinkBlock() {
	block = this.physics.add.sprite(
		gameWindowWidth * array0to1.random(),
		gameWindowHight * array0to1.random(),
		blocksArray.random()
	);
	this.physics.add.collider(ball, block, hitBlock, null, this);

	block.setCollideWorldBounds(true);
	block.setBounce(0.5);
	block.setName('pink'); /// to change the state
	block.setAngularVelocity(20);

	blocksCreated++;

	// if (blocksCreated === 30) {
	// 	createBlocksTimer.remove(false);
	// }
}

function startGame() {
	block.visible = true;
}
