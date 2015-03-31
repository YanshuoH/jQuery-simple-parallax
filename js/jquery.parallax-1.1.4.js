/*
Plugin: jQuery Parallax
Version 1.2.0
Original Author: Ian Lunn (Github: https://github.com/IanLunn/jQuery-Parallax)
Modified by Yanshuo HUANG (Github: https://github.com/YanshuoH/jQuery-simple-parallax)

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
    var $window = $(window);
    var windowHeight = $window.height();

    $window.resize(function () {
        windowHeight = $window.height();
    });

    var mouvement = {
        'margin-top': function(elem, originalValue, currentWindowTop, speedFactor) {
            elem.css('margin-top', originalValue + currentWindowTop * speedFactor + 'px');
        },
        'margin-left': function(elem, originalValue, currentWindowTop, speedFactor) {
            elem.css('margin-left', originalValue - currentWindowTop * speedFactor + 'px');
        },
        'margin-right': function(elem, originalValue, currentWindowTop, speedFactor) {
            elem.css('margin-right', originalValue + currentWindowTop * speedFactor + 'px');
        },
        'background-position-x': function(elem, originalValue, currentWindowTop, speedFactor) {
            elem.css('background-position-x', originalValue + currentWindowTop * speedFactor + '%');
        },
        'background-position-y': function(elem, originalValue, currentWindowTop, speedFactor) {
            elem.css('background-position-y', originalValue + currentWindowTop * speedFactor + '%');
        },
        'height': function(elem, originalValue, currentWindowTop, speedFactor) {
            elem.css('height', originalValue + currentWindowTop * speedFactor + 'px');
        },
    }

    var parallaxClassName = 'jquery-parallax-effect';

    $.fn.disableParallax = function() {
        $('.' + parallaxClassName).each(function() {
            var $this = $(this);
            $this.data().resetParallax();
        });
        $window.unbind('scroll');
    }

    $.fn.parallax = function(name, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var windowPreviewTop;
        var originalValue;
        var originalCssValue = $this.css(name);

        if ($this.css(name).search('%') > -1) {
            originalValue = parseInt(originalCssValue.replace('%', ''));
        } else if ($this.css(name).search('px') > -1) {
            originalValue = parseInt(originalCssValue.replace('px', ''));
        }

        //get the starting position of each element to have parallax applied to it
        $this.each(function(){
            firstTop = $this.offset().top;
        });

        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }

        // setup defaults if arguments aren't specified
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;

        windowPreviewTop = $(window).scrollTop();
        // function to be called whenever the window is scrolled or resized
        function update(event, isFirst){
            var currentWindowTop = $window.scrollTop();

            $this.each(function(){
                var $element = $(this);

                // add parallax class for event handling
                $element.addClass(parallaxClassName);
                $this.data({
                    resetParallax: function() {
                        $this.css(name, originalCssValue);
                        $this.removeClass(parallaxClassName);
                    }
                });

                var top = $element.offset().top;
                var height = getHeight($element);

                // Check if totally above or totally below viewport
                if (top + height < currentWindowTop || top > currentWindowTop + windowHeight) {
                    return;
                }

                mouvement[name]($this, originalValue, currentWindowTop, speedFactor);
            });

            windowPreviewTop = currentWindowTop;
        }

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);
