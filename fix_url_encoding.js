const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\Home\\Desktop\\Domain-Web-Hosting';

// Recursive file search
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
let filesModified = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace %252F with /
    let newContent = content.replace(/%252F/g, '/');
    // Replace %2F with /
    newContent = newContent.replace(/%2F/g, '/');
    
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        filesModified++;
    }
});

console.log(`Fixed URL encoding in ${filesModified} files.`);
