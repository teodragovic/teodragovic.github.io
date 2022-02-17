---
title: Autofill SMS token
date: 2022-02-17
tags:
  - html
  - dev
---

```
<input id="single-factor-code-text-field" autocomplete="one-time-code" />
```

This is one of [Apple-only](https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element
) features (for now). During OTP (one-time password) flow in the web or native app, when the user receives SMS with one-time code, if you have `autocomplete="one-time-code"` attribute on token input, [it should autofill])(https://twitter.com/IMAC2/status/1302942695980183556).

But just so it’s not so easy, at [Hugo](https://withhugo.com) [we learned](https://stackoverflow.com/a/52588566/2382115) that if “the system can parse a security code from an SMS message, the QuickType bar shows the code for up to three minutes after receiving it. If a security code arrives while the text input view is selected, the system pushes the incoming code to the QuickType bar.“

Note that iOS keyboard (with QuickType bar) won’t show [if `input` is focused programatically](https://www.google.com/search?q=ios+input+focus+no+keyboard&oq=ios+input+focus+no+keyboard&aqs=chrome.0.69i59.1192j0j7&sourceid=chrome&ie=UTF-8).

And finally, I noticed that SMS containing the code needs to be in a specific format - with code being either the first or last thing in the message.
