# BizFlight Website

A lightweight, business-focused static website for **BizFlight**.

Official domain: **https://bizflight.in**

## Our Customers section

The homepage has an **Our Customers** section at `/#customers`, after the service overview. It currently contains six clearly labeled **sample customer placeholders**. These are not real clients, endorsements, testimonials, or proven project relationships.

To replace the sample data:

1. Open `index.html` and find `CUSTOMER SHOWCASE START`.
2. Replace each `Client Alpha`, `Client Beta`, and other temporary name with the approved customer name.
3. Replace the industry or project descriptor only with wording the customer has approved.
4. If the customer grants permission to use their logo, put the optimized logo in `assets/images/customers/` and replace the relevant `customer-mark` element with a correctly sized `<img>` element. Use descriptive alt text.
5. Change the intro copy to reflect your real client relationships and remove the `Sample layout` pill and the disclaimer **only once every displayed customer is real and approved**.
6. If the site's visitors should not see mock clients, temporarily remove the entire section and the links to `/#customers` before publishing.
7. Do not add fictitious reviews, star ratings, metrics, or client relationships to structured data.

The cards are static HTML, so search engines and visitors see the same content. CSS for this section is in `src/input.css` and the precompiled `assets/css/style.css`.

## Logo and brand assets

The site header and footer now use the approved two-color BizFlight logo:

- `assets/images/bizflight-logo-horizontal.png`: transparent horizontal logo for site navigation.
- `assets/images/bizflight-logo-with-tagline.png`: transparent logo with the brand tagline.
- `assets/images/bizflight-logo-symbol.png`: standalone coding and flight symbol.
- `assets/images/bizflight-linkedin-800.png`: 800 x 800 square image with social avatar padding.
- `assets/images/bizflight-logo-original.png`: original generated logo artwork, preserved as supplied.
- `favicon.svg`: lightweight site icon using a close geometric interpretation of the same visual concept.
- `assets/images/apple-touch-icon.png`: touch-screen bookmark icon.
- `assets/images/og-bizflight.png`: social link preview image.

The wordmark uses deep navy for Biz and blue for Flight, matching the light website design.
The raster assets are based on the selected generated artwork, not third-party logo packs.
An independent trademark search is still recommended before claiming exclusive brand rights.

## Features

- Light theme throughout, with white and soft neutral backgrounds
- Four main pages: Home, Services, About, and Contact
- Additional Privacy Policy and custom 404 page
- Tailwind CSS v4 build source, plus a checked-in ready-to-view stylesheet
- Small, dependency-free browser JavaScript
- Semantic HTML, responsive navigation, accessible FAQs, and labeled contact fields
- Unique page metadata, Open Graph, Twitter Cards, canonical URLs, and JSON-LD
- Sitemap, robots.txt, favicon, social sharing image, and GitHub Pages custom domain configuration
- No tracking scripts or analytics enabled by default
- No server runtime or database

## Preview locally

You can preview the included static build without installing npm dependencies.

```bash
cd bizflight-website
python3 -m http.server 8000
```

Open http://localhost:8000 in a browser. Do not double-click `index.html`, because root-relative navigation paths need an HTTP server.

## Development with Tailwind CSS

Install Node.js 20+ and npm, then run:

```bash
npm install
npm run build
npm run validate
npm run preview
```

For live CSS compilation:

```bash
npm run dev:css
```

The validation script checks domain consistency, internal links, essential SEO markup, and prohibited punctuation. The source stylesheet is at `src/input.css`. The production file is `assets/css/style.css`. The latter is already included, so the website can be previewed or uploaded as static files immediately. Running `npm run build` recompiles it with the Tailwind CLI.

The website uses a small set of custom CSS classes for its bespoke layout, together with Tailwind's zero-runtime CSS engine. There is no React runtime, bundler, or hydration.

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/services/` | `services/index.html` |
| `/about/` | `about/index.html` |
| `/contact/` | `contact/index.html` |
| `/privacy/` | `privacy/index.html` |
| `/404.html` | `404.html` |

## Set up contact submissions

The form is deliberately disabled until a real third-party form provider is configured. No form submission is faked, and no messages are stored locally.

Edit `assets/js/site-config.js`.

### Option A: Typeform

1. Create and publish a Typeform with the required fields.
2. Set `provider` to `"typeform"`.
3. Set `typeformUrl` to the real `https://form.typeform.com/to/...` URL.
4. Verify the live form submission.

The contact page will hide its local form and show a button that opens the genuine hosted Typeform. No data is sent until the visitor uses the provider's form.

### Option B: Google Forms

1. Create and publish a Google Form for the six fields.
2. Obtain its `formResponse` URL and each question's `entry.NUMBER` field identifier.
3. Set `provider` to `"google-forms"`.
4. Set `googleFormAction` and every value under `googleFormFields`.
5. Test a real submission in the browser and confirm the response was recorded.

Google Forms markup, field IDs, and submission restrictions can change. This integration depends on compatible form fields and may navigate to Google's response page. If testing fails, use Typeform's hosted link instead. Do not promise delivery before testing.

### Business email

Set `verifiedEmail` only after the corresponding mailbox is active and verified. Suggested address: `hello@bizflight.in`.

The public website intentionally labels the mailbox as pending until configured. Update the footer and Privacy Policy after activating a mailbox and the contact provider.

## Deploy to GitHub Pages

1. Create a GitHub repository and push these files to the `main` branch.
2. Go to **Settings > Pages** and choose **GitHub Actions** as the build and deployment source.
3. The included `.github/workflows/deploy.yml` installs Tailwind, compiles CSS, and publishes the static output.
4. Under **Settings > Pages > Custom domain**, enter `bizflight.in`.
5. The included `CNAME` file contains `bizflight.in`.
6. Configure Cloudflare DNS as described in [deployment instructions](docs/DEPLOYMENT.md).
7. Confirm that the site loads at `https://bizflight.in/`, all routes work, and HTTPS is enabled.

The GitHub Actions workflow has not been run from this local deliverable. Deployment needs your GitHub repository and domain settings.

## SEO and content

- Each page has a unique title, description, canonical URL, social metadata, and structured data.
- Service entities and visible FAQ answers are available as static HTML.
- FAQ markup does not guarantee enhanced search results.
- Do not add invented customer logos, testimonials, project counts, awards, or timelines.
- Verify your business details and review the Privacy Policy before publishing.
- Replace `og-bizflight.png` if official branding changes.

## Brand rules

- Keep the website entirely light themed.
- Do not introduce the Unicode U+2014 em dash into copy or authored files.
- Always use `https://bizflight.in` for canonical and public URLs.
- Use the Bizflight name consistently. "The Biz Flight" is an alternate brand reference.

### Check prohibited punctuation

```bash
python3 - <<'PY'
from pathlib import Path
for path in Path('.').rglob('*'):
    if path.is_file() and path.suffix.lower() in {'.html','.css','.js','.md','.json','.xml','.svg','.txt','.yml'}:
        if chr(0x2014) in path.read_text(encoding='utf-8',errors='ignore'):
            raise SystemExit(f'Prohibited character found: {path}')
print('Punctuation check passed')
PY
```

## Files that need real-world configuration

- `assets/js/site-config.js`: third-party form settings and verified email
- `docs/DEPLOYMENT.md`: Cloudflare DNS and GitHub Pages configuration
- `docs/BUSINESS-EMAIL.md`: provider and DNS setup instructions
- `docs/LINKEDIN-COPY.md`: prepared company page text
- `privacy/index.html`: privacy disclosures for the services you actually enable
