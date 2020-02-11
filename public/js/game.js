var config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 600,
	physics: {
		default: 'arcade',
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
	//this.load.image('ground', '../assets/ground.jpg');
	this.load.image('playerRight', 'assets/player_right.png');
	this.load.image('playerLeft', 'assets/player_left.png');
	this.load.image('ball', 'assets/ball.png');

	this.load.image('blockPink1','assets/pink_block_full.png')
	this.load.image('blockPink2','assets/pink_block_2.png')
	this.load.image('blockPink3','assets/pink_block_3.png')

	this.load.image('blockGreen1','assets/green_block_full.png')
}
// Sort out angle randomly but also to prevent soft locks
var ary = [-500,500]

var ball;
var velocityX = Phaser.Math.Between(-500,500);
var velocityY = 0;//Phaser.Math.Between(Phaser.Math.Between(-400,-200), Phaser.Math.Between(200,400));
var cursor;
var playerRight;
var playerLeft;

var scoreRight = 0;
var scoreLeft = 0;
var scoreTextPlayerRight;
var scoreTextPlayerLeft;

//Blocks

var blockPink1;
var blockPink2;
var blockPink3;

var blockGreen1;


function createGame() {
	this.add.image(400, 200, 'ground');

	cursor = this.input.keyboard.createCursorKeys();
	

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
	console.log(velocityY, velocityX)

	this.physics.add.collider(ball, playerLeft, hitPc, null, this);
	this.physics.add.collider(ball, playerRight, hitPlayer, null, this);

	scoreTextPlayerLeft = this.add.text(window.innerWidth * 0.05, 16, 'score: 0', {
		fontSize: '16px',
		fill: '#F00'
	});
	scoreTextPlayerRight = this.add.text(900, 16, 'score: 0', {
		fontSize: '16px',
		fill: '#00F'
	});

	//Blocks
	// blockPink1 = this.physics.add.sprite(500, 200, 'blockPink1');
	// this.physics.add.collider(ball, blockPink1, hitPinkBlock, null, this);
	// blockPink1.setCollideWorldBounds(true);
	// blockPink1.setBounce(0.5);

	// blockGreen1 = this.physics.add.sprite(200, 100, 'blockGreen1');
	// this.physics.add.collider(ball, blockGreen1, hitPinkBlock, null, this);
	// blockGreen1.setCollideWorldBounds(true);
	// blockGreen1.setBounce(0.5);	
}

function updateGame() {
	//repeated events at certain time intervals
	if (cursor.up.isDown) {
		// move up if the up key is pressed
		playerRight.setVelocityY(-500);
	} else if (cursor.down.isDown) {
		// move down if the down key is pressed
		playerRight.setVelocityY(500);
	} //stop if no key is pressed.
	else {
		playerRight.setVelocityY(0);
	}

	if (this.keyW.isDown) {
		playerLeft.setVelocityY(-500);
	} else if (this.keyS.isDown) {
		playerLeft.setVelocityY(500);
	} else {
		playerLeft.setVelocityY(0);
	}
	// Change to half width of ball pic
	if (ball.x >= 980) {
		console.log('Hit');
		scoreLeft += 1;
		scoreTextPlayerLeft.setText('Score: ' + scoreLeft);
		// ball.velocityX *= -1
		// ball.velocityY *= -1
		reset();
	}

	if (ball.x <= 20) {
		console.log('Hit');
		scoreRight += 1;
		scoreTextPlayerRight.setText('Score: ' + scoreRight);
		// ball.velocityX *= -1
		// ball.velocityY *= -1
		reset();
	}
}

function hitPc(ball, playerLeft) {
	velocityX = velocityX -200;
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
	velocityX = velocityX +200;
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

//Blocks

function hitPinkBlock(){
	velocityX = velocityX +200;
	blockPink1.setVelocityY(velocityY);
	console.log("Hellllllooooo")
}





   