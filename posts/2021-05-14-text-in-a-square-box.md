---
title: Text in a square box
date: 2021-05-14
tags:
  - dev
  - css
layout: post
---

Say you need to put content in a box that keeps persistant ratio but actual size is determined by the content.

link: https://codepen.io/teodragovic/pen/poNOEBB?editors=1100

Here is the markup:

```html
<div class="c-box">
    <div class="c-box__inner">
        Lorem Ipsum
    </div>
</div>
```

And here are the styles:

```css
* { box-sizing: border-box; }

.c-box {
    display: inline-block;
}

.c-box__inner {
    width: 100%;
    display: flex;
    align-items: center;
    margin: auto 20px;

    &:before {
        content: "";
        padding-top: 100%;
    }
}
```

Once [Safari catches up](https://caniuse.com/?search=aspect-ratio), the `.c-box__inner:before` block can be replaced with `aspect-ratio: 1 / 1`.
