---
title: Default font stack
date: 2022-01-21
tags:
  - html
  - css
  - dev
---

Here’s the default font list used at [Hugo](https://withhugo.com) until recently:

```scss
body {
    font-family:
        $font-name,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        sans-serif;
}
```

In the snippet above, `$font-name` is Sass variable representing our brand typeface. Everything that follows is part of the fallback stack designed to use the best system UI font available. This approach was popularized by [Medium](https://medium.com/skyscanner-design/a-native-font-stack-d9d0db72d6e6) and [Github](https://css-tricks.com/shipping-system-fonts-github-com/).

Article on [Smashing Magazine](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/) helped me define the final list I settled on.

Then I came across a bit of information that led me to check browser support on [`system-ui`](https://caniuse.com/?search=system-ui). Quoting [Chris](https://css-tricks.com/one-file-many-options-using-variable-fonts-web/):

> The `system-ui` value is the new standard to access system fonts, while `-apple-system` is non-standardized syntax that works on Firefox.

Support for `system-ui` is finally good enough to replace our big system stack. Today, our default stack looks like this:

```scss
body {
    font-family:
        $font-name,
        system-ui,
        -apple-system,
        sans-serif;
}
```

Note: this change was possible since Hugo is made only for users in the USA. If you target a wider audience, you would be better [waiting it out a bit longer](https://medium.com/towards-more-beautiful-web-typography/survey-system-font-stack-5f73a3b39776).
