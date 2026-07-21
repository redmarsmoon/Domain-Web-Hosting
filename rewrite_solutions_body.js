const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesData = {
    'business-websites/index.html': {
        bentoTitle: 'Professional Web Solutions',
        bentoSub: 'Everything your business needs to establish a strong digital presence.',
        features: [
            { icon: 'design_services', title: 'Custom UI/UX Design', desc: 'Bespoke designs tailored to your brand identity, ensuring a unique and memorable user experience.' },
            { icon: 'speed', title: 'High-Speed Performance', desc: 'Optimized code and lightweight assets so your business site loads in milliseconds.' },
            { icon: 'security', title: 'Enterprise Security', desc: 'Advanced firewalls, DDoS protection, and secure coding practices to protect your business data.' },
            { icon: 'trending_up', title: 'Conversion Optimized', desc: 'Strategic call-to-actions and intuitive navigation designed to turn visitors into leads.' }
        ],
        trustTitle: 'Scale Your Business With Confidence',
        trustDesc: 'We do not just build websites; we build digital growth engines. Our business websites are designed to rank high on Google and drive real revenue.',
        trustList: ['SEO-Optimized Architecture', 'Integration with CRM & Analytics', 'Ongoing Maintenance & Support']
    },
    'website-redesign/index.html': {
        bentoTitle: 'Modernize Your Brand',
        bentoSub: 'Turn your outdated website into a modern, high-performing lead generation tool.',
        features: [
            { icon: 'mobile_friendly', title: 'Mobile-First Approach', desc: 'We rebuild your site to be fully responsive, capturing the massive mobile audience in Kenya.' },
            { icon: 'rocket_launch', title: 'Performance Boost', desc: 'Say goodbye to slow loading times. We optimize every image and script for maximum speed.' },
            { icon: 'search', title: 'SEO Preservation', desc: 'Careful 301 redirects and URL mapping to ensure you don\'t lose your existing Google rankings.' },
            { icon: 'palette', title: 'Fresh Visual Identity', desc: 'A complete facelift using modern design trends, better typography, and improved user flows.' }
        ],
        trustTitle: 'A Redesign That Delivers ROI',
        trustDesc: 'An outdated website damages your credibility. Our redesign process focuses on improving user experience, increasing engagement, and ultimately boosting your sales.',
        trustList: ['Comprehensive UX/UI Audit', 'Seamless Content Migration', 'Post-Launch Performance Monitoring']
    },
    'ai-powered-websites/index.html': {
        bentoTitle: 'Next-Gen AI Capabilities',
        bentoSub: 'Integrate cutting-edge artificial intelligence directly into your website.',
        features: [
            { icon: 'smart_toy', title: 'Intelligent Chatbots', desc: '24/7 automated customer support trained on your company\'s specific data and FAQs.' },
            { icon: 'tune', title: 'Dynamic Personalization', desc: 'AI algorithms that show personalized content and product recommendations to each visitor.' },
            { icon: 'auto_graph', title: 'Automated Workflows', desc: 'Streamline your operations with AI-driven form processing and lead scoring.' },
            { icon: 'translate', title: 'Auto-Translation', desc: 'Instantly translate your website content to reach a broader, diverse audience.' }
        ],
        trustTitle: 'Future-Proof Your Digital Presence',
        trustDesc: 'Early adopters of AI gain a massive competitive advantage. We help Kenyan businesses implement practical AI solutions that reduce costs and increase customer satisfaction.',
        trustList: ['Custom AI Model Training', 'Seamless API Integrations', 'Privacy & Data Security Assured']
    },
    'email-hosting/index.html': {
        bentoTitle: 'Enterprise-Grade Email',
        bentoSub: 'Secure, reliable, and professional email hosting for your entire team.',
        features: [
            { icon: 'mark_email_read', title: 'Custom Domains', desc: 'Create professional addresses like info@yourcompany.co.ke to build immediate trust.' },
            { icon: 'gpp_bad', title: 'Spam & Virus Protection', desc: 'Advanced filtering algorithms keep your inbox clean and protect against phishing attacks.' },
            { icon: 'sync', title: 'Multi-Device Sync', desc: 'Seamlessly access your emails, calendars, and contacts across your phone, tablet, and desktop.' },
            { icon: 'dns', title: 'Massive Storage', desc: 'Generous mailbox quotas so you never have to delete important client communications.' }
        ],
        trustTitle: 'Reliable Communication Infrastructure',
        trustDesc: 'Email is the backbone of your business communication. Our robust email hosting guarantees 99.9% uptime, ensuring you never miss a critical message from a client.',
        trustList: ['Webmail & Outlook Support', 'Automated Daily Backups', '24/7 Expert Email Support']
    },
    'crm/index.html': {
        bentoTitle: 'Powerful Custom CRM Features',
        bentoSub: 'A CRM built precisely around your unique sales and operational workflows.',
        features: [
            { icon: 'groups', title: 'Lead Management', desc: 'Track every interaction from initial contact to closed deal in one centralized dashboard.' },
            { icon: 'payments', title: 'M-Pesa Integration', desc: 'Automatically track payments and reconcile invoices using direct Kenyan API integrations.' },
            { icon: 'insert_chart', title: 'Advanced Analytics', desc: 'Generate real-time reports on sales performance, team productivity, and revenue forecasts.' },
            { icon: 'sms', title: 'Bulk SMS & Email', desc: 'Communicate with your entire customer base directly from the CRM interface.' }
        ],
        trustTitle: 'Stop Paying Expensive Monthly Licenses',
        trustDesc: 'Off-the-shelf CRMs charge per user and are often bloated with features you don\'t need. We build custom CRMs that belong entirely to you, saving costs as you scale.',
        trustList: ['Zero Per-User Licensing Fees', '100% Tailored to Your Workflows', 'Secure Cloud or On-Premise Hosting']
    },
    'crm-systems/index.html': {
        bentoTitle: 'Automate Your Sales Pipeline',
        bentoSub: 'Deploy world-class CRM systems to scale your customer relationships.',
        features: [
            { icon: 'hub', title: 'Centralized Data', desc: 'Keep all your customer information, history, and communications in a single, secure location.' },
            { icon: 'bolt', title: 'Sales Automation', desc: 'Automate follow-up emails, task assignments, and lead scoring to close deals faster.' },
            { icon: 'support_agent', title: 'Customer Support Desk', desc: 'Integrated ticketing systems to resolve customer complaints efficiently and maintain high satisfaction.' },
            { icon: 'phone_iphone', title: 'Mobile CRM', desc: 'Access your sales data on the go. Perfect for field sales teams operating across Kenya.' }
        ],
        trustTitle: 'Empower Your Sales Team',
        trustDesc: 'A properly implemented CRM system increases sales productivity by up to 30%. We handle the setup, data migration, and comprehensive staff training.',
        trustList: ['Data Migration Assistance', 'Comprehensive Staff Training', 'Ongoing Technical Support']
    },
    'erp/index.html': {
        bentoTitle: 'Unified Enterprise Management',
        bentoSub: 'Connect all your departments with a single, powerful ERP system.',
        features: [
            { icon: 'account_balance', title: 'Financial Accounting', desc: 'Track expenses, manage payroll, and generate KRA-compliant financial reports instantly.' },
            { icon: 'inventory', title: 'Inventory & Supply Chain', desc: 'Real-time stock tracking across multiple warehouses with automated reorder alerts.' },
            { icon: 'badge', title: 'HR & Payroll', desc: 'Manage employee records, leave days, and automate NHIF/NSSF/PAYE deductions.' },
            { icon: 'dashboard_customize', title: 'Custom Dashboards', desc: 'Role-based access controls and customized dashboards for executives and managers.' }
        ],
        trustTitle: 'Streamline Complex Operations',
        trustDesc: 'Fragmented software systems cause data silos and inefficiencies. Our custom ERP solutions unify your data, providing a single source of truth for your entire enterprise.',
        trustList: ['Fully Customized Modules', 'Highly Secure Cloud Infrastructure', 'Scalable for Large Enterprises']
    },
    'pos/index.html': {
        bentoTitle: 'Modern Cloud POS Features',
        bentoSub: 'Fast, reliable, and easy-to-use Point of Sale systems for modern retail.',
        features: [
            { icon: 'point_of_sale', title: 'Fast Checkout', desc: 'An intuitive interface designed for rapid scanning and processing of customer orders.' },
            { icon: 'inventory_2', title: 'Real-Time Inventory', desc: 'Stock levels update automatically with every sale, preventing stockouts.' },
            { icon: 'receipt_long', title: 'KRA Integration', desc: 'Seamlessly generate eTIMS/TIMS compliant receipts for the Kenyan Revenue Authority.' },
            { icon: 'monitoring', title: 'Sales Reporting', desc: 'Access detailed daily sales reports and employee performance metrics from any device.' }
        ],
        trustTitle: 'Manage Your Business From Anywhere',
        trustDesc: 'Because our POS system is cloud-based, you can monitor sales at your Nairobi store while sitting at home or traveling. Stay in total control of your business.',
        trustList: ['Works Offline During Outages', 'Compatible with Standard Hardware', 'Multi-Branch Support']
    },
    'small-business-website-solutions/index.html': {
        bentoTitle: 'Built for Small Businesses',
        bentoSub: 'Everything your small business needs to succeed online in Kenya.',
        features: [
            { icon: 'storefront', title: 'Professional Design', desc: 'We build stunning, credible websites that make your small business look like a major player.' },
            { icon: 'travel_explore', title: 'Local SEO Focus', desc: 'Optimized to help you rank highly on Google when customers in your city search for your services.' },
            { icon: 'credit_score', title: 'Affordable Packages', desc: 'High-quality web design packages priced competitively for Kenyan startups and SMEs.' },
            { icon: 'edit_document', title: 'Easy Content Updates', desc: 'We use user-friendly CMS platforms so you can easily update text and photos yourself.' }
        ],
        trustTitle: 'Grow Your Business Locally',
        trustDesc: 'A Facebook page is not enough. Having your own website gives you complete control over your brand, builds massive trust with Kenyan consumers, and acts as a 24/7 sales rep.',
        trustList: ['Free Domain Name Included', 'Mobile-Responsive Layouts', 'Integration with WhatsApp & Socials']
    }
};

function rewriteBody(filePath, data) {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
        console.log("Not found:", filePath);
        return;
    }

    const html = fs.readFileSync(fullPath, 'utf-8');
    const $ = cheerio.load(html);

    const bentoSection = $('main > section').eq(1);
    if (bentoSection.length) {
        bentoSection.find('h2').text(data.bentoTitle);
        bentoSection.find('h2').next('p').text(data.bentoSub);
        
        const bentoItems = bentoSection.find('.grid > div');
        if (bentoItems.length >= 4) {
            bentoItems.eq(0).find('.material-symbols-outlined').text(data.features[0].icon);
            bentoItems.eq(0).find('h3').text(data.features[0].title);
            bentoItems.eq(0).find('p').text(data.features[0].desc);

            bentoItems.eq(1).find('.material-symbols-outlined').text(data.features[1].icon);
            bentoItems.eq(1).find('h3').text(data.features[1].title);
            bentoItems.eq(1).find('p').text(data.features[1].desc);

            bentoItems.eq(2).find('.material-symbols-outlined').text(data.features[2].icon);
            bentoItems.eq(2).find('h3').text(data.features[2].title);
            bentoItems.eq(2).find('p').text(data.features[2].desc);

            bentoItems.eq(3).find('h3').text(data.features[3].title);
            bentoItems.eq(3).find('p').text(data.features[3].desc);
        }
    }

    const trustSection = $('main > section').eq(2);
    if (trustSection.length) {
        trustSection.find('h2').text(data.trustTitle);
        trustSection.find('p').text(data.trustDesc);
        
        const listItems = trustSection.find('ul li');
        if (listItems.length >= 3) {
            listItems.eq(0).contents().last().replaceWith(' ' + data.trustList[0]);
            listItems.eq(1).contents().last().replaceWith(' ' + data.trustList[1]);
            listItems.eq(2).contents().last().replaceWith(' ' + data.trustList[2]);
        }
    }

    fs.writeFileSync(fullPath, $.html());
    console.log("Rewrote body for:", filePath);
}

for (const [filePath, data] of Object.entries(pagesData)) {
    rewriteBody(filePath, data);
}
