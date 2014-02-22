---
layout: post
title: "Dropping IE conditional classes and thinking fallback-first"
date: 2014-02-11
comments: true
categories: 
---

IE conditional classes are no longer part of my personal [starting setup](https://github.com/teodragovic/bolt). After [lengthy discussion](https://github.com/h5bp/html5-boilerplate/issues/1290) they where also dropped from HTML5 Boilerplate. At first, I wanted to keep them around but after some reading and research I came around.

<!-- more -->

Most common use example for conditional classes usually looks like this:

~~~ html
<!DOCTYPE html>
<!--[if IEMobile 7 ]> <html class="iem7"> <![endif]-->
<!--[if lt IE 7 ]> <html  class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <html  class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <html  class="ie8"> <![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html><!--<![endif]-->
~~~

[Conditional comments](http://msdn.microsoft.com/en-us/library/ms537512.aspx) are used to target specific subsets of Internet Explorer and insert appropriate class on the root element (HTML tag) which then serves as a hook for CSS hacks and overrides. Another option is to write separate CSS just for IE and wrap link to the file inside conditional comment so its not loaded otherwise. 

I still use them for displaying banner for users with IE 8 or older that they should update browser to get the best experience possible.

~~~ html
<!--[if lte IE 8]>
<p class="old-ie">You are using an <strong>outdated browser</strong>. 
Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
~~~

Since they target only one small subset of particular browser conditional classes aren't very useful otherwise. Granted, that particular browser has the most quirks, but with  new CSS additions and rapid development cycles, feature support between various browser versions has become much more disperse. Isolating old versions of single browser just doesn't make much sense anymore. Especially since Microsoft [dropped conditional comments](http://www.sitepoint.com/microsoft-drop-ie10-conditional-comments/) in IE 10.

Also, any kind of browser detection is considered [bad](http://css-tricks.com/browser-detection-is-bad/) and should be [avoided](http://jibbering.com/faq/notes/detect-browser/).

## Feature detection

Much better approach would be using feature detection. [Christian Heilmann](https://twitter.com/codepo8) made great point in new [Smashing Book](http://petakolona.com/blog/smashing-book-4-pt2/) to start projects using only bare essentials that are universally supported to ensure, if everything else fails, content still gets delivered. After laying this bulletproof foundation, for every additional feature we should add support testing and serve extra code goodness only to the browsers that can handle it. Similar to mobile-first approach to responsive design, think of this as fallback-first approach to coding.

Easiest way of doing feature detection is by using [Modernizr](http://modernizr.com/). It's an awesome tool that includes [yepnope](http://yepnopejs.com/) (asynchronous conditional loader) and [html5shiv](https://code.google.com/p/html5shiv/) (enables old browsers to recognize HTML5 selectors).

I use Modernizer in combination with [Bower](http://bower.io/) and [Grunt](http://gruntjs.com/) first by adding it as Bower dependency and pointing to the latest version and then by using [grunt-modernizr](https://github.com/Modernizr/grunt-modernizr) plug-in for compiling production version of script. This way, Modernizr script only includes features I'm detecting and doesn't add any extra weight to the site than it needs to.

## Doing it CSS-only

For projects that don't need any JavaScript there is a CSS-only way of isolating new features from baseline by wrapping them in media query.

~~~ scss
@media all {
	// put all new stuff here
}
~~~

This little snippet always validates true but makes code inside it invisible to old-timey browsers. To keep things even more DRY, you could leverage power of Sass mixins to include media queries inside selectors. 

~~~ scss
@mixin new-stuff {
	@media all {
		@content;
	}
}

.some-class {
	// universal baseline
	@include new-stuff {
			// new features
		}
}
~~~

There are other ways like using pseudo classes `:not(:required)` but I like media queries for wrapping capabilities. To keep CSS file from bloating with all those conditionals, use [CSS Optimizer](https://github.com/css/csso) for optimization before production.

Some CSS properties can't be excluded using media queries since they are implemented in IE 10 but not in IE 9. That includes transitions, animations, gradients, 3D transforms, flexbox, text-shadow and some others. For full list see  [here](http://caniuse.com/#compare=ie+9,ie+10). In all cases, you should always ensure appropriate fallback. 

As a good rule of thumb, if any property needs vendor prefix then it should have universal fallback. As prefixes go, make use of [autoprefixer](https://github.com/ai/autoprefixer) for heavy lifting and just stick to the latest standard syntax.

----

Dropping conditional classes is great move because if forces us to change our thinking for the better. Instead of thinking in legacy support we should approach coding in fallback-first state of mind and use progressive enhancement to ensure our projects longevity and usability across all devices and browsers.
