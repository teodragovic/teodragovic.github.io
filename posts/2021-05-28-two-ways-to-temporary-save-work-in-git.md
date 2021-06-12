---
title: Two ways to temporary save work in git
date: 2021-05-28
tags:
  - git
  - dev
layout: post
---

If you're working on a branch and need to switch to a different branch mid-work:

## Git stash

Use `git stash` to save all staged and unstaged changes to stash. 

To retrive work, checkout your original feature branch and do `git stash pop` to restore latest batch of changes from stash.

## WIP and reset

Commit everything as WIP.

    git add -A && git commit -m 'WIP'

I [aliased](https://teodragovic.com/blog/my-git-aliases/) this command so it's executed by running `git wip`.

To remove WIP commit but keep changes, I run `git undo` which is alias for:

    git reset HEAD~1 --mixed

I find wip/undo commands execute faster than `git stash`.
