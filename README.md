# Duara - Static Website

This is the fully exported, static HTML version of the Duara website. It was automatically crawled and mirrored from the live WordPress setup and is fully optimized for Cloudflare Pages.

## Features
- **High-Fidelity Export:** Contains exactly what the WordPress website renders.
- **Self-Contained:** All assets (CSS, JS, images from `wp-content`) are downloaded locally.
- **Link Style:** Page-to-page navigation uses root-relative links (`/hosting/`), while assets use paths relative to each page's depth. The site therefore needs to be served from a domain root; opening a file directly from disk will load styling but will not navigate.

## Deployment Instructions (Cloudflare Pages)

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this GitHub repository (`Domain-Web-Hosting`).
4. Configure the build settings:
   - **Framework preset:** `None`
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (or leave empty)
5. Click **Save and Deploy**. Cloudflare will instantly build and deploy the site globally across its Edge network.

## Domain

The site is branded **Duara** and canonicalises to `https://duara.dev`. It was previously `domainwebhosting.co`.

The repository name, the `wp-content/themes/domain-web-hosting-theme/` directory and the `dwh-` asset handles intentionally retain the old name. The theme folder is a real directory that every asset path points at, so renaming it in markup without moving the folder would break every stylesheet, script and image on the site.
