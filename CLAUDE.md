# Loxymore

Podcast and media website. Node.js/Express backend serving static files from `public/`.

## Tech Stack

- **Backend:** Node.js + Express (ES modules — `import`/`export`, not `require`)
- **Frontend:** Vanilla HTML, CSS, JavaScript — no frameworks, no build tools, no preprocessors
- **APIs:** YouTube Data API v3, Spotify Web API
- **Fonts:** Metropolis, Nohemi (custom, loaded via `font.css`)

## Project Structure

```
├── server.js              ← Express entry point, serves public/
├── spotify.js             ← Spotify API helpers
├── .env                   ← API keys, port (never commit)
├── public/                ← Everything below is served statically
│   ├── index.html
│   ├── about.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   └── assets/
│       ├── favicon/
│       ├── img/
│       │   ├── jpg/       ← JPG originals + responsive variants
│       │   ├── png/       ← PNG originals + responsive variants (WebP only, no JPG)
│       │   └── webp/      ← WebP originals + responsive variants
│       └── videos/
│           ├── mp4/       ← MP4 originals + responsive variants
│           └── webm/      ← WebM originals + responsive variants
└── hidden/                ← Old/experimental files, do not touch
```

## Commands

- `npm start` or `node server.js` — start the Express server
- `python resize_assets.py` — generate responsive images/videos at 3 breakpoints

## Responsive Assets Convention

All images and videos have responsive variants at three breakpoints:

| Label     | Width   |
|-----------|---------|
| `mobile`  | 480px   |
| `tablet`  | 1024px  |
| `desktop` | 1920px  |

Filename pattern: `{name}-{mobile|tablet|desktop}.{ext}`

**Images** use `<picture>` with WebP prioritized over JPG:
```html
<picture>
  <source media="(max-width: 480px)"  srcset="./assets/img/webp/{name}-mobile.webp"  type="image/webp">
  <source media="(max-width: 1024px)" srcset="./assets/img/webp/{name}-tablet.webp"  type="image/webp">
  <source srcset="./assets/img/webp/{name}-desktop.webp" type="image/webp">
  <source media="(max-width: 480px)"  srcset="./assets/img/jpg/{name}-mobile.jpg">
  <source media="(max-width: 1024px)" srcset="./assets/img/jpg/{name}-tablet.jpg">
  <img src="./assets/img/jpg/{name}-desktop.jpg" alt="..." loading="lazy" decoding="async">
</picture>
```

**PNG images** → WebP sources only, no JPG fallback (transparency preserved).

**Videos** use `<source>` with WebM prioritized over MP4:
```html
<video autoplay muted loop playsinline>
  <source media="(max-width: 480px)"  src="./assets/videos/webm/{name}-mobile.webm"  type="video/webm">
  <source media="(max-width: 480px)"  src="./assets/videos/mp4/{name}-mobile.mp4"   type="video/mp4">
  <source media="(max-width: 1024px)" src="./assets/videos/webm/{name}-tablet.webm"  type="video/webm">
  <source media="(max-width: 1024px)" src="./assets/videos/mp4/{name}-tablet.mp4"   type="video/mp4">
  <source src="./assets/videos/webm/{name}-desktop.webm" type="video/webm">
  <source src="./assets/videos/mp4/{name}-desktop.mp4"  type="video/mp4">
</video>
```

Videos may be landscape (16:9) or portrait (9:16, TikTok/Shorts format). Aspect ratio is always preserved — never crop or stretch.

## Conventions

- All paths in HTML are relative to `public/` (e.g. `./assets/...`, `./css/...`)
- CSS is vanilla — no Sass, no PostCSS, no Tailwind
- JS uses ES module syntax in Node files; frontend JS is plain browser JS
- Responsive images/videos should always use `loading="lazy"` and `decoding="async"` on `<img>` tags

## Do Not Touch

- `hidden/` — archived experiments, not part of the live site
- `.env` — never commit, never modify, never log its contents
- Favicon files in `assets/favicon/` — do not change paths or markup for favicons
- Do not add frameworks, libraries, or build tools unless explicitly asked
