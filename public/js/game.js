var config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 600,
	physics: {
		default: 'arcade'
	},
	scene: {
		preload: preloadGame,
		create: createGame,
		update: updateGame
	}
};
var game = new Phaser.Game(config);

function preloadGame() {
	//function where images are loaded
	this.load.image('ground', '../assets/ground.jpg');
	// this.load.image('player', 'assets/player.png');
	// this.load.image('playerRight', 'assets/playerRight.png');
	// this.load.image('ball', 'assets/ball.png');
}
// Sort out angle randomly but also to prevent soft locks
var ball;
var velocityX = Phaser.Math.Between(-250, 250);
var velocityY = 250;
var cursor;
var playerRight;
var playerLeft;

var scorePlayer = 0;
var scorePc = 0;
var scoreTextPlayer;
var scoreTextPc;
function createGame() {
	this.add.image(400, 200, 'ground');

	cursor = this.input.keyboard.createCursorKeys();
	console.log(cursor);

	this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

	playerRight = this.physics.add.sprite(980, 200, 'playerRight');
	playerRight.setCollideWorldBounds(true);


	playerLeft = this.physics.add.sprite(20, 200, 'playerLeft');
	playerLeft.setCollideWorldBounds(true);
	

	ball = this.physics.add.sprite(500, 300, 'ball');

	ball.setCollideWorldBounds(true);
	ball.setBounce(1);

	//it do horizontal and vertical movement.
	ball.setVelocityY(velocityY);
	ball.setVelocityX(velocityX);

	this.physics.add.collider(ball, playerLeft, hitPc, null, this);
	this.physics.add.collider(ball, playerRight, hitPlayer, null, this);

	scoreTextPc = this.add.text(window.innerWidth * 0.05, 16, 'score: 0', {
		fontSize: '16px',
		fill: '#F00'
	});
	scoreTextPlayer = this.add.text(window.innerWidth * 0.8, 16, 'score: 0', {
		fontSize: '16px',
		fill: '#00F'
	});
}

function updateGame() {
	//repeated events at certain time intervals
	if (cursor.up.isDown) {
		// move up if the up key is pressed
		playerRight.setVelocityY(-300);
	} else if (cursor.down.isDown) {
		// move down if the down key is pressed
		playerRight.setVelocityY(300);
	} //stop if no key is pressed.
	else {
		playerRight.setVelocityY(0);
	}

	if (this.keyW.isDown) {
		playerLeft.setVelocityY(-300);
	} else if (this.keyS.isDown) {
		playerLeft.setVelocityY(300);
	} else {
		playerLeft.setVelocityY(0);
	}
	// Change to half width of ball pic
	if (ball.x >= 980) {
		console.log('Hit');
		scorePc += 1;
		scoreTextPc.setText('Score: ' + scorePc);
		reset();
	}

	if (ball.x <= 20) {
		console.log('Hit');
		scorePlayer += 1;
		scoreTextPlayer.setText('Score: ' + scorePlayer);
		reset();
	}
}

function hitPc(ball, playerLeft) {
	velocityX = velocityX -50;
	velocityX = velocityX * -1;
	velocityY = velocityY * -1; //changes the angle whe hit
	console.log(velocityX);
	ball.setVelocityX(velocityX);
	ball.setVelocityY(velocityY);

	if (velocityY < 0) {
		velocityY = velocityY * -1;
		ball.setVelocityY(velocityY);
	}
	playerLeft.setVelocityX(0);
}

function hitPlayer(ball, playerRight) {
	velocityX = velocityX +50;
	velocityX = velocityX * -1;
	velocityY = velocityY * -1; //changes the angle whe hit
	console.log(velocityX);
	ball.setVelocityX(velocityX);

	if (velocityY < 0) {
		velocityY = velocityY * -1;
		ball.setVelocityY(velocityY);
		ball.setVelocityY(velocityY);
	}
	playerRight.setVelocityX(0);
}

function reset() {
	velocityX = Phaser.Math.Between(-250, 250);
	velocityY = 250;
	ball.x = 500;
	ball.y = 300;
	// playerRight.x = 980;
	// playerRight.y = 200;
	// playerLeft.x = 0;
	// playerLeft.y = 200;
	ball.setVelocityX(velocityX);
	ball.setVelocityY(velocityY);
}
