---
title: How I optimize images and SVG
date: 2021-06-12
tags:
  - dev
  - pef
layout: post
---

## Small amounts of JPG and PNG

1. Use [TinyPNG](https://tinypng.com/) to optimize `jpg` and `png` formats.
2. If applicable, [convert to WEBP and AVIF](https://convertio.co/).

### Bigger (moderate) amounts of JPG and PNG

Bake in [imagemin](https://github.com/imagemin/imagemin) into whatever build process the project uses.

## Big amounts of JPG and PNG

Use dedicated service like [IMGIX](https://imgix.com/) or [Cloudinary](https://cloudinary.com/products/media_optimizer). I would probably even skip `imagemin` phase and go straight for the shelf. Seriously, it’s always worth the money.

## Small amounts of SVG

Use [SVGOMG](https://jakearchibald.github.io/svgomg/).

## Bigger amounts of SVG

Bake in [SVGO](https://github.com/svg/svgo) into whatever build process the project uses. In the past, this included using webpack and Gulp plugins built on top of it. This approach should scale to very large amounts of SVG.
