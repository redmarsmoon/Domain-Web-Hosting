const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'blog', 'index.html');
let content = fs.readFileSync(indexHtmlPath, 'utf8');

const oldFeaturedArticleRegex = /<article class="relative group cursor-pointer bg-white rounded-xl border border-outline-variant\/40 overflow-hidden flex flex-col md:flex-row hover:border-primary transition-colors duration-300 shadow-\[0_4px_24px_-12px_rgba\(0,0,0,0\.05\)\]" onclick="window\.location\.href='\/the-future-of-cloud-hosting-trends-to-watch\/';">[\s\S]*?<\/article>/;

const newFeaturedArticle = `<article class="relative group cursor-pointer bg-white rounded-xl border border-outline-variant/40 overflow-hidden flex flex-col md:flex-row hover:border-primary transition-colors duration-300 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)]" onclick="window.location.href='/what-is-vps-hosting-and-do-you-need-it/';">
<div class="md:w-3/5 relative min-h-[320px] md:min-h-full overflow-hidden bg-surface-container-highest">
<img loading="lazy" class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" alt="What Is VPS Hosting And Do You Need It" src="/wp-content/themes/domain-web-hosting-theme/assets/images/what_is_vps_hosting_1784521580692.png"/>
</div>
<div class="md:w-2/5 p-lg flex flex-col justify-center bg-white relative z-10">
<div class="flex items-center gap-xs mb-md">
<span class="bg-primary/10 text-primary px-2.5 py-1 rounded border border-primary/20 font-label-md text-label-md uppercase tracking-wider text-[11px]">Web Hosting</span>
<span class="text-on-surface-variant font-mono-sm text-mono-sm">· Jul 18 · 5 min read</span>
</div>
<h2 class="font-headline-lg text-headline-lg text-on-background mb-sm group-hover:text-primary transition-colors duration-300">What is VPS Hosting and Do You Need It?</h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-lg">As your website grows in traffic and complexity, you will eventually outgrow the limitations of shared hosting. When this happens, a Virtual Private Server (VPS) is often the next logical step.</p>
<div class="mt-auto flex items-center font-label-md text-label-md text-primary group-hover:gap-2 transition-all duration-300">
                        Read Article <span class="material-symbols-outlined text-[18px] ml-1 transition-transform group-hover:translate-x-1">arrow_forward</span>
</div>
</div>
</article>`;

content = content.replace(oldFeaturedArticleRegex, newFeaturedArticle);

// Remove the VPS article from the bottom grid
const bottomGridVpsRegex = /<article class="bg-white rounded-xl border border-outline-variant\/40 overflow-hidden hover:border-primary transition-colors duration-300 group flex flex-col cursor-pointer shadow-\[0_2px_12px_-8px_rgba\(0,0,0,0\.1\)\] hover:shadow-\[0_8px_24px_-12px_rgba\(0,43,146,0\.15\)\]" onclick="window\.location\.href='https:\/\/domainwebhosting\.co\/what-is-vps-hosting-and-do-you-need-it\/';">[\s\S]*?<\/article>/;

content = content.replace(bottomGridVpsRegex, '');

// Also fix the other absolute URLs in the grid to be relative
content = content.replace(/window\.location\.href='https:\/\/domainwebhosting\.co\//g, "window.location.href='/");

fs.writeFileSync(indexHtmlPath, content, 'utf8');

console.log("Updated blog/index.html");
