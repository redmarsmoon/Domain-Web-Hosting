const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Extract Header and Footer from index.html
const headerMatch = indexHtml.match(/(<header[^>]*>.*?<\/header>)/s);
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
        // Extract original article content
        const articleMatch = content.match(/(<article[^>]*>.*?<\/article>)/s);
        const articleContent = articleMatch ? articleMatch[1] : '';
        
        // Extract existing scripts at the bottom of the body
        const scriptsMatch = content.match(/(<script>.*?<\/body>)/s);
        let scriptsContent = scriptsMatch ? scriptsMatch[1].replace('</body>', '') : '';
        
        if (articleContent) {
            // Rebuild the body completely
            const newBody = `<body class="wp-singular kb_article-template-default wp-theme-domain-web-hosting-theme text-on-background bg-surface font-body-lg antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
${headerContent}

<main class="max-w-3xl mx-auto px-gutter py-3xl mt-16 min-h-[70vh]">
${articleContent}
</main>

${footerContent}

${scriptsContent}
</body>`;
            
            content = content.replace(/<body[^>]*>.*?<\/body>/s, newBody);
        }
    }
    
    fs.writeFileSync(file, content, 'utf8');
});

console.log("KB layout and global KB links updated successfully.");
