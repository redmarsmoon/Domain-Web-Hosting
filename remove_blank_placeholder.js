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

const placeholderRegex = /<div class="mb-lg rounded-xl overflow-hidden border border-outline-variant\/50 shadow-sm bg-surface-container flex items-center justify-center aspect-video">\s*<span class="material-symbols-outlined text-outline text-\[48px\]">image<\/span>\s*<\/div>/g;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (placeholderRegex.test(content)) {
        content = content.replace(placeholderRegex, '');
        fs.writeFileSync(file, content, 'utf8');
        console.log("Removed from " + file);
    }
});

console.log("Done");
