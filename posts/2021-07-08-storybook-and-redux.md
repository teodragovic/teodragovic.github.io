---
title: Storybook and Redux
date: 2021-07-08
tags:
  - js
  - dev
layout: post
---

I like using [Storybook](https://storybook.js.org/) when developing UI in Preact. My Storybook boilerplate usually looks something like this[^1]:

```jsx
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';

import Component from './Component';

storiesOf('Components/Component', module)
.add('default', () => <Component />);
```

Here I can add different stories that usually depend on different prop values passed into components. But sometimes I wanna test a component that’s hooked into Redux using `connect` function and get their props from Redux store. Passing props into such component wouldn’t work since they would always get overwritten. My solution is to separately export pure component[^2]:

```jsx
import { h } from 'preact';
import { connect } from 'react-redux';

// Named export of pure component
export const Component = (props) => (
    // UI goes here
);

// Default export of connected component
export default connect()(Component)
```

From here all I need to do is replace default import with a named one in my `Component.stories` file.

```diff
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';

- import Component from './Component';
+ import { Component } from './Component';

storiesOf('Components/Component', module)
.add('default', () => <Component />);
```

And now I can pass my dummy props in Storybook.

[^1]: Still using v5 of Storybook.

[^2]: While I don’t exactly split my components to smart and dumb, [this definition by Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) fits what I'm doing (while still keeping everything in a single file). It’s also recommended approach in [Storybook docs](https://storybook.js.org/tutorials/intro-to-storybook/react/en/data/).
