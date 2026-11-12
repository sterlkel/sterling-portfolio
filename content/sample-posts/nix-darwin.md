---
title: Declaring my whole Mac with nix-darwin
date: 2026-09-12
category: tech
excerpt: What it took to make a fresh laptop a one-command setup.
---

A new laptop used to cost me a weekend. Now it costs one command and a coffee.

## Why Nix

Every dotfile, app and system preference lives in one repository[^1]. If it isn't in the repo, it doesn't exist.

```bash
$ darwin-rebuild switch --flake .#laptop
```

## The catch

The learning curve is a cliff. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

[^1]: Including the Dock's auto-hide delay. Especially the Dock's auto-hide delay.
