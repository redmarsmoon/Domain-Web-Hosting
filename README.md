# Domain Web Hosting - Static Website

This is the fully exported, static HTML version of the Domain Web Hosting WordPress website. It was automatically crawled and mirrored from the live WordPress setup and is fully optimized for Cloudflare Pages.

## Features
- **High-Fidelity Export:** Contains exactly what the WordPress website renders.
- **Self-Contained:** All assets (CSS, JS, images from `wp-content`) are downloaded locally.
- **Relative Links:** All internal navigation links have been rewritten to work as a standalone static site.

## Deployment Instructions (Cloudflare Pages)

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this GitHub repository (`Domain-Web-Hosting`).
4. Configure the build settings:
   - **Framework preset:** `None`
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (or leave empty)
5. Click **Save and Deploy**. Cloudflare will instantly build and deploy the site globally across its Edge network.
