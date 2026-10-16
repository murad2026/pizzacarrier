# carrierforpizza.com

The Pizza Carrier website is a static site (HTML, CSS and vanilla JS) with no build step. It is hosted on GitHub Pages.

```
index.html            main page
feedback/index.html   Test Drive feedback form (noindex)
404.html
css/styles.css
js/config.js          ← all IDs and keys go here
js/main.js            forms, analytics, chat, video, ?src=flyer
assets/               logo.svg, logo-on-dark.svg, favicon.svg, og-image.png, apple-touch-icon.png
docs/                 brief, approved copy, email templates
CNAME                 carrierforpizza.com
```

Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000

## 1. Configuration (`js/config.js`)

Any value that still starts with `YOUR_` is treated as not configured, and that feature stays off.

| Key | Where to get it |
|---|---|
| `WEB3FORMS_ACCESS_KEY` | https://web3forms.com → enter **info@carrierforpizza.com** → the key arrives by email. All forms are delivered to that address. Until this is set, forms show the error message. |
| `GA4_MEASUREMENT_ID` | Google Analytics → Admin → Data streams → Web → `G-XXXXXXXXXX` |
| `TAWK_PROPERTY_ID`, `TAWK_WIDGET_ID` | tawk.to → Administration → Chat Widget → the embed link `https://embed.tawk.to/<PROPERTY_ID>/<WIDGET_ID>` |
| `VIDEO_URL` | A YouTube link (best to upload as Unlisted) or the path to an MP4 in `assets/video/`. Until this is set, the poster reads "Video coming soon". |

GA4 events: `test_drive_submit`, `order_submit`, `feedback_submit`, `flyer_visit`.

## 2. Flyer QR code

The QR code should point to **https://carrierforpizza.com/?src=flyer**. This sends a `flyer_visit` event to GA4 and puts `src=flyer` in the form emails.

## 3. Deploy on GitHub Pages

1. Repo → Settings → Pages → Source: *Deploy from a branch*, then choose `main` / `/ (root)`.
2. Custom domain: `carrierforpizza.com` (the CNAME file already sets this).
3. After DNS works, turn on **Enforce HTTPS**.

## 4. DNS at GoDaddy

Change **only** these records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | murad2026.github.io |

Delete the old `A @ → WebsiteBuilder Site` record (or the Airo record that replaces it).

⚠️ **Do NOT touch** the MX, `autodiscover`, TXT (SPF / `MS=`) or `_dmarc` records. They are the Microsoft 365 mailbox info@carrierforpizza.com.

## 5. Logo replacement

The header and favicon use `assets/logo.svg`. The footer uses `assets/logo-on-dark.svg`. `assets/favicon.svg`, `og-image.png` and `apple-touch-icon.png` are temporary. Replace them once the client approves the final logo.

## 6. Waiting on the client

- [COMPANY NAME] in the footer (`index.html`, `feedback/index.html`)
- Video and 4 product photos (currently "Photo coming soon" placeholders)
- "Up to 4" vs 4–5 boxes, payment method, shipping cost and timing (see `docs/copy-draft.md`)
- Final logo
