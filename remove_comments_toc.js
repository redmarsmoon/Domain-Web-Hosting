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

const commentsRegex = /<section id="comments"[\s\S]*?<\/section>/g;
const tocRegex = /<!-- Table of Contents Placeholder -->[\s\S]*?<\/div>/g;

let modifiedCount = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (commentsRegex.test(content)) {
        content = content.replace(commentsRegex, '');
        changed = true;
    }

    if (tocRegex.test(content)) {
        content = content.replace(tocRegex, '');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Cleaned up: " + file);
        modifiedCount++;
    }
});

console.log("Total files modified: " + modifiedCount);
