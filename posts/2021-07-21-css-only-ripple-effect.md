---
title: Sass mixin for CSS-only ripple effect
date: 2021-07-21
tags:
  - css
  - sass
  - dev
layout: post
---

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="GRmMgxv" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/GRmMgxv">
  </a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Ripple effect is made popular by [Material Design](https://material.io/develop/ios/supporting/ripple). Original implementation involves JavaScript but if you don’t care about ripple appearing exactly below the pointer, it can be done with pure CSS.

For my purposes, I combined and adapted solutions from [Bence Szabo](https://codepen.io/finnhvman/post/pure-css-ripple-with-minimal-effort) and [Mladen Plavsic](https://github.com/mladenplavsic/css-ripple-effect).

But my implementation had several issues.

First, it used [transform hack](https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/) to create stacking context. This made it difficult to add any additional animations on the element like exit/entrance etc.

I also didn’t wanna set `z-index` since ripple would be placed on all my buttons which can appear in various contexts. Having `z-index` set on an element preemptively could potentially break my layout in weird ways.

The solution was to use [`perspective`](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective) property which would also create stacking context.

```diff
- transform: translate3d(0, 0, 0);
+ perspective: 1px;
```

Second, I had an issue with buttons disappearing in an older version of Chrome on Android. That that didn’t happen with ripple disabled. The issue was caused by using `transform: scale` to produce ripple animation (which I thought was clever due to performance benefits). Changing it to animate `background-size` instead, fixed it.

```diff
    &:before {
-       transform: scale(12);
+       background-size: 15000%;
    }

    &:active:before {
-       transform: scale(0, 0);
+       background-size: 1%;
    }
```

Finally, buttons weren’t responding on the first click and they would cause layout shifts on iOS. [These](https://stackoverflow.com/questions/55008261/my-react-component-does-not-update-in-the-safari-browser/55050203#55050203) [posts](https://stackoverflow.com/questions/31693219/issue-while-using-transitions-opacity-change-overflow-hidden/31698580#31698580) on StackOverflow nudged me to switch `opacity` values from 1 and 0 to floating-point values. That resolved rest of my bugs.

```diff
    &:before {
-       opacity: 0;
+       opacity: 0.01;
    }

    &:active:before {
-       opacity: 1;
+       opacity: 0.99;
    }
```

Here is my final Sass mixin:

```scss
// Apply ripple effect on the element
// @param color of the ripple or falsey to remove previously set ripple
@mixin ripple($color) {
    @if ($color) {
        perspective: 1px;

        &:before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: inherit;
            pointer-events: none;
            background-image: radial-gradient(circle, $color 1%, transparent 1%);
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: 15000%;
            opacity: 0.01;
            transition: background 0.8s, opacity 1s;
            z-index: -1;
        }

        &:active:before {
            background-size: 1%;
            opacity: 0.99;
            transition: 0s !important;
        }
    }
    @else {
        @warn "Must pass color for ripple effect.";
    }
}
```

You can use it on a clickable element (usually a `button`) by passing a color darker or lighter than the background.

```scss
button {
    apperance: none;
    border: none;
    padding: 15px;
    background: #eee;
    @include ripple(#bbb);
}
```
