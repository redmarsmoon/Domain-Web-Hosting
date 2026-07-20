const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Extract Header and Footer from index.html
// Header is from <header ...> to </header>
const headerMatch = indexHtml.match(/(<header[^>]*>.*?<\/header>)/s);
const headerContent = headerMatch ? headerMatch[1] : '';

// Footer is from <footer ...> to </footer>
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
    
    // 2. Fix the Knowledge Base links in ALL files
    // Replace href="/knowledge-base/" with href="https://my.domainwebhosting.co/"
    content = content.replace(/href="\/knowledge-base\/"/g, 'href="https://my.domainwebhosting.co/"');
    // Also if there's any '#' link named Knowledge Base that we missed
    content = content.replace(/href="#"([^>]*>Knowledge Base<\/a>)/g, 'href="https://my.domainwebhosting.co/"$1');

    // Determine the logical path for this file
    let relativePath = file.replace(rootDir, '').replace(/\\/g, '/');
    if (relativePath === '/index.html') relativePath = '/';
    else relativePath = relativePath.replace('/index.html', '/');
    
    // 3. For KB articles, replace their layout
    if (relativePath.startsWith('/kb/') && relativePath.split('/').length > 3) { // It's an article
        // Extract the <head>
        const headMatch = content.match(/<head>(.*?)<\/head>/s);
        const headContent = headMatch ? headMatch[0] : '<head></head>';
        
        // Extract the <article>
        const articleMatch = content.match(/(<article[^>]*>.*?<\/article>)/s);
        const articleContent = articleMatch ? articleMatch[1] : '';
        
        // Extract the scripts at the bottom (for syntax highlighting or anything else)
        const scriptsMatch = content.match(/(<script>.*?<\/script>\s*<script type="speculationrules">.*?<\/script>\s*<script[^>]*>.*?<\/script>)/s);
        let scriptsContent = scriptsMatch ? scriptsMatch[1] : '';
        // If the big block fails, just grab all scripts at the bottom roughly
        if (!scriptsMatch) {
            const bottomScripts = content.match(/<script.*?>.*?<\/script>/gs);
            if (bottomScripts) {
                // filter out google tag if we want, or just keep them all
                scriptsContent = bottomScripts.join('\n');
            }
        }
        
        if (articleContent) {
            // Reconstruct the HTML
            const newHtml = `<!DOCTYPE html>
<html lang="en-US" class="light">
${headContent}
<body class="bg-surface font-body-lg text-on-surface antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
    ${headerContent}
    
    <main class="max-w-3xl mx-auto px-gutter py-3xl mt-16 min-h-[70vh]">
        ${articleContent}
    </main>

    ${footerContent}
    ${scriptsContent}
</body>
</html>`;
            content = newHtml;
        }
    }
    
    fs.writeFileSync(file, content, 'utf8');
});

console.log('Fixed Knowledge Base layout and links.');
