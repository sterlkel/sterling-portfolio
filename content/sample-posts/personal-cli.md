---
title: Building a personal CLI I actually use
date: 2026-10-01
category: tech
excerpt: Why I stopped collecting shell aliases and wrote one tool to hold all my small automations, and what I'd do differently.
---

For years my automation lived in a graveyard of shell aliases, half-finished Python scripts and launcher commands I forgot existed. This year I folded all of it into one tool: `sting`.

## Why one tool

The problem was never writing the scripts. It was finding them again three months later[^1]. A single entry point with subcommands means `sting --help` is the documentation.

> The best automation is the one you remember exists.

## The shape of it

Every command is a small module. Shared helpers for calling an LLM, reading my vault and talking to calendars live in a separate library, so scripts can reuse them too[^2].

```bash
# a typical morning
$ sting notes today
$ sting ai "summarize my unread email"
$ sting music dedupe --dry-run
```

## What I'd change

I'd write the help text first. Designing the commands as if explaining them to someone else forced better names than any refactor did.

Lorem ipsum filler so you can feel the reading length. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

[^1]: I once rewrote the same 'rename screenshots' script three times because I couldn't find the first two.
[^2]: That library is called stingtools. Naming things after yourself is a rite of passage.
