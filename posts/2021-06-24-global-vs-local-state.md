---
title: Global vs local state
date: 2021-06-24
tags:
  - dev
  - js
layout: post
---

When I say global and local state what I mean:

**Global** - Redux
**Local** - `useState` or [reducer/context](https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/) pattern (even if it’s placed at app root)

Note that many things in Preact/React can be solved using `useState`. I’m not advocating to hold ALL of the state in Redux. But there are situations where you need _some kind_ of state to solve a problem but are uncertain about keeping it simple or preemptively prepare for scale.

If there is a question of whether to use a local or global state, I always prefer a global state. My reasons:
- during app lifetime, there is a higher probability your state will grow and need to connect with more components. Meaning if there is a chance state will need to be global - it will eventually happen. Setting it global upfront makes it easier to scale and avoids potentially expensive refactors.
- Redux has awesome [DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- Redux has a big ecosystem of supporting tools like [selectors](https://github.com/reduxjs/reselect), [thunks](https://github.com/reduxjs/redux-thunk) and [React connect](https://react-redux.js.org/) that abstract and optimize a lot of common patterns and are actively maintained by community
- Redux has [middleware](https://redux.js.org/understanding/history-and-design/middleware)
- In my experience, Redux allows scaling without increasing complexity as long as verbose code is accepted as the tradeoff

When to use local state:
- when it’s contained to a single component
- when it’s contained to a few components that with clearly separated domain (ie. modal and all sub-components)
- when need to hold simple values like numbers, strings or booleans with limited usage
- when it solves a problem without creating a new one or increasing complexity
