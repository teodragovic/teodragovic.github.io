---
layout: post
title: "Creating edge-case personas"
date: 2014-03-24
comments: true
categories: 
published: false
---

[User personas](http://www.ux-lady.com/introduction-to-user-personas/) are by now well established UX technique. By creating prototypes of sort you get a better idea about what will actual users be expecting of your site. [Trent Walton](https://twitter.com/trentwalton) recently wrote about designing [device-agnostic](http://trentwalton.com/2014/03/10/device-agnostic/). That meant setting your baseline to the worst possible conditions and have them met with sufficient design. These conditions included hostile browsers, small screens, slow connections and touch inputs.

I got this funny little idea of combining user personas and device-agnostic approach into <q>edge-case personas</q>. A person that will use site in most extreme of conditions. So here it goes...

<!-- more -->

## Person A

This is an elderly, shortsighted person that still uses old Pentium 4 PC with 13" CRT monitor and Windows XP installed. Thanks to Windows update, this person has latest supported version of Internet Explorer - IE8. When going online, she doesn't open browser window in full screen. Why? Maybe she wants to keep an eye on that big digital clock or that widget-thingy that shows her pictures of her grandkids. Or maybe she doesn't want to loose sight of that never-ending game of solitaire that she keeps on. Point is, browser window is resized to about 400px width but even when it's at full screen viewport is only about 800x400 pixels because of gazillion toolbars installed on top of IE. So we are looking at about 400x400 pixels of screen space. No retina.

She is color blind and her husband is almost completely blind so has to use screen reader. These folks don’t have any social media accounts and probably go online few times a year when it's either too hot or too cold to go out and work in the field. Their internet connection is fastest you can get with 56k modem but often pretty shaky considering they live in rural, low populated type of place where cell phones don't even work and everybody still uses payphones.

Now, why the hell that person wants to visit my site? Well, maybe they have tons of cash or gold buried behind the shed and want to spend some of it to buy a present for their grandson who happens to be interested in things my site is all about. Or maybe they know the guy who owns the business my site is part of. And the owner is one of those clients-from-hell type of guys who values opinions of his old buddies over some snotty web dude. In fact, he holds it in such high regard that he's willing to fire people based solely on it. 

---

What this scenario didn't account for is the other end of the spectrum that includes large HD screens, super-fast connections (okay, I think we are safe from the perils of this one) and keyboard-only inputs. Seems that very few sites deal with big screens beyond just setting max-width. In my mind that is still going against ebb and flow of the web and not really being responsive or future friendly. And that lead me to creating another extreme...

## Person B

Person B has been surrounded with high-tech toys since birth. Instead of computer monitor he has 45" high density plazma TV that hasn't even reached the marked but his dad is super-rich and he knows a guy who knows a guy. When browsing, he does it from a 6 ft. distance using only keyboard. On plazma, he uses Google Canary, because that is the latest version you can get. But on his tablet he uses Firefox and Safari on smartphone. All devices have retina-type displays but each one has different CSS pixel ratio. He has super-fast internet connection, over clocked GPU and all experimental flags turned on. 

This person is young, spoiled kid with fat fingers and attention span of a goldfish. Only time he's offline is when he sleeps. He switches devices every 10 minutes and goes trough sites in about 10 seconds. He doesn't care about anything in particular and is currently browsing my site just so he can nitpick some little detail over which I slaved for weeks and leave a snarky comment on Twitter (I hate his so much). He is also a grandson of Person A. And you know that owner of the company that my site is part of? Yeah, that's his dad.

See what I did there? 

---

This little story is maybe far fetched but I also think it's kinda funny that while thinking about my edge-case personas I feel compassion for Person A and loathing for Person B and at the same time, when building a site I hate making things work for Person A and love when I can just go all Person B on my code and design.
