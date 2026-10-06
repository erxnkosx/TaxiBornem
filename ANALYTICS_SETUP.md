# Google Analytics 4

The standard GA4 service is free. This integration uses basic consent: no Google
Analytics script or requests before statistics consent. Maps has separate consent.
No measurement ID is committed. Missing ID means tracking stays disabled.

## Required setup before activating

1. Create a GA4 property and a Web data stream for https://www.taxibornem.be.
   Use Europe/Brussels and EUR. Choose the standard free service, not Analytics 360.
2. **Turn OFF Enhanced measurement on the web stream.** The site sends its own
   sanitized pageviews and explicit booking/contact events. Automatic form, search,
   outbound-click and history tracking must stay off to avoid duplicate events and
   accidental collection of URL query strings or form details.
3. Leave Google Signals, user-provided data collection and advertising features off.
   Do not add extra Google tags through Cloudflare Zaraz or Tag Manager.
4. Set event/user data retention to 2 months and disable reset on new activity.
   Review Google's processing terms and the privacy policy with the business owner.
5. In Cloudflare Pages > taxibornem > Settings > Variables and secrets, add the
   production build variable PUBLIC_GA_MEASUREMENT_ID with the G-... measurement ID.
   Rebuild/redeploy. This is a public identifier, not a Resend key.
6. Mark only `generate_lead` as a key event initially. It means the booking API
   accepted the request, not that a ride was confirmed or email delivered.

## Events

| Event | Meaning |
| --- | --- |
| page_view | One pageview after consent; no query string or hash, referrer origin only |
| booking_start | First form change per mounted form |
| booking_error | API/network submission failure, no form values or error text |
| generate_lead | Successful API response, before navigating to thank-you page |
| click_phone | Click on a tel link; not proof of a conversation |
| click_whatsapp | Click on WhatsApp link; not proof of a message |

## Verification after configuring the real property

- Fresh browser: no googletagmanager.com or google-analytics.com requests before consent.
- Reject all: no analytics. Maps-only consent: no analytics. Statistics-only: no Maps.
- Accept statistics: one page_view in GA4 Realtime. Preview/localhost must not track.
- Submit a clearly labelled test booking with the owner's permission; confirm delivery
  separately in Resend and the mailbox, and a single generate_lead in GA4 Realtime.
- Failure/validation/honeypot paths must not generate a lead. Reloading /bedankt must
  not count a new lead. Click tests must not include phone numbers or WhatsApp text.
- Revoke via /cookiebeleid: further analytics disabled and first-party GA cookies removed.
- Refusals, blockers and missing consent cause undercounting. No historical backfill.

Run `npm run test:analytics` and `npm run build` for local checks. These do not prove
the production property receives events; the real measurement ID is still required.
