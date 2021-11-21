---
title: "TIL: accent-color"
date: 2021-11-18
tags:
  - dev
  - css
layout: post
---

https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color

> The `accent-color` CSS property sets the color of the elements accent. An accent appears in elements such as `<input>` of `type="checkbox"`, or `type="radio"`.

<p class="codepen" data-height="250" data-default-tab="result" data-slug-hash="PoKyNeQ" data-preview="true" data-user="chriscoyier" style="height: 250px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chriscoyier/pen/PoKyNeQ">
  Big ass radio buttons</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Note that it applies to _only_ checkboxes and radio buttons. Other native widgets like `<input type="date">` or `select` arrow won’t apply the color. And currently not supported in Safari :(
