# Business Email Setup

Suggested mailbox: `hello@bizflight.in`

This is a proposed address. It is not active until a provider account, domain verification, and delivery tests are complete.

## Setup checklist

1. Check whether Zoho Mail currently offers a plan in your region with custom-domain mailbox support. Do not assume a free custom-domain mailbox is available.
2. Choose a suitable provider and create the business account.
3. Verify ownership of `bizflight.in` using the provider's TXT or CNAME instructions.
4. Add the provider's exact MX records through Cloudflare.
5. Add a single SPF TXT record that reflects every legitimate sending provider. Avoid creating multiple competing SPF records.
6. Enable DKIM signing and add the provider's assigned DNS record.
7. Start with an appropriate DMARC policy and review authentication results before moving toward enforcement.
8. Send test emails to and from external mailboxes, checking both delivery and spam placement.
9. Add the verified address to `assets/js/site-config.js` under `verifiedEmail`.
10. Update site contact copy and privacy disclosures to reflect actual operations.

**Do not invent MX priorities or DKIM selectors.** Use the values shown by the selected mail provider.

GitHub Pages only serves the website. Cloudflare hosts DNS records. Neither service requires removing the email DNS settings.

Provider reference: https://www.zoho.com/mail/
