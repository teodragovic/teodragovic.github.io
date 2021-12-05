---
title: Star rating with decimal values in Preact
date: 2021-12-05
tags:
  - dev
  - css
  - js
---

At [Hugo](https://withhugo.com/) we use [Trustpilot](https://www.trustpilot.com/review/www.withhugo.com) to collect customer reviews. Since we get good reviews we wanted to show them off on our landing page.

![Screenshot of Hugo Insurance landing page with Trustpilot rating](/img/hugo-rating.png)

Using SVG to render multiple stars was an obvious choice. The crucial part was supporting decimal ratings so that decimal value is reflected on the amount of colored background.

Both [Ahmad Shadeed](https://ishadeed.com/article/star-rating-svg/) and [Samuel Kraft](https://samuelkraft.com/blog/fractional-svg-stars-css) have great articles describing their techniques. But I did my own little twist since the design didn’t require changing the color of the star but the background instead.
## Preact

First, here is my `StarRating` component:

```jsx
import { h, Fragment } from 'preact';
import classnames from 'classnames';

const StarRating = ({ rating, starCount = 5 }) => (
    <Fragment>
        {
            [ ...Array(starCount) ].map((_, i) => (
                <div
                    key={ i }
                    className={ classnames('c-star-rating', {
                        'is-full': (i + 1) <= Math.floor(rating),
                        'is-decimal': (i + 1) === Math.ceil(rating),
                    }) }
                    style={
                        (i + 1) === Math.ceil(rating) &&
                        { '--decimal': parseInt(((rating % 1) * 100).toFixed(0), 10) }
                    }
                />
            ))
        }
    </Fragment>
);

export default StarRating;
```

It will render a set number of stars (default being 5) representing max. rating possible and, depending on actual rating passed, set some CSS classes and custom properties.

```jsx
className={ classnames('c-star-rating', {
    'is-full': (i + 1) <= Math.floor(rating),
    'is-decimal': (i + 1) === Math.ceil(rating),
}) }
```

Here I’m using [classnames](https://www.npmjs.com/package/classnames) utility to conditionally set modifier classes along my base `c-star-rating` class. `is-full` is added on all stars fully colored (ie. for 2.4 rating, the first two stars will have `is-full` class). Star that needs to be only partially filled (where decimal value stops) will have `is-decimal` value.

```jsx
style={
    (i + 1) === Math.ceil(rating) &&
    { '--decimal': parseInt(((rating % 1) * 100).toFixed(0), 10) }
}
```

Next, on that same "decimal" star I set `--decimal` custom property holding the remaining value but converted in the percentage of 100 (so 2.4 becomes 40). I’m using logical AND (&&) to [short-circuit evaluation instead of having ternary expression](https://teodragovic.com/blog/replacing-simple-conditionals-with-logical-and-andand/).

## SVG and Sass

My `_star-rating.scss` partial looks something like this:

```scss
// White star for the rating
// svg-url function comes from here: https://codepen.io/jakob-e/pen/doMoML
$star: svg-url('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#fff" d="M15.524 6.464a.5.5 0 0 1 .952 0l1.881 5.791a.5.5 0 0 0 .476.346h6.09a.5.5 0 0 1 .294.904l-4.927 3.58a.5.5 0 0 0-.182.559l1.882 5.792a.5.5 0 0 1-.77.559l-4.926-3.58a.5.5 0 0 0-.588 0l-4.927 3.58a.5.5 0 0 1-.77-.56l1.883-5.791a.5.5 0 0 0-.182-.56l-4.927-3.579a.5.5 0 0 1 .294-.904h6.09a.5.5 0 0 0 .476-.346l1.881-5.791Z"/></svg>');

.c-star-rating {
    width: 30px;
    height: 30px;
    display: inline-flex;
    position: relative;
    border-radius: 3px;
    background-color: #DCDCE6;
    overflow: hidden;
    margin: 0 2px;

    &:after {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        content: "";
        background-image: $star;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
    }

    &.is-full {
        background-color: #ED56A1;
    }

    &.is-decimal {
        &:before {
            position: absolute;
            top: 0; left: 0;
            content: "";
            background-color: #ED56A1;
            width: calc(var(--decimal, 0) * 1%);
            height: 100%;
        }
    }
}
```

This particular project doesn’t have [a good icon system in place](/blog/optimizing-svg-icon-system-in-preact/) so instead of adding SVG directly in JSX I opted for SVG-in-CSS approach and set encoded SVG as `background-image`. Since star doesn't change color almost any SVG approach could work here: using `img`, external SVG linked in `url`, SVG-in-JSX or SVG as a `symbol`.

By setting the star as the background image in `after` pseudo-element, I made sure that stays above the square that will change color.

Partial coloring of the square is achieved by using `before` and passed `--decimal` value to set its width.

```css
width: calc(var(--decimal, 0) * 1%);
```

Since `--decimal` value is unitless, I use `calc` and multiply it by 1% to get the percentage value.

## Final result

<p class="codepen" data-height="419" data-default-tab="result" data-slug-hash="qBPOwwV" data-preview="true" data-user="teodragovic" style="height: 419px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/qBPOwwV">
  Untitled</a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
