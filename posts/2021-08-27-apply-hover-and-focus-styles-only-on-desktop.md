---
title: Apply hover and focus styles only on desktop
date: 2021-08-27
tags:
  - dev
  - sass
  - css
  - link
layout: post
---

...or [how to avoid hover and focus styles on touchscreens](https://medium.com/@mezoistvan/finally-a-css-only-solution-to-hover-on-touchscreens-c498af39c31c).

```scss
@mixin desktop-hover-focus() {
    @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:focus {
            @content;
        }
    }
}
```
