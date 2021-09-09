---
title: CSS utility class for full bleed child inside padded parent
date: 2021-09-09
tags:
  - dev
  - css
layout: post
---

Say you have a `Card` component with 20px padding and you need a child element to span from edge to edge, going over padding. Something like this:

<p class="codepen" data-height="320" data-theme-id="dark" data-default-tab="result" data-slug-hash="dyRvMbM" data-preview="true" data-user="teodragovic" style="height: 320px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/dyRvMbM">
  </a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

To avoid modifying parent, we can apply a negative margin on the child element to make it span outside the padded area.

```
margin-left: -20px;
margin-right: -20px;
```

That solves it but it makes for tight coupling since we need to know the exact padding value of the parent and match it.

We can avoid this by using an extremly large margin value (like -9999rem) and combining it with equal padding value to make sure content stays in place.

```
margin: -9999rem;
padding: 9999rem;
```

Cool thing is, the original 20px padding from the parent will still be respected! The only constraint is, we have to apply `overflow: hidden` on the parent to avoid child element stretching across the full screen.

I found this solution useful enough to get it’s own little utility class:

```css
.u-bleed {
    margin-left: -9999rem;
    margin-right: -9999rem;
    padding-left: 9999rem;
    padding-right: 9999rem;
}
```

Note that I explicitly use `*-left` and `*-right` properties instead of `margin` and `padding` shorthands to allow vertical padding to be inherited or set independently.
