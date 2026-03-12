---
title: Three ways to test npm package locally
date: 2026-03-02
tags:
  - tech
  - dev
  - workflow
---

Recently I worked on small library of JSX icons to be used in other projects. Before publishing on npm, I wanted to check if everything works locally. I found three ways to do this:

## file://

I have a folder with projects that looks something like this:

```
- icons
- app
- backend
```

`icons` is the new library I’m working on, and `app` is one of the projects that is supposed to consume it.

In `app`’s package.json I was able to do `"@acme/icons": "file:../icons"` pointing to package on my disk. I find it easiest to have both projects co-located in same folder like above.

Note that I use `@acme` scope here since my library is to be published under my organization scope. So `@acme/icons` is name under `package.json` `name` field in `icons` project, it’s what is referenced when doing imports and it’s what should be used when installing in other projects. The name of the folder can be anything as long as it points to the package with correct `name` field.

Running `npm install` inside `app` will install `icons` just as it would published package. Biggest drawback of this approach is that I need to run `npm install` everytime I change something in `icons` project locally as changes aren’t picked up automatically.

## npm link

[Reference](https://docs.npmjs.com/cli/v9/commands/npm-link/)

`npm link` is recommended and fastest way for local development. Using same folder structure as above it would go something like this:

1. do `cd icons`
2. run `npm link`
3. do `cd ../app`
4. run `npm link @acme/icons` (note I’m using package name and not folder name)

Now I can do work on `icons` and all changes will be picked up automatically in `app` without the need to run `npm install`.

Once finished, make sure to run `npm unlink @acme/icons` in `app` to remove linked package and `npm unlink` in `icons` to remove symlink.

## npm pack

This is the third option I didn’t actually used. I just seemed like even more frictious variant of `file://`. This can be use for final test since it most closely mimics full production-like experience. Other two ways are quicker but use package source code and not built version (which might not make a difference if you build locally).

In `icons`:

- Do `npm pack`
- You will get a `acme-icons-<version>.tgz` file

In `app`:

- Do `npm install <path>/acme-icons-<version>.tgz`

To pick up any changes if tarball is updated but version is the same you need to reinstall the package using `npm install <path>/acme-icons-<version>.tgz --save` or delete `package-lock.json` and `node_modules`. Using simply `npm install` won’t work since sha of the package doesn’t change unless you bump the version.
