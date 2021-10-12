---
title: CSS only horizontal scrolling slider
date: 2021-10-12
tags:
  - css
  - sass
  - dev
  - link
layout: post
---

Using [CSS-Tricks](https://css-tricks.com/css-only-carousel/) for inspiration.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="oNegMqK" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/oNegMqK">
  css slider 5</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

My markup is a single wrapper element with `.c-slides` class.

```html
<div class="c-slides">
   <div>one</div>
   <div>two</div>
   <div>three</div>
   <div>four</div>
   <div>five</div>
   <div>six</div>
</div>
```

Basic CSS (note that I’m using Sass here) for making horizontal scrolling slider is:

```scss
.c-slides {
    display: flex;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;

    & > * {
        scroll-snap-align: start;
        flex: 0 0 auto;
        width: 100%;
    }
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="yLoyEMe" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/yLoyEMe">
  css slider 1</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Number of visible slides

To change the number of visible slides depending on the viewport add some breakpoints.

```scss
.c-slides {
    display: flex;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;

    & > * {
        scroll-snap-align: start;
        flex: 0 0 auto;
        width: 100%;

        // show two slides at 900px
        @media (min-width: 900px) {
            width: 50%;
        }

        // show three slides at 1200px
        @media (min-width: 1200px) {
            width: percentage(1/3);
        }
    }
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="VwzYdVV" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/VwzYdVV">
  css slider 2</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## CSS scrolling shadows

To produce left and right shadows we can add some linear gradients on the background. This is the trick I picked up from [Lea Verou](https://lea.verou.me/2012/04/background-attachment-local/). `$background` needs to match the surrounding background while `$shadow` and `$size` can be tweaked for the best effect.

```scss
.c-slides {
    display: flex;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;

    $size: 8;
    $shadow: black;
    $background: #efefef;

    background:
        linear-gradient(to right, $background $size * 1%, transparent),
        linear-gradient(to right, transparent, $background ((100 - $size) * 1%)) 0 100%,
        linear-gradient(to right, $shadow, transparent $size * 1%),
        linear-gradient(to left, $shadow, transparent $size * 1%);
    background-attachment: local, local, scroll, scroll;
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="OJjPEqJ" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/OJjPEqJ">
  css slider 3</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Scrollbar

Make scrollbar look a bit nicer across browsers using `-webkit-scrollbar-*` properties. Again, the background value of `webkit-scrollbar-track` needs to match the surrouding background.

```scss
.c-slides {

    // ...other styles...

    &::-webkit-scrollbar {
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #efefef;
    }
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="mdMyKNN" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/mdMyKNN">
  css slider 4</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Final

Here is final code snippet:

```scss
.c-slides {
    $size: 8;
    $shadow: black;
    $scrollbar-color: #ddd;
    $background: white;

    display: flex;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;

    background:
        linear-gradient(to right, $background $size * 1%, transparent),
        linear-gradient(to right, transparent, $background ((100 - $size) * 1%)) 0 100%,
        linear-gradient(to right, $shadow, transparent $size * 1%),
        linear-gradient(to left, $shadow, transparent $size * 1%);
    background-attachment: local, local, scroll, scroll;

    &::-webkit-scrollbar {
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: $scrollbar-color;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: $background;
    }

    & > * {
        scroll-snap-align: start;
        flex: 0 0 auto;
        width: 100%;

        // show two slides at 900px
        @media (min-width: 900px) {
            width: 50%;
        }

        // show three slides at 1200px
        @media (min-width: 1200px) {
            width: percentage(1/3);
        }
    }
}
```
