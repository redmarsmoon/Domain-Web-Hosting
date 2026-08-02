const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// All directories we might want to check
const dirs = [
    'church-community-web-solutions',
    'educational-institution-web-solutions',
    'hotel-hospitality-web-solutions',
    'legal-law-firm-web-solutions',
    'manufacturing-industrial-web-solutions',
    'medical-healthcare-web-solutions',
    'ngo-non-profit-web-solutions',
    'real-estate-property-web-solutions',
    'restaurant-dining-web-solutions',
    'small-business-website-solutions',
    'tourism-travel-web-solutions',
    'startup-infrastructure-web-solutions',
    'website-redesign',
    'pos',
    'erp',
    'crm',
    'crm-systems',
    'ai-powered-websites',
    'business-websites',
    'email-hosting',
    'domain-registration',
    'hosting',
    'hosting/business-web-hosting',
    'hosting/ecommerce-hosting',
    'hosting/managed-wordpress-hosting',
    'website-development',
    'website-development/corporate-websites',
    'website-development/ecommerce-development'
];

dirs.forEach(dir => {
    const filePath = path.join(__dirname, dir, 'index.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { decodeEntities: false });
        
        let changed = false;

        $('a').each(function() {
            const text = $(this).text().trim();
            if (text === 'Get Started') {
                $(this).attr('href', 'https://domainwebhosting.co/start-your-project/');
                changed = true;
            } else if (text === 'View Hosting Plans' || text === 'View Hosting') {
                $(this).attr('href', 'https://domainwebhosting.co/hosting/');
                changed = true;
            }
        });
        
        $('button').each(function() {
            const text = $(this).text().trim();
            if (text === 'Get Started Today') {
                $(this).attr('onclick', "window.location.href='https://domainwebhosting.co/start-your-project/'");
                changed = true;
            }
        });

        if (changed) {
            // Write back to file, careful not to mess up html structure
            fs.writeFileSync(filePath, $.html());
            console.log(`Updated links in ${dir}/index.html`);
        }
    }
});
