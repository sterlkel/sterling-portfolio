---
role: Solo · design & engineering
timeline: 2025 – ongoing
stats:
  - value: 30+
    label: subcommands
  - value: "1"
    label: entry point
  - value: "0"
    label: forgotten aliases
---

## The problem

My automation lived in a graveyard of shell aliases, one-off Python scripts and launcher commands I forgot existed. The scripts weren't the problem. Finding them again three months later was.

## The idea

One entry point, `sting`, with subcommands for everything: notes, AI helpers, music library chores, calendar glue. If `sting --help` lists it, it exists.

## How it's built

Each command is a small module. Shared helpers for calling an LLM, reading my Obsidian vault and talking to calendars live in a separate library (`stingtools`), so standalone scripts can reuse them too. It's installed as a `uv` tool, so it's on every machine my nix config touches.

## What I learned

Write the help text first. Designing commands as if I were explaining them to someone else forced better names than any refactor did.
