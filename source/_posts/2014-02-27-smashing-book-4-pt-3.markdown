---
layout: post
title: "Notes from reading Smashing Book #4 - pt. 3"
date: 2014-02-27
comments: true
categories: 
---

I went over chapters 5 and 7 of [Smashing Book #4](http://www.smashingmagazine.com/smashing-book-4-new-perspectives/). Chapter 6 written by Addy Osmani about finding and fixing mobile rendering issues reads more like in-depth tutorial on Chrome DevTools and mentions lots of stuff I'm not quite familiar yet so it's not really suitable for short notes. Maybe I will give it individual treatment later on after some research. For more info on the subject, you should visit [Jank Free](http://jankfree.org/) website.

<!-- more -->

## [Chapter 5] Robust, Responsible, Responsive Web Design by Mat Marquis

Be aware of the browsing context, meaning keep in mind slow connections, crappy displays and old browsers.

**Progressive enhancement** - ensures constant access to content.  
**Responsive web design** - provides natural-feeling layout and presentation for accessing content.

> Responsive Web design is, in a sense, a natural extension of progressive enhancement.

DO NOT ever rely on JavaScript for the core functionality of a site!

### Markup

Create a baseline - core markup that enables user access to all site content.

Every feature that is not essential should be treated as enhancement and load via JS.

If there's possibility that content would never be displayed, it should not be ever requested (don't use `display: none`)

**[AjaxInclude](https://github.com/filamentgroup/Ajax-Include-Pattern/)**

> [AjaxInclude](https://github.com/filamentgroup/Ajax-Include-Pattern/) enhances links by using them to fetch a fragment of the linked content. The anchor tag itself serves as the fallback, ensuring that users will be able to access the underlying content whether or not JavaScript is available, but also provides all the information our script would need to fetch the related content and apply it to the page: the location of the document fragment to be used in place of the link; and how that content should be injected into the current page relative to the position of the link.

Carousel example: load first two images, if user clicks next and go to second image, load all the rest with AJAX.

### CSS

Even if design degrades gracefully, parsing advanced styles could cause problems on older devices.

`media="only all"` is native way of conditionally including stylesheets that contain advanced styles.

```
<link rel="stylesheet" href="/css/basic.css">
<link rel="stylesheet" href="/css/enhanced.css" media="only all">
```

For serving old IE we can make good use of conditional comments:

```
<link rel="stylesheet" href="basic.css" id="basic">
<!--[ if ( gte IE 6 ) & ( lte IE8 ) ]>
<link rel="stylesheet" href="enhanced.css">
<![endif]-->
<!--[ if ( !IE ) | ( gte IE 9 ) ]><!-->
<link rel="stylesheet" href="enhanced.css" media="only all">
<!--<![endif]-->
```

[Respond.js](https://github.com/scottjehl/Respond) - script that parses and translates min-width and max-width media query support for IE 6–8.

Bummer: even if stylesheet isn't applied, it will be requested and downloaded in blocking way.

### JavaScript

Again, test for media query support to determine if browsers qualify for enhanced JS experience and load additional, non-core scripts.

Make use of modernizr and [Enhance.js](https://github.com/filamentgroup/enhance)

```
(function(win, undefined) {
  var mqSupport = "matchMedia" in win && win.matchMedia( "only all" ).matches;
  if( !mqSupport && !respond.mediaQueriesSupported ) {
    return;
  }
})( this );
```

> This script checks whether the user’s browser supports the matchMedia method (JavaScript’s native method of parsing media queries) and then, just for good measure, it ensures that the same only all test that we’re using in our CSS passes. If the native method doesn’t exist, it checks against Respond.js’s shimmed media query support. If you’re targeting a specific minimum version of IE for the enhanced experience, this Respond.js test could be swapped out in favor of checking for the existence of an IE conditional class.

```
(function(win, undefined){
  /* This script assumes a conditional comment scheme along the lines of the following:
  <!--[if (lt IE 8) ]> <html class="old-ie"> <![endif]-->
  <!--[if (IE 8) ]> <html class="ie8"> <![endif]-->
  <!--[if (gt IE 8)|!(IE)]><!--> <html> <!--<![endif]-->
  */
  var mqSupport = "matchMedia" in win && win.matchMedia( "only all" ).matches,
  htmlClass = document.getElementsByTagName( "html" )[0].getAttribute( "class" ),
  ie8 = htmlClass && htmlClass.indexOf( "ie8" ) > -1;
  if( !enhanced && !ie8 ){
    return;
  }
})( this );
```

Use [Grunt](http://gruntjs.com/) to minify and concat all scripts into one to reduce number of requests.

### Server

[QuickConcat](https://github.com/filamentgroup/quickconcat) - a server-side concatenation pattern build to work with Enhance.js

> We can use Enhance.js to prepare a list of scripts and style sheets that apply to the user’s context and request them all at once:

```
(function(win, undefined){
  var mqSupport = "matchMedia" in win && win.matchMedia( "only all" ).matches;
  if( !mqSupport && !respond.mediaQueriesSupported ){
    return;
  }
  ejs.addFile.jsToLoad( "js/lib/jQuery.js" );
  ejs.addFile.jsToLoad( "js/lib/konami-code.js" );
  // Load custom fonts > 600px
  if( window.screen.width > 600 ){
    ejs.addFile.cssToLoad( "css/fonts.css" );
  }
  if( Modernizr.touch ) {
    ejs.addFile.jsToLoad( "js/swipe.js" );
    ejs.addFile.cssToLoad( "css/swipe.css" );
  }
  ejs.enhance();
})( this );
```

> When Enhance.js is invoked, all the files queued up with `ejs.addFile.cssToLoad` and `ejs.addFile.jsToLoad` are sent off as a single request, through QuickConcat.

### Images and Video

We can use HTML5 **video element** to deliver assets best suited to the user context

```
<video>
  <source src="vid-large.webm" media="(min-width: 600px)" type="video/webm">
  <source src="vid-large.ogg" media="(min-width: 600px)" type="video/ogg">
  <source src="vid-large.mp4" media="(min-width: 600px)" type="video/mp4">
  <source src="vid-small.webm" type="video/webm">
  <source src="vid-small.ogg" type="video/ogg">
  <source src="vid-small.mp4" type="video/mp4">
  <!-- Fallback for browsers that don’t support 'video': -->
  <a href="vid.mpg">Watch Video</a>
</video>
```

**Picture element** [proposed by Bruce Lawson](http://coding.smashingmagazine.com/2011/11/18/html5-semantics/) in same vein as video element

```
<picture>
  <source src="fullsize.jpg" media="(min-width: 60em)" />
  <source src="small.jpg" />
  <!-- Fallback for browsers that don’t support 'video': -->
  <img src="fallback.jpg" alt="..." />
</picture>
```

**Srcset** attribute [proposed by WHATWG](http://lists.whatwg.org/pipermail/whatwg-whatwg.org/2012-May/035746.html)

```
<img src="fallback.jpg" srcset="small.jpg 320w 1x, small-hd.jpg 320w 2x,
medium.jpg 640w 1x, medium-hd.jpg 640w 2x, large.jpg 1x, large-hd.jpg
2x">
```

While media queries are absolute values, scrset offers set of *suggestions* that would perform based on browsers user settings.

[Responsive Images Community Group](http://responsiveimages.org/) hybrid version:

```
<picture>
  <source media="(min-width: 40em)" srcset="big-sd.jpg 1x, big-hd.jpg 2x">
  <source srcset="small-sd.jpg 1x, small-hd.jpg 2x">
  <img src="small-sd.jpg" alt="">
</picture>
```

Both original versions would still be available to use in cases where you want to target layout but not resolution (picture element without srcset) or you just need resolution-switching aspect (src set without picture element).

[W3C Working Draft](http://www.w3.org/TR/html-srcset/)

[Picturefill](https://github.com/scottjehl/picturefill) - polyfill for `picture` element by Scott Jehl (it can also target resolution by using `device-pixel-ratio` media query)

### SouthStreet

> Filament Group has rolled all the lessons we’ve learned about optimizing delivery of HTML, CSS, JavaScript and images into a project we’re calling [SouthStreet](https://github.com/filamentgroup/southstreet).

> SouthStreet provides you with a set of tools you can use to ensure that devices get the most efficient amount of code possible, while still maintaining broad accessibility and support.

<!-- -->

> The most challenging part of developing for the Web is simplifying: stripping away the inessentials. Responsive Web design can ensure that we don’t hinder the inherent flexibility of the Web; progressive enhancement can ensure that we don’t hinder the inherent usability of the Web

### Links

- <http://cennydd.co.uk/2013/designing-with-context>
- <http://blog.chriszacharias.com/page-weight-matters>
- <https://github.com/scottjehl/eCSSential>

--------

## [Chapter 7] Designing Adaptive Interfaces by Aaron Gustafson

Empathize with end users and treat everyone with respect.

**Progressive enhancement:** taking advantage of fluid and flexible nature of the Web. 

> We should focus on building an experience that is universally accessible and then capitalize on opportunities
presented by different devices, platforms and technologies to enhance that experience.

Continuum of experience - each of steps from point A to point B add to to the experience.

[Do websites need to look exactly the same in every browser?](http://dowebsitesneedtolookexactlythesameineverybrowser.com/)

Websites do not need to function exactly the same in every browser either.

Focus on building up experience from the core up by adding layers and make sure to not undermine experience with design or technical decisions.

### Layer 1: The core

> Text content and basic interactive elements that form a universally usable foundation (links, forms, etc.). Our copywriting (even microcopy like labels and error messages) must be both clear and appropriate.

### Layer 2: Semantics

Elements should enhance semantic meaning of the content (use `article` and `section` instead od `div` or `span`).

Use ARIA roles to enhance accessibility.

### Layer 3: Design

CSS establishes visual hierarchy, enhances the reading experience and reinforces the brand.

Design must not reduce access to the content by obscuring it with low-contras or unnecessary visuals.

### Layer 4: Enhanced Interaction

JavaScript role is to humanize interface and enhance its usability.

> The JavaScripts we write and use should manipulate the document to introduce the necessary markup and styles to create the enhanced interface, thereby reducing the size of the page for non-JavaScript users.

Like CSS, JS should not limit access to the core experience in not executed.

### Considering Constraints

**How Does It Read?**

When we strip everything we are left with text enhanced with hyperlinks. Make sure it's readable.

UI construction flow - outlines the different potential experiences along the continuum need to consider for that interface.

**Connection**

Always consider bandwidth and latency limitations.

Example: Lazy loading images on mobile (but first scrutinize each image’s content to determine is it worth loading).

We use empty paragraph and assign it a data-* attribute pointing to the image we want to load.

```
<p data-image-src="/path/to/my.jpg"></p>
```

Paragraph is by default hidden using CSS `display: none` property (we can target `[data-image-src]` attribute without adding classes).

Use JavaScript to test conditions and decide what to do. 

[Code snippets](https://gist.github.com/teodragovic/626909624878e6665c45)

Output we get on page if image is loaded:

```
<p data-image-src="/path/to/my.jpg" data-image-loaded>
  <img src="/path/to/my.jpg" alt=""/>
</p>
```

CSS rule we use to display lazy-loaded image can make use of media query to ensure images loaded when device was in landscape orientation aren't displaying if screen is too narrow

```
@media only screen and (min-width:400px) {
  [data-img-src][data-image-loaded] {
    display: block;
  }
}
```

Things we can test with JavaScript:

- [Browser width](http://www.geekpedia.com/code100_Get-window-width-and-height.html)
- [Currently employed media query](http://adactio.com/journal/5429/) 
- [Network speed](http://coding.smashingmagazine.com/2011/11/14/analyzing-network-characteristics-using-javascript-and-the-dom-part-1/) 
- [Whether or not the user is on a metered connection](http://www.w3.org/TR/netinfo-api/#attributes-1) 

**No JavaScript**

Use unobtrusive approach when adding JavaScript.

Example: [Building a tabbed interface](https://github.com/easy-designs/tabinterface.js) 

HTML5 document outline implies sections we can use to parse content with JavaScript and dynamically build additional markup needed for enhanced interface.

### Pattern libraries

Break complex pages into isolated components and organize them in pattern libraries.

Adaptive component build process:

UI construction flow → sketch → web prototype → component

Use pattern library for more consistent and flexible interface.

Build your own pattern library; don't use UI frameworks for public sites.

> We’re here to solve problems. To do that, we need to become one with our customers. We need to empathize with them and experience their struggles as if they were our own.

Strike balance between aesthetics and usability.

Build experiences up from the core, following the progressive enhancement philosophy.

### Links

- <http://www.jnd.org/dn.mss/emotion_design_at.html>
- <http://benhoh.com/journal/2012/01/30/from-degradation-to-enhancement>
- <http://futurefriendlyweb.com/>
- <http://en.wikipedia.org/wiki/Fault-tolerant_system>
- <http://www.quirksmode.org/webkit_mobile.html>
- <https://blog.kissmetrics.com/shocking-truth-about-graphics/>
- <http://html5doctor.com/outlines/>
- <http://chrispederick.com/work/web-developer/>
- <https://gimmebar.com/collection/4ecd439c2f0aaad734000022/front-end-styleguides-and-pattern-libraries>
- <http://daverupert.com/2013/04/responsive-deliverables/>
- <https://github.com/bradfrost/patternlab>
- <http://uxdesign.smashingmagazine.com/2011/03/07/lean-ux-getting-out-of-the-deliverables-business/>
