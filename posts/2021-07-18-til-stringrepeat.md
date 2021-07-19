---
title: TIL String.repeat()
date: 2021-07-18
tags:
  - dev
  - js
layout: post
---

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat

> The `repeat()` method constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.

Found it cleverly used in this helper function:

```js
const padDigits = (digits) => {
    const desiredLength = 3;
    const actualLength = digits.length;

    if (actualLength >= desiredLength) {
        return digits;
    }

    const amountToAdd = desiredLength - actualLength;
    const padding = '0'.repeat(amountToAdd);

    return padding + digits;
};
```
