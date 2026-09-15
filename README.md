# Love Doughs website

The Love Doughs marketing site and Instagram-confirmed order form. It is a
TanStack Start application deployed as a Vercel server-rendered app.

## Run locally

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Use `npm run typecheck`, `npm run lint`, and `npm run build` before pushing.
The project is standardized on Node 24 and npm; do not add a second lockfile.

## Deploy with GitHub and Vercel

1. Create a GitHub repository or use the existing one, then commit and push
   this project to the `main` branch.
2. In Vercel, choose **Add New → Project**, import the GitHub repository, and
   keep the repository root as the root directory.
3. Vercel reads `vercel.json`, uses `npm ci`, and builds with `npm run build`.
   The configuration identifies this as a TanStack Start app, so SSR and
   server functions are deployed correctly.
4. Add the values from `.env.example` in **Vercel → Settings → Environment
   Variables**. Only `VITE_SITE_URL` and the Google Search Console token are
   public build-time values. Google Sheets credentials are server-only.
5. Push to `main` to create a production deployment. Pull requests receive
   preview deployments; order writes are disabled on previews by design.

GitHub Actions runs install, typecheck, lint, and build for pushes and pull
requests. Enable branch protection on `main` and require the `CI / validate`
check before merging.

## Google Sheets orders

Follow the complete setup in [docs/GOOGLE-SHEETS-ORDERS.md](docs/GOOGLE-SHEETS-ORDERS.md).
The order form saves a validated lead to a private `Orders` tab before giving
the customer an Instagram-ready confirmation message and order reference.

## Environment variables

| Variable                        | Purpose                               | Public? |
| ------------------------------- | ------------------------------------- | ------- |
| `VITE_SITE_URL`                 | Canonical production URL              | Yes     |
| `VITE_GOOGLE_SITE_VERIFICATION` | Google Search Console token           | Yes     |
| `GOOGLE_SHEETS_ID`              | Orders spreadsheet ID                 | No      |
| `GOOGLE_SERVICE_ACCOUNT_JSON`   | Google service-account JSON key       | No      |
| `GOOGLE_SHEETS_ORDERS_TAB`      | Orders tab name; defaults to `Orders` | No      |

Never commit real `.env` files or service-account keys.
