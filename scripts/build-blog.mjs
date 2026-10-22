// Compiles content/blog/*.md into static assets the app can fetch:
//   src/assets/blog/index.json   post metadata, newest first
//   src/assets/blog/<slug>.html  rendered post body
// Run automatically before start/build via the npm pre-hooks.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

const root = fileURLToPath(new URL('..', import.meta.url));
const sourceDir = join(root, 'content/blog');
const outputDir = join(root, 'src/assets/blog');
const wordsPerMinute = 200;

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight: (code, lang) =>
      hljs.highlight(code, {
        language: hljs.getLanguage(lang) ? lang : 'plaintext',
      }).value,
  }),
  {
    renderer: {
      // Open external links in a new tab; internal links stay in the SPA tab.
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${title}"` : '';
        const external = /^https?:\/\//.test(href);
        const targetAttr = external
          ? ' target="_blank" rel="noopener noreferrer"'
          : '';
        return `<a href="${href}"${titleAttr}${targetAttr}>${text}</a>`;
      },
    },
  }
);

function fail(file, message) {
  console.error(`build-blog: ${file}: ${message}`);
  process.exit(1);
}

function toIsoDate(file, value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    fail(file, `"date" is missing or not a valid date (got ${value})`);
  }
  return date.toISOString().slice(0, 10);
}

mkdirSync(outputDir, { recursive: true });
rmSync(join(outputDir, 'index.json'), { force: true });
for (const stale of readdirSync(outputDir, { withFileTypes: true })) {
  if (stale.isFile() && stale.name.endsWith('.html')) {
    rmSync(join(outputDir, stale.name));
  }
}

const posts = [];

for (const file of readdirSync(sourceDir).filter((f) => f.endsWith('.md'))) {
  const slug = basename(file, '.md');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(file, 'filename must be lowercase kebab-case, e.g. my-first-post.md');
  }

  const { data, content } = matter(readFileSync(join(sourceDir, file), 'utf8'));
  if (!data.title) {
    fail(file, 'frontmatter "title" is required');
  }
  if (data.draft) {
    continue;
  }

  const words = content.trim().split(/\s+/).length;
  posts.push({
    slug,
    title: String(data.title),
    date: toIsoDate(file, data.date),
    description: data.description ? String(data.description) : '',
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTimeMinutes: Math.max(1, Math.round(words / wordsPerMinute)),
  });

  writeFileSync(join(outputDir, `${slug}.html`), marked.parse(content));
}

posts.sort((a, b) => b.date.localeCompare(a.date));
writeFileSync(join(outputDir, 'index.json'), JSON.stringify(posts, null, 2));

console.log(`build-blog: wrote ${posts.length} post(s) to src/assets/blog`);
