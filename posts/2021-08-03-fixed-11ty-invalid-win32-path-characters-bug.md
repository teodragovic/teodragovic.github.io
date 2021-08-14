---
title: 'Fixed: 11ty "invalid WIN32 path characters" bug'
date: 2021-08-03
tags:
  - dev
  - js
layout: post
---

This blog is powered by [Eleventy](https://www.11ty.dev/). And most of my machines are powered by Windows.

When running build or watch mode locally on my machine I would get an error that some of my blog post titles `contains invalid WIN32 path characters`. It would happen if I were using colons or dashes in the post titles.

My first thought was this is a [YAML](https://en.wikipedia.org/wiki/YAML) thing so I made sure that all my post titles containing such characters were wrapped in quotes.

But the error was actually due to how Eleventy (and [`slug`](https://www.11ty.dev/docs/filters/slug/) filter it was using) was handling special characters in generated filenames since my permalinks were defined like so:

```yml
---
permalink: "blog/{% raw %}{{ title | slug }}{% endraw %}/"
---
```

And [Windows are not having that](https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file#naming-conventions).

The issue is [already addressed](https://www.11ty.dev/docs/filters/slugify/) and will be fixed in the upcoming `v1.0.0.`

But for the moment, I needed a fix for my `v0.x.x` Following [this thread](https://github.com/11ty/eleventy/issues/278) I fixed the issue by updating my `.eleventy.js` config:


```js
const slugify = require('slugify');

const slugifyOptions = {
    replacement: '-',
    remove: /[&,+()$~%.'":*?<>{}–—|]/g,
    lower: true
};

module.exports = function(eleventyConfig) {
    // config stuff...
    eleventyConfig.addFilter('slug', (input) => slugify(input, slugifyOptions));
    // more config stuff...
}
```

And since I use footnotes, I had to update my markdown config re-using the same settings.

```js
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const footnote = require('markdown-it-footnote');
const slugify = require('slugify');

const slugifyOptions = {
    replacement: '-',
    remove: /[&,+()$~%.'":*?<>{}–—|]/g,
    lower: true
};

module.exports = function(eleventyConfig) {
    // config stuff...
    const markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    })
    .use(markdownItAnchor, {
        permalink: true,
        permalinkClass: 'direct-link',
        permalinkBefore: true,
        slugify: (input) => slugify(input, slugifyOptions)
    })
    .use(footnote);

    eleventyConfig.setLibrary('md', markdownLibrary);
    // more config stuff...
}
```
