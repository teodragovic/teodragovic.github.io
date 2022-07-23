---
title: HTTP server for running static production builds
date: 2022-07-23
tags:
  - dev
  - tech
---

Assuming `build` is the output directory and uses SPA-type routing:

```bash
npx sirv-cli build --cors --single
```
