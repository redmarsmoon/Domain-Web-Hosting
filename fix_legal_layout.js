const fs = require('fs');
const path = require('path');

const filesToFix = [
    'refund-policy/index.html',
    'service-level-agreement/index.html',
    'terms-of-service/index.html',
    'privacy-policy/index.html',
    'gdpr-compliance/index.html',
    'acceptable-use-policy/index.html'
];

filesToFix.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(
            '<main class="pt-12 pb-24 px-4 md:px-8 max-w-4xl mx-auto prose prose-slate">',
            '<main class="pt-8">'
        );
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${file}`);
    } else {
        console.log(`Not found: ${file}`);
    }
});
