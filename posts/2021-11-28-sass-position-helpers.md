---
title: Sass position helpers
date: 2021-11-28
tags:
  - dev
  - sass
---

I lifted this mixin from [Bourbon](https://www.bourbon.io/docs/latest/#position) a long time ago (code is from V4 or even earlier) and I still use it regularly in almost every project.

```scss
// Unpacking function used in position() mixin
@function unpack($shorthand) {
    @if length($shorthand)==1 {
        @return nth($shorthand, 1) nth($shorthand, 1) nth($shorthand, 1) nth($shorthand, 1);
    }
    @else if length($shorthand)==2 {
        @return nth($shorthand, 1) nth($shorthand, 2) nth($shorthand, 1) nth($shorthand, 2);
    }
    @else if length($shorthand)==3 {
        @return nth($shorthand, 1) nth($shorthand, 2) nth($shorthand, 3) nth($shorthand, 2);
    }
    @else {
        @return $shorthand;
    }
}

// Bourbon.io positioning mixin
@mixin position($position: relative, $coordinates: null null null null) {

    @if type-of($position) == list {
        $coordinates: $position;
        $position: relative;
    }

    position: $position;

    $coordinates: unpack($coordinates);
    $top: nth($coordinates, 1);
    $right: nth($coordinates, 2);
    $bottom: nth($coordinates, 3);
    $left: nth($coordinates, 4);

    @if (not ($top == null)) {
        top: $top;
    }
    @if (not ($right == null)) {
        right: $right;
    }
    @if (not ($bottom == null)) {
        bottom: $bottom;
    }
    @if (not ($left == null)) {
        left: $left;
    }
}

// Positioning helper mixins
@mixin absolute($args) {
    @include position(absolute, $args);
}

@mixin fixed($args) {
    @include position(fixed, $args);
}

@mixin relative($args) {
    @include position(relative, $args);
}
```

The main `position` mixin takes two arguments: CSS position value and coordinates (no commas between them). Coordinates can be listed in shorthand format and `unpack` function is used to properly map them. Those marked as `null` get omitted from the final output.

Other mixins are the ones I actually use in code, depending on the position I want to achieve. I find myself using `absolute` almost exclusively.

## Alternative

This is alternative `absolute` helper I [found recently](/blog/knockout-text-in-css/). It requires passing all direction values (this time comma separated) so instead of `null` I have to use `auto` so all values always get outputted. But I like the simplicity.

```scss
@mixin absolute($top: auto, $right: auto, $bottom: auto, $left: auto) {
    position: absolute;
    top: $top;
    right: $right;
    bottom: $bottom;
    left: $left;
}
```
