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
const mapping = {};

// 1. Identify all ugly files and their pretty paths
allHtmlFiles.forEach(file => {
    const filename = path.basename(file);
    if (filename.includes('@p=')) {
        const content = fs.readFileSync(file, 'utf8');
        // Extract oEmbed URL
        const match = content.match(/href="wp-json\/oembed\/.*?url=http%253A%252F%252Fdomain-web-hosting\.local%252F(.*?)%252F"/);
        if (match && match[1]) {
            const prettyPath = `/${match[1]}/`;
            mapping[filename] = prettyPath;
            console.log(`Mapping ${filename} -> ${prettyPath}`);
        } else {
            // Some pages like blog categories might not have oEmbed, or they might just be root
            const matchRoot = content.match(/href="wp-json\/oembed\/.*?url=http%253A%252F%252Fdomain-web-hosting\.local%252F"/);
            if(matchRoot) {
               mapping[filename] = `/`;
               console.log(`Mapping ${filename} -> /`);
            }
        }
    }
});

// 2. Replace links in all HTML files
let filesModified = 0;
allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    Object.keys(mapping).forEach(uglyName => {
        // We match href="..." where the link ends with the uglyName
        // e.g. href="index.html@p=9.html" or href="../index.html@p=9.html"
        // We replace the entire href contents with the pretty path
        
        // Escape uglyName for regex
        const escapedUglyName = uglyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`href="([^"]*?)${escapedUglyName}"`, 'g');
        
        if (regex.test(content)) {
            content = content.replace(regex, `href="${mapping[uglyName]}"`);
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        filesModified++;
    }
});

console.log(`Fixed links in ${filesModified} files.`);

// 3. Delete the ugly files since they are now orphaned and redundant
Object.keys(mapping).forEach(uglyName => {
    const filePath = path.join(rootDir, uglyName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted ${uglyName}`);
    }
});
