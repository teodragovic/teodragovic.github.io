---
title: Add scroll margin on pages with fixed header
date: 2023-10-13
tags:
    - css
    - html
    - dev
---

Something I learned from [Andy Bell’s CSS reset](https://andy-bell.co.uk/a-more-modern-css-reset/)

```css
/* Anything that has been anchored to should have extra scroll margin */
:target {
    scroll-margin-block: 5ex;
}
```

It’s a great way to account for fixed headers when using anchor links. Came in handy on [Hugo’s legal page](https://www.withhugo.com/legal) which features TOC for privacy policy and a fixed header.
