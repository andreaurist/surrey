
(function ($) {

	var
	
	data_name = 'eb-slide-show',
	
	defaults = {
		width: 100,
		height: 100,
		time: 6,
		duration: 2,
		suspended: false
	},
	
	methods = {
		
		init: function(options){
			var settings = $.extend( {}, defaults, options || {} );
			
			settings.time = settings.time * 1000;
			settings.duration = settings.duration * 1000;
			
			return this.each(function(){
				var data = $(this).data( data_name );
	    		if( ! data )
	    		{
	    			var data_settings = {
	    					status: 0, //0 - stopped, 1 - running
	    					activeDirection: 1,
	    					activeIndex: -1,
	    					isAnimation: false,
	    					isLoading: false,
	    					isFirstLoad: true,
	    					timeoutId: undefined,
	    					settings: {},
	    					images: [],
	    					imagesCount: 0,
	    					settings: settings,
	    					width: 0,
	    					height: 0,
	    					topFade: 0,
	    					bottomFade: 0,
	    					fullscreenMode: 0
	    				};
	    			
	    			data_settings.width = parseInt( $(".slide-show-width", $(this)).text() );
	    			data_settings.height = parseInt( $(".slide-show-height", $(this)).text() );
	    			
	    			data_settings.topFade = parseInt( $(".slide-show-top-fade", $(this)).text() );
	    			data_settings.bottomFade = parseInt( $(".slide-show-bottom-fade", $(this)).text() );
	    			data_settings.fullscreenMode = parseInt( $(".slide-show-fullscreen-mode", $(this)).text() );
	    			
	    			
	    			$(".eb-slide-show-images li", $(this)).each(function(){
		    			var image = {id:'', image:'', href:''};
		    			$("b", $(this)).each(function(){
		    				image[ $(this).attr('class') ] = $(this).text();
		    			});		    			
		    			data_settings.images.push( image );		    			
		    		});		    			
		    			
	    			data_settings.imagesCount = data_settings.images.length; 
	    			
	    			$(this).data( data_name, data_settings );
	    			
	    			
	    			//if( ! data_settings.settings.suspended )
	    			//{
	    			$(this).eb_slideshow('start');
	    			//}
	    				    			
	    		}
	    	});			
		},
		
			
	    start: function(){
	    	
	    	return this.each(function(){
	    		var data = $(this).data( data_name );	    		
	    		if( data && ! data.status )
	    		{
	    			data.status = 1;
	    			slide_switch( $(this), 1 );	    			
	    		}
	    	});
	    },
	    
	    stop: function(){
	    	return this.each(function(){
	    		var data = $(this).data( data_name );
	    		if( data && data.status )
	    		{
	    			data.status = 0;
	    		}
	    	});	    
	    },
	    
	    manual: function(){
	    	return this.each(function(){
	    		var data = $(this).data( data_name );
	    		if( data && data.status )
	    		{
	    			data.status = -1;
	    		}
	    	});	    
	    },
	    
	    next: function(){
	    	return this.each(function(){
	    		var data = $(this).data( data_name );
	    		if( data && data.status )
	    		{
	    			data.status = -1;
	    			slide_switch( $(this), 1 );
	    		}
	    	});	    
	    },
	    
	    prev: function(){
	    	return this.each(function(){
	    		var data = $(this).data( data_name );
	    		if( data && data.status )
	    		{
	    			data.status = -1;
	    			slide_switch( $(this), -1 );
	    		}
	    	});	    
	    },
	    
	    adjust: function(){
	    	return this.each(function(){
	    		_adjust( $(this) );
	    	});		
		}

	};
	
	$.fn.eb_slideshow = function(method){
		if ( methods[method] )
		{
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));	 
		}
		else if ( typeof method === 'object' || ! method )
		{
	      return methods.init.apply( this, arguments );
	    } 
	    else
	    {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.eb_slideshow' );
	    }    
		return this;
	};
	
	function _adjust( $o )
	{
		if( $o.length )
		{
			var data = $o.data( data_name );
			if( ! data ) return;
			
			
			var $wr = $(".slide-show-image-wrapper:first", $o);
			
			var c1 = data.width / data.height;
			var w1 = $wr.width();
			var h1 = $wr.height();
		
			var w = 0;
			var h = 0;
			var t=0;
			var l=0;
				    	
			
			if( w1 / h1 >= c1 )
			{
				w = w1;
				h = w / c1;
				t = -(h - h1 + data.topFade + data.bottomFade ) / 2;
				l = 0;
				
				$(".slide-show-clip-rect img", $o).css({left: l, top: t, width: w, height: h });
				
				$(".slide-show-top-fade-wrapper", $o).each(function(){
					$("div", $(this)).each(function(i){
						$(this).css({ 
							backgroundPosition: l + "px " + (t - i + data.topFade) + "px", 
							backgroundSize: w + "px " + h + "px",
						});
					});
				});
				
				$(".slide-show-bottom-fade-wrapper", $o).each(function(){
					$("div", $(this)).each(function(i){
						$(this).css({
							backgroundPosition: l + "px " + ( -h - t - i) + "px", 
							backgroundSize: w + "px " + h + "px"
						 });
					});
				});
				
			}
			else
			{
				h = h1;
				w = h * c1;
				var t = 0;
				var l = -(w - w1)/2;
				$(".slide-show-clip-rect img", $o).css({left: l, top: 0, width: w, height: h });
				
				$(".slide-show-top-fade-wrapper", $o).each(function(){
					$("img", $(this)).each(function(i){
						$(this).css({ left: l, top: - i , width: w, height: h });
					});
				});
				
				$(".slide-show-bottom-fade-wrapper", $o).each(function(){
					$("img", $(this)).each(function(i){
						$(this).css({ left: l, bottom: - data.bottomFade + i + 1, width: w, height: h });
					});
				});
			}
			
				
		}
	}
	
	
	function load_next_image( $o, runTime, direction )
	{
		if( $o.length )
		{
			var data = $o.data( data_name );
			if( ! data ) return;
			
			
			if( direction == -1 )
			{
				data.activeIndex--;
				
				if( data.activeIndex < 0 )
				{
					data.activeIndex = data.imagesCount - 1;
				}	
			}
			else
			{
				data.activeIndex++;				
				if( data.activeIndex >= data.imagesCount )
				{
					data.activeIndex = 0;
				}				
			}
			
			
			data.activeDirection = direction;
			
			
			var img = data.images[data.activeIndex];
			
			var cur_img = new Image;
			
			data.isLoading = true;
			
			$(cur_img).load(function(){
				data.isLoading = false;		
				if( "" !=  img.href )
				{
					$(this).css("cursor", "pointer");
					$(this).click(function(){ window.open( img.href ); return false; });
				}
				
				var $imageWrapper = $("<div/>").addClass("slide-show-image-wrapper");
				
				if( data.fullscreenMode )
				{
					$imageWrapper.css({position: "absolute", zIndex: 1, left: 0, top: 0, right: 0, bottom: 0, opacity: 0});
				}
				else
				{
					$imageWrapper.css({position: "absolute", zIndex: 1, left: 0, top: 0, width: data.width, height: data.height, opacity: 0});	
				}
								
				
				var $clipRect = $("<div/>").addClass("slide-show-clip-rect").css({position: "absolute", zIndex: 1, left: 0, right: 0, top: data.topFade, bottom: data.bottomFade, overflow: "hidden" });
				$imageWrapper.append( $clipRect );
				
				var opStep;
				var op;
				var i;
				var $stripe;
				
				if( data.topFade )
				{
					var $topFade = $("<div/>").addClass("slide-show-top-fade-wrapper").css({position: "absolute", zIndex: 2, left: 0, right: 0, top: 0, height: data.topFade});
					opStep = (1 - 0) / data.topFade;
					op = 0;
					for(i=0; i<data.topFade; i++)
					{			
						$stripe = $("<div/>").css({
							margin: 0,
							padding: 0,
							opacity: op,
							height: "1px",
							overflow: "hidden",
							background: "url("+img.image+") 0px "+(-i)+"px no-repeat",
							backgroundSize: data.width +"px "+ data.height +"px",
						}).appendTo( $topFade );
						op += opStep; 
					}
					$imageWrapper.append( $topFade );
				}
				
				if( data.bottomFade )
				{
					var $bottomFade = $("<div/>").addClass("slide-show-bottom-fade-wrapper").css({position: "absolute", zIndex: 2, left: 0, right: 0, bottom: 0, height: data.bottomFade});
					opStep = (1 - 0) / data.bottomFade;
					op = 1;
					for(i=0; i<data.bottomFade; i++)
					{						
						$stripe = $("<div/>").css({
							margin: 0,
							padding: 0,
							opacity: op, 
							height: "1px", overflow: "hidden",
							background: "url("+img.image+") 0px "+(-data.height+data.bottomFade-i)+"px no-repeat",
							backgroundSize: data.width +"px "+ data.height +"px",	
						}).appendTo( $bottomFade );
						op -= opStep; 
					}
					$imageWrapper.append( $bottomFade );
				}
				
				$clipRect.append( $(this) );
			
				$imageWrapper.prependTo( $o );		
				if( new Date().getTime() >= runTime && ! data.isAnimation )
				{
					setTimeout(function(){ slide_switch( $o, direction ); }, 10);					
				}
			})
			.css({ position: "absolute", top: -data.topFade, left: 0, width: data.width, height: data.height, zIndex: 1})		
			.attr("id", img.id)
			.attr("src", img.image);	
		}
			
	}
	
	function slide_switch( $o, direction ) {
		
		if( $o.length )
		{
			if( $("img", $o ).length )
			{
				
				var data = $o.data( data_name );
				
				if( ! data || data.isAnimation || data.isLoading ) return;
				
				
				if( data.activeDirection != direction )
				{
					//alert(direction);
					
					
					if( direction == -1 )
					{
						data.activeIndex--;
						
						if( data.activeIndex < 0 )
						{
							data.activeIndex = data.imagesCount - 1;
						}	
					}
					else
					{
						data.activeIndex++;				
						if( data.activeIndex >= data.imagesCount )
						{
							data.activeIndex = 0;
						}				
					}
					
					return load_next_image( $o, 0, direction );
				}
				
				if( data.fullscreenMode )
				{
					_adjust( $o );	
				}
				 
				
				data.isAnimation = true;
				var $cur = $(".slide-show-image-wrapper:first", $o );
				
				var duration = data.isFirstLoad ? data.settings.duration / 2 : data.settings.duration;
				
				if( -1 == data.status )
				{
					duration = 100;
				}
				
				data.isFirstLoad = false;
				
				if( $cur.next(".slide-show-image-wrapper").length )
				{
					$cur.next(".slide-show-image-wrapper").animate({opacity: 0},  duration, function(){
						$(this).remove();
					});
				}
				
				$cur.css({zIndex: 2}).animate({opacity: 1.0},  duration, function(){
					
		            //$(this).next().remove();
		            $(this).css({zIndex: 1});
		            if( 1 != data.imagesCount && data.status > 0 && ! data.settings.suspended )
		            {
		            	data.timeoutId = setTimeout(function(){ slide_switch( $o, direction ); }, data.settings.time );
		            }
		            data.isAnimation = false;
		        });
				if( 1 != data.imagesCount && data.status != 0 )
		        {
		        	load_next_image( $o, new Date().getTime() + duration + data.settings.time, direction );		        	
		        }
			}
			else
			{
				load_next_image( $o, 0, direction );
			}
		}
	}
	

}(jQuery));
