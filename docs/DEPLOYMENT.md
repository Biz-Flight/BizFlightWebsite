# BizFlight GitHub Pages and Cloudflare Setup

Official domain: `https://bizflight.in`

## 1. GitHub repository

Push the `bizflight-website` folder to the `main` branch of a GitHub repository. Open **Settings > Pages**, select **GitHub Actions**, and confirm the custom domain is `bizflight.in`.

The included workflow builds the CSS with Tailwind and deploys a static `_site` folder. No application backend or server process is needed.

## 2. Cloudflare DNS

Make sure the domain is active in Cloudflare and its nameservers are correct.

Add these apex **A records** in Cloudflare DNS, using the DNS-only setting during initial configuration:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

These records matched GitHub's official custom-domain documentation when this guide was written. Verify against the official documentation before deployment.

For the `www` host, add a CNAME for `www` pointing to your GitHub Pages default host, such as `YOUR_ORGANIZATION.github.io`. Replace the placeholder with the real GitHub username or organization name. Configure `bizflight.in` as the primary custom domain so GitHub Pages can manage the variant redirect.

Avoid conflicting A, AAAA, and CNAME records. Never use a wildcard CNAME to point every subdomain to GitHub Pages.

**Important:** Do not remove MX, SPF, DKIM, DMARC, or domain-verification records needed for business email.

## 3. HTTPS and validation

1. Allow time for DNS propagation.
2. In GitHub Pages settings, verify that the custom domain is recognized.
3. Enable **Enforce HTTPS** when it becomes available.
4. Confirm `https://bizflight.in/` is the canonical version.
5. Confirm `www.bizflight.in` redirects properly if configured.
6. Visit `/services/`, `/about/`, `/contact/`, and `/privacy/` directly.
7. Check that all CSS, JavaScript, and images load securely.
8. Submit `https://bizflight.in/sitemap.xml` through your verified Google Search Console property after deployment.

## Official references

- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub Pages HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- Tailwind CLI: https://tailwindcss.com/docs/installation/tailwind-cli
