---
title: Simple sticky footer technique
date: 2021-11-26
tags:
  - css
  - dev
  - link
layout: post
---

https://css-tricks.com/a-clever-sticky-footer-technique/

TL;DR:

```css
.parent { height: 100%; }

.parent > footer {
    position: sticky;
    top: 100vh;
}
```
