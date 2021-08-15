---
title: Redux vs local state
date: 2021-06-24
tags:
  - dev
  - js
layout: post
---

When I say local state I mean `useState` or [reducer/context](https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/) pattern (even if it’s placed at app root).

If there is a question of whether to use local state vs Redux, I always prefer using Redux. My reasons:
- during app lifetime, there is a higher probability your state will grow and need to connect with more components. Meaning if there is a chance state will need to be global - it will eventually happen. Setting it global upfront makes it easier to scale and avoids potentially expensive refactors.
- As a visual guy, I love Redux [DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en). And LogRocket integration is nice
- Redux has a big ecosystem of supporting tools like [selectors](https://github.com/reduxjs/reselect), [thunks](https://github.com/reduxjs/redux-thunk) and [React connect](https://react-redux.js.org/) that abstract and optimize a lot of common patterns and are well documented and actively maintained by community
- Redux has [middleware](https://redux.js.org/understanding/history-and-design/middleware)
- In my experience, Redux allows scaling without increasing complexity as long as verbose code is accepted as the tradeoff

Note that many things in Preact/React can be solved using `useState`. I’m not advocating to hold ALL of the state in Redux. But there are situations where you need _some kind_ of state to solve a problem and are uncertain about keeping it simple or preemptively preparing for scale.

When to use local state:
- when it’s contained to a single component
- when it’s contained to a few components inside clearly defined domain (ie. modal and its sub-components)
- when you need to hold simple values like numbers, strings or booleans with limited usage
- when it solves a problem without creating a new one or increasing complexity
