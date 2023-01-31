---
title: Link image to full size image in markdown
date: 2023-01-31
tags:
  - html
  - dev
---

This is the markup for adding image in Markdown:

```
![Alt text here](/images/foo.png)
```

To make clicking on image open a bigger version of the same image, do this:

```
[![Alt text here](/images/foo.png)](/images/foo-big.png)
```

I figured this out intuitively before finding out it’s [right there in the docs](https://www.markdownguide.org/basic-syntax/#linking-images) and probably common knowledge to most Markdown users but I didn’t use it until [recently](blog/setup-free-business-email-address/).
