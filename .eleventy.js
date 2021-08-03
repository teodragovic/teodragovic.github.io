
const { DateTime } = require('luxon');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const footnote = require('markdown-it-footnote');
const embedYouTube = require('eleventy-plugin-youtube-embed');
const slugify = require('slugify');

const slugifyOptions = {
    replacement: '-',
    remove: /[&,+()$~%.'":*?<>{}–—|]/g,
    lower: true
};

module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget('styles/');
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(embedYouTube, { lite: true });

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

    eleventyConfig.addFilter('readableDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy LL dd');
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    // https://github.com/11ty/eleventy/issues/278#issuecomment-451105828
    eleventyConfig.addFilter('slug', (input) => slugify(input, slugifyOptions));

    eleventyConfig.addPassthroughCopy('img');
    eleventyConfig.addPassthroughCopy('CNAME');

    /* Markdown Overrides */
    const markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        permalink: true,
        permalinkClass: 'direct-link',
        // permalinkSymbol: '§',
        permalinkBefore: true,
        slugify: (input) => slugify(input, slugifyOptions)
    })
    .use(footnote);
    eleventyConfig.setLibrary('md', markdownLibrary);

    // Browsersync Overrides
    eleventyConfig.setBrowserSyncConfig({
        open: true,
        ui: false,
        ghostMode: false
    });

    return {
        templateFormats: [
            'md',
            'njk',
            'html',
            'liquid'
        ],

        markdownTemplateEngine: 'liquid',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',

        // These are all optional, defaults are shown:
        dir: {
            input: '.',
            includes: '_includes',
            data: '_data',
            output: '_site'
        }
    };
};
