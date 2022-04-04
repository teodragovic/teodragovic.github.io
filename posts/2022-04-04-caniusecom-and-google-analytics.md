---
title: caniuse.com and Google Analytics
date: 2022-04-04
tags:
  - tech
  - dev
---

I love [caniuse.com](https://caniuse.com/). It’s a great developer resource for checking browser compatibility and known browser bugs. By default, caniuse shows web feature support using browsers’ global usage data. But data set can be adjusted using Google Analytics to fit your specific project and users better. At [Hugo](https://www.withhugo.com), we offer car insurance specifically for US-based drivers, so it makes no sense to optimize for the whole world.

Per caniuse landing page:

> You can import usage data from your Google Analytics account and see exactly how well a feature is supported among your own site’s visitors. Look under the Settings panel to get started!

Google Analytics importer can be accessed by going into [settings](https://caniuse.com/ciu/settings#usage) and clicking “Open importer” or directly by visiting [caniuse.com/ciu/import](https://caniuse.com/ciu/import).

Note that to import GA data, ublock or other ad-blockers need to be disabled.

You can access any GA account and app associated with a connected Google profile and select a preset range (I  always opt for the last 30 days). After import, we get a nice little display of browsers included and usage statistics. For example, this is how [Hugo](https://www.withhugo.com) usage for March 2022.:

![Hugo.com usage statistics break down per browser](/img/caniuse-hugo.png)

Back in the Settings panel, I set GA data as default. I also like to set view mode usage relative and filter out browsers with less than 0.5% usage.

Now, when researching features to use in Hugo code, I have a better sense of what browsers/devices our users use and what’s safe to use in production.

![caniuse.com support for flexbox relative to hugo.com analytics data](/img/caniuse-flexbox.png)
