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
		cursors = undefined,
		CACTUS = 10
	    
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
	    
	    
	    map.setCollisionBetween(1, 12);


	    map.setTileIndexCallback(10, hitCoin, this);
	    //map.setTileLocationCallback(2, 0, 1, 1, hitCoin, this);

	    layer = map.createLayer('Tile Layer 1');

	    layer.resizeWorld();


	    sprite = game.add.sprite(0, 100, 'phaser');
	    sprite.anchor.setTo(0.5, 0.5);

	   // console.log(sprite);
	    //  This adjusts the collision body size.
	    sprite.body.setRectangle(16, 16, 25, 15);

	    //  We'll set a lower max angular velocity here to keep it from going totally nuts
	    sprite.body.maxAngular = 100;

	    //  Apply a drag otherwise the sprite will just spin and never slow down
	    sprite.body.angularDrag = 100;
	    sprite.body.collideWorldBounds = true;
	   // game.camera.follow(sprite);

	   // cursors = game.input.keyboard.createCursorKeys();
	    
	}

	function hitCoin(sprite, tile) {
	//	console.log(tile);
		map.putTile(0, tile.tile.x, tile.tile.y, layer);
	    //tile.tile.alpha = 0;
		
	    //tile.tile.

//	    layer.dirty = true;

	    return true;

	}

	
	function update() {
		game.physics.collide(sprite, layer);

        game.physics.velocityFromAngle(sprite.angle, 30, sprite.body.velocity);
       
	}


	function render() {

	    game.debug.renderPhysicsBody(sprite.body);

	}
	 
	 return {
		 run:run,
	 };
}
