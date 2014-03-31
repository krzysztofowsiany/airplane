/**
 * @module AIRPLANE
 * @version 0.1
 */

function Airplane() {
	var game = Phaser.Game, map, coins, bomb, bombCount, layer = undefined, airplane = undefined, cursors = undefined, CACTUS = 10, buldings, background, airplaneSpeed = 50, bombSpeed = 50
	,touch
	,airplaneDownStep
	
	,score
	,scoreText
	
	
	//sounds
	,airplaneSound
	,boomSound
	,fallingSound
	;

	function run() {
		game = new Phaser.Game(800, 400, Phaser.AUTO, 'phaser-example', {
			preload : preload,
			create : create,
			update : update,
			render : render
		});

	}

	function preload() {
		// game.load.tilemap('map', 'Maps/test.json', null,

		//music
		game.load.audio('airplaneSound', ['audio/effects/airplane2.mp3', 'audio/effects/airplane.ogg']);
		game.load.audio('boomSound', ['audio/effects/boom.mp3', 'audio/effects/boom.ogg']);
		game.load.audio('fallingSound', ['audio/effects/falling.mp3', 'audio/effects/falling.ogg']);
		//image
		
		game.load.image('background', 'background.png');
		game.load.spritesheet('coin', 'coin.png', 32, 32);
		game.load.spritesheet('bomb', 'img/bomba3.png', 10, 26);
		game.load.spritesheet('airplane', 'samolocik.png', 80, 45);

	}

	function genMap() {
		buldings = game.add.group();
		var maxWeight = Math.floor((game.stage.bounds.height / 32 ) * 0.8);
		for (var x = 0; x < game.stage.bounds.width / 32; x++) {
			for (var y = 1; y <= Math.floor((Math.random() * maxWeight ) + 1); y++) {
				var c = buldings.create(x * 32, game.stage.bounds.height - y * 32, 'coin');

				c.name = 'coin' + x + y;
				//c.anchor.setTo(0.5,0.5);

				// c.body.bounce.y  =1;
				// c.body.immovable = true;

				//var c = game.add.sprite(x * 32, game.stage.bounds.height - y/					* 32, 'coin');
				// c.anchor.setTo(0.5, 0.5);
				// c.body.setRectangle(0, 0, 32, 32);

			}
		}

	}

	function setScore() {
		scoreText.setText('Score: '+score);
	}
	
	function createSounds(){
		airplaneSound = game.add.audio('airplaneSound',1,true);
		airplaneSound.override = true;
		airplaneSound.addMarker('fly', 0, 0.83, 1, true);
		airplaneSound.play('fly');
		 
		fallingSound = game.add.audio('fallingSound',1);
		fallingSound.override = true;

		boomSound = game.add.audio('boomSound',1);
		boomSound.override = true;
	//    music.play('',0,1,true);
	}
	
	function initialParams() {
		airplaneDownStep = 32;
		score=0;
	}

	function create() {
		initialParams();
		
		createSounds();
		background = game.add.sprite(0, 0, 'background');
		genMap();
		
		
		var style = { font: "bold 20pt Arial", fill: "#ffffff", align: "center" };
    	scoreText = game.add.text(10, 10, 'Score:', style);
    	setScore();
    	//scoreText.anchor.setTo(1, 0.5);
		
		
		
		airplane = game.add.sprite(0, 40, 'airplane');
		airplane.anchor.setTo(0, 1);
		airplane.animations.add('walk');
		airplane.animations.play('walk', 40, true);
		airplane.body.velocity.x = airplaneSpeed;
		airplane.x = -airplane.width;	

		game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		touch = game.input.addPointer();
		//dropBomb(100, 0);
		
		
	}

	
	
	function destroyBomb() {
		fallingSound.stop();
                boomSound.play();
		bombCount = 0;
		bomb.kill();
	}

	
	function addScore(){
		score++;
		setScore();
	}

	

	function airplaneCollisionWithBulding(airplane, buldingModule) {		
		destroyAirplane();
		buldings.remove(buldingModule);
		buldingModule.kill();
		airplane.kill();
		
		
		airplaneSound.stop();		
	}


	function collisionWithBulding(bomb, buldingModule) {
		bombCount--;
                boomSound.play();
		buldings.remove(buldingModule);
		buldingModule.kill();		
		addScore();
		
		if (bombCount <= 0) {
			destroyBomb();
		}

	}

	function render() {

//		if (bombCount > 0)
//			game.debug.renderPhysicsBody(bomb.body);

//		buldings.forEach(function(sp) {
//			game.debug.renderPhysicsBody(sp.body);
//		});

	}
	
	
	
	function dropBomb(x, y) {
		x = Math.round(x / 32) * 32 + 11;
		bomb = game.add.sprite(x, y, 'bomb');

		bomb.body.collideWorldBounds = true;
		bomb.animations.add('walk');
		bomb.animations.play('walk', 20, true);
		bombCount = 5;
		bomb.body.setRectangle(10, 26, 0, 0);
		bomb.body.x = x;
		bomb.body.y = y - 20;
		bomb.body.velocity.y = bombSpeed;		
		fallingSound.play();
	}
	
	function update() {
		game.physics.overlap(airplane, buldings, airplaneCollisionWithBulding, null, this);
		
		if (bombCount > 0) {
			game.physics.overlap(bomb, buldings, collisionWithBulding, null, this);
			
			if (bomb.y > game.stage.bounds.height - (bomb.height + 3)) {
				destroyBomb();
			}
		}
		else {
			if ((game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
				||(touch.isDown))
 {
				dropBomb(airplane.x, airplane.y);
			}
		}

		if (airplane.x > game.stage.bounds.width ) {
			airplane.x = -airplane.width;			
			//sprite.body.velocity.x=0;
			airplane.y += airplaneDownStep;			
		}
	}


	return {
		run : run,
	};
}
