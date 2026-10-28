# Pizza Carrier: approved page structure and copy

Status: approved by the freelancer. Items marked [CONFIRM] are waiting on the client
(see [`client-questions-email.md`](client-questions-email.md)).

## Decisions
1. The headline keeps the flyer claim "up to 4". The spec table shows 4–5 for 8"–14" boxes as specified,
   and the FAQ answer carries a [CONFIRM].
2. Orange `#E0622F` is used only for large bold text, shapes and buttons with large bold labels.
   Small orange text on white uses a darker orange (about `#B84A1C`) for 4.5:1 contrast.
3. Fonts: Archivo (width 125, 700/800) for headings, Barlow Semi Condensed (400/500) for body.
4. The product is always "carrier" or "carrier strip", never "bag".
5. The problem section describes the situation only: no numbers, no invented claims.

## Page structure

**Main page `/`**
1. **Header:** logo; nav How it works · Pricing · FAQ · Contact; "Free Test Drive" button.
2. **Hero:** video first (poster with a play button, using `VIDEO_URL`), headline, one supporting line, two buttons, "US Patent Pending" badge.
3. **Problem**
4. **How it works:** 3 steps and the "9 seconds to set up" callout.
5. **Photos:** 4 placeholders labelled "Photo coming soon".
6. **Features and specs:** 4 feature tiles, a spec list and the box-size table.
7. **Pricing:** 2 cards, Free Test Drive and Order a Case.
8. **Order form:** toggle, form, and success/error messages.
9. **FAQ:** 6 questions in expand/collapse panels.
10. **Contact and footer**

**Other pages:**
- `/feedback/`: a short form plus a thank-you message.
- `/docs/feedback-reminder-email.txt`: the reminder email template.

---

## Copy: main page

**Page title (browser tab):** Pizza Carrier — Carry up to 4 pizza boxes with one hand
**Meta description:** Pizza Carrier is a patent-pending carrier strip for pizzerias. It holds up to 4 pizza boxes perfectly leveled for takeout orders. Get a free Test Drive of 50 carriers.

### 1. Header
Nav: How it works · Pricing · FAQ · Contact
Button: **Free Test Drive**

### 2. Hero
Video label: *Watch: setting up a Pizza Carrier* (the poster reads "Video coming soon" until `VIDEO_URL` is set)

# Carry up to 4 pizza boxes with one hand.
The smart design keeps boxes perfectly leveled, so multi-box takeout orders leave your counter the way you made them.

Buttons: **Get a Free Test Drive** (main button) · **Order a Case**
Badge: US Patent Pending

### 3. Problem
## Multi-box takeout orders are hard to carry.
Your customer orders three or four pizzas. The boxes get stacked and handed over the counter, and the trouble starts on the way to the car: the stack tilts, the boxes slide, and the pizzas shift inside.

You did the work right in the kitchen. Pizza Carrier keeps it that way after it leaves your counter.

### 4. How it works
## Set up in 9 seconds.
A flat, transparent carrier strip with precision-cut corner slots. It is not a bag: the boxes stay in view, held at the corners.

1. **Spread the carrier on the table.**
2. **Place the boxes diagonally**, so their corners sit in the corner slots.
3. **Fold the handles.** It's ready to carry.

Callout: **9 seconds to set up.**

### 5. Photos
## See it in action
Four placeholder tiles, each with a caption and the label "Photo coming soon":
- The carrier laid flat
- Boxes placed diagonally
- Handles folded
- Up to 4 boxes, carried with one hand

### 6. Features and specs
## Built for pizza boxes
Specially designed for carrying pizza boxes, the carrier has precision-cut corner slots that hold boxes securely. The smart design keeps boxes perfectly leveled.

Feature tiles:
- **Convenient:** set up in 9 seconds and carry with one hand.
- **Durable:** holds up to 11 lb.
- **Flexible:** fits box sizes from 8" to 18".
- **Transparent:** customers can see their order.

**Specifications**
- Load capacity: 11 lb
- Carrier size: 7.9" × 25.6"
- Thickness: 1.38 mil
- Material: recyclable HDPE
- US Patent Pending

**Boxes per carrier**

| Box size | Max boxes |
|---|---|
| 8" × 8" | 4–5 |
| 10" × 10" | 4–5 |
| 12" × 12" | 4–5 |
| 14" × 14" | 4–5 |
| 15" × 15" | 4 |
| 16" × 16" | 3 |
| 18" × 18" | 1 |

Note under the table: *Total load up to 11 lb.*

### 7. Pricing
## Simple pricing
**Card 1: Free Test Drive**
- 50 carriers
- FREE shipping
- One per business
- Share a short 2-minute feedback after trying the carriers and get 10% off your first order.
- Button: **Get a Free Test Drive**

**Card 2: Order a Case**
- 300 carriers per case
- **$35** + shipping
- Ships to all US states
- Minimum order: 1 case
- Button: **Order a Case**

No price per unit is shown.

### 8. Order form
## Get your carriers
Toggle: **Free Test Drive (50 carriers)** | **Order cases**

Fields:
- Pizzeria name*
- Contact name*
- Phone*
- Email*
- Shipping address*: Street address*, City*, State* (a dropdown of the 50 states plus DC), ZIP code*
- Number of cases* (Order mode only, minimum 1)
- Comment (optional)

Test Drive mode only:
- [ ] I agree to share a short 2-minute feedback after trying the carriers.* *(required)*
- Note: *Share your feedback and get 10% off your first order.*
- Small print: *One Free Test Drive per business. Free shipping within the US.*

Order mode small print: *$35 per case of 300 carriers, plus shipping. We'll confirm the shipping cost and total before your order ships.* [CONFIRM how payment and shipping cost are handled]

Submit button: **Request my Free Test Drive** / **Send my order**

Success messages:
- Test Drive: **Thank you! Your Test Drive request is in.** We'll contact you to confirm shipping. [CONFIRM timing]
- Order: **Thank you! Your order request is in.** We'll contact you to confirm the shipping cost and next steps.

Error message: **Something went wrong and your request wasn't sent.** Please try again, or call 781.888.2946 or email info@carrierforpizza.com.

Email subjects:
- `[TEST DRIVE] {Pizzeria name} — {City, State}`
- `[ORDER] {N} case(s) — {Pizzeria name} — {City, State}`

### 9. FAQ
## Frequently asked questions

**Is Pizza Carrier a bag?**
No. It's a flat, transparent carrier strip with precision-cut corner slots. You place the boxes diagonally so their corners sit in the slots, then fold up the handles.

**How many boxes can one carrier hold?**
Up to 4 boxes for most common sizes, with a total load of up to 11 lb. See the box-size table above for the maximum per size. [CONFIRM: "up to 4" wording vs 4–5 in the table]

**What box sizes does it fit?**
Square boxes from 8" × 8" to 18" × 18". Larger boxes mean fewer per carrier: 3 for 16" boxes and 1 for 18" boxes.

**How long does it take staff to set up?**
About 9 seconds: spread the carrier on the table, place the boxes diagonally, fold the handles.

**What is the Free Test Drive?**
50 carriers with free shipping, one per business. In return, we ask for a short 2-minute feedback after you try them. Share it and you get 10% off your first order.

**How does ordering and shipping work?**
Carriers come 300 per case at $35 per case plus shipping. The minimum order is 1 case, and we ship to all US states. After you send the form, we'll contact you to confirm shipping cost and delivery. [CONFIRM: payment method and delivery time]

### 10. Contact and footer
## Questions? Talk to us.
- Phone: **781.888.2946**
- Email: **info@carrierforpizza.com**
- Button: **Get a Free Test Drive**

Footer:
- Logo
- [COMPANY NAME] (space kept in the layout)
- US Patent Pending
- Links: How it works · Pricing · FAQ · Contact
- © 2026 [COMPANY NAME]. All rights reserved.

---

## Copy: feedback page (`/feedback/`)

**Page title:** Test Drive Feedback — Pizza Carrier
**Heading:** How did the Test Drive go?
**Intro:** It takes about 2 minutes. Share your feedback and get 10% off your first order.

Fields:
- Pizzeria name*
- Email*
- Did pizzas stay level?* Yes / Mostly / No
- Was it easy for staff/customers?* 1 (hard) to 5 (very easy)
- Will you order a case?* Yes / Maybe / No
- Comments (optional)

Button: **Send feedback**

**Thank-you message:** Thank you for your feedback! We'll get back to you to confirm your 10% discount on your first order.

Email subject: `[FEEDBACK] {Pizzeria name}`

---

## Reminder email
See [`feedback-reminder-email.txt`](feedback-reminder-email.txt).

---

## Placeholders and [CONFIRM] items
- [COMPANY NAME] in the footer, copyright line and email template
- [CONTACT NAME] and [YOUR NAME] in the email template
- [CONFIRM] "up to 4" vs 4–5 boxes in the table
- [CONFIRM] payment method and how shipping cost is quoted
- [CONFIRM] Test Drive and order shipping timing
- Resolved: the 10% discount applies to the whole first order.
- Video ("Video coming soon" until `VIDEO_URL` is set), 4 photo placeholders, and the Open Graph share image (a temporary one made from the logo)
- Config placeholders in `js/config.js`: `WEB3FORMS_ACCESS_KEY`, `GA4_MEASUREMENT_ID`, `TAWK_PROPERTY_ID`, `TAWK_WIDGET_ID`, `VIDEO_URL`

---

## Update 2026-10-28: aligned with the client's "Описание для сайта.docx" (sent 2026-10-06)
- "Up to 5 pizza boxes" (headline, meta, FAQ). The table shows 5 for 8"–14" boxes, per the client's table.
- The product is called a "bag" / "carry bag", as in the client's text. The "It is not a bag" line and FAQ item were removed.
- Added: fits cake and pastry boxes; logo printing for orders of 60 cases or more; "easy for both your staff and your customers"; "strong HDPE that doesn't tear".
- The box-size table now shows a row of box icons per size, like the client's reference.
- Not added: the "References" block (needs real pizzeria names from the client); "Trade Continental Inc." (company name stays [COMPANY NAME] until confirmed).
