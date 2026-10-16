# Pizza Carrier website: project brief (handoff)

Status: **structure and copy approved, build not started.** The approved copy is in
[`copy-draft.md`](copy-draft.md). Open questions for the client are in
[`client-questions-email.md`](client-questions-email.md).

## Product facts (the only allowed source of claims)
Source: the flyer ([`../materials/flyer-front.jpg`](../materials/flyer-front.jpg)) and the back-side specs supplied by the client.
Never invent stats, testimonials or claims. Use visible placeholders for missing facts.

- Name: **PIZZA CARRIER**. The flyer still says "Pizza Jacket"; do not use the old name.
- What it is: a flat, transparent, recyclable HDPE carrier strip with precision-cut corner slots
  that hold pizza boxes securely. Boxes are placed diagonally so their corners go into the slots, then the handles fold up.
  It is **not a closed bag**. Never call it a bag in copy or show it as one in visuals.
- "Carry up to 4 pizza boxes with one hand."
- "The smart design keeps boxes perfectly leveled."
- Features: Convenient, Durable, Flexible, Transparent.
- US Patent Pending.
- How it works: 1) Spread the carrier on the table 2) Place the boxes diagonally 3) Fold the handles. "9 seconds to set up."
- Specs: load capacity 11 lb; carrier size 7.9" x 25.6"; thickness 1.38 mil; material recyclable HDPE.
- Max boxes per carrier: 8"/10"/12"/14" square: 4–5; 15": 4; 16": 3; 18": 1.
- Do NOT use "Trade Continental Inc." or "jacket4pizza@gmail.com" from the flyer.

## Audience
B2B only: US pizzeria owners and managers. Main use case: takeout orders with more than one box.

## Commercial terms
- Case: 300 carriers, $35 + shipping. Ships to all US states. Minimum order: 1 case. **Never show a price per unit.**
- Free Test Drive: 50 carriers, FREE shipping, one per business.
- Feedback incentive: share a 2-minute feedback and get 10% off the first order (the client confirms the discount manually).
- Contacts: phone 781.888.2946, email info@carrierforpizza.com, [COMPANY NAME] placeholder.

## Tech requirements
- Plain static site (HTML + CSS + vanilla JS), no framework, no build step, deployed to GitHub Pages from the repo root.
- `CNAME` file containing `carrierforpizza.com`.
- `js/config.js` holds all third-party IDs as placeholders: `WEB3FORMS_ACCESS_KEY`, `GA4_MEASUREMENT_ID`,
  `TAWK_PROPERTY_ID`, `TAWK_WIDGET_ID`, `VIDEO_URL`. GA4 and Tawk.to must not load while their ID is still a placeholder.
- Fast and accessible: real buttons and labels, text contrast 4.5:1. Responsive at 375, 768 and 1280 px.
  Meta tags, Open Graph, favicon, sitemap.xml, robots.txt. English only.
- Hero video works with either a self-hosted MP4 or a YouTube URL, and shows a poster placeholder until `VIDEO_URL` is set.
- `?src=flyer` (from the flyer QR code): keep the video in view and send the GA4 event `flyer_visit`.

## Brand
- Colors (sampled from the flyer): navy `#2A498C`, orange `#E0622F`, light-blue section background `#BED2DD`, white.
  Keep all colors as CSS variables in one place.
  - Contrast: orange on white is about 3.5:1, so use `#E0622F` only for large bold text, shapes and buttons with large bold labels.
    Use a darker orange (about `#B84A1C`, verify ≥ 4.5:1) for small orange text. Navy on white is about 8.6:1; navy on `#BED2DD` is about 5.5:1.
- Fonts (Google Fonts): headings in **Archivo**, width 125, weights 700–800. Body in **Barlow Semi Condensed** 400/500.
- Look: confident, clean, industrial. No gradients, no emoji, no stock-photo clichés.
  Do not reuse the hand-and-bag photo from the flyer; use photo placeholders labelled "Photo coming soon".
- Temporary logo: put it in ONE file, `assets/logo.svg`, so it can be swapped later. The icon is followed by the wordmark
  "PIZZA CARRIER" on two lines (heading font). Boxes are `#E0622F`; straps, base and handle are `#2A498C` (white on dark backgrounds).

```svg
<svg viewBox="0 0 160 156" fill="none"><rect x="10" y="44" width="140" height="20" rx="2" fill="#E0622F"/><rect x="10" y="68" width="140" height="20" rx="2" fill="#E0622F"/><rect x="10" y="92" width="140" height="20" rx="2" fill="#E0622F"/><rect x="10" y="116" width="140" height="20" rx="2" fill="#E0622F"/><rect x="6" y="136" width="148" height="11" rx="4" fill="#2A498C"/><path d="M71 31 L12 141 M89 31 L148 141" stroke="#2A498C" stroke-width="9" stroke-linecap="round"/><circle cx="80" cy="18" r="12" stroke="#2A498C" stroke-width="8"/></svg>
```

## Order form (Web3Forms → info@carrierforpizza.com)
- Toggle: "Free Test Drive (50 carriers)" | "Order cases".
- Fields: Pizzeria name*, Contact name*, Phone*, Email*, Street*, City*, State*, ZIP*,
  Number of cases* (Order mode only, integer ≥ 1), Comment (optional). Do NOT ask about order volumes.
- Test Drive mode only: a required checkbox "I agree to share a short 2-minute feedback after trying the carriers.",
  with the note "Share your feedback and get 10% off your first order." below it.
- The email subject starts with `[TEST DRIVE]` or `[ORDER]`.
- Hidden fields: form type, `src` URL parameter, page URL. Add a honeypot field.
- Clear success and error states. GA4 events: `test_drive_submit` / `order_submit`.

## Feedback page `/feedback/`
- Web3Forms, subject `[FEEDBACK]`. Fields: Pizzeria name, Email, "Did pizzas stay level?" (Yes/Mostly/No),
  "Was it easy for staff/customers?" (1–5), "Will you order a case?" (Yes/Maybe/No), Comments.
- After submit: a thank-you message that mentions the 10% discount.
- `docs/feedback-reminder-email.txt` (done): the email the client sends about 10 days after shipping a Test Drive.

## Remaining deliverables
1. The full site in the repo root.
2. README.md covering:
   - setting the config IDs;
   - deploying to GitHub Pages;
   - the GoDaddy DNS records: replace the A record `@ → WebsiteBuilder Site` with the four GitHub Pages A records,
     and add a `www` CNAME pointing to `murad2026.github.io`.
     **Do not touch the Microsoft 365 records:** MX, autodiscover, SPF/TXT and `_dmarc`.
3. A list of every placeholder and [CONFIRM] item left on the site.
