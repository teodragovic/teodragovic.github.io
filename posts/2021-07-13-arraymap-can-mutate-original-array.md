---
title: Array.map can mutate original array
date: 2021-07-13
tags:
  - dev
  - js
  - link
layout: post
---

https://dev.to/lofiandcode/can-map-mutate-the-original-array-yes-dmb

TL;DR:
> Things to consider when using .map():
> - Write your callback function carefully because it can modify the original array.
> - In your callback function, always create new objects for every object in the original array. Otherwise you will just be copying pointers to the original objects.
