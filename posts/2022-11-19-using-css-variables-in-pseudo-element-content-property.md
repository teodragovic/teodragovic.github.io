---
title: Using CSS variables in pseudo-element content property
date: 2022-11-16
tags:
  - css
  - dev
---

## Strings

Just use it directly.

```css
:root {
    --x: "foo"
}

div:before {
    content: var(--x);
}
```

## Numbers

Combine it with [CSS counter](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Counter_Styles/Using_CSS_counters) like so:

```css
:root {
    --x: 123;
}

div:before {
    counter-reset: variable var(--x);
    content: counter(variable);
}
```

TIL from [StackOverflow](https://stackoverflow.com/a/40179718/2382115).
