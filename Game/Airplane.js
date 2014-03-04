/**
 * @module AIRPLANE
 * @version 0.1
 */

function Airplane() {
	var 
		game = Phaser.Game,
		map,
		coins,
		layer = undefined,
		sprite = undefined,
		cursors = undefined
		;
	
	function run() {
		game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });


		
		
		
	}
	
	function preload () {		
	    game.load.tilemap('map', 'Maps/test.json', null, Phaser.Tilemap.TILED_JSON);
	    
	    game.load.image('tmw_desert_spacing', 'tmw_desert_spacing.png');

	    game.load.image('phaser', 'arrow.png');
	   // game.load.spritesheet('coin', 'coin.png', 32, 32);
	    
    }
	
	
	
	function create () {
		
	    map = game.add.tilemap('map');
	    
	
	    map.addTilesetImage('tmw_desert_spacing');
	    
	    
	    //map.setCollisionBetween(1, 12);

	    layer = map.createLayer('Tile Layer 1');
	    
	    // layer.debug = true;

	    layer.resizeWorld();

	    //  Here we create our coins group
	  //  coins = game.add.group();

	    //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
	    //map.createFromObjects('Object Layer 1', 34, 'coin', 0, true, false, coins);

	    //  Add animations to all of the coin sprites
//	    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
///	    coins.callAll('animations.play', 'animations', 'spin');

	    sprite = game.add.sprite(260, 100, 'phaser');
	    sprite.anchor.setTo(0.5, 0.5);

	   // console.log(sprite);
	    //  This adjusts the collision body size.
	    sprite.body.setRectangle(16, 16, 25, 15);

	    //  We'll set a lower max angular velocity here to keep it from going totally nuts
	    sprite.body.maxAngular = 50;

	    //  Apply a drag otherwise the sprite will just spin and never slow down
	    sprite.body.angularDrag = 50;

	   // game.camera.follow(sprite);

	   // cursors = game.input.keyboard.createCursorKeys();
	    
	}

	function update() {
		//game.physics.collide(sprite, layer);
        game.physics.velocityFromAngle(sprite.angle, 30, sprite.body.velocity);
       
	}

	function collectCoin(player, coin) {

	    coin.kill();

	}

	function render() {

	    game.debug.renderPhysicsBody(sprite.body);

	}
	 
	 return {
		 run:run,
	 };
}
