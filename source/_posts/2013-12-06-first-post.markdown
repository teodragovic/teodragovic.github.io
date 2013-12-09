---
layout: post
title: "First post"
date: 2013-12-09
comments: true
categories: test
---

You're in! Nice. We've put together a little post to introduce you to the Ghost editor and get you started. Go ahead and edit this post to get going and learn how it all works!

----

## Getting Started

Writing in markdown is really easy. In the left hand panel of Ghost, you simply write as you normally would. Where appropriate, you can use *formatting* shortcuts to style your content. For example, a list:

* Item number one
* Item number two
    * A nested item
    * Second nested item
* A final item

- list item 1
- list item 2
- list item 3

or with numbers!

1. Remember to buy some milk
2. Drink the milk
    - list item
    - list item
3. Tweet that I remembered to buy the milk, and drank it
    1. list item
    2. list item

### Links

Want to link to a source? No problem. If you paste in url, like http://ghost.org - it'll automatically be linked up. But if you want to customise your anchor text, you can do that too! Here's a link to [the Ghost website](http://ghost.org). Neat. This is [an example](http://example.com/ "Title") inline link.

### What about Images?

Images work too! Already know the URL of the image you want to include in your article? Simply paste it in like this to make it show up:

![The Ghost Logo](http://tryghost.org/ghost.png)

{% img http://tryghost.org/ghost.png 'title' %}

### Video

{% youtube 2eeYi61UNAw %}

### Quoting

Sometimes a link isn't enough, you want to quote someone on what they've said. It was probably very wisdomous. Is wisdomous a word? Find out in a future release when we introduce spellcheck! For now - it's definitely a word.

> Wisdomous - it's definitely a word.

<br>

> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, natus quia asperiores est velit quidem labore ex iusto unde eius.
>
> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, eveniet!

{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}

### Working with Code

Got a streak of geek? We've got you covered there, too. You can write inline `<code>` blocks really easily `with back ticks`. Want to show off something more comprehensive? 4 spaces of indentation gets you there. <code>test</code>

~~~
body {color: black;}
~~~
{:lang="css"}

<pre data-src="../../code/test.css"></pre>

### Ready for a Break?

Throw 3 or more dashes down on any new line and you've got yourself a fancy new divider. Aw yeah.

---

### Advanced Usage

#### Level four heading

*Lorem ipsum dolor italic* sit amet, consectetur <s>test test</s> adipisicing elit. Dicta, ea, ab, assumenda deserunt quis vero **strong ttext** fugit laborum quas deleniti earum tempora <mark>this is marked text</mark> tempore. Consectetur!

<abbr>Lorem</abbr> ipsum dolor sit <sup>amet</sup>, consectetur adipisicing elit. Dignissimos, magni, blanditiis, ratione, in excepturi <sub>tempore</sub> quibusdam nesciunt ducimus vero repellat beatae accusamus sit temporibus facilis error numquam reiciendis alias modi!

##### Level five

<http://example.com/>

<dl>
  <dt><dfn>RSS</dfn></dt>
  <dd>An XML format for aggregating information from websites whose 
    content is frequently updated.</dd>
  <dt><dfn>Weblog</dfn></dt>
  <dd>Contraction of the term "web log", a weblog is a 
    website that is periodically updated, like a journal</dd>
</dl>

###### Level six

<small> small print Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, dolor, eius, facere voluptatem sequi fugit inventore omnis rerum deserunt quos voluptates consequuntur sunt eveniet unde error cupiditate quisquam aperiam adipisci.</small>
