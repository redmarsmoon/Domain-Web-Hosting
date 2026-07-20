const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

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
    let changed = false;

    // 1. Center the KB article and add spacing below the navigation arrows
    if (file.includes(path.join('kb', path.sep))) {
        if (content.includes('class="flex-1 max-w-[840px]"')) {
            content = content.replace(/class="flex-1 max-w-\[840px\]"/g, 'class="w-full max-w-[840px] mx-auto"');
            changed = true;
        }
        
        if (content.includes('class="mt-lg pt-lg border-t border-outline-variant flex justify-between"')) {
            content = content.replace(/class="mt-lg pt-lg border-t border-outline-variant flex justify-between"/g, 'class="mt-lg pt-lg mb-24 border-t border-outline-variant flex justify-between"');
            changed = true;
        }
    }

    // 2. Remove the blank avatar / author block in blog posts
    const avatarRegex = /<div class="flex items-center gap-xs">\s*<img[^>]*secure\.gravatar\.com[^>]*>.*?<\/div>\s*<div class="w-1 h-1 rounded-full bg-outline-variant hidden sm:block"><\/div>/s;
    if (avatarRegex.test(content)) {
        content = content.replace(avatarRegex, '');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log("Applied KB centering, KB navigation spacing, and removed blank blog avatars.");
