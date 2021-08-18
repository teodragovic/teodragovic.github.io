---
title: Whitespace and line wrapping in JSX
date: 2021-08-18
tags:
  - dev
  - js
layout: post
---

Say you have a line like this in your JSX project:

```jsx
<p>Contact us at <a href="mailto:say.hi@awesome.com">say.hi@awesome.com</a></p>
```

That line would render and wrap as you expect – taking as much space as parent container allows and wrapping words in second line if not enough space. In fact, here’s a demo:

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="BaRgZmR" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/BaRgZmR">
  </a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Problem when formatting code

But see what happens if you format code like so:

```jsx
<p>
    Contact us at
    <a href="mailto:say.hi@awesome.com">say.hi@awesome.com</a>
</p>
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="qBmzjME" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/qBmzjME">
  </a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

All newlines are removed. This includes the ones added after opening and before closing `p` tag and the one between the first part of the string and the link. This is [per specs](https://reactjs.org/docs/jsx-in-depth.html#string-literals-1):

> JSX removes whitespace at the beginning and ending of a line. It also removes blank lines. New lines adjacent to tags are removed; new lines that occur in the middle of string literals are condensed into a single space.

What might cause confusion is the fact that if this string didn’t include an anchor inside a paragraph, inserting one or more newlines in the middle of the sentence would get transformed into a single space (this differs from [HTML](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace)).

These two examples would output the same thing:

```html
<p>
    Contact us at
    say.hi@awesome.com
</p>

<p>Contact us at say.hi@awesome.com</p>
```

But every HTML element inside JSX represents new node. So space between the text node (`Contact us at`) and the link is thus omitted. This behavior is purposely added in [React 0.9](https://reactjs.org/blog/2014/02/20/react-v0.9.html#jsx-whitespace).

Check [transpiled code](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=MYewdgzgLgBAggBwTAvDAFASlQPhgHgBMBLANxwGFwoBDYWAVwhhuYhoE8A6AC2IAEaAdwCmEEAFsRXUBPwB6EuQBQy0JFiIEAJlQZsKPETKVqdRsxqx8NHO259Bo8VJmSFthUpxA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=script&lineWrap=true&presets=env%2Creact&prettier=true&targets=&version=7.15.3&externalPlugins=&assumptions=%7B%7D) to see distinction more clearly.

## How to add whitespace in JSX?

There are several options to add whitespace in this case.

### Using padding or margin

```jsx
<p>
    Contact us at
    <a className="pl-1" href="mailto:say.hi@awesome.com">say.hi@awesome.com</a>
</p>
```

Here I’m using [Tailwind](https://tailwindcss.com/docs/padding) class to apply left padding to the anchor element. There are two problems with this approach:

1. Padding or margin value might not match the size of a single space character making text either too close or too far away.

2. We applied spacing visually but not in markup. This means when we resize the screen to smaller viewport word `at` and mail address would try to stay together in a single line and it would by default overflow before breaking into a new line.

### Using non-breaking space

```jsx
<p>
    Contact us at&nbsp;
    <a href="mailto:say.hi@awesome.com">say.hi@awesome.com</a>
</p>
```

Adding [non-breaking space](https://en.wikipedia.org/wiki/Non-breaking_space) character (`&nbsp;`) immediately after `at` would produce space and it would be of exact size. But, as the name suggests, non-breaking space would also avoid breaking into a new line and would keep `at` and the link on the same line.

### Using extra tags

```jsx
<p>
    <span>Contact us at </span>
    <a href="mailto:say.hi@awesome.com">say.hi@awesome.com</a>
</p>
```

Wrapping the first part in `span` would make sure that space is preserved. But adding markup for the sake of preserving code formatting is Not Very Nice. Maintenence could also prove difficult and error-prone when dealing with long paragraphs broken over multiple lines and other inline elements.

### Explicitly adding space

```jsx
<p>
    Contact us at{ ' ' }
    <a href="mailto:say.hi@awesome.com">say.hi@awesome.com</a>
</p>
```

Adding space using `{ ' ' }` would both produce space (no extra tags) and break on smaller screens. This is desired behavior and my recommended method to add whitespace in JSX.

Finally, here’s a pen with all examples collected:

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="js,result" data-slug-hash="JjNVrYm" data-preview="true" data-user="teodragovic" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/teodragovic/pen/JjNVrYm">
  </a> by Teo Dragovic (<a href="https://codepen.io/teodragovic">@teodragovic</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
