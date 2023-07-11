---
title: Disable prettier per repository
date: 2023-05-02
tags:
    - tech
    - workflow
    - js
    - dev
---

In VS Code I have Prettier extension enabled and a workspace with multiple repositories. Most of them have Prettier configuration but some are legacy projects without such config. I don't touch those often but when I do, I don't want Prettier blowing up my commits with formatting changes.

Fix is to add `prettierignore` file to those repos with `**` as content.
