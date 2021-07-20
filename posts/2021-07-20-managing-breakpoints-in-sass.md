---
title: Managing breakpoints in Sass
date: 2021-07-20
tags:
  - dev
  - css
  - sass
layout: post
---

Fist, I define my breakpoint values following [this article](https://www.freecodecamp.org/news/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862/) by David Gilbertson. I find it sensible starting point and something that works well most of the time.

I save values from David's article (and one extra) as Sass variables.

```scss
$bp-tiny:   400px;
$bp-small:  600px;
$bp-medium: 900px;
$bp-large:  1200px;
$bp-huge:   1800px;
```

Next, I add my Sass mixins for managing breakpoints:

```scss
// Breakpoint mixin
// @param {String} $breakpoint - Breakpoint value (usually via variables)
// @param {String} $respond - Breakpoint type (defaults to min-width)
// @requires $breakpoint
@mixin bp($breakpoint, $respond: min-width) {
    @media screen and ($respond: $breakpoint) {
        @content;
    }
}

// Breakpoint helper mixins
@mixin at-min($breakpoint) {
    @include bp($breakpoint, min-width) {
        @content;
    }
}

@mixin at-max($breakpoint) {
    @include bp($breakpoint - 1, max-width) {
        @content;
    }
}
```

Using helper mixins for min and max width helps me keep my brekpoint behaviour consistent. Usage example would look like this:

```scss
.layout {
    height: 100%;

    @include at-min($bp-small) {
        padding-top: 10%;
    }
}
```

## Ems

For a long time I used em-based media-queries just to be on the safe side. It involved defining my breakpoints as unitless values and using Sass function for converting pixels to ems using 16px (browser default) as base. Today, that is [not](https://adamwathan.me/dont-use-em-for-media-queries/) [needed](https://css-tricks.com/em-based-media-queries-are-based-on/) anymore since modern browser got good at handling pixels consistently.
