/**
* @module PIXI
*/

(function(){
    var root = this;
    	
	/**
	 * @module PIXI
	 */
	var AIRPLANE = AIRPLANE || {};
	
	AIRPLANE.VERSION = "v0.1";
	
	
	AIRPLANE.Game  = function () {
		
	};
	/**
	 * @class Renderer
	 * @constructor
	 */
	AIRPLANE.Graphics = function() {
		/**
		 * @property render
		 */
		this.renderer = undefined;
		this.stage = undefined;
		
	};
	
	
	AIRPLANE.Graphics.prototype.init = function() {
		
		this.stage = new PIXI.Stage(0xff9933);
		this.renderer = new PIXI.autoDetectRenderer(
	               512,
	               384,
	               document.getElementById("game")
	            );		
	};
	
	AIRPLANE.Graphics.prototype.update = function() {
		this.renderer.render(this.stage);
	};
	
	
	AIRPLANE.Graphics.prototype.start = function() {			
		var t = this;
		window.requestAnimFrame(function render(){
		    t.update();
		    window.requestAnimFrame(render);
		});
	};
	
	
	///
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = AIRPLANE;
        }
        exports.AIRPLANE= AIRPLANE;
    } else if (typeof define !== 'undefined' && define.amd) {
        define(AIRPLANE);
    } else {
        root.AIRPLANE = AIRPLANE;
    }
	
}).call(this);
	
	
