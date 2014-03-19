/**
 * @module AIRPLANE
 * @version 0.1
 */

function Airplane() {
	var game = Phaser.Game, map, coins, bomb, bombCount,layer = undefined, sprite = undefined, cursors = undefined, CACTUS = 10,
	buldings, background

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
		// Phaser.Tilemap.TILED_JSON);

		// game.load.image('tmw_desert_spacing', 'tmw_desert_spacing.png');

		//game.load.image('phaser', 'arrow.png');
		game.load.image('background', 'background.png');
		game.load.spritesheet('coin', 'coin.png', 32, 32);
		game.load.spritesheet('airplane', 'samolocik.png', 80, 45);

	}

	function genMap() {
		buldings = game.add.group();
		var maxWeight = Math.floor(( game.stage.bounds.height / 32 ) * 0.8);
		for ( var x = 0; x < game.stage.bounds.width / 32; x++) {
			for ( var y = 1; y <= Math.floor(( Math.random() * maxWeight ) + 1); y++) {
				var c =buldings.create(x * 32, game.stage.bounds.height - y
						* 32, 'coin');
		        c.name = 'coin' + x+y;
		       // c.body.bounce.y  =1;
		       // c.body.immovable = true;
		        
				//var c = game.add.sprite(x * 32, game.stage.bounds.height - y/					* 32, 'coin');
				// c.anchor.setTo(0.5, 0.5);
				// c.body.setRectangle(0, 0, 32, 32);

			}
		}

	}

	function dropBomb(x, y) {
		//console.log(x);
		
		bomb = game.add.sprite(Math.round(x / 32) * 32, y, 'coin');
		bomb.anchor.setTo(0, 0.5);
		//bomb.body.setRectangle(x, y, 32, 32);
		bomb.rotation = Math.PI / 2;
		//bomb.body.immovable = true;
		// bomb.body.maxAngular = 100;
		// bomb.body.angularDrag = 100;
		bomb.body.collideWorldBounds = true;
		bomb.animations.add('walk');
		bomb.animations.play('walk', 20, true);
		bombCount = 5;
		//bomb.body.bounce.y  =1
		// player.body.bounce.y = 0.2;
		 //   player.body.gravity.y = 6;
	}

	function create() {

		// map = game.add.tilemap('map');
		// map.addTilesetImage('tmw_desert_spacing');
		// map.setCollisionBetween(1, 10);
		// map.setTileIndexCallback(10, hitCoin, this);
		// map.setTileLocationCallback(2, 0, 1, 1, hitCoin, this);
		// map.replace(10, 11);//s,tile.tile.x, tile.tile.y);
		// layer = map.createLayer('Tile Layer 1');

		// layer.resizeWorld();
		
		background = game.add.sprite(0, 0, 'background');
		genMap();
		sprite = game.add.sprite(0, 40, 'airplane');
		sprite.anchor.setTo(0.5, 1);
		sprite.animations.add('walk');
		sprite.animations.play('walk', 40, true);
		
		
		// console.log(sprite);
		// This adjusts the collision body size.
		//sprite.body.setRectangle(16, 16, 25, 15);

		// We'll set a lower max angular velocity here to keep it from going
		// totally nuts
		//sprite.body.maxAngular = 100;

		// Apply a drag otherwise the sprite will just spin and never slow down
		//sprite.body.angularDrag = 100;
		//sprite.body.collideWorldBounds = true;
		// game.camera.follow(sprite);

		// cursors = game.input.keyboard.createCursorKeys();
		// jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
		//dropBomb(100, 0);
	}

	function hitCoin(sprite, tile) {
		// console.log(tile);
		// map.replace(10, 11);//s,tile.tile.x, tile.tile.y);
		// map.putTile(0, tile.tile.x, tile.tile.y, layer);
		// tile.tile.alpha = 0;
		// map.setTileIndexCallback(10, hitCoin, this);
		// tile.tile.

		// layer.dirty = true;

		return false;

	}
	


	function update() {
		// game.physics.collide(sprite, layer);
		// game.physics.overlap(sprite, layer);
		//game.physics.collide(game, sprite2, collisionHandler, null, this);
		
		//game.physics.collide(buldings, buldings);
		game.physics.velocityFromAngle(sprite.angle, 80, sprite.body.velocity);

		if (bombCount > 0) {
			game.physics.overlap(bomb, buldings, collisionHandler, null, this);
			
			//game.physics.collide(bomb, buldings, collisionHandler, null, this);
			game.physics.velocityFromAngle(bomb.angle, 30, bomb.body.velocity);
		}
		
		else if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			dropBomb(sprite.x, sprite.y);
		}

		if (sprite.x > game.stage.bounds.width + sprite.width ) {
			sprite.x = 0;
			//sprite.body.velocity.x=0;
			sprite.y+=50;
			//console.log(sprite.x);
		}
	}
	
	function collisionHandler (player, veg) {
		bombCount--;		
		veg.kill();
		if (bombCount < 0) {
			player.kill();
			//bomb = undefined;
		}
		
	}

	function render() {

		//game.debug.renderPhysicsBody(buldings.body);

	}

	return {
		run : run,
	};
}
