---
title: Don’t be hasty
date: 2021-07-10
tags:
  - dev
  - workflow
  - git
layout: post
---

> Don’t be hasty — Treebeard

Yesterday, I was traveling from Zagreb to Rijeka. This usually means I have only a couple of hours to work in the office before packing and hitting the road. That morning, I was greeted with a bunch of low-hanging bugs carded.

I wanted to quickly knock most of them down before the weekend. So I worked directly on `dev` branch since I didn’t wanna bother making multiple `fix/*` branches and doing PRs. I also didn’t do any testing because running everything locally would slow me down.

I just did the fixes and committed them into `dev`.

But before leaving I either a) forgot to `git push` or b) I pushed and git complained about something I didn’t notice before closing my editor.

This all wouldn’t be a big mistake had I not moved all cards into `ON DEV` column as if deploy was done. My coworker doing the QA was confused after taking the time to test all bugs I marked as fixed. And due to the timezone difference (I’m in Croatia, they are in LA), it took until Monday to realize my mistake.

**Takeaways:**
1. DO NOT work on `dev` directly. Always checkout and push upstream.
2. DO NOT move cards before deploy is finished.
