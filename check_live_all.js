const https = require('https');
const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!fullPath.includes('.git') && !fullPath.includes('node_modules') && !fullPath.includes('.gemini')) {
                results = results.concat(walk(fullPath));
            }
        } else {
            if (fullPath.endsWith('.html')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const htmlFiles = walk(__dirname);
const baseUrl = 'https://domainwebhosting.co/';

const urlsToCheck = htmlFiles.map(file => {
    let relative = path.relative(__dirname, file).replace(/\\/g, '/');
    if (relative === 'index.html') {
        return baseUrl;
    } else if (relative.endsWith('index.html')) {
        return baseUrl + relative.replace('index.html', '');
    } else {
        return baseUrl + relative;
    }
}).filter(url => !url.includes('@category')); // skip weird blog categories

console.log(`Checking ${urlsToCheck.length} URLs on the live site...`);

let checked = 0;
let successCount = 0;
let failCount = 0;

function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const hasFluff = data.includes('seo-unique-content');
                // The new version has removed seo-unique-content
                // So if hasFluff is false, it's the new version!
                if (!hasFluff) {
                    successCount++;
                } else {
                    failCount++;
                }
                resolve();
            });
        }).on('error', (err) => {
            console.error(`Error fetching ${url}: ${err.message}`);
            failCount++;
            resolve();
        });
    });
}

async function run() {
    // batch size of 10 to avoid overwhelming the server
    for (let i = 0; i < urlsToCheck.length; i += 10) {
        const batch = urlsToCheck.slice(i, i + 10);
        await Promise.all(batch.map(checkUrl));
        checked += batch.length;
        process.stdout.write(`\rProgress: ${checked}/${urlsToCheck.length}`);
    }
    
    console.log('\n--- LIVE SITE AUDIT RESULTS ---');
    console.log(`Total Pages Checked: ${urlsToCheck.length}`);
    console.log(`Pages Updated (No SEO Fluff): ${successCount}`);
    console.log(`Pages NOT Updated (Still have fluff): ${failCount}`);
    
    if (failCount > 0) {
        console.log('\nNote: If pages are still not updated, the server cache (Cloudflare/LiteSpeed) might still be serving the old pages.');
    } else {
        console.log('\nSUCCESS! All pages on the live website have been updated.');
    }
}

run();
