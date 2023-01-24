---
title: Using JSON.stringify to pretty print objects in console
date: 2023-01-24
tags:
  - dev
  - js
---

When using `console.log` to see the output in terminal sometimes I get `[object Object]` instead of an actual object. Other times, I get full value but inlined and looking like a single long string which is hard to scan.

To get around both of these issues, use [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). By default, it will ensure the value is always fully printed. Setting the third value will make sure it’s printed with whitespace and readable.

```js
const x = {
    a: 1,
    b: 2,
    c: {
        d: 3
    }
};

console.log(x); // might print [object Object]

console.log(x.toString()); // will always print "[object Object]"

console.log(JSON.stringify(x)); // will print "{'a':1,'b':2,'c':{'d':3}}"

console.log(JSON.stringify(x, null, 2));
/* it will print
"{
  'a': 1,
  'b': 2,
  'c': {
    'd': 3
  }
}"
*/
```

The third argument of `stringify` method is space value. It can be a number or a string. Per MDN: "If this is a number, it indicates the number of space characters to be used as indentation, clamped to 10". String value will be inserted before every nested object or array. For string values, the common is to use one or more spaces (`" "`) or a tab character (`"\t"`).
