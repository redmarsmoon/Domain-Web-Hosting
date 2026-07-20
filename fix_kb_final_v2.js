const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Extract Header and Footer from index.html correctly
const headerMatch = indexHtml.match(/(<header class="bg-surface[^>]*>.*?<\/header>)/s);
const headerContent = headerMatch ? headerMatch[1] : '';

const footerMatch = indexHtml.match(/(<footer[^>]*>.*?<\/footer>)/s);
const footerContent = footerMatch ? footerMatch[1] : '';

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
    
    // Fix Knowledge Base footer link GLOBALLY
    // Change back from https://my.domainwebhosting.co/ to /knowledge-base/
    content = content.replace(/<a class="hover:text-secondary transition-colors" href="https:\/\/my.domainwebhosting.co\/">Knowledge Base<\/a>/g, '<a class="hover:text-secondary transition-colors" href="/knowledge-base/">Knowledge Base</a>');

    let relativePath = file.replace(rootDir, '').replace(/\\/g, '/');
    if (relativePath === '/index.html') relativePath = '/';
    else relativePath = relativePath.replace('/index.html', '/');
    
    // For knowledge-base/index.html, change the bento card links
    if (relativePath === '/knowledge-base/') {
        // Change all "/contact/" links in the ul lists to my.domainwebhosting.co
        // But keep Request Consultation. Request Consultation has class="bg-surface text-primary..."
        // The ones we want to change are inside <li><a class="text-primary hover:underline font-label-md" href="/contact/"
        content = content.replace(/<a class="text-primary hover:underline font-label-md" href="\/contact\/"/g, '<a class="text-primary hover:underline font-label-md" href="https://my.domainwebhosting.co/"');
    }

    // For KB articles, replace layout perfectly
    if (relativePath.startsWith('/kb/') && relativePath.split('/').length > 3) {
        
        const headMatch = content.match(/(<!DOCTYPE html>.*?<\/head>)/is);
        const headContent = headMatch ? headMatch[1] : '';
        
        // Match the entire flex-1 max-w-[840px] div which contains breadcrumbs, title, article, and footer
        const mainContentMatch = content.match(/(<div class="flex-1 max-w-\[840px\]">.*?)\s*<!-- Right Sidebar -->/is);
        const mainContent = mainContentMatch ? mainContentMatch[1] : '';
        
        const bottomMatch = content.match(/<\/main>(.*?)<\/body>/is);
        let bottomContent = bottomMatch ? bottomMatch[1] : '';
        
        // If mainContent is empty, maybe the regex didn't match (because it doesn't have "Right Sidebar" in the reverted state?)
        // Let's make sure we have mainContent
        if (headContent && mainContent) {
            const newFile = `${headContent}
<body class="bg-surface font-body-lg text-on-surface antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
${headerContent}

<main class="max-w-[1440px] mx-auto px-gutter py-3xl mt-16 min-h-[70vh] flex gap-12">
${mainContent}
</main>

${footerContent}

${bottomContent}
</body>
</html>`;
            content = newFile;
        }
    }
    
    fs.writeFileSync(file, content, 'utf8');
});

console.log("Fixed KB article layouts, KB footer links, and knowledge-base links.");
