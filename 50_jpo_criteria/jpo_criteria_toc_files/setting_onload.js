
(function($){

	$(function(){

		var bodyObj = $('body');
		var wrapperObj = $('#tmp_wrapper');
		var thisURLObj = new $.gd.Uri();
		var resizeWidthObj = wrapperObj.after('<div id="tmp_resize_width"></div>');
		var deviceWidth = $('#tmp_resize_width').width();
		var smartFlg = (deviceWidth <= 480);
		var tabletFlg = ((deviceWidth >= 481 && deviceWidth <= 768));
		/*
		var ie6Flg = $.browser.msie && $.browser.version < 7;
		var ie7Flg = $.browser.msie && $.browser.version < 8;
		*/
		var ie6Flg = typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined";
		var ie7Flg = typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined";
		var topFlg = (thisURLObj.trimPath == 'http://' + thisURLObj.host) || (thisURLObj.trimPath == 'http://' + thisURLObj.host + '/');
		var ua = navigator.userAgent;
		var f_ua_tablet = (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1) || ua.indexOf('A1_07') > 0 || ua.indexOf('SC-01C') > 0 || ua.indexOf('iPad') > 0;
		var f_ua_smart = (ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('Windows Phone') > 0);

		//アクティブリンク
		$.gd.activeLink({
			area: '#tmp_gnavi',
			level: 1
		});

		$.gd.rollover({
			area: '#tmp_gnavi'
		});

		$.gd.activeLink({
			area: '#tmp_lnavi',
			level: 2
		});

		$.gd.rollover({
			area: '#tmp_125anniversary',
			onSuffix:'_on.jpg',
			offSuffix:'_off.gif'
		});

		$.gd.rollover({
			area: '.wrap'
		});

		$('.wrap ul li span').hide();
		$('.wrap ul li').mouseover( function(){
			$(this).find('span').show();
		});
		$('.wrap ul li').mouseout( function(){
			$(this).find('span').hide();
		});

		//サーチテキスト表示
		//$.gd.searchText();

		//labelの中のimgをクリックした場合でも、任意のinputタグにfocusをあてる
		$.gd.labelClickable();

		//文字サイズ変更
		$.gd.textSize({
			area: '#tmp_header',
			//default 14px
			size: '62.5%,75%,87.5%,112.5%,137.5%,175%',	//10px,12px,14px,18px,22px,28px
			defaultSize: '87.5%'
			//default 12px
			//size: '62.5%,75%,100%,125%,150%',	//10px,12px,16px,20px,24px
			//defaultSize: '75%'
		});

		//max-width指定IE6.0用
		//$.gd.wrapperWidth();

		//ブロックスキップの幅を100%にIE用
		$.gd.blockSkipExpander();

		//開閉式メニュー
	  	$.gd.switchMenu({
			area: '#tmp_lnavi_cnt'
		});

		//タブ切り替え
		$.gd.tab({
			area: '#tmp_maincontents'
		});

		//ギャラリー
		if($.gallery){

			var galleryObj = $('#tmp_gallery');
			var sectionObj = $('#tmp_gallery li');

			galleryObj.gallery({
				sectionObj: sectionObj,
				sendNavi: false,
				orderNavi: true,
				timerId: 'gallery',
				orderNaviType: 'image',
				orderNaviImagePath: '/shared/images/gallery/parts/onavi_',
				orderNaviImageWidth: 16,
				orderNaviImageHeight: 16,
				timerInterval: 4000
			});

			galleryObj.css({
				visibility: 'visible'
			});

			//再生、停止処理
			var listOrderObj = $('#tmp_gallery .list_order');
			var playerObj = $('<div id="tmp_gallery_player"></div>');
			var stopBtnObj = $('<p class="stop_btn"><a href="javascript:void(0);"><img src="/shared/images/gallery/parts/stop_btn.png" alt="画像切り替え動作の停止" width="51" height="21" /></a></p>');
			var playBtnObj = $('<p class="play_btn"><a href="javascript:void(0);"><img src="/shared/images/gallery/parts/play_btn.png" alt="画像切り替え動作の再生" width="51" height="21" /></a></p>');
			var stopFlag = false;
			listOrderObj.before(playerObj);
			var stopBtnAObj = stopBtnObj.find('a');
			var playBtnAObj = playBtnObj.find('a');

			stopBtnObj.appendTo(playerObj);

			stopBtnAObj.on('click', function(){
				$(document).stopTime('gallery');
				stopBtnObj.detach();
				playBtnObj.appendTo(playerObj);
				stopFlag = true;
			});
			playBtnAObj.on('click', function(){
				listOrderObj.find('.active a').trigger('click');
				playBtnObj.detach();
				stopBtnObj.appendTo(playerObj);
			});

			listOrderObj.on('click', function(){
				if(stopFlag){
					playBtnObj.detach();
					stopBtnObj.appendTo(playerObj);
				};
			});
		}

		//マイページ
		var mymenuObj = $('#tmp_mymenu');

		if(mymenuObj.length){
			$('#tmp_mymenu').mymenu({
				entryObj: $('<a href="javascript:void(0);"><img src="/shared/images/mymenu/mymenu_entry_btn.gif" width="220" height="25" alt="このページを登録する" /></a>'),
				alreadyObj: $('<p><img src="/shared/images/mymenu/mymenu_already_btn.gif" width="220" height="25" alt="このページは既に登録済み" /></p>'),
				listPageObj:$('<p><a href="/mypage/index.html"><img src="/shared/images/mymenu/mymenu_all_btn.gif" width="220" height="25" alt="登録したページ一覧" /></a></p>'),
				siteTitle: '経済産業省 特許庁',
				conjunctionTxt: ' \\| ',
				siteTitlePosiotn: 'after'
			});
		}

		//クリックナビ
		if($.clickNavi){
			$('#tmp_default').clickNavi({
				loadfile:'/shared/js/data.xml',
				flag_pnavi_img : true,
				img_path : '/shared/images/clicknavi/pnavi',
				img_rxtension : 'gif',
				img_alt : '',
				btn_close:'<p><a href="javascript:void(0);"><img src="/shared/images/clicknavi/clicknavi_top_btn.png" width="81" height="18" alt="" /></a></p>'
			});
		}

		$("#tmp_default li").hover(
					function () {
						$(this).addClass('active');
					},
					function () {
						$(this).removeClass('active');
					}
					);
					$("#tmp_parent a").focus(
						function () {
							$(this).addClass('active');
						}
					);
					$("#tmp_parent a").blur(
						function () {
							$(this).removeClass('active');
						}
					);

		//ドロップダウンメニュー
		if(!f_ua_tablet){

			if($.dropDownMenu){

				var gnaviObj = $('#tmp_gnavi');
				var gnaviListPath =  '/shared/js/gnavi.js';
				var gnaviLi = gnaviObj.find('li');

				//load時にgnaviの項目の高さをそろえる
				function gnaviFlatHeight(gnaviObj){
					var gnaviLiMaxHeight = 0;
					var gnaviAMaxHeight = 0;
					var gnaviLi = gnaviObj.find('> ul > li');
					var gnaviA = gnaviLi.find('> a');

					gnaviA.each(function(i){
						var self = $(this);
						var height = self.height();
						var liHeight = gnaviLi.eq(i).height();

						if(height > gnaviAMaxHeight){
							gnaviAMaxHeight = height;
							gnaviLiMaxHeight = liHeight;
						}
					});

					/*
					if($.browser.msie && $.browser.version < 7.0){
					*/
					if(typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined"){
						gnaviA.height(gnaviLiMaxHeight);
					}else{
						gnaviA.css({minHeight: gnaviAMaxHeight});
					}

					//ie7以下のみドロップダウンの表示位置をトップから数値で指定
					/*
					if($.browser.msie && $.browser.version < 8.0){
					*/
					if(typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined"){
						gnaviObj.find('.drop_down_hidden')
							.css({
								top: gnaviLiMaxHeight + 'px'
							});
					}
				}

				$.ajax({
					url: gnaviListPath,
					cache: false,
					dataType: 'script',
					success: function(data, status, xhr){

						//load時にgnaviの項目の高さをそろえる
						gnaviFlatHeight(gnaviObj);

						if(gnaviListArray){
							var gnaviData = $(gnaviListArray);
							var gnaviLi = gnaviObj.find('> ul > li');

							gnaviLi.each(function(i){
								var self = $(this);
								var thisGnaviArray = gnaviListArray[i];

								if(thisGnaviArray.length){
									var ul = $('<ul>');

									for(var j = 0; j < thisGnaviArray.length; j++){
										var li = $('<li>');
										var a = $('<a>');
										var thisGnaviLiArray = thisGnaviArray[j];
										var thisGnaviLiPath = (function(){
											var path = thisGnaviLiArray[0];

											if(!path.match(/^http/) && path.match(/^\//)){

												path = 'http://' + thisURLObj.host + thisGnaviLiArray[0];

											}

											return path;
										})();
										var thisGnaviLiTitle = thisGnaviLiArray[1];

										a.attr({href: thisGnaviLiPath}).html(thisGnaviLiTitle).appendTo(li);
										li.appendTo(ul);
									}

									ul.appendTo(self);
								}


							});

							gnaviObj.dropDownMenu({
								column: 1
							});

							var wrap = $('<div class="inner_drop_down_hidden">');
							var dropDownHiddenBox = $('#tmp_gnavi .drop_down_hidden').wrapInner(wrap);
							var surplusNum = 3;
							var dropDownHiddenRightBox = dropDownHiddenBox.slice(dropDownHiddenBox.length - surplusNum);

							dropDownHiddenRightBox.css({
								left: 'auto',
								right: '0'
							});

							//ie6以下のみドロップダウンの表示位置をトップから数値で指定
							if(ie6Flg){
								var gnaviA = gnaviLi.find('> a');
								var gnaviLiMaxHeight = 0;
								var gnaviAMaxHeight = 0;

								gnaviA.each(function(i){
									var self = $(this);
									var height = self.height();
									var liHeight = gnaviLi.eq(i).height();

									if(height > gnaviAMaxHeight){
										gnaviAMaxHeight = height;
										gnaviLiMaxHeight = liHeight;
									}
								});

								gnaviObj.find('.drop_down_hidden')
									.css({
										top: gnaviLiMaxHeight + 'px'
									});
							}
						}
					},
					error: function(XMLHttpRequest, status, errorThrown){

						//load時にgnaviの項目の高さをそろえる
						gnaviFlatHeight(gnaviObj);
					}
				});

			}
		}

		//スマホ検索メニュー
		var spMenuPublishObj = $('#tmp_hnavi_s');

		if(spMenuPublishObj.length && smartFlg){

			var headerObj = $('#tmp_wrap_header');
			var gsearchObj = $('#tmp_gsearch');
			var gsearchAction = gsearchObj.attr('action');
			var gsearchSearchId = gsearchObj.find('input[name="cx"]').val();
			var snaviObj = $('#tmp_hnavi');
			var snavi2Obj = $('#tmp_hnavi2');
			var gnaviObj = $('#tmp_gnavi');
			var lnaviObj = $('#tmp_lnavi');
			var searchObj = $('#tmp_search');

			var spNaviSearchBtnObj = $(
				'<li id="tmp_hnavi_s_search_menu">' +
					'<a href="javascript:void(0);">' +
						'<span>' +
							'検索' +
						'</span>' +
					'</a>' +
				'</li>'
			);

			spMenuPublishObj.append(spNaviSearchBtnObj);

			var spMenuObj = $(
				'<div id="tmp_sma_menu">' +
					'<div class="wrap_sma_sch" id="tmp_sma_navi">' +
						'<div class="sma_sch">' +
							'<div id="tmp_sma_snavi">' +
								'<ul>' +
								'</ul>' +
							'</div>' +
/*							'<div id="tmp_sma_search">' +
								'<form id="tmp_sma_gsearch" name="tmp_sma_gsearch" action="/search/result.html">' +
									'<div id="tmp_sma_search_inner">' +
										'<p><label for="tmp_sma_query"><img width="30" height="30" src="/shared/site_smartphone/images/header/sma_sch_icon.png" alt=""></label></p>' +
										'<p class="sch_box"><input type="text" value="" name="q" size="31" id="tmp_sma_query"></p>' +
										'<p class="sch_btn"><input type="submit" value="検索" name="sa" id="tmp_sma_func_sch_btn"></p>' +
										'<p id="tmp_search_hidden">' +
										'</p>' +
									'</div>' +
									'<input type="hidden" name="apid" value="011">' +
									'<input type="hidden" name="size" value="10">' +
									'<input type="hidden" name="pg" value="1">' +
									'<input type="hidden" name="meta" value="1">' +
									'<input type="hidden" name="sort" value="1">' +
								'</form>' +
							'</div>' + */
							'<div id="tmp_sma_snavi2">' +
								'<ul>' +
								'</ul>' +
							'</div>' +
							'<div id="tmp_sma_gnavi">' +
								'<ul>' +
								'</ul>' +
							'</div>' +
						'</div>' +
						'<div id="tmp_sma_rmenu">' +
							'<div class="sma_sch">' +
								'<div id="tmp_sma_rnavi">' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="wrap_sma_sch" id="tmp_sma_search_navi">' +
						'<div class="sma_sch">' +
							'<div id="tmp_sma_search">' +
							'</div>' +
							'<div id="tmp_hnavi_s_search_menu_close">' +
								'<a href="#tmp_wrapper">' +
									'<span>' +
										'閉じる' +
									'</span>' +
								'</a>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="wrap_sma_sch" id="tmp_sma_lmenu">' +
						'<div class="sma_sch">' +
							'<div id="tmp_sma_lnavi">' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			);

			var snaviSpUlObj = spMenuObj.find('#tmp_sma_snavi ul');
			var snavi2SpUlObj = spMenuObj.find('#tmp_sma_snavi2 ul');
			var gnaviSpUlObj = spMenuObj.find('#tmp_sma_gnavi ul');
			var lnaviSpObj = spMenuObj.find('#tmp_sma_lnavi');
			var spMenuPopObj = spMenuObj.find('.wrap_sma_sch');
			var spNaviObj = spMenuObj.find('#tmp_sma_navi');
			var spSearchNaviObj = spMenuObj.find('#tmp_sma_search_navi');
			var spSearchObj = spMenuObj.find('#tmp_sma_search');
			var spLnaviObj = spMenuObj.find('#tmp_sma_lmenu');
			var spMenuBtnObj = spMenuPublishObj.find('a');
			var spNaviBtnAObj = $('#tmp_hnavi_s_menu a');
			var spNaviSearchBtnAObj = $('#tmp_hnavi_s_search_menu a');
			var spLnaviBtnObj = $('#tmp_hnavi_s_lnavi');
			var spLnaviBtnAObj = $('#tmp_hnavi_s_lnavi a');

			snaviObj.find(' > li > a').each(function(i){
				var self = $(this);
				var href = self.attr('href');
				var text = self.text();
				var li = $('<li>');
				var a = $('<a>');

				a
					.attr({href: href})
					.text(text)
					.appendTo(li);

				li
					.appendTo(snaviSpUlObj);
			});

			snavi2Obj.find(' > li > a').each(function(i){
				var self = $(this);
				var href = self.attr('href');
				var img = self.find('img');
				var text = img.attr('alt');
				var li = $('<li>');
				var a = $('<a>');

				a
					.attr({href: href})
					.text(text)
					.appendTo(li);
				li
					.appendTo(snavi2SpUlObj);
			});

			gnaviObj.find(' > ul > li > a').each(function(i){
				var self = $(this);
				var href = self.attr('href');
				var img = self.find('img');
				var text = img.attr('alt');
				var li = $('<li>');
				var a = $('<a>');

				a
					.attr({href: href})
					.text(text)
					.appendTo(li);
				li
					.appendTo(gnaviSpUlObj);
			});

			if(lnaviObj.length){
				lnaviObj.appendTo(lnaviSpObj);
				var disCateNavi = lnaviSpObj.find('.cate_ttl');
				disCateNavi.css({
					display: 'none'
					});
			}

			var max_height = Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);

			spMenuPopObj
				.css({top: headerObj.height() + 5 + 'px'})
				.height(max_height);

			spNaviBtnAObj
				.attr({href: 'javascript:void(0);'})
				.bind('click.spMenu',function(){
						var self = $(this);
						var flg = spNaviObj.css('display') == 'none';

						max_height = Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
						spMenuPopObj.height(max_height);

						spLnaviBtnAObj.removeClass('active');
						spLnaviObj.hide();
						if(self.hasClass('active')){
							self.removeClass('active');
							spNaviObj.hide();
						}
						if(flg){
							self.addClass('active');
							spNaviObj.show();
						}
					}
				);

			spNaviSearchBtnAObj
				.bind('click.spMenu',function(){
						var self = $(this);
						var flg = spSearchNaviObj.css('display') == 'none';

						max_height = Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
						spMenuPopObj.height(max_height);

						if(self.hasClass('active')){
							self.removeClass('active');
							spSearchNaviObj.hide();
						}
						if(flg){
							self.addClass('active');
							spSearchNaviObj.show();
						}
					}
				);

			spLnaviBtnAObj
				.attr({href: 'javascript:void(0);'})
				.bind('click.spMenu',function(){
						var self = $(this);
						var flg = spLnaviObj.css('display') == 'none';

						max_height = Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
						spMenuPopObj.height(max_height);

						spNaviBtnAObj.removeClass('active');
						spNaviObj.hide();
						if(self.hasClass('active')){
							self.removeClass('active');
							spLnaviObj.hide();
						}
						if(flg){
							self.addClass('active');
							spLnaviObj.show();
						}
					}
				);

			spMenuPublishObj.after(spMenuObj);

			var spNaviSearchCloseBtnAObj = $('#tmp_hnavi_s_search_menu_close a');

			spNaviSearchCloseBtnAObj
				.bind('click.spMenu',function(e){
						e.preventDefault();
						var self = $(this);
						var flg = spSearchNaviObj.css('display') == 'none';

						max_height = Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
						spMenuPopObj.height(max_height);

						if(spNaviSearchBtnAObj.hasClass('active')){
							spNaviSearchBtnAObj.removeClass('active');
							spSearchNaviObj.hide();
						}
						if(flg){
							spNaviSearchBtnAObj.addClass('active');
							spSearchNaviObj.show();
						}

						var buffer = 0;
						var speed = 500;
						var href= $(this).attr('href');
						var target = $(href == '#' || href == '' ? 'html' : href);
						var position = target.offset().top + buffer;
						$('body,html').animate({scrollTop:position}, speed, 'swing');
					}
				);

			searchObj.children().eq(1).replaceWith('<gcse:search></gcse:search>');
			spSearchObj.append(searchObj);

			if(lnaviObj.length){
				spLnaviBtnObj.css({
					display: 'block'
				});
			}else{
				spLnaviBtnObj.css({
					display: 'none'
				});
				spLnaviObj.css({
					display: 'none'
				});
			}

		}

		var snavi = $('#tmp_sma_rnavi');
		var lnavi = $('#tmp_sma_lnavi');
		var _rnavi = $('.col_rgt_navi');
		var _lnavi = $('.col_lft_navi');
		if(_rnavi.length){	//右ナビがある
			snavi.append(_rnavi);

			//１階層
			var _sma_rnavi_box = snavi.find('.rnavi_box');
			var _sma_rnavi_btn = snavi.find('.rnavi_btn');

			if(_sma_rnavi_box.length){
				//リスト
				_sma_rnavi_box.find('img').each(function(){
					var alt = $(this).attr('alt');
					$(this).after(alt);
					$(this).remove();
				});
			}

			if(_sma_rnavi_btn.length){
				//リスト
				_sma_rnavi_btn.find('img').each(function(){
					var alt = $(this).attr('alt');
					$(this).after(alt);
					$(this).remove();
				});
			}

		}
		else if(_lnavi.length) {	//左ナビがある
			//_lnavi.appendTo(snavi);
			var _lnaviObj = $('#tmp_lnavi');
			if(_lnaviObj.length) {
				lnavi.append(_lnaviObj);
				//アクティブリンク
				$.gd.activeLink({
					area: '#tmp_sma_lnavi_cnt',
					level: 1
				});

			}
		}
		else {
			//_rnavi
			//_lnavi　がない
			$('#tmp_hnavi_s_menu').hide();
		}

		//パンクズ表示
		var pankuzuObj = $('#tmp_pankuzu');

		if(pankuzuObj.length && smartFlg){
			var mainContentsObj = $('.col_main');

			pankuzuObj.appendTo(mainContentsObj);
		}

	});

})(jQuery);
