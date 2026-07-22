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
   - Value: *(paste the token only)*
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

## 4. Request indexing
Use **URL Inspection** on:
- `https://lovedoughs.vercel.app/`
- `https://lovedoughs.vercel.app/flavors`
- `https://lovedoughs.vercel.app/story`

Request indexing for each.

## 5. When you get a custom domain later
1. Set `VITE_SITE_URL=https://yourdomain.com` in Vercel
2. Update `public/robots.txt` and `public/sitemap.xml` hostnames (or regenerate them)
3. Add the new domain as a Search Console property and set up a 301 from the Vercel URL
