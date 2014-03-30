/**
 * @module AIRPLANE
 * @version 0.1
 */

function Airplane() {
	var game = Phaser.Game, map, coins, bomb, bombCount, layer = undefined, airplane = undefined, cursors = undefined, CACTUS = 10, buldings, background, airplaneSpeed = 50, bombSpeed = 50
	
	,score
	,scoreText
	;

	function run() {
		game = new Phaser.Game(800, 400, Phaser.CANVAS, 'phaser-example', {
			preload : preload,
			create : create,
			update : update,
			render : render
		});

	}

	function preload() {
		// game.load.tilemap('map', 'Maps/test.json', null,

		game.load.image('background', 'background.png');
		game.load.spritesheet('coin', 'coin.png', 32, 32);
		game.load.spritesheet('bomb', 'coin.png', 32, 32);
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
	

	function create() {
		background = game.add.sprite(0, 0, 'background');
		genMap();
		
		score=0;
		var style = { font: "bold 20pt Arial", fill: "#ffffff", align: "center" };
    	scoreText = game.add.text(game.world.width-200, 0, 'Score:', style);
    	setScore();
    	//scoreText.anchor.setTo(1, 0.5);
		
		
		
		airplane = game.add.sprite(0, 40, 'airplane');
		airplane.anchor.setTo(0.5, 1);
		airplane.animations.add('walk');
		airplane.animations.play('walk', 40, true);
		airplane.body.velocity.x = airplaneSpeed;

		game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		//dropBomb(100, 0);
		
		
	}

	
	
	function destroyBomb() {
		bombCount = 0;
		bomb.kill();
	}

	
	function addScore(){
		score++;
		setScore();
	}



	function collisionWithBulding(bomb, buldingModule) {
		bombCount--;
		buldings.remove(buldingModule);
		buldingModule.kill();		
		addScore();
		
		if (bombCount <= 0) {
			destroyBomb();
		}

	}

	function render() {

		if (bombCount > 0)
			game.debug.renderPhysicsBody(bomb.body);

		buldings.forEach(function(sp) {
			game.debug.renderPhysicsBody(sp.body);
		});

	}
	
	
	
	function dropBomb(x, y) {
		x = Math.round(x / 32) * 32;
		bomb = game.add.sprite(x, y, 'bomb');

		bomb.body.collideWorldBounds = true;
		bomb.animations.add('walk');
		bomb.animations.play('walk', 20, true);
		bombCount = 5;
		bomb.body.setRectangle(10, 32, 10, 0);
		bomb.body.x = x;
		bomb.body.y = y - 20;
		bomb.body.velocity.y = bombSpeed;		
	}
	
	function update() {
		if (bombCount > 0) {
			game.physics.overlap(bomb, buldings, collisionWithBulding, null, this);
			if (bomb.y > game.stage.bounds.height - (bomb.height + 3)) {
				destroyBomb();
			}
		}
		else {
			if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				dropBomb(airplane.x, airplane.y);
			}
		}

		if (airplane.x > game.stage.bounds.width + airplane.width) {
			airplane.x = 0 - airplane.width;			
			//sprite.body.velocity.x=0;
			airplane.y += 50;			
		}
	}


	return {
		run : run,
	};
}
