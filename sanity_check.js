const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

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
let errors = [];

htmlFiles.forEach(file => {
    const html = fs.readFileSync(file, 'utf-8');
    const $ = cheerio.load(html);
    
    // Check for repetitive long text in sibling or adjacent tags
    const paragraphs = $('p').map((i, el) => $(el).text().trim()).get();
    const pCounts = {};
    paragraphs.forEach(text => {
        if (text.length > 50) {
            pCounts[text] = (pCounts[text] || 0) + 1;
        }
    });
    
    for (const [text, count] of Object.entries(pCounts)) {
        if (count >= 3) {
            errors.push(`File: ${file.replace(__dirname, '')} has long text repeated ${count} times: "${text.substring(0, 50)}..."`);
        }
    }
    
    // Check for broken HTML (e.g. unclosed tags, but Cheerio mostly fixes this, so maybe just check for structural issues)
    // Check if body is empty or main is empty
    if ($('main').length === 0) {
        errors.push(`File: ${file.replace(__dirname, '')} is missing <main> tag!`);
    }
});

console.log("Sanity Check Results:");
if (errors.length === 0) {
    console.log("No anomalies found.");
} else {
    errors.forEach(err => console.log(err));
}
