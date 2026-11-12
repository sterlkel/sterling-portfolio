# Content

- `posts/` holds published posts, one Markdown file per post. The file name is the slug: `posts/my-post.md` becomes `/writing/my-post`. While this folder has no posts, the site shows the coming-soon writing state.
- `sample-posts/` holds the mock's placeholder posts. They are never published. To preview the site with posts, run `POSTS_DIR=content/sample-posts bun dev`.

Every post needs this frontmatter:

```yaml
---
title: Building a personal CLI I actually use
date: 2026-10-01
category: tech   # tech or life
excerpt: One or two sentences shown in lists and link previews.
---
```

The build fails with the file name and the missing field if a post leaves one out.
