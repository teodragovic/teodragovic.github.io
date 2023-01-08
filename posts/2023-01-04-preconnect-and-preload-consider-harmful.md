---
title: preconnect and preload considered harmful
date: 2023-01-04
tags:
  - dev
  - html
---

Not really but [this](https://mobile.twitter.com/csswizardry/status/1580506558165024769).

For a long time I had issues with the performance penalty [Hugo](https://withhugo.com) gets while we load Segment and all analytics connected through it. Yet, while I was deferring loading of analytics away from critical path, it never occurred to me to remove `preconnect` hints as well.

I still `preload` and [lazy load my fonts](/blog/my-font-loading-strategy/) though.
