---
title: Optimizing SVG icon system in Preact
date: 2021-06-15
tags:
  - dev
  - perf
  - js
layout: post
---

After [this tweet from Jason Miller](https://twitter.com/_developit/status/1382838799420514317) I jumped at opportunity to optimize [Hugo](https://withhugo.com) icon system. Our SVG icons were saved as [Preact components](https://css-tricks.com/creating-svg-icon-system-react/) and it bothered me that a) each icon was blowing up bundle size and b) even with route splitting in place all icons were ending up in main bundle.

## Using symbols

First step was extracting all icons from JSX back into separate SVG files. This made it easier to add new icons and optimize using [SVGOMG](https://jakearchibald.github.io/svgomg/). No need to copy SVG inside component and add `{ ..props }` on `<svg>` tag.

Next, I needed to move all icons into single SVG and [convert to `symbol`](https://css-tricks.com/svg-symbol-good-choice-icons/). For that I used [svgstore](https://github.com/svgstore/svgstore-cli) CLI. I added command to my `package.json`:

```bash
"svg": "svgstore src/images/icons/**/*.svg -o src/images/icons.svg"
```

Now, running `npm run svg` will take all icons inside my `images/icons` dir and output unified `icons.svg` file with symbols.

```html
<svg xmlns="http://www.w3.org/2000/svg">
    <symbol id="icon-alert" viewBox="0 0 16 16">
        <!-- paths go here -->
    </symbol>

    <!-- other symbols -->
</svg>
```

## Creating icon components

In Preact, my icon components looked like this:

```jsx
const IconAlert = (props) => (
    <svg
        aria-hidden={ true }
        xmlns="http://www.w3.org/2000/svg"
        { ...props }
    >
        <use href="#icon-alert" />
    </svg>
);
```

To avoid repeating similar code block for every icon, I optimized it like so:

```jsx

const SvgIcon = ({ className, use, ...rest }) => (
    <svg
        aria-hidden={ true }
        className={ classnames(className, use) }
        xmlns="http://www.w3.org/2000/svg"
        { ...rest }
    >
        <use href={ `#${ use }` } />
    </svg>
);

export const IconAlert = (props) => <SvgIcon use="icon-alert" { ...props } />;
```

With `SvgIcon` I can create new icons by referencing their `id` from SVG map and I would also get CSS class of the same name that I can use for styling.

## Load and cache SVG map

Initially, I imported icon map into my main HTML template. This template was used by webpack to generate my main HTML file and was chaning on every build and deploy. I wanted to leverage the fact that icons change at lower frequence than rest of the product and cache them in the browser. But I also needed a way to serve fresh map when icons are modified.

Assets pulled through webpack are outputted with hash-based names on build. I could use `import` to get hashed icon map and then inject it into my HTML. I did that in my root `<App />` component:

```jsx
import icons from '../images/icons.svg';

useEffect(() => {
    fetch(icons)
    .then((resp) => resp.text())
    .then((html) => {
        const parser = new DOMParser();
        const documentNode = parser.parseFromString(html, 'image/svg+xml');
        document.body.appendChild(documentNode.documentElement);
    })
    .catch((error) => console.log(error));
}, []);
```

`useEffect` with empty dependecy array will execute just once, on page load, when app is mounted.

## Closing notes

1. File output from `svgstore` doesn't have `style="display: none;"` on `svg` tag so if you don't wanna SVG map taking up empty space on the page, add `body > svg { display: none; }` inside `<style>` tags in document `<head>`. I prefer `<style>` tag over external CSS to avoid any flashes and layout reshuffling.

2. This approach requires setting `width` and `height` on every icon. If all icons are same size this can be easy as setting common `.svg-icon` class in CSS. If each icon is different (as they are in my case) size can be set either via dedicated CSS classes or by passing `width` and `heigh` as props on `SvgIcon`.
