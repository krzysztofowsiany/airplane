/**
 * Load library and start the game Airplane
 */
require.config({
    //urlArgs: "t=" +  (new Date()).getTime(),
    //baseUrl: "../",
    paths: {
        /*
         ******** Load libraries ********
         */
        // Lib - Phaser.io
        'phaser': 'libs/phaser',
        //
        'game':'Game/Airplane',        
    }    
});

require(
	    ['phaser', 'game'], 
	    function (phaser, airplane) {
	    	//run game
	    	Phaser = phaser;
	    	var game = new Airplane();
	    	
	    	game.run();
	    	
	    	
	    	//AIRPLANE.run();
	});