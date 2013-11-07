/*
Plugin: jQuery Pagallax
Version 0.1
Author: Tyler Moore
Twitter: @commodoretyler
Author URL: http://www.commodoretyler.com

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
  var _window = $(window);
  var windowHeight = _window.height();
  var _pages = [];
  var getHeight;
  var offset;
    
  _window.resize(function () {
    windowHeight = _window.height();
  });
  
  $.fn.pagallax = function(speed){
    var _this = $(this);
    
    $('.pagallaxes').each(function(i,v){
      getHeight = setHeight(this);
      offset = setInitialOffset(this);
      return _pages.push(this);
    });
    
    // Set the height of each page to match the height of the window
    function setHeight(_page){
      return $(_page).css({
        'height': '600px',
        'background-attachment': 'fixed'
      });
    }
    
    function setInitialOffset(_page){
      return $(_page).attr("data-offset", $(_page).offset().top);
    }
    
    var speed = speed || 0.5;
    
    function updateIt(){
      var scrollTop = _window.scrollTop();
      
      $(_pages).each(function(i,v){
        var _elem = $(this);
        var _elemOffset = _elem.offset().top;
        var _initialPos = _elem.attr("data-offset");
        
        // Check to see if page is within the viewport
        if(_elemOffset > (scrollTop + windowHeight) || (_elemOffset + windowHeight) < scrollTop ){
          return;
        }
        
        _elem.css({
          'background-position': "50% " + Math.round((_initialPos - scrollTop) * speed) + "px"
        });
      });

    }
    
    _window.bind('scroll', updateIt).resize(updateIt);
    updateIt();
  }

})(jQuery);