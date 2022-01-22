---
title: Sharing Git credentials between Windows and WSL
date: 2021-11-22
tags:
  - dev
  - tech
  - windows
  - link
layout: post
---

Update: after my latest Windows reinstallation, the original solution didn’t work. [This approach](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-git#git-credential-manager-setup) did the trick. Note that it doesn’t require changing anything in Windows and sets WSL git to use GMC instead of wincred.

TL;DR: run as root inside WSL

```
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/libexec/git-core/git-credential-manager-core.exe"
```

---

https://github.com/microsoft/vscode-docs/blob/vnext/docs/remote/troubleshooting.md#sharing-git-credentials-between-windows-and-wsl

> If you use HTTPS to clone your repositories and have a credential helper configured in Windows, you can share this with WSL so that passwords you enter are persisted on both sides. (Note that this does not apply to using SSH keys.)
>
> Just follow these steps:
>
> 1. Configure the credential manager on Windows by running the following in a Windows command prompt or PowerShell:
>
>```
>git config --global credential.helper wincred
>```
>
> 2. Configure WSL to use the same credential helper, but running the following in a WSL terminal:
>
>```
>git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/libexec/git-core/git-credential-wincred.exe"
>```
>
> Any password you enter when working with Git on the Windows side will now be available to WSL and vice versa.
