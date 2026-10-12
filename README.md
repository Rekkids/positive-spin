# Positive Spin

Put a Positive Spin on someone's day. Spin the wheel, get a compliment printed by the Compliment-o-matic, and send it to someone.

- **No accounts, no ads, no tracking.** Names and notes travel inside the link only. Nothing is stored except a single number: how many compliments have been sent.
- **Nobody makes money from this.**

## What's in here

| File | What it does |
|---|---|
| `index.html` | The whole site: wheel, receipt, sharing, Save image, no-repeat logic, counter display |
| `api/count.js` | Vercel function for the "compliments sent" counter (one number in Upstash Redis) |
| `Rubik-VariableFont_wght.ttf`, `SpaceMono-Regular.ttf`, `SpaceMono-Bold.ttf` | Self-hosted fonts (Google Fonts, SIL Open Font License), kept next to `index.html` |
| `og.png` | Link preview image for WhatsApp, iMessage, etc. |
| `favicon.svg` | Browser tab icon |

## Editing compliments

Open `index.html`, find `const DATA`, and edit the lines in each category. You can add, remove or rename categories; the wheel redraws itself. Each compliment's ID is generated from its text, so edits never mix up anyone's "already seen" list.

## Hosting

Static site on Vercel (no build step). The counter needs the Upstash for Redis integration connected in Vercel, which provides `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Without it, the site works normally and the counter stays hidden.
