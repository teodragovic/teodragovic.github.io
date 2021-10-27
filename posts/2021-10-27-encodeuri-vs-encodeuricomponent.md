---
title: encodeURI vs encodeURIComponent
date: 2021-10-27
tags:
  - dev
  - html
  - js
  - link
layout: post
---

TL;DR: use [`encodeURI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) for encoding full URLs and [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) for parts of link (like query strings, `mailto:` and `sms:` body strings) or any kind of string NOT used as URL.

Reference links:
- https://thisthat.dev/encode-uri-vs-encode-uri-component/
- https://www.30secondsofcode.org/articles/s/javascript-encodeuri-encodeuricomponent
- https://dev.to/wanoo21/difference-between-encodeuri-and-encodeuricomponent-j3j
