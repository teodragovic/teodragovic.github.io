---
title: Email obfuscation
date: 2021-12-09
tags:
  - dev
  - js
  - css
  - html
---

Email obfuscation is a way to prevent various bots and crawlers from collecting email addresses from your website and using them to send spam. [Mailtrap](https://mailtrap.io/blog/email-obfuscation/) has a good article on this subject with a roundup of various techniques.

## The Cloudflare way

My email on this blog is obfuscated by [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200170016-What-is-Email-Address-Obfuscation-). When serving my website from CDN, they replace the email address I added in HTML with a string that looks like this:

```
<a href="/cdn-cgi/l/email-protection#4430212b6a203625232b322d27042329252d286a272b29" aria-label="Contact me">
```

And they inject [small piece of JavaScript](https://teodragovic.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js) that converts it back into readable, clickable `mailto` link for visitors. I like it since I don’t have to change or do anything special on my end. It’s a one-click option to turn on in Cloudflare settings. And it’s available on their free tier!

## The DIY way

The very first iterations of [Hugo](https://withhugo.com/) website featured "about us" section where each team member had their email listed. There I couldn’t use Cloudflare so I did my own obfuscation using some CSS, JS and Nunjucks magic.

First, the HTML/Nunjucks code:

```html
<span class="visually-hidden">{% raw %}{{ email | replace( '@', ' at ' ) }}{% endraw %}</span>
<a class="mail js-mail" aria-hidden>{% raw %}{{ email | reverse }}{% endraw %}</a>
```

The first line is intended for assistive technologies. It’s [visually hidden](https://www.a11yproject.com/posts/how-to-hide-content/) but gets read by screen readers. I use Nunjucks native [`replace`](https://mozilla.github.io/nunjucks/templating.html#replace) filter to both obfuscate and split the email into human-readable parts.

The second line is an anchor for display. It will be hidden from screen readers via `aria-hidden` tag. Note that it doesn’t have `href` attribute and email is rendered in [`reverse`](https://mozilla.github.io/nunjucks/templating.html#reverse) (so hello@awesome.com would be displayed as moc.emosewa@olleh).

To make it display normally on screen, I use this bit of CSS:

```css
.mail {
    unicode-bidi: bidi-override;
    direction: rtl;
}
```

By combining `unicode-bidi: bidi-override` and `direction: rtl` mail address is reversed back to original. That solves the rendering but clicking the link wouldn’t do anything without the `href`. To solve that part, we need a bit of JavaScript:

```js
function addMailToHref(selector) {
    const links = document.querySelectorAll(selector);

    links.forEach(link => {
        link.addEventListener('click', event => {
            const element = event.target;

            if (element.href === '') {
                const mailAddress = element.innerText.split( '' ).reverse().join( '' );
                return element.setAttribute('href', `mailto:${mailAddress}`);
            }
        }, { once : true });
    });
}

addMailToHref('.js-mail');
```

This function finds all links with `.js-mail` class attached and adds a listener on each one so when clicking the link, inner text gets reversed and set as `href` value with `mailto` scheme. Returning this will automatically open default email program.

The `{ once : true }` part is [`addEventListener` option](https://dev.to/js_bits_bill/addeventlistener-once-js-bits-565d) to make sure callback is only called on the first click. If a user clicks the same email link again, proper `href` would already exist and native behavior kicks in.

What’s missing from this approach is a fallback when JavaScript is disabled. In that case, doing copy/paste of the email will get you a reversed value. One solution is to use `.no-js` class and display visually hidden mail instead. Or use [email encoder](https://www.knechtology.com/stop-spam/email_encoder.html).

