(function($){})(window.jQuery);

var winH = $(window).height();
var winW = $(window).width();

$(document).ready(function() {
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
	
	$('#start').css({ 
		'marginTop': winH
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
		$('#menu-btn').toggleClass('clicked');
		$('#nav-items').toggle();
		
		return false;
	});
	
	$('#scroll-tip').click(function() {
		$.scrollTo('#intro-container', 1600, {offset: -100});
		return false;
	});
	
	
	$(window).load(function() {
		
		$aet.css({
			left: ($aet.parent().width() - $aet.width()) / 2
		});
		
		$('#intro-screenshots').height($aet.height());
		
		$('#cg-frame .main-frame').attr('height', $cg.height() + 50).attr('width', $cg.width() + 1);
		$('#cg-frame .browser-line').attr('x2', $cg.width());
		$('#cg-frame .address-bar').attr('width', $cg.width() - 90);
		
		$('#arev-frame .main-frame').attr('height', $arev.height() + 50).attr('width', $arev.width() + 1);
		$('#arev-frame .browser-line').attr('x2', $arev.width());
		$('#arev-frame .address-bar').attr('width', $arev.width() - 90);
		
		$('#palm-frame .main-frame').attr('height', $palm.height() + 50).attr('width', $palm.width());
		$('#palm-frame .browser-line').attr('x2', $palm.width());
		$('#palm-frame .address-bar').attr('width', $palm.width() - 90);
		
		$('#gpc-frame .main-frame').attr('height', $gpc.height() + 50).attr('width', $gpc.width() + 1);
		$('#gpc-frame .browser-line').attr('x2', $gpc.width());
		$('#gpc-frame .address-bar').attr('width', $gpc.width() - 90);
		
		
		
		setTimeout(function() {
			$('#clouds-pair #icons g').addClass('popin');
		}, 2000)
		
		setTimeout(function() {
			$('#hc-logo-large').addClass('animate');
		}, 500);
		
		setTimeout(function() {
			$('#clouds-container').addClass('animate');
		},	3500);
		
		setTimeout(function() {
			$('#scroll-tip').addClass('animate');
			var images = $('.lazy');
			images.each(function() {
				var src = $(this).attr('data-src');
				$(this).attr('src', src);
			});
		}, 9000);
		
		setTimeout(function() {
			$('.intro-text').addClass('animate');
		}, 7000);
		
		setTimeout(function() {
			$('#hc-cup-main').addClass('animate');
		}, 200);
		
		if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
		    skrollr.init();
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
	
});

