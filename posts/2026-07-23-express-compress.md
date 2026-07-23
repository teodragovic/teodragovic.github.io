---
title: Express compress
date: 2026-07-23
tags:
  - backend
  - dev
  - js
---

Today I discovered a nifty little npm package called [`compression`](https://www.npmjs.com/package/compression). Per the docs, a one-line change applies Brotli compression to all API responses:

```js
const app = express()

// compress all responses
app.use(compression())
```

_(compression() accepts an options object so you can switch between gzip/Brotli, compression level, etc.)_

While it’s still early days and I didn’t actually ship to production, initial tests look very promising:

before:
![](/img/compress-before.png)

after:
![](/img/compress-after.png)

Compressing and caching all static assets on the client was my baseline for any new web project, but I never thought of doing the same thing for the API. Huge miss.

One big caveat is that compression eats CPU and memory resources. For a high-traffic API it can put the bill through the roof. In such situations, offloading compression to a load balancer (assuming you have one if running an API at scale) is a better choice. But when starting small, this feels like a good starting point.
