# Tayo Restaurant & Hall — Website

Static site for **Tayo Restaurant & Hall** (Rugsan Mall, Mogadishu) — built
1:1 from the Figma design with Next.js App Router, exported as pure HTML/CSS/JS.

- **Pages** (hash-routed SPA, zero server config): Home · Cafeteria Menu (12 dishes + category filter) · Tayo Hall (venue + booking calendar) · Contact (form + info)
- **Design system**: maroon `#8B0F16` / olive `#424A31` / gold `#F2B74A` / cream `#FFF9F2`; Manrope (display) + DM Sans (body) + DM Serif (elegant) + Plus Jakarta (watermark)
- **Motion**: scroll-reveal sections, hero parallax (scroll + mouse), floating garnishes, animated menu filter, `prefers-reduced-motion` respected

## Local development

```bash
bun install        # or: npm install
bun run dev        # or: npm run dev  → http://localhost:3000
```

## Build (static export)

```bash
bun run build      # or: npm run build  → pure static site in ./out
bun run preview    # serve ./out locally
```

`npm run build` runs `BUILD_STATIC=1 next build` and produces the `out/`
folder — deployable to any static host (Cloudflare Pages, GitHub Pages,
Netlify, S3…). No server, no database, no environment variables.

## Deploy to Cloudflare Pages (via GitHub)

1. Push this repo to GitHub (see below).
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo, then:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. Save & Deploy. Every push to `main` redeploys automatically.

## Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/tayo-restaurant.git
git push -u origin main
```

(Create the empty repo first at github.com/new — no README/gitignore needed,
this repo already has its history.)

---

© 2026 Tayo Restaurant & Hall · Site designed by Nuvora Digital
