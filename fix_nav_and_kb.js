const fs = require('fs');
const path = require('path');
const rootDir = __dirname;
const kbDataFile = 'C:\\Users\\Home\\Local Sites\\domain-web-hosting\\app\\public\\kb_data.json';
const kbData = JSON.parse(fs.readFileSync(kbDataFile, 'utf16le').replace(/^\uFEFF/, ''));

// Simple markdown to HTML parser
function parseMarkdown(md) {
    let html = md.replace(/^# (.*$)/gim, '<h1 class="text-display-sm font-bold text-on-surface mb-6">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-headline-md font-bold text-on-surface mt-10 mb-4">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-title-lg font-bold text-on-surface mt-8 mb-3">$1</h3>')
        .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 py-1 italic text-on-surface-variant my-4">$1</blockquote>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/`([^`]*)`/gim, '<code class="bg-surface-container text-on-surface px-1 py-0.5 rounded text-sm">$1</code>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' class='rounded-2xl max-w-full my-6 border border-outline-variant/30 shadow-sm' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' class='text-primary hover:text-primary-fixed font-medium underline underline-offset-4'>$1</a>")
        .replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
        .replace(/<\/li>\n<li/g, '</li><li');
        
    // Wrap lists
    html = html.replace(/(<li class="ml-4 mb-2">.*<\/li>)/gms, '<ul class="list-disc mb-6 text-on-surface-variant leading-relaxed">$1</ul>');
    
    // Wrap paragraphs
    const paragraphs = html.split('\n\n');
    html = paragraphs.map(p => {
        if (!p.trim()) return '';
        if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<blockquote') || p.startsWith('<img') || p.startsWith('<pre')) {
            return p;
        }
        return `<p class="mb-6 text-on-surface-variant leading-relaxed text-body-lg">${p}</p>`;
    }).join('\n');
    
    return html;
}

// Nav items definition
const navItems = [
    { path: '/hosting/', label: 'Hosting' },
    { path: '/domain-registration/', label: 'Domains' },
    { path: '/website-development/', label: 'Web Development' },
    { path: '/portfolio/', label: 'Portfolio' },
    { path: '/contact/', label: 'Support' }
];

function getFiles(dir, ext) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory() && file !== '.git') {
            results = results.concat(getFiles(filePath, ext));
        } else if (file.endsWith(ext)) {
            results.push(filePath);
        }
    });
    return results;
}

const allHtmlFiles = getFiles(rootDir, '.html');

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Determine the logical path for this file to know which menu item is active
    let relativePath = file.replace(rootDir, '').replace(/\\/g, '/');
    if (relativePath === '/index.html') relativePath = '/';
    else relativePath = relativePath.replace('/index.html', '/');
    
    // Generate new nav HTML
    let newNav = '<nav class="hidden md:flex items-center space-x-md">\n';
    navItems.forEach(item => {
        const isActive = (relativePath === item.path) || (item.path !== '/' && relativePath.startsWith(item.path));
        const baseClasses = 'font-label-md text-label-md pb-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300';
        const classes = isActive 
            ? `${baseClasses} text-primary font-bold after:w-full` 
            : `${baseClasses} text-on-surface-variant hover:text-primary after:w-0 hover:after:w-full`;
        
        newNav += `                <a class="${classes}" href="${item.path}">${item.label}</a>\n`;
    });
    newNav += '            </nav>';
    
    // Replace existing nav
    content = content.replace(/<nav class="hidden md:flex items-center space-x-md">.*?<\/nav>/s, newNav);
    
    // Check if it's a KB article and inject content
    if (relativePath.startsWith('/kb/')) {
        const slugMatch = relativePath.match(/\/kb\/(.*?)\//);
        if (slugMatch) {
            const slug = slugMatch[1];
            const kbItem = kbData.find(k => k.slug === slug);
            if (kbItem) {
                // Find main tag and replace its inner HTML with parsed markdown
                const htmlContent = parseMarkdown(kbItem.content);
                // The template probably has something like `<main class="..."> ... </main>` or `<article>`.
                // Let's just replace the body content inside the container if we can find it.
                // We'll look for `<div class="prose` or something, or we can just replace everything between `<main...>` and `</main>`.
                content = content.replace(/(<main[^>]*>)(.*?)(<\/main>)/s, `$1\n<div class="max-w-3xl mx-auto px-gutter py-xl">\n${htmlContent}\n</div>\n$3`);
            }
        }
    }
    
    fs.writeFileSync(file, content, 'utf8');
});

console.log('Fixed navigation menus and injected KB articles successfully.');
