---
title: Conditionally adding entries inside Array and object literals
date: 2022-01-16
tags:
  - js
  - link
---

https://2ality.com/2017/04/conditional-literal-entries.html

I keep re-visiting this article often for the right syntax.

TL;DR:

```js
const cond = false;
const arr = [
    ...(cond ? ['a'] : []),
    'b',
];

// ['b']
```
