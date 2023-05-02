---
title: Animating auto height for accordion component
date: 2023-02-10
tags:
  - css
  - dev
  - link
---

Accordion component is an element with a title and some content that can get hidden or displayed by clicking the title. There is a native HTML version of that done with a combination of [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) and [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) elements but without built-in animation. At [Hugo](https://www.withhugo.com/), we have Preact component called `Panel`.

I know a couple of ways of getting `Panel` to animate:

## 1. Animating `max-height`

You can’t animate between numeric and `auto` values in CSS. So instead we animate between two numeric values of `max-height` property. Starting value will be 0 and end value will be some arbitrary number, large enough so the content inside doesn’t get clipped.

```css
.content {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease;
}
#state:checked ~ .content {
  max-height: 150px;
}
```

Here is a CSS-only demo, using good ’ol [checkbox hack](https://css-tricks.com/the-checkbox-hack/):

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="mdjNbaK" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/mdjNbaK">
  Accordion animation</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 2. Using React Animate Height

[React Animate Height](https://muffinman.io/react-animate-height/) does exactly what it says. It’s a nice, little utility library that helps animate React components using CSS. I used it to avoid dealing with event handling myself.

```jsx
<div className="c-panel__content">
    <AnimateHeight height={ expanded ? 'auto' : 0 }>
        { children }
    </AnimateHeight>
</div>
```

## 3. Using JavaScript

In an attempt to reduce our bundle size and number of dependencies, I dropped React Animate Height in favor of a simple, custom approach.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PoBMoVw" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/PoBMoVw">
  Preact Panel</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

We didn’t have any uses for animating height outside `Panel` component and that itself was used only in a few places so this super lightweight approach worked for us.

## 4. Using CSS Grid

Great trick by [Nelson Menezes](https://nemzes.net/posts/animating-height-auto/) (and reposted by [CSS-Tricks](https://css-tricks.com/css-grid-can-do-auto-height-transitions/)) by using CSS Grid. This is my current prefferd approach.

```css
.expander {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 1s;
    overflow: hidden;
}

.expander.expanded {
    grid-template-rows: 1fr;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XWBvWwE" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/XWBvWwE">
  Preact Panel</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
