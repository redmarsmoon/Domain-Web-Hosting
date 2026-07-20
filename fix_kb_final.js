const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract Header and Footer from index.html
const headerMatch = indexHtml.match(/(<header class="fixed top-0.*?<\/header>)/s);
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
    
    // Fix Knowledge Base links globally
    content = content.replace(/href="\/knowledge-base\/"/g, 'href="https://my.domainwebhosting.co/"');
    // For anything like <a href="#">Knowledge Base</a>
    content = content.replace(/href="[^"]*"([^>]*>Knowledge Base<\/a>)/gi, 'href="https://my.domainwebhosting.co/"$1');

    let relativePath = file.replace(rootDir, '').replace(/\\/g, '/');
    if (relativePath === '/index.html') relativePath = '/';
    else relativePath = relativePath.replace('/index.html', '/');
    
    // For KB articles, replace layout
    if (relativePath.startsWith('/kb/') && relativePath.split('/').length > 3) {
        
        const headMatch = content.match(/(<!DOCTYPE html>.*?<\/head>)/is);
        const headContent = headMatch ? headMatch[1] : '';
        
        const articleMatch = content.match(/(<article[^>]*>.*?<\/article>)/is);
        const articleContent = articleMatch ? articleMatch[1] : '';
        
        // Grab scripts at the bottom (everything from the first script after </main> until </body>)
        // Wait, just match everything between </main> and </body>
        const bottomMatch = content.match(/<\/main>(.*?)<\/body>/is);
        let bottomContent = bottomMatch ? bottomMatch[1] : '';
        
        if (articleContent && headContent) {
            // Rebuild the file completely
            const newFile = `${headContent}
<body class="bg-surface font-body-lg text-on-surface antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
${headerContent}

<main class="max-w-3xl mx-auto px-gutter py-3xl mt-16 min-h-[70vh]">
${articleContent}
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

console.log("Final KB layout and global KB links updated successfully.");
