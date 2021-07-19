---
title: My font loading strategy
date: 2021-07-19
tags:
  - html
  - js
  - css
  - dev
layout: post
---

For a [long time](https://gist.github.com/teodragovic/81aa001d6ccf44e25cc82cdf624947f8) my font-loading strategy involved using [Web Font Loader](https://github.com/typekit/webfontloader) to avoid FOIT.

I would add following snippet in the document `<head>`:

```html
<script>
    (function(d) {
        if (sessionStorage.webfont) {
            d.documentElement.classList.add('wf-active');
            return;
        }

        window.WebFontConfig = {
            custom: { families: [ 'my-font:n4' ] },
            active: function() { sessionStorage.webfont = true; }
        };

        const wf = d.createElement('script');
        const ref = d.scripts[0];
        wf.async = true;
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        ref.parentNode.insertBefore(wf, ref);
    })(document);
</script>
```

And my CSS looked something like this:

```css
@font-face {
    font-family: 'my-font';
    src:
        url('fonts/my-font.woff2') format('woff2'),
        url('fonts/my-font.woff') format('woff'),
        url('fonts/my-font.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
}

body {
    font-family: sans-serif;
}

.wf-active body {
    font-family: 'my-font', sans-serif;
}
```

## font-display

When `font-display` property was introduced to CSS, I quickly added it to my existing setup.

```diff
@font-face {
    font-family: 'my-font';
    src:
        url('fonts/my-font.woff2') format('woff2'),
        url('fonts/my-font.woff') format('woff'),
        url('fonts/my-font.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
+   font-display: swap;
}
```

```diff
    if (sessionStorage.webfont
+   || "fontDisplay" in document.documentElement.style) {
        d.documentElement.classList.add('wf-active');
        return;
    }
```

And now, when `font-display` is [widely supported](https://caniuse.com/css-font-rendering-controls) my font loading strategy looks like this:

```css
@font-face {
    font-family: 'my-font';
    src:
        url('fonts/my-font.woff2') format('woff2'),
        url('fonts/my-font.woff') format('woff'),
        url('fonts/my-font.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

body {
    font-family: 'my-font', sans-serif;
}
```

I find this works great for me most of the time. There can be an issue with loading multiple fonts where each font causes a new repaint. In that case, it’s advisable to fall back onto a JS-based approach but I don’t do it by default.

## Cloud-hosted fonts

Today, Google Fonts support `font-display` so that’s great. On top of it, I like to de-prioritize fonts front critical styles by asyncronosly loading CSS file with `@font-face` definitions:

```html
<head>
    <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Fira+Mono&display=swap"
        media="print"
        onload="this.media='all'">
</head>
```

That’s how I load monospace font used in code examples on this blog. I use same approach at [Hugo](https://withhugo.com) where a single typeface (that we self-host) is used across multiple products.
