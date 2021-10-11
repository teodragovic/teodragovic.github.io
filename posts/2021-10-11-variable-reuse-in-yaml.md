---
title: Variable reuse in YAML
date: 2021-10-11
tags:
  - dev
  - misc
layout: post
---

Define variable like so:

```yaml
first_name: &name Teo   # it will output "Teo"
nickname: *name         # it will also output "Teo"
```
