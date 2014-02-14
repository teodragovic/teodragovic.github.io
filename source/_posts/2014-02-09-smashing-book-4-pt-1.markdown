---
layout: post
title: "[NOTES] Smashing Book #4 - pt. 1"
date: 2014-02-09
comments: false
categories: 
---

I have this memento superpower to easily and quickly forget almost everything I read or watch after short period of time. That's why I decided to take notes on information I gather from various articles, tutorials, conference talks and books. Most recently, I started reading wonderful [Smashing Book #4](https://shop.smashingmagazine.com/smashing-book-4-ebooks.html). These are my take-away points from first two chapters of the book.

<!-- more -->

## [Chapter 1] Modern CSS Architecture and Front-End Development by Harry Roberts

There are three stakeholders in every project: the client, the user and the developer. Clients and users don't care about code, they just want site to be fast and reliable. 

> In reality, developers are the only people who really care about code. Write it for yourself, but write it to be fast (for the users) and robust (for
the client).

Elements should be semantic and make sense to machines that interpret them, classes should be sensible and make sense to humans who read them. 

#### OOCSS and Code Structure

Abstract and reuse repeating design patterns using object-orientated paradigms (single responsibility principle).

Plan and organize CSS architecture before starting to code. Arrange code in parts so that every new set inherits from previous ones and order rules from most to last generic.

#### Selectors

> The bite-sized guideline for decent CSS selectors is basically: keep them well-named, as short as possible, and keep specificity low at all costs.

Don't use IDs - they are too specific and can't be reused. Also, avoid compound selectors or at least, keep them short as possible.

Tying selectors to location reduces their scope for reuse. Keep selectors portable and robust. 

#### Naming and Verbosity

> Class names should communicate useful information to developers - Nicolas Gallagher

Use abstract names for high-level abstractions that should make design patterns and specific names for specific components. DON'T combine them.

Insisting on clean markup often results in messy CSS. Use as much classes as needed. HTML is easier to update than CSS is to refactor.

> If something has to do N things, it should have N hooks applied to it.

Separate CSS classes from JS handlers (ie. `.button` for style, `.js-button` for event binding).

### Links

- <http://www.stubbornella.org/content/2011/04/28/our-best-practices-are-killing-us/>
- <https://github.com/stubbornella/oocss/wiki>
- <http://meiert.com/en/blog/20080812/best-practice-ids-and-classes/>
- <http://www.youtube.com/watch?v=XQWOKBBJ114&hd=1>
- <http://smacss.com/>
- <http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/>
- <http://nicolasgallagher.com/about-html-semantics-front-end-architecture/>
- <http://bem.info/method/>

----

## [Chapter 2] Writing Maintainable, Future-Friendly Code by Nicholas Zakas

#### Code Conventions

Define and use single coding style for project. It makes communication easier and errors more obvious.

Leave comments in code to explain what it does, why is doing it in that way and reference any bugs it's related to.

#### Architecture

Architecture keeps code organized, scalable and encourages good design.

Before starting to code, research and choose **appropriate** CSS and JS architecture. Also, document your reasoning for choosing particular architecture.

Any kind of architecture is better than having no architecture.

#### Documentation

> Good software is well-documented software, and bad software has little documentation. There is no such thing as maintainable code that isn’t also documented.

Common approaches to writing documentation:

- Getting started guide
- Tutorials for common use cases
- API documentation

API documentation is the minimum that a project should have for documentation.

**Design document**

> Design documents describe the architecture and options available within
some piece of software. It is frequently written before coding begins and
updated once coding is complete. Design documents answer the question,
“How does this work?”

Make documentation part of feature deliverable to ensure it gets written.

#### Third-Party Components

When choosing third-party components keep note:

- When was last time updated
- Who is developer
- Is developer responsive
- How stable is API
- Who else is using it

Keep third-party code separate. Don't make edits or fork it, instead try to write plugin or extension.

#### Legacy code

Leave yourself comments when working with legacy code.

Favor refactoring over rewriting and add unit tests.

> Add documentation. Add tests. Don’t believe in magic.

### Links

- <http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml>
- <http://contribute.jquery.org/style-guide/js/>
- <http://www.slideshare.net/nzakas/scalable-javascript-application-architecture>
- <http://coding.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/>
- <http://www.chromium.org/developers/design-documents>
- <http://warpspire.com/kss/styleguides/>
