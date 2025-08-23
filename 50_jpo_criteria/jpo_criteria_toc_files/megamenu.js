; (function ($) {

	// PC用 
	var nav = $('#tmp_gnavi2');

	$(nav).load('/shared/inc/gnavi.html', function () {
		$('#tmp_gnavi2 > ul > li > a').text('');
		$('.mega_menu_hidden').append('<div class="megamenu_close"><img src="/shared/images/navi/gnavi/func_close.png" alt="メニューを閉じる"></div><div class="megamenu_scr"><img src="/shared/images/navi/gnavi/gnavi_megamenu_scr.png" alt="スクロール"></div>');
		$('.megamenu_close').on('click', function () {
			$('.mega_menu_hidden').removeClass('active');
			$('#tmp_gnavi2 > ul > li').removeClass('active');
		});

		var winH = $(window).height();

		$('#tmp_gnavi2 > ul > li > a').on('click focusin', function () {
			$('.mega_menu_hidden').removeClass('active');
			$(this).next('.mega_menu_hidden').addClass('active');
			$('#tmp_gnavi2 > ul > li').removeClass('active');
			$(this).parent('li').addClass('active');
			$('.megamenu_scr').removeClass('active');

			var megaH = $(this).next('.mega_menu_hidden').outerHeight();
			var headerH = $('#tmp_wrap_header').outerHeight();
			var scrH = megaH + headerH;
			var diffH = scrH - winH;
			if (winH < scrH) {
				$('.megamenu_scr').addClass('active');

				$(window).scroll(function () {
					if ($(this).scrollTop() > diffH) {
						$('.megamenu_scr').removeClass('active');
					} else {
						$('.megamenu_scr').addClass('active');
					}
				});
			}
		});

		$('#tmp_gnavi2 > ul > li > a').hover(function () {
			$(this).parent('li').addClass('hover_active');
		}, function () {
			$(this).parent('li').removeClass('hover_active');
		});

		$(document).on('click focusin', function (e) {
			if (!$(e.target).closest('#tmp_gnavi2 > ul > li > a, .mega_menu_hidden').length) {
				$('#tmp_gnavi2 > ul > li').removeClass('active');
				$('.mega_menu_hidden').removeClass('active');
			}
		});

		$(document).keydown(ivnt_keydown);
		function ivnt_keydown(e) {
			if (e.keyCode == 27) {
				$('.mega_menu_hidden').removeClass('active');
				$('.megamenu_scr').removeClass('active');
			}
		}

	});

	// スマホ用 
	$('#tmp_hnavi_s_menu a').on('click', function () {
		var sma_sch_len = $('#tmp_sma_navi #tmp_sma_gnavi2').length;
		if (sma_sch_len == 0) {
			$('#tmp_sma_navi .sma_sch').append('<div id="tmp_sma_gnavi2"></div>');
			$('#tmp_sma_rmenu .sma_sch #tmp_sma_gnavi2').remove();
			var nav_sp = $('#tmp_sma_gnavi2');
			$(nav_sp).load('/shared/inc/gnavi.html', function () {
				$('#tmp_sma_gnavi2 > ul > li > a').on('click', function () {
					$(this).toggleClass('open').next().slideToggle();
				});
			});
		}
	});

	//リニューアル用
	$.ajaxSetup({ cache: false });
/*
	$(window).load(function () {
*/
	$(window).on('load', function() {
		var $currenthref = location.pathname.split("/");
		var $currentdir = $currenthref[1];
		$('body').addClass("is-" + $currentdir);
	});

})(jQuery);