(function($){})(window.jQuery);

var winH = $(window).height();
var winW = $(window).width();

$(document).ready(function() {





	function refreshUI() {
		$('.screenshot-wrap, #browser-frames, #social-web').waypoint(function() {
			$(this).addClass('animate');
		}, { 
			offset: '70%'
		});
		
		$('#skrollr-body').find('#scr-aether').css({
			left: ($('#skrollr-body').find('#scr-aether').parent().width() - 813) / 2
		});
		
		$('#skrollr-body').find('#intro-screenshots')
			.height($('#skrollr-body').find('#scr-aether').height());	
		
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
			
			$this.find('#cg-frame .address-bar')
				.attr('width', $this.find('img.screenshot').width() - 90);
		});
	}

	var $cover = $('.cover');
	
	$cover.height(winH).width(winW);
	$('#clouds-container').width(winW).height(winH);
	
	var coverTop = (winH - $cover.height()) / 2
	
	if (coverTop > 50) {
		$cover.css({
			marginTop: (winH - $cover.height()) / 2
		});
	}
	
	$('#main-intro').css({
		top: (winH - 450) / 2,
		left: (winW - $('#main-intro').width()) / 2
	});
	
	$('#hc-logo-large').css({
		left: (winW - 180) / 2
	});
	
	$('#proj-invoices').waypoint(function() {
		$(this).addClass('visible');
	}, { offset: '75%' });
	
	$('.full-container').width(winW);
	
	var $aet = $('#scr-aether');
	var $cg = $('#scr-cg');
	var $arev = $('#scr-arev');
	var $palm = $('#scr-palmarinha');
	var $gpc = $('#scr-gpc');
	var $scr = $('.screenshot-wrap .screenshot');
	
	$aet.css({
		left: ($aet.parent().width() - 813) / 2
	});
	
	$('.screenshot-wrap, #browser-frames, #social-web').waypoint(function() {
		$(this).addClass('animate');
	}, { offset: '70%'});
	
	$('#menu-btn').click(function() {

	});
	
	$('#scroll-tip').click(function() {
		$.scrollTo('#intro-container', 1600, {offset: -100});
		return false;
	});
	
	var s; // skrollr
	
	if(!(/Android|iPhone|iPod|iPad|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) && ($('body').hasClass('skrolling'))){
		var s = skrollr.init();
	}
	
	if(!(/Android|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
		$('#work-container').load('portfolio/index.html #post-content', function() {
			refreshUI();			
			redrawSVG();	
					
		});
	}
	
	if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
	    $('.screenshot-wrap, #browser-frames, #social-web').addClass('animate');
	}
	
	
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
		if ($this.parent().parent().attr('id') == 'request-quote') {
			$('#request-quote .btn-submit').val('Sending...');
		}
		$.ajax({
			type: 'POST',
			data: formdata,
			url: 'https://formkeep.com/f/9ec0ca575bff',
			success: function(data) {
				console.log(data);
				if ($this.parent().parent().attr('id') == 'request-quote') {
					$('#request-quote').modal('hide');
					$('#request-quote .btn-submit').val('Send Request');
				}
				
				if ($this.parent().parent().parent().parent().attr('id') == 'contact-modal') {
					if ($('#cm-original').val() == '') {
						$('#cm-original').val(cmValue);
					}
					$('#cm-message').val('').attr('placeholder', '');
					$('#cm-status').html('<strong>Message sent!</strong> Feel free to add more details...');
				}
			},
			error: function(data) {
				console.log(data);
				alert('Sorry, something went wrong! Please try again or contact fresh@hashcooki.es');
			}
		});
		e.preventDefault();
	});
	
	$('.request-block a').click(function() {
		var proj = $(this).attr('data-project');
		$('#request-quote #project-type').val(proj);
	});
	
	var previousScroll = 0;
	
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
});