---
title: One-liner to fix EADDRINUSE error
date: 2026-06-20
tags:
  - dev
  - tech
  - windows
---

On occasion, I get `Error: listen EADDRINUSE: address already in use :::8000` in the terminal. It usually means a stale server instance is still holding the port (8000 in this case), preventing me from starting a new process.

Here’s one-liner fix:

```bash
PORT=8000; netstat -ano | grep ":$PORT" | grep LISTENING | awk '{print $5}' | sort -u | xargs -r -I{} taskkill //PID {} //F
```

It finds the PID listening on the port and force-kills it. Change `PORT` to whatever’s stuck.

Note I’m using Git Bash on Windows through the VSCode terminal, where `netstat` puts the PID in column 5 (`$5`). On Linux/macOS the column differs.
