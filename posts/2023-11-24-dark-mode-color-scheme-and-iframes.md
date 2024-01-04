---
title: Dark mode, color-scheme and iframes
date: 2023-11-24
tags:
    - dev
    - html
    - link
---

I’m in the process of adding dark mode support to [Hugo Web App](https://app.withhugo.com). One issue came up: when in dark mode, Google Sing-In button and TrustPilot widget were rendering with white background. These were both 3rd party dependencies loaded via `iframe`.

TrustPilot even had theme property which I set to "dark" but that only caused text to go white so we ended up with white text on white background. Weird and super annoying.

After searching around, I found the fix to be setting `color-scheme: light` on a container element used to atttach the `iframe`.

Best explanation I found was in [this article from Florens Verschelde](https://fvsch.com/transparent-iframes).

TL;DR: Issue was with me setting [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) property to value `light dark`. I wanted native HTML controls like `<select>` dropdown render in mode matching user system settings. Turns out that [per spec](https://github.com/w3c/csswg-drafts/issues/4772):

> If the color scheme of an iframe differs from embedding document, iframe gets an opaque canvas background appropriate to its color scheme.

Since our Google and TrustPilot iframes don't have matching `color-scheme` as parent page (ie. Hugo), canvas gets opaque/non-transparent/white background.

Setting `color-scheme: light` sounds counter-intuitive but that actually means we wanna override parent page `color-scheme` for the scope of the embedded `iframe`. I could have put that rule higher in DOM tree as well and it would be fine as long as it didn’t catch any native HTML elements.

Now, since `iframe` has matching (default) `color-scheme` value, canvas will correctly render transparent.
