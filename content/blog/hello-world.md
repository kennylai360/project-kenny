---
title: Hello, world
date: 2026-10-22
description: How this blog is put together, and a quick test of every Markdown feature it supports.
tags: [meta, angular]
---

This blog is just Markdown files in the repo. Each file in `content/blog/` becomes a post at `/blog/<filename>`.

## Writing a post

Create `content/blog/my-post.md` with frontmatter at the top:

```yaml
---
title: My post
date: 2026-10-22
description: One line shown on the listing page.
tags: [angular, notes]
draft: true # optional, hides the post until removed
---
```

Then restart `npm start` (or run `npm run blog:build`) to pick it up.

## Formatting check

Some **bold**, some _italic_, and an [external link](https://angular.dev).

- A bullet list
- With a second item

> A blockquote for good measure.

```ts
const greet = (name: string): string => `Hello, ${name}!`;
console.log(greet('world'));
```
