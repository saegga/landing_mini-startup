$(document).ready(function(){
	new WOW().init();
	
	$('.header_slider').slick({
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 1500,
		customPaging : function(slider, i) {
        	return '';
   		},
	});

	$('.messages_slider').slick({
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 1500,
        customPaging : function(slider, i) {
            return '';
        },
	});
	$('.portfolio_slider').slick({
		dots: true,
		autoplay: true,
		autoplaySpeed: 1500,
		prevArrow: $('.prev'),
		nextArrow: $('.next'),
		customPaging : function(slider, i) {
		    return '';
		},
	});
	var pos = Math.floor($('#team').offset().top);
	$(window).scroll(function(){
		if($(this).scrollTop() >= pos){
			$(".button_up").fadeIn();
		}else{
			$(".button_up").fadeOut();
		}
	});
	$(".button_up").on('click', function(){
		$('body, html').animate({scrollTop: 0}, 800)
	});
	if(!$('.menu_portfolio li').first().hasClass("active")){
		$('.menu_portfolio li').first().addClass("active");
	}
	$(".projects").first().css({"display" : "flex"});

	$('.menu_portfolio a').on('click', function(e){
		e.preventDefault();
	});

	$('.menu_portfolio li').on('click', function(){
		var id = $(this).attr("id");

		$('.menu_portfolio li').each(function(i, node){
			if($(node).attr("id") == id){
				$(node).addClass("active");
			}else{
				$(node).removeClass("active");
			}
		});
		$(".projects").each(function(i, node){
			if($(node).attr("id") == id){
				$(node).css({"display" : "flex"}).fadeIn();
			}else{
				$(node).hide();
			}
		});
	});
	$('.top_menu a').on('click', function(e){
		e.preventDefault();
		var id = $(this).attr("href");
		$('body, html').animate({scrollTop: $(id).offset().top}, 800);
	});
});