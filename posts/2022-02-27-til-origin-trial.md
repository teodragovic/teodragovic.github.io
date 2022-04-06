---
title: "TIL: origin-trial"
date: 2022-02-27
tags:
  - dev
  - link
  - html
---

Found out from [this CSS-Tricks article](https://css-tricks.com/explain-the-first-10-lines-of-twitter-source-code/#aa-line-9-meta-http-equivorigin-trial-content)

> **Perfect answer:** Origin trials let us use new and experimental features on our site and the feedback is tracked by the user agent and reported to the web standards community without users having to opt-in to a feature flag. For example, Edge has an origin trial for dual-screen and foldable device primitives, which is pretty cool as you can make interesting layouts based on whether a foldable phone is opened or closed.

`origin-trial` is Chromium thing which means only Chrome and Edge browsers support it. Another "offical" article [here](http://googlechrome.github.io/OriginTrials/developer-guide.html).
