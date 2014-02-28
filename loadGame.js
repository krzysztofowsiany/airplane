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
        // Lib - Pixi
        'pixi': 'libs/pixi.dev',
        //
        'game':'Game/Airplane',        
    }    
});

require(
	    ['pixi', 'game'], 
	    function (pixi, airplane) {
	    	PIXI = pixi;	    	
	    	AIRPLANE = airplane;
	    	
	    	re =new AIRPLANE.Graphics();
	    	re.init();
	    	//console.log(re.renderer);
	    	re.start();
	  
	});