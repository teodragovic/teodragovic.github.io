---
title: Using CSS min() and max() in Sass
date: 2021-10-13
tags:
  - css
  - dev
  - sass
layout: post
---

CSS has [`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/min()) and [`max()`](https://developer.mozilla.org/en-US/docs/Web/CSS/max()) functions. They allow us to specify list of values and it would return either smallest or largest one.

Before those functions were widely supported, Sass also had [`min` and `max`](https://sass-lang.com/documentation/modules/math) functions.

Now the problem is, [Sass will sometimes try to use its own functions instead of native ones](https://chipcullen.com/css-min-max-clamp-functions/#a-note-on-using-sass--scss).

There are two possible solutions:

## Capitalization

CSS is not case-sensitive [but Sass is](https://github.com/sass/sass/issues/2849). Renaming `min`/`max` to `Min`/`Max` (or `MIN`/`MAX`) would make functions ignored by Sass compiler but still recognized in the browser as valid CSS.

```
font-size: min(1.3vw, 17px); // will use Sass
font-size: Min(1.3vw, 17px); // will use CSS
```

## Unquote

Using [Sass `unquote`](https://wikimass.com/sass/unquote) function to wrap the property value will output the value without going through Sass compiler.

```
font-size: min(1.3vw, 17px); // will use Sass
font-size: unquote('min(1.3vw, 17px)'); // will use CSS
```

## Note about Sass variables

To use Sass variables inside native CSS functions, they need to be [interpolated](https://sass-lang.com/documentation/interpolation).

```scss
$value: 1.3vw;
font-size: Min(#{$value}, 17px);
font-size: unquote('min(#{$value}, 17px)');
```
