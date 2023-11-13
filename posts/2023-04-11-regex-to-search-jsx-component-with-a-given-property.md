---
title: Regex to search JSX component with a given property
date: 2023-04-11
tags:
    - js
    - link
    - dev
---

TL;DR: `<Component(\s|\n)[^>]*?property`

When I’m refactoring Preact code, I often find myself searching all places where some component is used with a certain prop (ie. all buttons with a `primary` prop). Thankfully, VS Code supports passing regex as search query. This little snippet I [lifted from StackOverflow](https://stackoverflow.com/a/56522349) does exactly what it says.
