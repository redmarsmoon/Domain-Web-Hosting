# Domain Web Hosting - Static Website

This is a fully static HTML/CSS/JS website for Domain Web Hosting, designed for optimal performance, security, and seamless deployment on Edge networks like Cloudflare Pages.

## Features
- **Fully Static:** No server-side rendering, PHP, or database dependencies.
- **Optimized Assets:** Uses relative paths and optimized structures.
- **SEO Ready:** Auto-generated `sitemap.xml`, `robots.txt`, and Open Graph meta tags on every page.
- **Standardized UI:** Clean URLs (e.g. `/hosting/`), consistent headers and footers across 30+ pages.

## Project Structure
```
/
├── index.html                  # Homepage
├── about/                      # About page (and similarly for other pages)
├── hosting/                    # Hosting services page
├── domain-registration/        # Domain registration page
├── assets/                     # CSS, JS, Fonts, and Images
├── sitemap.xml                 # Search engine sitemap
├── robots.txt                  # Web crawler instructions
└── README.md                   # This file
```

## Deployment Instructions (Cloudflare Pages)

This project is tailored specifically for Cloudflare Pages.

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this GitHub repository (`Domain-Web-Hosting`).
4. Configure the build settings:
   - **Framework preset:** `None`
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (or leave empty)
5. Click **Save and Deploy**. Cloudflare will instantly build and deploy the site globally across its Edge network.

## Local Development
To preview the site locally, simply use any static web server. For example, using Python or Node.js:
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```
Navigate to `http://localhost:8000` to view the website.
