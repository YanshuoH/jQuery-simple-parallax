/*
Plugin: jQuery Parallax
Version 1.1.3
Original Author: Ian Lunn
Modified by Yanshuo HUANG

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
    var getCssValue = function(elem, cssName) {
        return parseInt(elem.css(cssName).replace("px", ""));
    }

    var mouvement = {
        'margin-left': function(elem, marginLeftOriginalValue, currentWindowTop, speedFactor) {
            elem.css('margin-left', marginLeftOriginalValue - currentWindowTop * speedFactor + 'px');
        },
        // 'margin-left:right': function(elem, marginLeftOriginalValue, currentWindowTop, speedFactor) {
        //     elem.css('margin-left', marginLeftOriginalValue + currentWindowTop * speedFactor + 'px');
        // },
        'margin-right': function(elem, marginLeftOriginalValue, currentWindowTop, speedFactor) {
            elem.css('margin-right', marginLeftOriginalValue + currentWindowTop * speedFactor + 'px');
        },
        // 'margin-right:right': function(elem, marginLeftOriginalValue, currentWindowTop, speedFactor) {
        //     elem.css('margin-right', marginLeftOriginalValue - currentWindowTop * speedFactor + 'px');
        // },
    }

    $.fn.parallax = function(name, speedFactor, outerHeight) {
        var $this = $(this);
        var marginLeftOriginalValue = parseInt($this.css('margin-left').replace('px', ''));
        var getHeight;
        var firstTop;
        var windowPreviewTop;
        var paddingTop = 0;

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
            var pos = $window.scrollTop();

            $this.each(function(){
                var $element = $(this);

                var top = $element.offset().top;
                var height = getHeight($element);

                // Check if totally above or totally below viewport
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }

                mouvement[name]($this, marginLeftOriginalValue, pos, speedFactor);
            });

            windowPreviewTop = pos;
        }

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);
