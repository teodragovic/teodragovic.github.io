---
title: npm --no-optional flag
date: 2022-05-01
tags:
  - dev
  - js
---

[per docs:](https://docs.npmjs.com/cli/v6/commands/npm-install)

> The `--no-optional` argument will prevent optional dependencies from being installed.

I found this helpful while running `npm install` on a project and getting `node-gyp` error from somewhere deep in a dependency tree. Since, even with the error, everything worked fine, `node-gyp` wasn’t a critical dependency. Adding `--no-optional` made the ugly error disappear (yay).
