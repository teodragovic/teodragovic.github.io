---
title: Skeleton screen
date: 2021-07-26
tags:
  - css
  - dev
  - sass
  - link
layout: post
---

Here is the skeleton screen I built for [Hugo quote flow](https://app.withhugo.com/quote).

<p class="codepen" data-height="450" data-theme-id="dark" data-default-tab="result" data-slug-hash="PomEBgM" data-user="teodragovic" style="height: 450px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/PomEBgM">
  </a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

That was my first time making one. Thankfully, [this CSS-Tricks article](https://css-tricks.com/building-skeleton-screens-css-custom-properties/) helped me get the basics of it.

I didn’t use custom properties but I did use some other tricks. Since you can’t make rounded corners using linear gradients, for rounded shapes I used SVG instead.

```scss
$rectangle: svg-url('<svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect width="420" height="60" rx="6" fill="#ECECED" /></svg>');
```

Here, I made a simple SVG rectangle with rounded borders and saved encoded SVG in Sass variable so I can use it as a background image. For encoding, I used Sass function from [this super useful pen by Jakob](https://codepen.io/jakob-e/pen/doMoML). I’ve been using that pen for years, every time I needed to encode SVG into CSS.

From there, I defined `background-image`, `background-size` and `background-position` for each of four gray shapes that replace pending content on the screen. Note that the first set of values in background properties define the vertical line used for animation. That’s the only value that changes inside `@keyframes` block.

Here is the full code for my skeleton screen (minus SVG encode functions):

```scss
$rectangle: svg-url('<svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect width="420" height="60" rx="6" fill="#ECECED" /></svg>');

.c-skeleton {
    height: 100%;
    background-repeat: no-repeat;
    background-image:
        linear-gradient(
            90deg,
            transparent 20%,
            rgba(#FFF, 0.6),
            transparent 80%
        ),
        linear-gradient(#ECECED 25px, transparent 0),
        linear-gradient(#ECECED 10px, transparent 0),
        $rectangle,
        $rectangle;
    background-size:
        40% 100%,
        100% 25px,
        50% 10px,
        100% 60px,
        100% 60px;
    background-position:
        -150% 0,
        0 0,
        0 35px,
        0 75px,
        0 150px;
    animation:
        loading 1.8s ease-out infinite,
        show 0.3s ease-out forwards;
}

@keyframes loading {
    to {
        background-position:
            150% 0,
            0 0,
            0 35px,
            0 75px,
            0 150px;
    }
}
```
