
jQuery.noConflict();

(function($){
	
	$(function(){

		//スタイルシート切り替え
		$.gd.changeStyle({
			area: '#tmp_header'	//ページ内に仕込む場合#tmp_contentsにする
		});
		
	});

})(jQuery);
