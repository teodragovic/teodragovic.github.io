---
title: Setting optimal line length for reading
date: 2021-06-10
tags:
  - dev
  - css
layout: post
---

[Many](http://webtypography.net/2.1.2) [articles](https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/) and [books](https://www.designingwithtype.com/) cite somewhere between 45 and 75 charachters as optimal length for a line of text.

For text-heavy websites (ie. blogs), that can be achieved in CSS by using [`ch` unit](https://developer.mozilla.org/en-US/docs/Web/CSS/length) for length.

Per MDN, `ch` "represents the width, or more precisely the advance measure, of the glyph '0' (zero, the Unicode character U+0030) in the element’s font."

And code looks something like this:

```css
.text-container {
    width: 100%;
    max-width: 63ch;
}
```

Here, `width: 100%` is used to make sure the text block stays responsive and readable on smaller screens without horizontal scroll. On larger screens, `max-width` makes sure text never goes longer than optimal width. The actual value will vary and depend on the typeface used.

There is no exact science to this, use your eyes and best judgment. If uncertain choose a lower value. Expect to end up with a magic number that has no correlation to anything else in your codebase.
