(function($){})(window.jQuery);

var winH = $(window).height();
var winW = $(window).width();

$(document).ready(function() {

	var $cover = $('.cover');
	var $aet = $('#scr-aether');
	var $cg = $('#scr-cg');
	var $arev = $('#scr-arev');
	var $palm = $('#scr-palmarinha');
	var $gpc = $('#scr-gpc');
	var $scr = $('.screenshot-wrap .screenshot');
	var $mainIntro = $('#main-intro');
	var $cloudsCont = $('#clouds-container');
	$w = $('#wrapper')

	function refreshUI() {
		$('.screenshot-wrap, .svg-wrap').waypoint(function() {
			$(this).addClass('animate');
		}, { 
			offset: '70%'
		});
		
		var $aet = $w.find('#scr-aether');
		var aetLeft = ($aet.parent().width() - $aet.find('img').width()) / 2
		if (aetLeft < 0) {
			aetLeft = 0;
		}
		
		$aet.css({
			left: aetLeft
		});
		
		$w.find('#intro-screenshots')
			.height($aet.find('img').height());	
		
		if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
		    $('.screenshot-wrap, #browser-frames, #social-web').addClass('animate');
		}
		
		if (s) {
			s.refresh();
		}
	}
	
	function redrawSVG() {
		var container;
		if ($('#work-container').length > 0) {
			container = $('#work-container');
		} else {
			container = $('body');
		}
		
		container.find('.browser-frame-wrap').each(function() {
			var $this = $(this);
			$this.find('.main-frame')
				.attr('height', $this.find('img.screenshot').height() + 50)
				.attr('width',  $this.find('img.screenshot').width() + 1);
			
			$this.find('.browser-line')
				.attr('x2', $this.find('img.screenshot').width());
			
			$this.find('.address-bar')
				.attr('width', $this.find('img.screenshot').width() - 90);
		});
	}
	
	function positionElems() {
		$mainIntro.css({
			top: (winH - 450) / 2,
			left: (winW - $mainIntro.width()) / 2
		});
		
		$cover.height(winH).width(winW);
		$cloudsCont.width(winW).height(winH);
		
		var coverTop = (winH - $cover.height()) / 2
		
		if (coverTop > 50) {
			$cover.css({
				marginTop: (winH - $cover.height()) / 2
			});
		}
		$('#wrapper').find('.full-container').width(winW);
	}
	
	positionElems();
	
//	var mountains = $('.mountain');
//	mountains.each(function() {
//		$(this).css({
//			left: (winW - $(this).find('svg').width()) / 4
//		});
//		console.log($(this).find('svg').width());
//	});

	$(window).resize(function() {
		winW = $(window).width();
		winH = $(window).height();
		positionElems();
		refreshUI();
		redrawSVG();
	});
		
	$('.screenshot-wrap, .svg-wrap').waypoint(function() {
		$(this).addClass('animate');
	}, { offset: '70%'});
	
	$('#menu-btn').click(function() {
		$('#main-header').toggleClass('visible');
		$('#menu-btn').toggleClass('clicked');
		return false;
	});
	
	$('#scroll-tip').click(function() {
		$.scrollTo('#intro-container', 1600, {offset: -100});
		return false;
	});
	
	var s; // skrollr
	
	// Initialise skrollr on non-touch devices
	if(!(/Android|iPhone|iPod|iPad|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) && ($('body').hasClass('skrolling'))){
		var s = skrollr.init();
	}
	
	
	
	// Pre-animate svgs on touch devices
	if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
	    $('.screenshot-wrap, .svg-wrap').addClass('animate');
	}
	
	setTimeout(function() {
		$('body').addClass('loaded');
		$('#hc-logo-large').addClass('animate');
		
	}, 12000)
	
	
	$(window).load(function() {
	
		if ($('body').hasClass('default-page')) {
			$('body').addClass('loaded');
		}
		
		
		
		$('#main-intro').css({
			top: (winH - 450) / 2,
			left: (winW - $('#main-intro').width()) / 2
		});
		
		$('#hc-logo-large').css({
			left: (winW - 180) / 2
		});
		
		$aet.css({
			left: ($aet.parent().width() - $aet.width()) / 2
		});
		
		redrawSVG();
		
		
		setTimeout(function() {
			$('#hc-logo-large').addClass('animate');
		}, 500);
		
		// Load portfolio/work on non-mobile devices
		if (!(/Android|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) && ($('body').hasClass('skrolling'))){
			$('#work-container').load('portfolio/index.html #post-content', function() {
				refreshUI();			
				redrawSVG();	
			});
		}
		
		setTimeout(function() {
			$('#scroll-tip').addClass('animate');
			var images = $('.lazy');
			images.each(function() {
				var src = $(this).attr('data-src');
				$(this).attr('src', src);
			});
			if(!(/Android|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
				$('#services-container').load('services/index.html #post-content', function() {
					refreshUI();
				});
			}
		}, 5000);
		
		setTimeout(function() {
			$('.intro-text').addClass('animate');
			redrawSVG();
			setTimeout(function() {
				$('body').addClass('loaded');
			}, 1500);
		}, 3500);
		
		setTimeout(function() {
			$('#main-intro').css({
				top: (winH - 450) / 2,
				left: (winW - $('#main-intro').width()) / 2
			});
		}, 200);		
		
		if(!(/Android|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
			$('#intro-screenshots').height($aet.height());		
		}
		
		if ($('body').hasClass('bts')) {
			$('#hc-cup-main').addClass('animate');
			
			setTimeout(function() {
				$('body').addClass('loaded');
			}, 2600)
		}

	});
	
	$('#contact-messages, #request-quote-form').submit(function(e) {
		var $this = $(this);
		var cmValue = $('#cm-message').val();
		var formdata = $this.serialize();
		var url = $(this).attr('action');
		if ($this.parent().parent().attr('id') == 'request-quote') {
			$('#request-quote .btn-submit').val('Sending...');
		}
		$.ajax({
			type: 'POST',
			data: formdata,
			url: url,
			success: function(data) {
				console.log(data);
				if ($this.parent().parent().attr('id') == 'request-quote') {
					$('#request-quote').modal('hide');
					$('#main-header').removeClass('visible');
					$('#menu-btn').removeClass('clicked');
					$('#request-quote .btn-submit').val('Send Request');
				}
				
				if ($this.parent().parent().parent().parent().attr('id') == 'contact-modal') {
					if ($('#cm-original').val() == '') {
						$('#cm-original').val(cmValue);
					}
					$('#cm-message').val('').attr('placeholder', '');
					$('#cm-status').html('<strong>Message sent!</strong> Feel free to attach more details...');
				}
			},
			error: function(data) {
				console.log(data);
				alert('Sorry, something went wrong! Please try again or contact fresh@hashcooki.es');
			}
		});
		e.preventDefault();
	});
	
	
	$('#private-message-form').submit(function(e) {
		var $this = $(this);
		var formdata = $this.serialize();
		var url = $(this).attr('action');
		$this.find('.btn').val('Sending...');
		$.ajax({
			type: 'POST',
			data: formdata,
			url: url,
			success: function(data) {
				console.log(data);
				$this.hide();
				$('<p>Message sent, thanks!</p>').css('text-align', 'center').appendTo('#private-message div');
			},
			error: function(data) {
				console.log(data);
				alert('Sorry, something went wrong! Please try again or contact fresh@hashcooki.es');
			}
		});
		e.preventDefault();
	});
	
	$('#private-message-form textarea').focus(function() {
		$(this).height(150);
	});
	
	$('#wrapper').on('click','.request-block a', function() {
		var proj = $(this).attr('data-project');
		$('#request-quote #project-type').val(proj);
	});
	
	var previousScroll = 0;
	if (winW > 768) {

		$(window).scroll(function () {
		    var currentScroll = $(this).scrollTop();
		    
		    if (currentScroll < 200) {
		    	$('#main-header').css({
		    		opacity: 1 - (currentScroll / 100)
		    	}).removeClass('scrolled').removeClass('show');
		    }
		    if (currentScroll > 200) {	  
		        if (currentScroll > previousScroll) {
		           $('#main-header').addClass('scrolled').removeClass('show').css('opacity', 0);
		        }
			    if (currentScroll > winH) {
			        if (currentScroll < previousScroll) {
			           $('#main-header').addClass('show');
			        }
		        }
	        }
		    previousScroll = currentScroll;
		});
	}
	
	if (winW < 768) {
	
		if ($('.services-block').length > 0) {
			var blocks = $('.services-block');
			blocks.each(function() {
				var svg = $(this).find('.svg-wrap');
				svg.insertAfter($(this).find('.copy-block h3'));
			});
		}
	
	}
	
	
});