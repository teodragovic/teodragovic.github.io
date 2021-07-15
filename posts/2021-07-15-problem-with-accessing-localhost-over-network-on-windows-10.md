---
title: Problem with accessing localhost over network on Windows 10
date: 2021-07-15
tags:
  - tech
  - windows
layout: post
---

Sometimes I need to test apps or websites I'm building on different devices. [Many](https://create-react-app.dev/) [frameworks](https://preactjs.com/cli/) help me do this by writing out network address and port in the console when running in watch mode. That address is my LAN IP that can also be found by running `ipconfig` in the terminal.

Since my last Windows install or update I noticed that accessing `localhost` over the network no longer works. I tested different devices, browsers and frameworks to eliminate other possibilities. It came down to some issue on my particular Windows build.

Like I do most times, I googled and randomly tried different proposed solutions to similar problems until I found [this one](https://www.tenforums.com/network-sharing/31427-win-10-update-kb3120677.html#post479597) that worked.

## Solution

1. Open the services menu by clicking start and then clicking RUN and typing ’services.msc’ and pressing enter.
2. Look for the following services in the list:
  · DNS Client
  · Function Discovery Provider Host
  · Function Discovery Resource Publication
  · Peer Networking Grouping
  · SSDP Discovery
  · UPnP Device Host
3. Make sure they are set to AUTOMATIC START instead of MANUAL.
4. Go down the list one by one and even if they are running do a mouse right-click and SELECT "RESTART".
5. On the ones that are showing a blank and not running right click and SELECT "START".

After following these steps, the next time I ran `npm start` I got a firewall popup asking me to allow Node network access. Possibly I declined this by accident sometimes prior. Now I allowed my service to bypass the firewall and I could access `localhost` IP over the network.
