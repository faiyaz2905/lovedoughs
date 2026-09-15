# Google Search Console — verify & submit sitemap

After deploying these SEO changes to **https://lovedoughs.vercel.app**:

## 1. Add the property

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property → **URL prefix** → `https://lovedoughs.vercel.app`

## 2. Verify ownership (HTML tag)

1. Choose **HTML tag** verification
2. Copy the content token (the string inside `content="..."`)
3. In the Vercel project → Settings → Environment Variables, add:

   - Name: `VITE_GOOGLE_SITE_VERIFICATION`
   - Value: _(paste the token only)_
   - Environments: Production (and Preview if you want)

4. Redeploy the site so the meta tag appears in `<head>`
5. Click **Verify** in Search Console

The app reads this env var in [`src/routes/__root.tsx`](../src/routes/__root.tsx) and only emits the meta tag when it is set.

## 3. Submit the sitemap

1. In Search Console → **Sitemaps**
2. Submit: `https://lovedoughs.vercel.app/sitemap.xml`
3. Confirm status becomes **Success**

Also confirm:

- `https://lovedoughs.vercel.app/robots.txt` loads and lists the sitemap
- `https://lovedoughs.vercel.app/llms.txt` loads (for AI crawlers)

### If GSC says "Couldn't fetch"

Your sitemap is valid (browser + Googlebot get `200` + `application/xml`). This is often a GSC cache/timing issue.

1. Wait 30–60 minutes after deploy, then open **Sitemaps** and click refresh
2. Or remove the failed entry and submit again as: `sitemap.xml` (path only)
3. Or try the cache-bust form: `https://lovedoughs.vercel.app/sitemap.xml/` (trailing slash) — some sites report this forces a fresh fetch
4. Confirm Vercel → Settings → **Deployment Protection** is **off** for Production (no password / Vercel Authentication gate)

## 4. Request indexing ("URL is not on Google")

**This message is normal for a new site.** It does **not** mean the page is broken. It means Google has not indexed it yet.

For each important URL:

1. GSC → **URL Inspection** (top search bar)
2. Paste e.g. `https://lovedoughs.vercel.app/`
3. Wait for the report — you will see **"URL is not on Google"**
4. Click **Request indexing**
5. Wait for "Indexing requested" confirmation

Repeat for:

- `https://lovedoughs.vercel.app/`
- `https://lovedoughs.vercel.app/flavors`
- `https://lovedoughs.vercel.app/flavors/chocolate-chip`
- `https://lovedoughs.vercel.app/flavors/red-velvet`
- `https://lovedoughs.vercel.app/story`
- `https://lovedoughs.vercel.app/sitemap.xml` (optional; helps discovery)

Indexing can take hours to several days. Check back under **Pages** / **Sitemaps**.

### Optional: Test live URL first

In URL Inspection, after the report loads, open **Test live URL** / **View crawled page**. You should see your title, H1 text, and no soft-404. If the live test succeeds, Request indexing will usually succeed too.

## 5. When you get a custom domain later

1. Set `VITE_SITE_URL=https://yourdomain.com` in Vercel
2. Update `public/robots.txt` and `public/sitemap.xml` hostnames (or regenerate them)
3. Add the new domain as a Search Console property and set up a 301 from the Vercel URL
