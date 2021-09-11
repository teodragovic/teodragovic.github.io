---
title: "Using overflow: hidden on a <body> tag"
date: 2021-09-11
tags:
  - dev
  - css
layout: post
---

Today, I opened [curly quote](https://curly-quote.netlify.app/) on my phone and noticed a horizontal scroll present. I have some content that’s hidden from the viewport but I also have `overflow-x: hidden` to prevent the scrollbar from appearing.

## Solution 1

But [per StackOverflow](https://stackoverflow.com/a/24193831/2382115), some mobile browsers ignore `overflow: hidden` when applied on `<body>` tag while `<meta name="viewport">` is present.

The solution was to wrap the whole page in an additional element and apply `overflow-x: hidden` to it. 

And since my overflowing element was absolutely positioned relative to the viewport, I also had to add `position: relative` style to make it work.

## Solution 2

Some additional search provided [this gist](https://gist.github.com/ufologist/ac1dfa6fa6192a5879e9d9dcdbd0bf54) with an alternative approach (which suggests mobile `viewport` theory is wrong and the underlying cause is something else).

```css
html, 
body {
    height: 100%;
    overflow-x: hidden;
}

body {
    position: relative;
}
```
