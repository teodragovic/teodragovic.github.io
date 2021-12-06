---
title: Knockout text in CSS
date: 2021-11-06
tags:
  - dev
  - css
---

A long time ago (in 2015.) I was working on a project that never saw the light of day. What I remember from that project is the design for 404 and 500 pages that required knockout text. The little twist was that text was filled with a colored version of the background image that was otherwise in displayed black and white.

Sadly, I don’t have screenshots of the original design but I did save the code snippet which, after light cleanup, still works!

Here is the final result:

<p class="codepen" data-height="606" data-default-tab="result" data-slug-hash="ExwPvjx" data-preview="true" data-user="teodragovic" style="height: 606px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/ExwPvjx">
  Knockout text</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

I managed to refactor the code so it comes down to a single class. Here is the full code in Sass:

```scss
$image: 'beach.jpg'; // put path to the background image here

@mixin absolute($top: auto, $right: auto, $bottom: auto, $left: auto) {
    position: absolute;
    top: $top;
    right: $right;
    bottom: $bottom;
    left: $left;
}

.c-knockout-text {
    @include absolute(0, 0, 0, 0);
    padding: 20px;
    display: grid;
    place-content: center;
    text-align: center;

    font-size: calc(50px + 20vw);
    line-height: 0.8;
    font-weight: 900;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.2);

    background-image: url($image);
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    filter: contrast(160%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    // Fallback
    color: #0066a4;

    &:before {
        @include absolute(0,0,0,0);
        pointer-events: none;
        z-index: -1;
        content: "";
        background-image: url($image);
        background-position: center top;
        background-repeat: no-repeat;
        background-size: cover;
        filter: grayscale(100%);
        opacity: 20%;
    }
}
```

For the knockout effect I’m using combination of `-webkit-background-clip: text;` and `-webkit-text-fill-color: transparentl`. Already [well documented](https://css-tricks.com/how-to-do-knockout-text/#webkit-background-clip-text) technique.

The other part is using pseudo-element to position the second image exactly behind knocked out one (all `background-*` properties need to have same values) and use CSS `grayscale` filter to make it black and white. Using CSS filters I can modify the same image so I don’t have to load separate versions of the same resources. It’s a performance win.

I also used `opacity`, `text-shadow` and `contrast` filter to tweak contrast between background and foreground to my liking.
