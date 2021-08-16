---
title: Google Analytics via Segment - cloud vs device mode
date: 2021-08-16
tags:
  - dev
layout: post
---

Out of the box, [Google Analytics](https://analytics.google.com/) collects a bunch of information. For example, information about mobile devices: brand, resolution, OS, etc.

![Screenshot of GA dashboard showing Mobile Device Info table](/img/ga-mobile.png)

At [Hugo](https://withhugo.com), we use [Segment](https://segment.com/) to track and collect user data and pass it down onto various 3rd party services we use. This way, only tracking code added to the front end is from Segment and they take care of the rest.

On the client, there are two ways to pass data to Segment and connected services - cloud-mode and device-mode. Per Segment docs:

>  **Cloud-mode:** in this mode, the sources send data directly to the Segment servers, which then translate it for each connected downstream destination, and send it on. Translation is done on the Segment servers, keeping your page size, method count, and load time small.
>
> **Device-mode:** in this mode, you include additional code on your website or mobile app which allows Segment to use the data you collect on the device to make calls directly to the destination tool’s API, without sending it to the Segment servers first. (You still send your data to the Segment servers, but this occurs asynchronously.) This is also called “wrapping” or “bundling”, and it might be required when the source has to be loaded on the page to work, or loaded directly on the device to function correctly. When you use Analytics.js, you can change the device-mode destinations that a specific source sends to from within the Segment web app, without touching any code.

And specifically for connecting Google Analytics:

> **In device mode:**
> - Segment will load your tools’ libraries onto your site behind the scenes. Segment will then translate your tracking events into the appropriate format and send them directly to the tools’ servers from the user’s browser.
>
> **In cloud mode:**
> - Segment will no longer load third-party libraries onto your site. Instead, Segment will send event data to Segment’s cloud servers, and from there, we will translate and route that data to the tools you’re using. This reduces the amount of third-party code on your site.
> - You will not be able to use any widgets loaded by Google Analytics
> - You will be able to replay historical data into Google Analytics

From what documentation said, cloud-mode seemed like a no-brainer. Reducing the amount of 3rd party code loaded on the client was one of the reasons we choose Segment in the first place.

What wasn’t obvious however, is the loss of data when using cloud-mode. After connecting Google Analytics via Segment some of the data started appearing as `(not set)`.

![Screenshot of GA dashboard showing missing data for Screen Resolution](/img/ga-mobile-2.png)

What was happening is that Segment was collecting and passing only a subset of data Google Analytics usually collects. [Here is a list of automatically collected fields](https://segment.com/docs/connections/spec/common/#context-fields-automatically-collected) (which also varies wheater Segment is used on the web, Android or iOS apps).

So if we want to know our visitors’ screen resolutions we need to collect and send it explicitly...or switch back to device mode.
