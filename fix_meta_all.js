const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            if (!filepath.includes('.git') && !filepath.includes('node_modules')) {
                filelist = walkSync(filepath, filelist);
            }
        } else if (filepath.endsWith('.html')) {
            filelist.push(filepath);
        }
    });
    return filelist;
};

const htmlFiles = walkSync(__dirname);
let updatedCount = 0;

htmlFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf-8');
    let originalHtml = html;

    // 1. Extract main description
    const descMatch = html.match(/<meta name="description" content="([^"]+)">/);
    if (!descMatch) return;
    
    // Escape any special characters for replacement strings (like $ which would refer to regex groups)
    const mainDesc = descMatch[1];
    const safeMainDesc = mainDesc.replace(/\$/g, '$$$$');

    // 2. Update og:description
    html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${safeMainDesc}">`);

    // 3. Update twitter:description
    html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${safeMainDesc}">`);

    // 4. Move <meta charset="UTF-8"> to the top of <head> if it's not already there
    // First, let's remove it if it exists anywhere
    if (html.match(/\s*<meta charset="UTF-8">/)) {
        html = html.replace(/\s*<meta charset="UTF-8">/, '');
    }
    
    // Then ensure it is placed right after <head>
    if (!html.includes('<head>\n    <meta charset="UTF-8">')) {
        html = html.replace(/<head>/i, '<head>\n    <meta charset="UTF-8">');
    }

    if (html !== originalHtml) {
        fs.writeFileSync(file, html, 'utf-8');
        updatedCount++;
        console.log(`Updated: ${file.replace(__dirname, '')}`);
    }
});

console.log(`Successfully updated ${updatedCount} HTML files.`);
