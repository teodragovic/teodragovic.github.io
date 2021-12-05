---
title: Three ways to keep drafts in 11ty
date: 2021-12-07
tags:
  - dev
  - js
---

This blog is made using [Eleventy base blog](https://github.com/11ty/eleventy-base-blog). It’s a pretty simple setup. I write my posts in markdown and use [Nunjucks](https://mozilla.github.io/nunjucks/) for templating. One feature that was missing was the ability to keep unpublished blog posts as drafts. I found ~two~three ways to add that in.

## Filter posts using metadata

In my front matter data I added `draft: true` so it looks like this:

```yml
---
title: Two ways to keep drafts in 11ty
date: 2021-12-07
draft: true
tags:
  - dev
  - js
---
```

And I can use it in my `blog.njk` template that loops over all posts in a collection and lists them on [`/blog`](/blog/) page.

```html
{% raw %}
<div class="postlist">
    {% for post in postslist | reverse %}
        {% if not post.data.draft %}
            <article class="postlist__item">
            {# Title, link etc. goes here #}
            </article>
        {% endif %}
    {% endfor %}
</div>
{% endraw %}
```

The `{% raw %}{% if not post.data.draft %}{% endraw %}` conditional is used to filter out posts marked as drafts. Note that this doesn’t actually stop the post from being published and it will still be available via [direct link](/blog/three-ways-to-keep-drafts-in-11ty/).

## Filter posts using date

This approach is better if I have a finished post but wanna delay publication. But I can also set some crazy future date like the year 2089. while I’m working on an article and just change it back to the current date when ready.

I can do that by adding a custom filter in my `.eleventy.js` to check if the post date is set in the future.

```js
eleventyConfig.addFilter('isPublished', function(post) {
    return post.filter(post => new Date(post.date) <= new Date());
});
```

And now I can use it to filter out my posts like so:

```html
{% raw %}
<div class="postlist">
    {% for post in postslist | reverse | isPublished %}
        {% if not post.data.draft %}
            <article class="postlist__item">
            {# Title, link etc. goes here #}
            </article>
        {% endif %}
    {% endfor %}
</div>
{% endraw %}
```

Here, I apply the filter directly on my post list collection (the `{% raw %}{% for post in postslist | reverse | isPublished %}{% endraw %}` part). In fact, let’s convert the draft conditional into a filter as well to clean things up.

First, add another filter to `.nunjucks.js`:

```js
eleventyConfig.addFilter('notDraft', function(post) {
    return post.filter(post => !post.data.draft);
});
```

Second, update `blog.njk` template to look like this:

```html
{% raw %}
<div class="postlist">
    {% for post in postslist | reverse | isPublished | notDraft %}
        <article class="postlist__item">
        {# Title, link etc. goes here #}
        </article>
    {% endfor %}
</div>
{% endraw %}
```

Now I have the ability to mark posts as drafts AND schedule publishing in the future! Note that neither of those stops my articles from getting processed and available from a direct link.

## Use a separate directory

Create a folder like `_drafts` in the project root, add it to `.eleventyignore` and just keep your drafts there until ready.

This way nothing unfinished gets published and you don’t have to worry about direct links. It’s also the fastest since eleventy doesn’t have to go through all drafts and filter them out. What’s missing is the ability to easily preview the post locally.
