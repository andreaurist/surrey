$(function(){
	$('.date-pick').datepick({
		dateFormat: 'mm/dd/yyyy', 
		showTrigger: '<img src="http://thesurrey.orphdigital2.com/templates/default/en/images/calendar.jpg"/>'
	});
});

$(document).ready(function(){
	$(".event-overlay")
	.css({opacity: 0, display: "block"}).addClass("event-overlay-hover")
	.hover(
		function(){
			$(this).css({opacity: 0.3});
		},
		function(){
			$(this).css({opacity: 0});
		}
	);
	$(".relais").css({opacity: 0.6});

	$(".page-uid-press .page-text .press").remove();
	$(".press-archive-data .press:first").clone().appendTo($(".page-uid-press .page-text"));
	
	$(".page-uid-press .page-text .press-overlay").css({opacity: 0, background: "#000"})
	.hover(
		function(){
			$(this).css({opacity: 0.3});
		},
		function(){
			$(this).css({opacity: 0});			
		}		
	);

	var is_press_animation = false;

	$(".press-view-archive").click(function(){

		if( is_press_animation ) return false;

		is_press_animation = true;
		
		if( $(this).hasClass("expanded") )
		{
			//$(".page-uid-press .page-content-wrapper").animate({width: 474}, 400);
			//$(".page-uid-press .image-bg").animate({width: 694}, 400);
			$(".page-uid-press .page-text").animate({left: 7}, 400, function(){
				
			});

			$(".press-archive-navigation").animate({right: "100%", opacity: 0}, 400, function(){
				is_press_animation = false;
				$(this).hide();
				$(".press-view-archive").html("View Archive").removeClass("expanded");

				if( $(".page-uid-press .page-text .press").length )
				{
					$(".page-uid-press .page-text .press").fadeOut(400, function(){
						$(this).remove();
						$(".press-archive-data .press:first").clone().hide().appendTo($(".page-uid-press .page-text")).fadeIn(400);

						$(".page-uid-press .page-text .press-overlay").css({opacity: 0, background: "#000"})
						.hover(
							function(){
								$(this).css({opacity: 0.3});
							},
							function(){
								$(this).css({opacity: 0});
							}
						);
					});
				}
				else
				{
					$(".press-archive-data .press:first").clone().hide().appendTo($(".page-uid-press .page-text")).fadeIn(400);

					$(".page-uid-press .page-text .press-overlay").css({opacity: 0, background: "#000"})
					.hover(
						function(){
							$(this).css({opacity: 0.3});
						},
						function(){
							$(this).css({opacity: 0});
						}
					);
				}
			});
		}
		else
		{
			//$(".page-uid-press .page-content-wrapper").animate({width: 558}, 400);
			//$(".page-uid-press .image-bg").animate({width: 778}, 400);
			$(".page-uid-press .page-text").animate({left: "30%"}, 400, function(){
				
			});
			$(".press-archive-navigation").css({opacity: 0, right: "100%"}).show().animate({right: "70%", opacity: 1}, 400, function(){
				is_press_animation = false;
				$(".press-view-archive").html("View Current").addClass("expanded");				
			});
		}
		return false;
	});

	$(".press-nav-year_month a").click(function(){
		$(".page-uid-press .page-text .press").remove();
		if( $(".page-uid-press .page-text .press").length )
		{
			$(".page-uid-press .page-text .press").fadeOut(400, function(){
				$(this).remove();
				$($(this).attr("rel")).clone().hide().appendTo($(".page-uid-press .page-text")).fadeIn();
				$(".page-uid-press .page-text .press-overlay").css({opacity: 0, background: "#000"})
				.hover(
					function(){
						$(this).css({opacity: 0.3});
					},
					function(){
						$(this).css({opacity: 0});			
					}		
				);
			});
		}
		else
		{
			$($(this).attr("rel")).clone().hide().appendTo($(".page-uid-press .page-text")).fadeIn(400);
			$(".page-uid-press .page-text .press-overlay").css({opacity: 0, background: "#000"})
			.hover(
				function(){
					$(this).css({opacity: 0.3});
				},
				function(){
					$(this).css({opacity: 0});			
				}		
			);
		}
		return false;
	})

	$(".press-nav-year a").click(function(){
		$(".press-nav-year_month").fadeOut(400);
		$($(this).attr("rel")).fadeIn(400);
		return false;
	});
	
	
	
	
	
	//$(".colorboxIframePage").colorbox({width: "400px", height: "400px", iframe: true, scrolling: false});
	$(".colorboxIframePage").on('click', function(e){
		e.preventDefault();
		var x = $('#mailing_list_form').html();
		$.colorbox({ width: "400px", height: "400px", scrolling: false, html: $('#mailing_list_form').html() });
	});
	
	$(".colorboxPDF").colorbox({width: "80%", height: "80%", iframe: true});
	$(".colorboxMap").colorbox({width: "80%", height: "80%", iframe: true});
	
	$(".colorboxJOSEFINA").colorbox({width: "982px", height: "80%", iframe: true});
	$(".colorbox").colorbox();
	$(".opentable").colorbox({width: "1100px", height: "700px", iframe: true});
	//$("#colorbox").append('<div id="cboxLoadedContent1"><img src="http://thesurrey.orphdigital2.com/templates/default/en/images/text-bg.jpg"></div>');
	$(".eb-slide-show").eb_slideshow();
	$(document).bind('cbox_complete', function(){
		$(".eb-slide-show", $("#colorbox")).eb_slideshow();
	});
});

$(document).ready(function(){
	$(document).pngFix();
	$.swapImage(".swapImage");
	jQuery.fn.center = function () {
		this.css("position","absolute");
		this.css("top", ( $(window).height() - this.height() ) / 2 + $(window).scrollTop() + "px");
		this.css("left", ( $(window).width() - this.width() ) / 2 + $(window).scrollLeft() + "px");
		return this;
	};
	jQuery.fn.centerH = function () {
		var $o = $(this);
		$o.css({position: "absolute", left: ( $(window).width() - $o.width() ) / 2+$(window).scrollLeft() + "px" });
		$(window).resize(function() {
			$o.css({position: "absolute", left: ( $(window).width() - $o.width() ) / 2+$(window).scrollLeft() + "px" });   	  		
		});
		return $o;
	};
});

$(function() {
	$('.page-image .preview-wrapper').swipe( {
		swipe:function(event, direction, distance, duration, fingerCount) {
			if(direction == 'left'){
				$('.scroll-right',$(this).parent()).trigger('click');
			}
			else if (direction == 'right'){
				$('.scroll-left',$(this).parent()).trigger('click');
			}
			//alert("You swiped " + direction );  
		},
	});
});

var isWindowScrolling = false;
var windowScrollTimer;
var showPagePreviewTimer;

$(document).ready(function(){
// 	$( window ).scroll(function() {
// 		$(".bottom-wrapper").fadeOut();
// 		clearTimeout(windowScrollTimer);
// 		windowScrollTimer = setTimeout(function(){$(".bottom-wrapper").fadeIn();}, 600);
// 	});
	
	$( window ).scroll(function() {
		$(".arrow-down").fadeOut();
		clearTimeout(windowScrollTimer);
		windowScrollTimer = setTimeout(function(){$(".arrow-down").fadeIn();}, 600);
	});

	var uids = ['contact','best_rate','site_map'];
	for(var i in uids){
		if(location.hash != '#'+uids[i])
			$('div.page-uid-'+uids[i]).hide();
	}
	$('.top-navigation-wrapper a, a.page-uid-site_map, a.page-uid-best_rate').click(function(){
		for(var i in uids){
			$('div.page-uid-'+uids[i]).hide();
			if( $(this).hasClass('page-uid-'+uids[i]) ){
				$('div.page-uid-'+uids[i]).show();
				$(window).trigger('resize');
			}
		}
	});
	$('a.page-uid-best_rate').click(function(){
		$('.reservations-box-wrapper')
			.removeClass('expanded')
			.fadeOut(300);
	});
	
	var getPageId = function(s){
			var exp = /sub-page-([0-9]+)/i;
			var ar = exp.exec(s);
			return parseInt(ar[1]);
	};

	var hidePagePreview = function(){
		clearTimeout(showPagePreviewTimer);
		$(".page-preview-wrapper").fadeOut(400, function(){$(this).remove()});
	};

	var showPagePreview = function($o){
		hidePagePreview();
		var id = getPageId($o.attr("rel"));
		var $contentWrapper = $o.closest(".content-wrapper");
		var $previewWrapper = $("<div/>").addClass("page-preview-wrapper").hide().appendTo( $contentWrapper ); 
		var $title = $("<div/>").addClass("page-preview-title").appendTo($previewWrapper).html($o.html());
		var $image = $("<div/>").addClass("page-preview-image").appendTo($previewWrapper);

			$(".content-wrapper-"+id+" .page-image .eb-slide-show").clone().removeClass("fullscreen-slideshow").appendTo($image);
			$(".slide-show-image-wrapper", $image).remove();		 
			$(".eb-slide-show", $image).eb_slideshow();
			$(".eb-slide-show", $image).eb_slideshow("adjust");

			$("<div class=\"secClose\"/>").css({right: -8, top: -8, left: "auto"}).hover(function(){$(this).addClass("secClose-hover")},function(){$(this).removeClass("secClose-hover")}).appendTo( $previewWrapper );
			$(".secClose", $previewWrapper).click(function(){
				$previewWrapper.fadeOut(300, function(){
					$(this).remove();
				});
				return false;
			});
			

			var $ul = $o.closest(".sub-navigation");
			var p = $ul.position();
			$previewWrapper.css({left: p.left + $ul.outerWidth() + 5, top: p.top + 3}).fadeIn();
	};

	$(".page-uid-packages .sub-navigation li a").hover(
		function(){
			var $o = $(this);
			clearTimeout(showPagePreviewTimer);
			showPagePreviewTimer = setTimeout(function(){showPagePreview($o)}, 300);	
		},
		function(){
			clearTimeout(showPagePreviewTimer);
		}).click(function(){
			hidePagePreview();
		});

	var scrollElem = 'body';
	$("<div class=\"secClose\"/>").css({right: -15, bottom: -15, left: "auto"}).hover(function(){$(this).addClass("secClose-hover")},function(){$(this).removeClass("secClose-hover")}).appendTo( $(".popup-box") );
	$(".popup-box .secClose").css({top: -15}).click(function(){
		$(".popup-box").animate({opacity: 0, width: 0, height: 0}, 300, function(){
			$(this).hide();
		});
		return false;
	});
	$(document).bind('cbox_complete', function(){ 
		if($(window).width() < 640)
			$.colorbox.resize({width:$(window).width()});
	});
	

	$(window).resize(function() {
		var pageidx = $("body").scrollTop() / ( $("#top").height() - $(".top-wrapper").height() );
		$("body").scrollTop( ( $(window).height() - $(".top-wrapper").height() ) * pageidx );

		$(".content-wrapper").not("#top").css({height: $(window).height() - $(".top-wrapper").height() });
		$("#top").css({height: $(window).height() });
		$(".page-content-wrapper .page-text").css({maxHeight: $(window).height() - $(".top-wrapper").height() - 194});
		$(".fullscreen-slideshow").each(function(){
			$(this).eb_slideshow("adjust");
		});
	});
	
    $(window).trigger("resize");
	
    /*$(".promo-box-wrapper").animate({right: 0}, 1000, function(){
		$(this).addClass("expanded");
	});
	
	
    $(".reservations-box-wrapper").animate({right: 0}, 1000, function(){
		$(this).addClass("expanded");
	});
	*/
	
    $('a[href*="#!"]').click(function(){
    	var rexp = /.*#!(.*)/i;
        var ar = rexp.exec( $(this).attr("href") );

        if( $(this).attr("rel") != "" )
        {
        	var $wrapper = $("."+$(this).attr("rel")).closest(".content-wrapper"); 
            var $ul = $(">.sub-pages", $wrapper);
            var $li = $(">li."+$(this).attr("rel"), $ul);
            if( ! $li.hasClass("selected") )
            {
                var idx = $(">li", $ul).index( $li );
                var l = -100*idx;

				$ul.css({left: l + "%"});
                $(">li", $ul).removeClass("selected");
                $li.addClass("selected");
            }
        }

        $.smoothScroll({
           scrollTarget: '#'+ar[1],
           speed: 1000,
           afterScroll: function(){
        	   location.hash = ar[1];
           }
        });
        return false;
    });
    

    var is_animation = false;

    $(".page-uid-menus .menu-category").click(function(){
    	var $sld1;
    	var $sld2;
    	var $slide;
    	if( is_animation ){
        	return false;
    	}
    	
        if( $(this).hasClass("selected") )
        {
        	$(".slide-to-remove", $(".page-uid-menus")).remove();
        	$(".eb-slide-show, .menu-slide", $(".page-uid-menus .page-image")).css({zIndex: 1}).addClass("slide-to-remove");
        	$slide = $(".page-uid-menus .page-text .menu-slide-default").clone();
        	if( $slide.length )
        	{
        		$slide
        		.css({zIndex: 2})
        		.show()
        		.eb_slideshow()
        		.appendTo( $(".page-uid-menus .page-image") );	

        	}
            
        	is_animation = true;
        	$(".page-uid-menus .menu-category").removeClass("selected");
        	
    		$(".page-uid-menus .page-content-wrapper").animate({right: 0, width: 474}, 400, function(){
    			is_animation = false;
        	});
    		$(".page-uid-menus .image-bg").animate({width: 694}, 400);
    		$(".page-uid-menus .object-content-wrapper").hide(400);
            
        }
        else
        {

        	$(".slide-to-remove", $(".page-uid-menus")).remove();
            
        	$(".page-uid-menus .menu-category").removeClass("selected");
        	$(this).addClass("selected");

        	
        	$(".eb-slide-show, .menu-slide", $(".page-uid-menus .page-image")).css({zIndex: 1}).addClass("slide-to-remove");

        	$slide = ( $(".page-uid-menus .page-text .menu-slide-"+$(this).attr("rel")).length ? $(".page-uid-menus .page-text .menu-slide-"+$(this).attr("rel")) : $(".page-uid-menus .page-text .menu-slide-default") ).clone();

        	if( $slide.length )
        	{

        		$slide
        		.css({zIndex: 2})
        		.show()
        		.eb_slideshow()
        		.appendTo( $(".page-uid-menus .page-image") );

        	}

        	
        	is_animation = true;
    		$(".page-uid-menus .page-content-wrapper").animate({right: 345, width: 300, minWidth: 300}, 400, function(){
    			is_animation = false;
        	});
    		$(".page-uid-menus .image-bg").animate({width: 767}, 400);
    		$(".page-uid-menus .object-content-wrapper").hide(400);
    		$(".page-uid-menus #"+$(this).attr("rel")).show(400);
        }	
    	return false;
    });
    var is_animation1 = false;
    $(".page-uid-contact #contact-directions").click(function(){

    	if( is_animation1 )
    	{
        	return false;
    	}
    	
        if( $(this).hasClass("selected") )
        {
        	is_animation1 = true;
        	$(this).removeClass("selected");        	
    		$(".page-uid-contact .page-content-wrapper").animate({right: 0, width: 474}, 400, function(){
    			is_animation1 = false;
        	});
    		$(".page-uid-contact .object-content-wrapper").hide(400);		
        }
        else
        {
        	$(this).addClass("selected");
        	is_animation1 = true;
    		$(".page-uid-contact .page-content-wrapper").animate({right: 345, width: 300, minWidth: 300}, 400, function(){
    			is_animation1 = false;
        	});
    		$(".page-uid-contact .object-content-wrapper").hide(400);
    		$(".page-uid-contact #"+$(this).attr("rel")).show(400);
        }	
    	return false;
    });

    $(".sub-navigation a").click(function(){
        if( $(this).attr("href") == "#" )
        {
            var $wrapper = $(this).closest(".content-wrapper"); 
            var $ul = $(">.sub-pages", $wrapper);
            var $li = $(">li."+$(this).attr("rel"), $ul);
            if( ! $li.hasClass("selected") )
            {
                var idx = $(">li", $ul).index( $li );
                var l = -100*idx;

                $(".vertical-divider", $wrapper).fadeIn();    
                $(".page-content-wrapper", $wrapper).fadeOut();
                $ul.animate({left: l + "%"}, 3000, function(){
                	$(">li", $ul).removeClass("selected");
                	$li.addClass("selected");
                	$(".vertical-divider", $wrapper).fadeOut();
                	$(".page-content-wrapper", $wrapper).fadeIn();    
                });
            }
            return false;
        }
    });

	$(".reservations-button").click(function(){
		var p = $(this).offset();
		
		if( $(".reservations-box-wrapper").hasClass("expanded") ){
			$(".reservations-box-wrapper").removeClass("expanded").hide(400, function(){
			});
		}
		else{
			$(".reservations-box-wrapper").show(400, function(){
				$(this).addClass("expanded");
			});
		}
		return false;
	});
});

function gallery_switch($li, direction, $wrapper){

	var href = $("a", $li).attr('href');
	var title = $("a", $li).attr('title');
	var $next;

	if( '>' == direction )
	{
		$next = $li.next();
		if( 0 == $next.length)
		{
			$next = $(".thumbnails li:first");
		}	
	}
	else
	{
		$next = $li.prev();				
		if( 0 == $next.length)
		{
			$next = $(".thumbnails li:last");
		}		
	}
	var cur_med_img = new Image; 
	$('.gallery-img-title, .gallery-img-title-bg', $wrapper).hide();
	$('.preview-wrapper', $wrapper).ajax_loading("show");
	$(cur_med_img).load(function(){
		$(this).hide();
	    $('.preview-wrapper img, .gallery-title', $wrapper).fadeOut(400, function(){
	    	$('.preview-wrapper img, .gallery-title', $wrapper).remove();
			$('.preview-wrapper', $wrapper).append(cur_med_img);
			if( "" != title )
		    {
		    	$("<div/>").addClass("gallery-title").text(title).appendTo( $('.preview-wrapper', $wrapper) );
		    }
			$('.preview-wrapper', $wrapper).ajax_loading("hide");			
			$(".preview-wrapper", $wrapper).trigger("adjust", []);
			$(".gallery-title", $wrapper).fadeIn();
			$(cur_med_img).fadeIn();
		});
		

		$(this).click(function(){
			$next.trigger('click');
			return false;
		});

		$(".thumbnails .selected", $wrapper).removeClass("selected");
		$li.addClass("selected");
	}).attr('src', href);
	return false;
}

$(document).ready(function(){
	$(".thumbnails li").click(function(){
		var $wrapper = $(this).closest(".content-wrapper");
		return gallery_switch( $(this), '>', $wrapper);		
	});

	$(".scroll-left").click(function(){
		var $wrapper = $(this).closest(".content-wrapper");
		var $next = $(".thumbnails .selected", $wrapper).prev();				
		if( 0 == $next.length)
		{
			$next = $(".thumbnails li:last", $wrapper);
		}	
		return gallery_switch( $next, '<', $wrapper);		
	});

	$(".scroll-right").click(function(){
		var $wrapper = $(this).closest(".content-wrapper");
		var $next = $(".thumbnails .selected", $wrapper).next();				
		if( 0 == $next.length)
		{
			$next = $(".thumbnails li:first", $wrapper);
		}	
		return gallery_switch( $next, '>', $wrapper);
	});

	$(".scroll-left, .scroll-right")
	.css({opacity: 0.4})
	.show()
	.hover(
		function(){$(this).css({opacity: 0.7})},	
		function(){$(this).css({opacity: 0.4})}
	);

	$(".thumbnails").each(function(){
		$("li:first", this).trigger('click');
	});

	$(".preview-wrapper").on('adjust', function() {
			var $wr = $(this);		
			var c1 = 1200 / 800;
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
				t = -(h - h1 ) / 2;
				l = 0;
				$("img", $wr).css({left: l, top: t, width: w, height: h });
			}
			else
			{
				h = h1;
				w = h * c1;
				var t = 0;
				var l = -(w - w1)/2;
				$("img", $wr).css({left: l, top: 0, width: w, height: h });
			}
	});
	$(window).resize(function() {
		$(".preview-wrapper").trigger("adjust", []);		
	});
});


$(document).ready(function(){
	$("#ism2 #submit1").click(function(){
  		return false;
	});
});

var reservationsTimerId;
var reservationsTimeout = 7;

$(document).ready(function(){
		
	$(".reservations-box-close-btn").click(function(){
		var $o = $(".reservations-box-wrapper");
		$o.animate({left: $o.hasClass("expanded") ? -235 : 0 }, 300, function(){
			if( $o.hasClass("expanded") )
			{
				$o.removeClass("expanded");
			}	
			else
			{
				$o.addClass("expanded");
			}
		});
			
		return false;	
	});

});
