---
title: "Git: Rebase feature branch to other base branch"
date: 2026-02-06
tags:
  - dev
  - tech
---

TIL

```bash
git rebase --onto <NEW_BASE> <OLD_BASE> <YOUR_BRANCH>
```

I knew about `git rebase` but not about `--onto` flag. `git rebase --onto` can help you to move commits from your `fix/` branch as if they are made against different base. Say you need to make a urgent fix for bug that's already in production. You make the fix but you accidentely checkout out from `development` branch that contains some work not yet ready for production. You would do:

```bash
git rebase --onto main dev fix/typo
```

Here we have our `main` branch deploys to production, `dev` is our development branch and `fix/typo` is our urgent hotfix.

## Note about GitHub

If you already made a pull request in GitHub you can still use `git rebase --onto` and update existing PR without closing it and making another. One extra step to take is to [update base branch on PR page itself using "edit" button next to PR title](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-base-branch-of-a-pull-request). 

