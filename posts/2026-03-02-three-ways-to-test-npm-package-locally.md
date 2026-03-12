---
title: Three ways to test npm package locally
date: 2026-03-02
tags:
  - tech
  - dev
  - workflow
---

Recently I worked on a small library of JSX icons to be used in other projects. Before publishing on npm, I wanted to check if everything works locally. I found three ways to do this:

## file://

I have a folder with projects that looks something like this:

```
- icons
- app
- backend
```

`icons` is the new library I’m working on, and `app` is one of the projects that is supposed to consume it.

In `app`’s package.json I was able to do `"@acme/icons": "file:../icons"`, pointing to a package on my disk. I find it easiest to have both projects co-located in the same folder as above.

Note that I use the `@acme` scope here since my library is to be published under my organization’s scope. So `@acme/icons` is the name under package.json’s `name` field in the `icons` project — it’s what is referenced when doing imports, and it’s what should be used when installing in other projects. The name of the folder can be anything, as long as it points to the package with the correct `name` field.

Running `npm install` inside `app` will install `icons` just as it would a published package. The biggest drawback of this approach is that I need to run `npm install` every time I change something in the `icons` project locally, as changes aren’t picked up automatically.

## npm link

[Reference](https://docs.npmjs.com/cli/v9/commands/npm-link/)

`npm link` is the recommended and fastest way for local development. Using the same folder structure as above, it would go something like this:

1. Do `cd icons`
2. Run `npm link`
3. Do `cd ../app`
4. Run `npm link @acme/icons` (note I’m using the package name and not the folder name)

Now I can do work on `icons` and all changes will be picked up automatically in `app` without needing to run `npm install`.

Once finished, make sure to run `npm unlink @acme/icons` in `app` to remove the linked package, and `npm unlink` in `icons` to remove the symlink.

## npm pack

This is the third option I didn’t actually use. It seemed like an even more friction-heavy variant of `file://`. It can be used for a final test since it most closely mimics a full production-like experience. The other two approaches are quicker but use the package source code and not the built version (which might not make a difference if you build locally).

In `icons`:

- Do `npm pack`
- You will get an `acme-icons-<version>.tgz` file

In `app`:

- Do `npm install <path>/acme-icons-<version>.tgz`

To pick up any changes if the tarball is updated but the version is the same, you need to reinstall the package using `npm install <path>/acme-icons-<version>.tgz --save`, or delete `package-lock.json` and `node_modules`. Using `npm install` alone won’t work since the sha of the package doesn’t change unless you bump the version.
