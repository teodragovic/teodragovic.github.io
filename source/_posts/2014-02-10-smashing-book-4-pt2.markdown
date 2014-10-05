---
layout: post
title: "Notes from reading Smashing Book #4 - pt. 2"
date: 2014-02-10
comments: true
categories: 
---

More notes from [Smashing Book #4](http://www.smashingmagazine.com/smashing-book-4-new-perspectives/). Going forward with chapters 3 and 4. Some really great insights and ideas for keeping sites lean and fast.

<!-- more -->

## [Chapter 3] The Vanilla Web Diet by Christian Heilmann

### Build on what works

Avoid unnecessary boilerplates and frameworks and start with a clean slate. HTML5 is a boilerplate in itself. Use HTML build-in features and expand upon them only when needed.

Base layer should be plain HTML with links and semantic markup that works without any CSS or JS.

### Lack of support is an opportunity

> If an old browser cannot do something, we have the chance to test for it and not
provide that functionality. In most cases, the functionality is merely nice to have
and isn’t needed.

> Start with basic code that works in all browsers, then add to it and make sure that browsers that should not be in use at all do not get code they might choke on — you’ll leave everybody happy.

### Browser-specific code cannot be trusted

Any code that needs vendor prefixes should have universal fallback.

**Personal note:** Use autoprefixer and write only latest unprefixed syntax.

### Use a mix of technologies, each for what it does best

Don't force everything in JavaScript if it can be done in CSS and vice-versa. Use HTML for content, JS for triggering interactions and CSS for styling and animations.

### Ask questions

Before adding new functionality, ask environment **if** it can be processed and provide appropriate fallbacks.

> The less code we force our browsers to parse, the better their performance will be.

### Write as much as needed, not the least possible

Don't let quick fixes add up. Think about maintainability of code before and while writing it.

### Basic functionality should always be there.

> What does basic functionality entail? Put simply, it allows the user to do what they came for regardless of any technology failure.

Links should always work, forms should be sent to server-side control and embedded media should have fallback links to raw files.

### Usefulness beats consistency across browsers

Don't force one design that works everywhere. Instead, make sure different expiriences result in the same outcome - making website or app usable. 

### Load only what is needed

Don't give browsers assets they can't use. Use JavaScript for support testing and loading resources on demand.

Delay loading unnecessary content and force storing it on user devices as much as possible.

**TIP:** Trigger load when user activates focus on forms input meaning there is no other interaction with site/app. Also, load images only when they enter viewport.

### Analyzing effects beats adding FX

> If you want to add shiny things, make sure they can perform in a shiny fashion.

Effects added in native apps will not necessary be appropriate or perform as well in web apps.

### Strong foundations beat a possible future addition

Don't add excessive code or frameworks for future that may never come. Use only what you need to achieve current goals. 

> Many of the apps and websites we produce are there, first and foremost, to get people to put content into them and make that content available to others. The code of the app itself should play a secondary role to that.

---

## [Chapter 4] Culture of Performance by Tim Kadlec

Plan for performance and keep it in mind early on and during development process, not just after launch.

Decrease of page load time directly impacts revenue, conversions and page traffic.

57% of users will abandon a site after waiting three seconds for the page to load.

To make performance decision makers priority tie it to the metrics they care about and make visual representations (show site loading in comparison to competitor site).

Keep performance in discussion. By leaving it as an afterthought you are underplaying its importance.

Set up **performance budget** - page load time, total weight and number of requests.

Response targets by Jakob Neilsen:

> - 0.1s - The limit for users to feel that the system reacts instantaneously.
> - 1.0s - The limit for uninterrupted flow of thought. The users notice the delay, but they still feel direct interaction.
> - 10s - The limit for keeping user attention. Anything longer than this and the users will either give up or go off to do something else while they wait.

At all times measure current performance of your site and your competitors site as well.

**20% rule** - to create a noticeable improvement in performance as perceived by your visitors, you need to improve performance by at least 20%.

How to add new feature while having performance budget:

- optimize existing features to stay inside budget
- remove existing features to make room in the budget for new feature
- don't add new feature if it's not important enough to push other fetures out

> Keep enforcing the budget after launch as a way of avoiding the slow creep of
bloat that tends to manifest itself.

When setting performance budget be strict and explicit but keep it realistic. Don't set metrics to hight or too low. 

Categorize assets on the page (ie. content, enhancements and leftovers).

> A performance budget is meant to help you decide how to display your content, not what content to display. Removing important content from a page is not a performance strategy.

Use apps to simulate slow connections

- <http://www.charlesproxy.com/>
- <http://slowyapp.com/>

It's hard to see potential performance pitfalls from Photoshop - get to the browser early.

**TIP:** Following snippet outputs perceived load time to the console (it can be also used on elements)

```
function getLoadTime() {
    var now = new Date().getTime();
    // Get the performance object
    window.performance = window.performance || window.mozPerformance 
    || window.msPerformance || window.webkitPerformance || {};
    var timing = performance.timing || {};
    if (timing) {
        var load_time = now - timing.navigationStart;
        console.log('Load time: ' + load_time + 'ms');
    }
}

window.onload = function() {
    getLoadTime();
}
```

Everything that gets added to the page must be justifed. Keep base template as lean as possible. Use tested and proved solutions but only when needed - don't include them by default.

> For any item included on your page, do whatever you can to minimize its impact on page weight and load time.

Use [image](http://pngmini.com/) [optimization](http://imageoptim.com/) [tools](http://jamiemason.github.io/ImageOptim-CLI/)

[**Secrets to Lightning Fast Mobile Design**](https://speakerdeck.com/mikeyk/secrets-to-lightning-fast-mobile-design)

Design site so it **feels** fast to the user. Users can perceive site as fast if it takes them less time to complete tasks.

### Links

- <http://bradfrostweb.com/blog/post/performance-as-design/>
- <http://www.keynote.com/keynote_competitive_research/index.html>
- <http://www.codinghorror.com/blog/2011/06/performance-is-a-feature.html>
- <http://www.uie.com/articles/download_time/>
- <https://alexsexton.com/blog/2013/03/deploying-javascript-applications/>
- <http://filamentgroup.com/lab/socialcount/>
- <http://bradfrostweb.com/blog/post/atomic-web-design/>

