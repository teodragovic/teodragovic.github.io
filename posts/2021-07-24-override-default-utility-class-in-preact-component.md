---
title: Override default utility class in Preact component
date: 2021-07-24
tags:
  - dev
  - js
  - css
layout: post
---
At work, I combine both [BEM](http://getbem.com/introduction/) and utility classes (similar to [Tailwind](https://tailwindcss.com/)) in my CSS. I find that works best for me.

I have a `Button` component in Preact and a matching `.c-btn` class in my stylesheet. Since using buttons inside a form is a common use case for me, I extended my default `Button` component to create `FormButton`.

```jsx
const FormButton = (props) => (
    <Button
        { ...props }
    >
        { props.title || 'Submit' }
    </Button>
);
```

For my form button, I didn’t feel like creating `.c-btn--form`. The only style difference I wanted is consistent vertical spacing. So I used utility class to set `margin-bottom`.

```jsx
const FormButton = ({ title, className, ...rest }) => (
    <Button
        className={ classnames(className, 'u-mb-4') }
        { ...rest }
    >
        { title || 'Submit' }
    </Button>
);
```

I use [classnames](https://www.npmjs.com/package/classnames) library to manage classes on my components. Here, I set the default `.u-mb-4` class on `FormButton` but still allow additional classes to be passed via props.

But what if I wanted to override `margin-bottom`? In HTML, [order of classes doesn’t impact specificity](https://css-tricks.com/the-order-of-css-classes-in-html-doesnt-matter/). I would have to be sure my overriding class comes later in stylesheets or have higher specificity than `.u-mb-4`. Neither was ideal.

To avoid such problems, I instead removed `.u-mb-4` class if another utility class of such type was passed.

```diff
const FormButton = ({ title, className, ...rest }) => (
    <Button
-        className={ classnames(className, 'u-mb-4') }
+        className={ classnames(className, { 'u-mb-4': !className.includes('u-mb') }) }
        { ...rest }
    >
        { title || 'Submit' }
    </Button>
);
```

Now, my default class is only applied if there is no other similar class passed in props. I could do this since all utility classes that set `margin-bottom` have a similar name that goes like `u-mb-N` where N is a number that represents spacing multiplier (ie. 1 is 5px, 2 is 10px...). Using [`String.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) I check whole `classNames` prop for a matching class and using `classnames` lib I can conditionally set my default class.
