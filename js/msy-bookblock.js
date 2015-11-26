		var boardPage=false;

		var Page = (function() {
			
			var config = {
					$bookBlock : $( '.bb-bookblock' ),
					$navNext : $( '#swift' ),
				},
				init = function() {
					config.$bookBlock.bookblock( {
						orientation : 'vertical',
						easing		: 'ease-in-out',
						shadows	: true,
						shadowSides : 0.1,
						shadowFlip : 0.2,
						perspective : 1300,
						circular	: true,
						speed : 700,
						onEndFlip : function( page, isLimit ) { 
							console.log("page:"+page,"isLimit:"+isLimit)
							if(isLimit==($(".bb-item").length-1)){$("#swift").html("回到文章");boardPage=true}else{boardPage=false};
							if(!boardPage){$("#swift").html("更多精彩")};
							$("#dryer").highcharts().reflow()
							return false; 
						},
					} );
					initEvents();
				},
				initEvents = function() {

					var $slides = config.$bookBlock.children();
					
					// add navigation events
					config.$navNext.on( 'click touchstart', function() {

							config.$bookBlock.bookblock( 'next' );
		
						return false;
					} );

					// add keyboard events
					$( document ).keydown( function(e) {
						var keyCode = e.keyCode || e.which,
							arrow = {
								left : 37,
								up : 38,
								right : 39,
								down : 40
							};

						switch (keyCode) {
							case arrow.up:
								config.$bookBlock.bookblock( 'prev' );
								e.preventDefault();
								break;
							case arrow.down:
								config.$bookBlock.bookblock( 'next' );
								e.preventDefault();
								break;
						}

					} );
				};

				return { init : init };

		})();

		Page.init();
