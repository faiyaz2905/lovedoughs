# Google Sheets order tracker

This site records an order **lead** before the customer is sent to Instagram to
confirm it. The row is not proof of payment or delivery; use the `Status`,
`Payment status`, and `Delivery status` columns to manage the order after the
Instagram conversation.

## The architecture

```text
Customer's browser → Love Doughs server function on Vercel → Google Sheets API → Orders tab
```

The browser never receives Google credentials. The server validates the
customer's input, calculates the price from the product catalogue, assigns an
order ID, and writes values with the Sheets API's `RAW` mode.

Preview deployments intentionally refuse to write to the Sheet, so a test
preview cannot pollute real orders.

## 1. Create the Sheet

1. In Google Drive, create a private spreadsheet named `Love Doughs Orders`.
2. Rename the first tab to exactly `Orders`.
3. Paste this header row into `Orders!A1:AA1`:

```text
Request ID | Order ID | Submitted at (UTC) | Status | Source channel | First landing URL | Order page URL | Entry point | Referrer | UTM source | UTM medium | UTM campaign | UTM content | UTM term | Self-reported source | Product | Quantity | Unit price (BDT) | Total (BDT) | Customer name | Delivery area | Tin note | Trade Cookies code | Instagram confirmed at | Payment status | Delivery status | Owner notes
```

4. Freeze row 1 and turn on a filter. Optional: make a dropdown for `Status`
   with `Awaiting Instagram confirmation`, `Confirmed`, `Cancelled`, and
   `Delivered`.
5. Copy the spreadsheet ID from the URL. It is the value between `/d/` and
   `/edit`.

## 2. Give the website its own Google identity

1. Open [Google Cloud Console](https://console.cloud.google.com/) and create a
   small project such as `love-doughs-orders`.
2. Enable the **Google Sheets API** for that project.
3. Go to **IAM & Admin → Service Accounts** and create a service account such
   as `love-doughs-web-orders`.
4. Create a JSON key for that service account and download it once. Treat this
   file like a password.
5. In the Google Sheet, click **Share** and give the service-account email
   (it ends in `iam.gserviceaccount.com`) **Editor** access. Do not make the
   sheet public.

The service account only needs access to this one spreadsheet. It does not
need access to the rest of your Google Drive.

## 3. Add the secrets in Vercel

In **Vercel → Project → Settings → Environment Variables**, add these values
for **Production** only:

| Name                          | Value                                                          |
| ----------------------------- | -------------------------------------------------------------- |
| `VITE_SITE_URL`               | Your real production URL, for example `https://lovedoughs.com` |
| `GOOGLE_SHEETS_ID`            | The ID copied from the spreadsheet URL                         |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | The complete contents of the downloaded JSON key file          |
| `GOOGLE_SHEETS_ORDERS_TAB`    | `Orders` (optional; this is already the default)               |

`GOOGLE_SERVICE_ACCOUNT_JSON` and `GOOGLE_SHEETS_ID` are server-only values:
do not prefix them with `VITE_`, do not add them to a `.env` file that is
committed, and do not paste the JSON key into GitHub issues, chat, or the
browser console.

For a local test, copy `.env.example` to `.env.local`, set the same values,
and run `npm run dev`. `.env.local` is ignored by Git.

## 4. Test it safely

1. Deploy the site after adding the Vercel variables.
2. Open the actual production `/order` page with a tagged test link, for
   example:

   ```text
   https://your-domain.com/order?utm_source=test&utm_medium=qa&utm_campaign=launch
   ```

3. Submit a test order.
4. Confirm that one row appears in `Orders`, with an `LD-...` order ID and the
   UTM values in their matching columns.
5. Delete the test row manually if you do not want it in your records.

If the form says it could not save the order, check that the tab is exactly
named `Orders`, the Sheet is shared with the service account, and the Vercel
variables are present on the Production environment. Vercel function logs
will show the Google API status without printing customer details.

## Attribution: know where orders came from

Use a different tagged URL wherever you promote the site. The site stores the
first tagged landing page in the browser session, then keeps it on the order
row.

```text
Instagram bio
https://your-domain.com/?utm_source=instagram&utm_medium=organic&utm_campaign=bio

Instagram story
https://your-domain.com/?utm_source=instagram&utm_medium=social&utm_campaign=story_sep

Facebook post
https://your-domain.com/?utm_source=facebook&utm_medium=social&utm_campaign=launch

QR code at an event
https://your-domain.com/?utm_source=qr&utm_medium=offline&utm_campaign=pop_up
```

The optional “How did you hear about Love Doughs?” field is a useful backup:
Instagram's in-app browser and some privacy settings can remove referrer data.

To keep attribution complete, send customers to the website's order form—not
directly to an Instagram DM. The form creates a row and gives the customer an
order ID to paste into the Instagram confirmation message.

## Daily workflow and a simple dashboard

Use the Sheet as an operations tracker:

1. A new row begins as `Awaiting Instagram confirmation`.
2. Match the DM's `LD-...` reference to the row, then set `Status` to
   `Confirmed`.
3. Update payment and delivery status as the order moves forward.
4. Use filters for today's orders, unpaid orders, or a delivery area.

For a lightweight `Dashboard` tab, put this in cell `A1` to group delivered
orders by their marketing source:

```gs
=QUERY(Orders!A:AA, "select E, count(B), sum(S) where D = 'Delivered' group by E label count(B) 'Orders', sum(S) 'Revenue (BDT)'", 1)
```

## Is Google Sheets the right choice?

Yes for a small, manually confirmed business: it is inexpensive, easy to
filter, and simple to share with the people packing and delivering orders.
Keep it while the order volume is manageable. Move to a real database only
when you need concurrent stock control, customer accounts, automated payment
webhooks, granular staff permissions, or a high volume of simultaneous orders.
