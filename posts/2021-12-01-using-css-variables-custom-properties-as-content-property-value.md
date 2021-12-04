---
title: Using CSS variables (custom properties) as content property value
date: 2021-12-01
tags:
  - css
  - dev
---

CSS custom properties can be used to set values on any other CSS property. Combining it with `content` property to set some content in pseudo-element works as you would expect it.

```css
// This works
:root {
   --copy: 'hello world';
}

body::before {
   content: var(--copy);
}
```

But what if you want to set property value using JavaScript?

```js
document.body.style.setProperty('--copy', 'hello');
```

```css
// This does not work :(
body::before {
   content: var(--copy);
}
```

I was puzzled until landing on [this SO question](https://stackoverflow.com/q/40164169/2382115) and seeing [this answer](https://stackoverflow.com/a/40164254/2382115).

Turns out, if you use `setProperty` to set CSS custom property, result will look something like this:

```html
<body style="--copy:hello;">
```

Without quotation marks, the parser is unable to determine that value is a string so it won’t render. And simply passing an actual string to `setProperty` is not enough. What’s worse, using a second value in `var` as fallback also won’t work since `--copy` is defined (just with an invalid value).

```css
// This still does not work :(
body::before {
   content: var(--copy, 'fallback');
}
```

Instead, you have to do it like this:

```js
document.body.style.setProperty('--copy', `'hello'`);
```

Notice backticks around the string. This way, quotation marks make their way into an inline style declaration and everything works. Using `"'" + 'hello' + '"'` is another valid approach but I find template literals cleaner.
