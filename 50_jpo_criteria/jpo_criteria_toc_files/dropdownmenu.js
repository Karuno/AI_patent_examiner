/* ==================================================

 * jQuery.dropdownmenu.min.js
 *
 * Author:H.Gunji
 * Version: 1.0.3
 * Last Modified: 2013/3/1
 * Library&Plugin: jQuery 1.7.1 jquery.easing.1.3.js
 *
 * Dual licensed under the MIT and GPL licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 
================================================== */
;(function($){var w='dropDownMenu';$[w]={defaults:{menuClass:'drop_down_menu',hiddenClass:'drop_down_hidden',activeClass:'active',onSuffix:'_on.',offSuffix:'_off.',column:1},changeImg:function(a,b,c){a.each(function(){$(this).attrRep({ret:b,rep:c})})}};$.fn[w]=function(t){var u=$.extend({},$[w].defaults,t);var v=this;return this.each(function(k){var l=$(this);l.addClass(u.menuClass);var m=l.find('li').filter(function(){var a=$(this).parent().parent();return a.hasClass(u.menuClass)});var n=m.find('ul');var o=$('a').not(l.find('a'));var p=n.wrap($('<div>').addClass(u.hiddenClass)).parent();var q=m.filter(function(){return!($(this).hasClass(u.activeClass))});var r=q.find(' > a > img');var s=m.last().find('.'+u.hiddenClass);r.bind('mouseout',function(){$[w].changeImg($(this),u.offSuffix,u.onSuffix)});if(u.column>1){p.each(function(){var a=$(this).find('li');var b=a.length;var c=u.column;var d=Math.ceil(b/c);$(this).empty();for(var i=0;i<u.column;i++){var e=(i==0)?0:(d*i);var f=d*(i+1);var g=$('<div>').addClass(u.hiddenClass+i).appendTo($(this));var h=$('<ul>').appendTo(g);var j=a.slice(e,f).appendTo(h)}})}m.each(function(){var a=$(this);var b=a.find('.'+u.hiddenClass);var c=a.find(' > a');var d=a.filter(function(){return!(a.hasClass(u.activeClass))});var e=d.find(' > a > img');a.hover(function(){p.hide();b.show();d.removeClass(u.activeClass);a.addClass(u.activeClass);$[w].changeImg(r,u.onSuffix,u.offSuffix);$[w].changeImg(e,u.offSuffix,u.onSuffix)},function(){b.hide();d.removeClass(u.activeClass);$[w].changeImg(r,u.onSuffix,u.offSuffix)});c.bind('focus.'+w,function(){p.hide();b.show();q.removeClass(u.activeClass);a.addClass(u.activeClass);$[w].changeImg(r,u.onSuffix,u.offSuffix);$[w].changeImg(e,u.offSuffix,u.onSuffix)})});o.each(function(){$(this).bind('focus.'+w,function(){$(this).parents().each(function(){var a=true;if($(this).hasClass(u.menuClass)){a=false;return false}if(a){p.hide();q.removeClass(u.activeClass);$[w].changeImg(r,u.onSuffix,u.offSuffix)}})})});s.css({left:'auto',right:0})})}})(jQuery);