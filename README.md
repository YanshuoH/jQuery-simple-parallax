# jQuery-simple-parallax

## Motivation
Being tired of learning how the fancy js plugins work for parallax effect on the Internet, like [skrollr](https://github.com/Prinzhorn/skrollr) or [ScrollMagic](https://github.com/janpaepke/ScrollMagic). 

Are they powerful? Yes, of course.

But stupid me finds difficult to implement a very simple parallax effect...

So inspired by (mostly copied from) [jQuery-parallax](https://github.com/IanLunn/jQuery-Parallax) and the author's [tutorial](http://ianlunn.co.uk/articles/recreate-nikebetterworld-parallax/) explaining the principal of how CSS2 can do for the parallax effect, I begin to right one little plugin for it.


## How to
Only locate the element, then chose the effect, then the speed factor.
```
$('#section2').parallax('background-position-y', 0.01);
```
Here's an exemple of calculation equation:
```
elem.css('margin-right', originalValue + currentWindowTop * speedFactor + 'px');
```
The script use the original value of css, then according to the current window position - currentWindowTop (window.scrollTop), multiplied by the speed factor.

## Options
Knowing that there's a 'simple' in the repository title, is this plugin works? Yes. Is it powerful? According to the use case.
For now, it surpport serveral css properties like:
* margin-top
* margin-left
* margin-right
* background-position-x
* background-position-y
* height

Feel free to check out the demo and add whatever property you like.

And most important, change the equations for more reliable effect.

## Demo
Here's the demo: http://yanshuoh.github.io/jQuery-simple-parallax/
