const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesData = {
    'church-community-web-solutions/index.html': {
        bentoTitle: 'Engage Your Congregation',
        bentoSub: 'Digital tools to help your church or community group connect, share, and grow.',
        features: [
            { icon: 'volunteer_activism', title: 'M-Pesa Tithes & Donations', desc: 'Securely accept tithes, offerings, and donations via Lipa na M-Pesa directly on your site.' },
            { icon: 'live_tv', title: 'Sermon Live Streaming', desc: 'Embed live streams from YouTube or Facebook so your congregation can watch from home.' },
            { icon: 'calendar_month', title: 'Event Management', desc: 'Keep members updated with a dynamic calendar for church services and community events.' },
            { icon: 'record_voice_over', title: 'Audio Podcast Integration', desc: 'Upload weekly audio sermons and allow members to listen on-demand from any device.' }
        ],
        trustTitle: 'A Trusted Digital Sanctuary',
        trustDesc: 'We build secure, respectful, and highly accessible websites for religious institutions. Protect member data while expanding your ministry’s reach across Kenya.',
        trustList: ['Member Registration Portals', 'Automated SMS Reminders', 'Secure Media Hosting']
    },
    'educational-institution-web-solutions/index.html': {
        bentoTitle: 'Empower Learning Online',
        bentoSub: 'Comprehensive web solutions for schools, colleges, and universities in Kenya.',
        features: [
            { icon: 'school', title: 'Student Portals', desc: 'Secure login areas for students to view grades, timetables, and download assignments.' },
            { icon: 'menu_book', title: 'E-Learning Integration', desc: 'Moodle or custom LMS integration for online classes, quizzes, and digital libraries.' },
            { icon: 'payments', title: 'Online Fee Payments', desc: 'Allow parents to pay school fees securely using integrated banking and M-Pesa APIs.' },
            { icon: 'campaign', title: 'Notice Boards', desc: 'Digital notice boards for urgent school announcements, newsletters, and exam schedules.' }
        ],
        trustTitle: 'Built for Academic Excellence',
        trustDesc: 'Your institution’s website is often the first impression for prospective parents. We build authoritative, fast-loading sites that reflect your academic standards.',
        trustList: ['Parent-Teacher Communication Hubs', 'High-Traffic Capability during Results', 'KRA & MOE Compliance Friendly']
    },
    'hotel-hospitality-web-solutions/index.html': {
        bentoTitle: 'Drive Direct Bookings',
        bentoSub: 'Increase your revenue by bypassing OTAs with a powerful hotel website.',
        features: [
            { icon: 'bed', title: 'Integrated Booking Engine', desc: 'Allow guests to check room availability, select dates, and book instantly on your website.' },
            { icon: '360', title: 'Virtual Tours & Galleries', desc: 'Showcase your luxury suites and amenities with stunning, fast-loading image galleries.' },
            { icon: 'credit_card', title: 'Multi-Currency Payments', desc: 'Accept payments in KES via M-Pesa, or USD/EUR via Stripe and PayPal for international guests.' },
            { icon: 'support_agent', title: 'Concierge Chatbots', desc: 'Automate guest inquiries about check-in times and facilities with an intelligent chatbot.' }
        ],
        trustTitle: 'Showcase Hospitality at its Best',
        trustDesc: 'We design visually striking, mobile-responsive websites that capture the essence of your property and turn casual browsers into confirmed guests.',
        trustList: ['TripAdvisor & Review Integration', 'Zero Commission Booking System', 'Seasonal Pricing Engines']
    },
    'legal-law-firm-web-solutions/index.html': {
        bentoTitle: 'Establish Legal Authority',
        bentoSub: 'Professional, secure, and confidential web design for Kenyan law firms.',
        features: [
            { icon: 'gavel', title: 'Practice Areas Showcase', desc: 'Clearly define your legal expertise with dedicated, SEO-optimized service pages.' },
            { icon: 'lock', title: 'Client Confidentiality', desc: 'Enterprise-grade SSL and encrypted forms to ensure client inquiries remain strictly confidential.' },
            { icon: 'schedule', title: 'Consultation Booking', desc: 'Allow clients to book and pay for initial consultations securely through the website.' },
            { icon: 'article', title: 'Legal Resource Hub', desc: 'Publish insights, case studies, and legal updates to establish thought leadership in Kenya.' }
        ],
        trustTitle: 'Trust Built on Security and Discretion',
        trustDesc: 'For law firms, trust is everything. We build websites that project authority, professionalism, and strict adherence to data privacy regulations.',
        trustList: ['Data Protection Act Compliant', 'Encrypted Client Portals', 'High-Converting Contact Forms']
    },
    'manufacturing-industrial-web-solutions/index.html': {
        bentoTitle: 'Industrial Strength Digital Presence',
        bentoSub: 'Showcase your manufacturing capabilities to local and global B2B buyers.',
        features: [
            { icon: 'factory', title: 'Comprehensive Product Catalogs', desc: 'Organize thousands of products, parts, and machinery into easily searchable digital catalogs.' },
            { icon: 'request_quote', title: 'B2B Quote Requests', desc: 'Advanced form builders that allow corporate buyers to request bulk pricing and specifications.' },
            { icon: 'public', title: 'Global SEO Optimization', desc: 'Rank for industrial keywords locally in Kenya and across East Africa to attract export deals.' },
            { icon: 'architecture', title: 'Facility Showcases', desc: 'Highlight your manufacturing processes, certifications, and quality control through video.' }
        ],
        trustTitle: 'Attract Serious B2B Partnerships',
        trustDesc: 'Industrial buyers research heavily before making contact. We build robust, informative websites that prove your capacity and reliability.',
        trustList: ['ISO Certification Badging', 'Downloadable Tech Specs (PDF)', 'Multi-lingual Support for Exports']
    },
    'medical-healthcare-web-solutions/index.html': {
        bentoTitle: 'Patient-First Healthcare Design',
        bentoSub: 'Secure, accessible, and compassionate web solutions for hospitals and clinics.',
        features: [
            { icon: 'medical_services', title: 'Doctor Directories', desc: 'Help patients find specialists, view their credentials, and see consultation hours.' },
            { icon: 'event_available', title: 'Online Appointments', desc: 'Secure booking systems for in-person visits or telemedicine consultations.' },
            { icon: 'health_and_safety', title: 'Data Privacy', desc: 'Strict adherence to medical data privacy standards for all patient inquiries and forms.' },
            { icon: 'emergency', title: 'Emergency Info Access', desc: 'Clear, immediate routing for ambulance services and urgent care information.' }
        ],
        trustTitle: 'Compassionate Care Starts Online',
        trustDesc: 'Patients are looking for reassurance. We design healthcare websites that are easy to navigate, instantly accessible on mobile, and highly trustworthy.',
        trustList: ['Patient Education Portals', 'Integration with Hospital Systems', 'Accessible Web Design (WCAG)']
    },
    'ngo-non-profit-web-solutions/index.html': {
        bentoTitle: 'Amplify Your Impact',
        bentoSub: 'Empower your mission with a website designed to attract global donors.',
        features: [
            { icon: 'volunteer_activism', title: 'Global & Local Donations', desc: 'Accept international credit cards and local M-Pesa donations seamlessly.' },
            { icon: 'diversity_3', title: 'Impact Portfolios', desc: 'Showcase your ongoing projects, success stories, and transparency reports beautifully.' },
            { icon: 'group_add', title: 'Volunteer Recruitment', desc: 'Streamlined application forms and onboarding portals for new volunteers.' },
            { icon: 'mail', title: 'Newsletter Integration', desc: 'Keep donors engaged with automated email campaigns directly from your site.' }
        ],
        trustTitle: 'Transparency Builds Funding',
        trustDesc: 'Donors need to know their money is making a difference. We build professional NGO websites that highlight your accountability and drive more contributions.',
        trustList: ['Annual Report Downloads', 'Financial Transparency Graphs', 'Secure Donor Data Protection']
    },
    'real-estate-property-web-solutions/index.html': {
        bentoTitle: 'Advanced Property Portals',
        bentoSub: 'Sell and lease properties faster with high-performance real estate websites.',
        features: [
            { icon: 'search', title: 'Advanced Filtering', desc: 'Allow buyers to search by location (e.g., Kilimani), budget, bedrooms, and property type.' },
            { icon: 'map', title: 'Google Maps Integration', desc: 'Interactive property maps showing nearby amenities, schools, and transport links.' },
            { icon: 'real_estate_agent', title: 'Agent Profiles', desc: 'Dedicated pages for your real estate agents, complete with their active listings and contact info.' },
            { icon: 'view_in_ar', title: 'Virtual Tours', desc: 'Embed 3D walkthroughs and high-resolution video tours to qualify leads before site visits.' }
        ],
        trustTitle: 'Turn Browsers Into Buyers',
        trustDesc: 'In the competitive Kenyan real estate market, your website is your digital showroom. We build fast, visually stunning portals that generate qualified leads.',
        trustList: ['Automated Lead Routing', 'Mortgage Calculator Tools', 'WhatsApp Integration for Fast Chat']
    },
    'restaurant-dining-web-solutions/index.html': {
        bentoTitle: 'Digital Dining Experiences',
        bentoSub: 'Attract food lovers with appetizing menus and seamless online ordering.',
        features: [
            { icon: 'restaurant_menu', title: 'Interactive Menus', desc: 'Beautiful, mobile-friendly menus with high-quality photos, dietary tags, and pricing.' },
            { icon: 'delivery_dining', title: 'Online Ordering', desc: 'Take direct orders for delivery or pickup, integrating directly with M-Pesa for payment.' },
            { icon: 'table_restaurant', title: 'Table Reservations', desc: 'Allow guests to book tables online in advance, reducing wait times and managing capacity.' },
            { icon: 'reviews', title: 'Customer Reviews', desc: 'Highlight your best dishes and showcase real customer reviews to build social proof.' }
        ],
        trustTitle: 'More Orders, Less Commission',
        trustDesc: 'Stop paying high commissions to third-party delivery apps. We build robust restaurant websites that allow you to own your customer data and keep your profits.',
        trustList: ['Zero-Commission Ordering', 'Kitchen Display Integration', 'Loyalty Program Features']
    },
    'startup-infrastructure-web-solutions/index.html': {
        bentoTitle: 'Scalable Startup Architecture',
        bentoSub: 'High-performance cloud infrastructure and MVP development for tech startups.',
        features: [
            { icon: 'rocket_launch', title: 'Rapid MVP Development', desc: 'Get your tech product to market quickly with secure, scalable, and modern frameworks.' },
            { icon: 'cloud_sync', title: 'Cloud Infrastructure', desc: 'Deploy on scalable cloud servers designed to handle massive traffic spikes flawlessly.' },
            { icon: 'api', title: 'Custom API Development', desc: 'Build robust backends to connect your web app with mobile apps and third-party services.' },
            { icon: 'security', title: 'Enterprise Security', desc: 'Implement advanced security protocols, data encryption, and compliance measures from day one.' }
        ],
        trustTitle: 'Built for Scale and Speed',
        trustDesc: 'Your startup needs infrastructure that won\'t break when you go viral. We engineer high-availability web applications trusted by investors and users alike.',
        trustList: ['Microservices Architecture', 'Automated CI/CD Pipelines', 'Load Balancing & Auto-Scaling']
    },
    'tourism-travel-web-solutions/index.html': {
        bentoTitle: 'Showcase the Beauty of Africa',
        bentoSub: 'Stunning, high-converting websites for tour operators and safari companies.',
        features: [
            { icon: 'explore', title: 'Itinerary Builders', desc: 'Display beautiful day-by-day safari itineraries with interactive maps and high-res photos.' },
            { icon: 'book_online', title: 'Direct Booking Engines', desc: 'Allow tourists to book safaris and pay securely using international credit cards via Stripe/PayPal.' },
            { icon: 'language', title: 'Multi-Lingual Support', desc: 'Translate your website into German, French, or Spanish to capture a wider global tourist market.' },
            { icon: 'reviews', title: 'TripAdvisor Integration', desc: 'Automatically pull in your 5-star reviews to build immediate trust with international clients.' }
        ],
        trustTitle: 'Capture the Global Tourist Market',
        trustDesc: 'A safari is a high-ticket purchase. We design authoritative, visually breathtaking websites that instill confidence in international travelers booking from abroad.',
        trustList: ['High-Resolution Image Galleries', 'Dynamic Pricing Calculators', 'Fast Loading Speeds Globally']
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
