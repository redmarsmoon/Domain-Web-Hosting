const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const batch1 = {
    'website-development/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for Custom Web Development in Kenya?</h2>
      <p>When it comes to scaling your business in the digital age, having a functional, fast, and highly secure online presence is no longer a luxury—it is a critical necessity. Domain Web Hosting is recognized as one of the leading web development agencies in Nairobi, Kenya, offering tailored digital solutions for startups, growing SMEs, and large-scale corporate enterprises. We do not just design websites; we engineer comprehensive digital platforms that act as your 24/7 sales representatives. Our mission is to empower Kenyan businesses with robust, scalable, and responsive web design that converts casual visitors into loyal, paying customers.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Unmatched Expertise in Responsive Web Design</h3>
      <p>In a mobile-first world, especially within the East African market where over 80% of internet access occurs via smartphones, mobile responsiveness is not an afterthought—it is the foundation of our web development process. Our expert team of web developers in Nairobi utilizes the latest front-end frameworks like React, Vue.js, and advanced HTML5/CSS3 to ensure that your custom website automatically adapts to any screen size, device, or browser. This meticulous attention to responsive web design guarantees an optimal user experience (UX) and intuitive user interface (UI), drastically reducing bounce rates and maximizing customer engagement.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">SEO-Friendly Website Architecture Built for Google</h3>
      <p>A beautifully designed website is useless if your target audience cannot find it on search engines. That is why our custom web development services in Kenya are deeply intertwined with advanced Search Engine Optimization (SEO) strategies. From day one, we construct your website’s architecture to be highly crawlable and indexable by Google bots. We implement clean, semantic code, optimize all images using next-generation WebP formats, utilize descriptive meta tags, and structure your URLs to maximize organic visibility. We also focus heavily on core web vitals, ensuring that your website's load speed, interactivity, and visual stability exceed Google’s strict performance metrics.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Bespoke Functionality Tailored to Your Business Goals</h3>
      <p>Unlike agencies that rely on rigid, pre-built templates, Domain Web Hosting provides entirely bespoke web development solutions. Whether you require a sophisticated real estate portal with advanced property filtering, a robust booking system for your hospitality business, or a complex patient management portal for a healthcare clinic, we have the technical prowess to build it from scratch. Our full-stack web developers are proficient in robust backend technologies, allowing us to build secure databases, develop custom REST APIs, and integrate seamlessly with third-party software such as local CRM platforms, ERP systems, and external payment gateways.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Seamless Payment Integrations (M-Pesa & Cards)</h3>
      <p>Conducting business in Kenya requires frictionless payment solutions. Our custom web development team excels at integrating local and international payment gateways directly into your website. We provide seamless integration with the Safaricom M-Pesa Daraja API, allowing your customers to pay for products, services, or subscriptions via automated Till or Paybill numbers instantly. Additionally, we integrate secure credit card processors like Stripe, PayPal, and local bank APIs, ensuring that your business can accept multi-currency transactions securely without ever compromising user data.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Enterprise-Grade Security and Data Protection</h3>
      <p>Cybersecurity is a paramount concern for any modern business. At Domain Web Hosting, we embed security protocols into the very fabric of our custom web applications. Our websites are fortified against common vulnerabilities such as Cross-Site Scripting (XSS), SQL Injection, and Distributed Denial-of-Service (DDoS) attacks. We deploy stringent data validation techniques, secure authentication protocols, and military-grade SSL encryption for all data transmitted between the server and the user's browser. Furthermore, we ensure your website complies with the Kenyan Data Protection Act and international GDPR standards, giving you and your clients total peace of mind.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Continuous Support, Maintenance, and Scalability</h3>
      <p>Your business is not static, and your website should not be either. We build custom websites with scalability in mind, utilizing cloud infrastructure and modular coding practices so that new features, pages, or entire sub-systems can be added seamlessly as your company grows. Beyond the initial launch, Domain Web Hosting offers ongoing website maintenance, security patching, core software updates, and daily automated backups. Our dedicated 24/7 expert support team in Nairobi is always on standby to resolve technical issues instantly, ensuring your digital storefront remains operational, secure, and blazing fast year-round.</p>
    </div>
  </div>
</section>
    `,

    'website-development/corporate-websites/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for Corporate Website Design in Kenya?</h2>
      <p>In the highly competitive business landscape of East Africa, your corporate website serves as the ultimate digital headquarters for your enterprise. It is often the first point of contact between your brand and potential investors, B2B partners, prospective employees, and high-value clients. Domain Web Hosting is the premier agency for corporate website design in Kenya, specializing in creating authoritative, high-performance, and secure digital platforms for multinational corporations, financial institutions, manufacturing firms, and large-scale enterprises based in Nairobi and beyond. We understand that a corporate website is not just a digital brochure; it is a critical strategic asset.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Authoritative Branding and Professional UI/UX</h3>
      <p>A corporate website must instantly project trust, stability, and industry leadership. Our expert UI/UX designers work closely with your communications and marketing teams to ensure that your brand identity is meticulously translated into a highly professional digital experience. We utilize bespoke typography, custom iconography, elegant color palettes, and intuitive navigation structures that guide stakeholders effortlessly through complex company information, investor relations documents, and detailed service portfolios. By prioritizing premium corporate web design, we help your organization stand out as the undisputed leader in your respective sector.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Robust Infrastructure for High-Traffic B2B Websites</h3>
      <p>Corporate websites frequently experience massive surges in traffic during product launches, press releases, or quarterly earnings reports. Domain Web Hosting engineers corporate platforms capable of handling thousands of concurrent users without suffering from slow load times or downtime. We utilize state-of-the-art server architecture, advanced caching mechanisms, lightweight code structuring, and global Content Delivery Networks (CDNs) to deliver a lightning-fast experience to users worldwide. Our robust infrastructure guarantees that your B2B website remains highly available, responsive, and blazing fast 24/7, maintaining your professional reputation at all times.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Advanced Security Protocols and Compliance</h3>
      <p>Data security is the absolute highest priority for corporate entities. Our corporate website developers in Nairobi implement enterprise-grade security architectures to protect your proprietary data, customer information, and internal communications from cyber threats. We integrate rigorous web application firewalls (WAF), brute-force login protection protocols, secure SSL/TLS encryption, and automated malware scanning tools directly into the core of your platform. Additionally, our corporate web solutions ensure full compliance with strict data privacy regulations, including the Kenyan Data Protection Act (DPA) and the European GDPR framework, safeguarding your enterprise against legal and financial liabilities.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Seamless Enterprise System Integrations</h3>
      <p>A modern corporate website rarely exists in isolation; it must function as a seamlessly integrated hub for your wider digital ecosystem. Domain Web Hosting excels at connecting your corporate portal with complex internal business systems. Our development team builds custom RESTful APIs to integrate your website securely with enterprise resource planning (ERP) systems, customer relationship management (CRM) software (like Salesforce or HubSpot), human resources (HR) recruitment portals, and automated email marketing platforms. This level of sophisticated integration streamlines your internal workflows, reduces manual data entry errors, and vastly improves overall operational efficiency.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Dedicated Investor Relations and Media Portals</h3>
      <p>For publicly traded companies and large corporate entities, transparent communication with shareholders and the media is vital. We specialize in developing secure, restricted-access Investor Relations (IR) portals and comprehensive media centers within your corporate website. These dedicated modules allow your organization to publish secure financial reports, interactive stock charts, downloadable press kits, corporate governance documents, and live-streamed annual general meetings (AGMs) easily. We implement role-based access control (RBAC), ensuring that sensitive documents are only available to verified stakeholders, journalists, or board members.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Comprehensive Corporate SEO Strategy</h3>
      <p>Maintaining high visibility on search engines is essential for corporate branding and B2B lead generation. Our corporate website development packages include comprehensive Search Engine Optimization (SEO) campaigns. We conduct deep keyword research tailored to your specific industry, optimize your site’s internal linking structure, deploy proper schema markup for corporate entities, and ensure all technical SEO metrics—like Google's Core Web Vitals—are perfectly optimized. Our aggressive SEO strategies ensure that when potential partners or clients search for your industry's services in Kenya, your corporate website dominates the top positions on Google search results.</p>
    </div>
  </div>
</section>
    `,

    'website-development/ecommerce-development/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for eCommerce Website Development in Kenya?</h2>
      <p>The transition to online retail is accelerating across East Africa, making a robust digital storefront a fundamental requirement for retail success. Domain Web Hosting is recognized as a premier agency for eCommerce website development in Kenya, specializing in creating highly secure, lightning-fast, and deeply optimized online stores. Whether you are launching a boutique clothing shop, a high-volume electronics marketplace, or a B2B wholesale portal, our expert WooCommerce developers in Nairobi build tailored eCommerce solutions designed strictly for one purpose: maximizing your online sales revenue and driving customer retention.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Conversion-Optimized eCommerce Design</h3>
      <p>In the highly competitive eCommerce space, every second and every click counts. Our UI/UX designers focus obsessively on conversion rate optimization (CRO) when architecting your online store. We design intuitive product catalogs, friction-free checkout funnels, and compelling call-to-action (CTA) buttons that guide customers effortlessly from discovery to purchase. By prioritizing mobile-first responsive design, we ensure that the shopping experience is perfectly fluid on smartphones, tablets, and desktop computers alike. This meticulous approach to eCommerce design minimizes cart abandonment rates and significantly boosts your overall return on investment (ROI).</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Seamless M-Pesa and Multi-Currency Payment Integrations</h3>
      <p>To succeed in the Kenyan retail market, offering seamless local payment methods is non-negotiable. Our custom eCommerce developers are experts at integrating the Safaricom M-Pesa Daraja API directly into your website's checkout process. This allows your customers to complete payments securely via an automated STK push directly to their mobile phones. For businesses targeting international markets, we also implement secure, multi-currency payment gateways such as Stripe, PayPal, Visa, Mastercard, and DPO Group. We guarantee a secure, frictionless payment environment that builds trust and encourages repeat purchases.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Advanced Product Management and Inventory Control</h3>
      <p>Managing an online store should not be a logistical nightmare. We build our eCommerce websites on powerful, user-friendly Content Management Systems (CMS) like WooCommerce, customized precisely to your operational workflow. You will have access to a secure administrative dashboard where you can easily add new products, update pricing in bulk, manage dynamic stock levels, generate detailed sales reports, and create automated promotional discount codes. We also offer deep integrations with your existing Point of Sale (POS) and Enterprise Resource Planning (ERP) systems to ensure your physical and digital inventories are synchronized in real-time.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Lightning-Fast Load Speeds for Online Stores</h3>
      <p>Slow load times absolutely decimate online sales. Studies show that a mere one-second delay in page load time can result in a 7% reduction in conversions. Domain Web Hosting engineers high-performance eCommerce sites backed by our premium NVMe SSD web hosting infrastructure. We utilize aggressive caching strategies, lazy-loading for high-resolution product imagery, database query optimization, and powerful Content Delivery Networks (CDNs). This ensures that your online store loads in milliseconds, providing a blazing-fast shopping experience that satisfies impatient buyers and satisfies Google’s Core Web Vitals algorithms.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Ironclad eCommerce Security and PCI Compliance</h3>
      <p>When you handle customer financial data, security is paramount. Our eCommerce website development in Kenya strictly adheres to international security standards. We deploy robust, military-grade SSL/TLS encryption certificates to protect all data transmitted during the checkout process, ensuring full compliance with the Payment Card Industry Data Security Standard (PCI DSS). We also implement advanced web application firewalls (WAF), real-time malware scanning, brute-force login protection, and automated daily backups. With Domain Web Hosting, your online store is fortified against cyber threats, protecting your brand's reputation and your customers' trust.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Technical SEO for eCommerce Websites</h3>
      <p>Driving organic, high-intent traffic to your product pages is essential for long-term eCommerce success. Our development process includes comprehensive, built-in Technical SEO specifically tailored for online retail. We implement automated rich snippet schema markup for your products, enabling Google to display your prices, availability, and customer reviews directly in the search results. We optimize your category structures, implement dynamic XML sitemaps, optimize image alt tags, and ensure highly readable URL slugs. Our aggressive eCommerce SEO strategies ensure that your products outrank competitors when potential buyers are searching online in Kenya.</p>
    </div>
  </div>
</section>
    `,

    'hosting/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for Web Hosting in Kenya?</h2>
      <p>In today’s hyper-connected digital landscape, the foundation of your online success begins with reliable, high-performance server infrastructure. As the premier provider of web hosting in Kenya, Domain Web Hosting is dedicated to delivering enterprise-grade hosting solutions tailored for startups, growing SMEs, large-scale corporate entities, and high-traffic eCommerce platforms. We recognize that every second of downtime equals lost revenue and damaged reputation. That is why we have engineered our web hosting services to provide unprecedented speed, ironclad security, and unparalleled reliability, ensuring your digital assets are always available to your global audience.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Blazing-Fast NVMe SSD Storage Architecture</h3>
      <p>Website speed is a critical ranking factor for Google and directly impacts user retention rates. Traditional web hosts utilize outdated spinning hard drives (HDD) or standard Solid State Drives (SATA SSDs). Domain Web Hosting exclusively deploys cutting-edge Non-Volatile Memory Express (NVMe) SSD technology across all our servers. NVMe drives process data at speeds up to 6 times faster than standard SSDs. By utilizing NVMe architecture alongside robust server-side caching (like LiteSpeed or Redis) and global Content Delivery Networks (CDNs), we guarantee that your website will load in milliseconds, drastically reducing bounce rates and boosting your SEO rankings in Kenya.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Ironclad 99.9% Uptime Guarantee</h3>
      <p>When your website goes offline, your business stops operating. We understand the severe financial implications of server downtime. Domain Web Hosting operates state-of-the-art Tier III and Tier IV global data centers featuring redundant power grids, advanced environmental controls, and multiple carrier-grade network uplinks. We proudly offer an ironclad 99.9% Service Level Agreement (SLA) uptime guarantee. Our proactive server monitoring teams track resource utilization, network latency, and potential hardware faults 24/7/365, instantly mitigating issues before they can ever impact the availability of your mission-critical websites.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Comprehensive Web Security and Free SSL Certificates</h3>
      <p>Cyber threats are evolving daily, and unprotected websites are prime targets for malicious actors. Our web hosting services in Nairobi prioritize proactive, enterprise-level cybersecurity. Every hosting plan we offer comes pre-equipped with an advanced Web Application Firewall (WAF), real-time malware scanning, and intelligent DDoS (Distributed Denial of Service) mitigation systems that automatically filter out malicious traffic spikes. Furthermore, we provide free, auto-renewing Let's Encrypt SSL certificates for every domain hosted on our platform, ensuring that all data transmitted between your server and your users remains heavily encrypted and fully compliant with modern browser security standards.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Automated Daily Backups and Disaster Recovery</h3>
      <p>Data loss can occur due to accidental file deletion, corrupted software updates, or cyberattacks, potentially crippling your online operations. Domain Web Hosting eliminates this risk through comprehensive, automated data protection protocols. We perform rigorous daily, weekly, and monthly automated backups of your entire hosting environment—including your website files, databases, and professional email accounts. These backups are stored securely on remote, off-site infrastructure. In the unlikely event of a critical failure, our intuitive cPanel interface allows you to restore your entire website with a single click, ensuring seamless disaster recovery and total peace of mind.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Convenient Local Payment Options (M-Pesa Integration)</h3>
      <p>We believe that managing your digital infrastructure should be frictionless, especially when it comes to billing. Unlike international hosting providers that mandate complex credit card transactions subject to fluctuating foreign exchange rates, Domain Web Hosting offers fully localized billing solutions for the East African market. You can easily purchase, renew, or upgrade your web hosting plans using Safaricom M-Pesa. Our automated billing system processes mobile money transactions instantly, ensuring zero interruptions to your hosting services and providing unmatched convenience for Kenyan entrepreneurs and business owners.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">24/7 Expert Technical Support in Nairobi</h3>
      <p>Exceptional web hosting is defined by the quality of the technical support behind it. At Domain Web Hosting, we do not rely on outsourced call centers or automated bots. Our dedicated team of expert system administrators and web hosting specialists operates locally right here in Nairobi, Kenya. We provide round-the-clock, 24/7/365 technical support via live chat, support tickets, and direct phone lines. Whether you need assistance migrating a complex WordPress site, optimizing database queries, or configuring custom DNS records, our highly trained professionals are always available to deliver rapid, effective, and friendly solutions.</p>
    </div>
  </div>
</section>
    `,

    'hosting/business-web-hosting/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for Business Web Hosting in Kenya?</h2>
      <p>For modern corporations, high-traffic agencies, and established enterprises, standard shared hosting environments simply do not provide the necessary resources to scale. A slow, vulnerable, or frequently offline website directly tarnishes your corporate brand and results in significant financial losses. Domain Web Hosting is the leading provider of enterprise-grade business web hosting in Kenya, delivering premium, high-resource infrastructure engineered exclusively for mission-critical applications. We offer isolated server environments, aggressive performance optimization, and unparalleled security protocols tailored specifically for the rigorous demands of the East African corporate sector.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Dedicated Resources for Ultimate Performance</h3>
      <p>The primary flaw of traditional shared hosting is the "noisy neighbor" effect, where a single resource-heavy website can slow down the entire server. Our business web hosting plans utilize advanced containerization technology (such as CloudLinux) to isolate your hosting environment. This ensures that you are allocated highly dedicated server resources—including robust CPU cores, extensive physical RAM, and high I/O limits. This strict resource isolation guarantees that your corporate website, ERP software, or customer portal will maintain lightning-fast response times and absolute stability, even during periods of massive, sustained traffic spikes.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">High-Availability Architecture and 99.99% SLA</h3>
      <p>Enterprise websites cannot afford a single minute of unexpected downtime. Domain Web Hosting’s premium business hosting infrastructure is built on a highly redundant, fault-tolerant architecture deployed across multiple enterprise-grade data centers. We utilize clustered server arrays and automated failover protocols. If one hardware component experiences an anomaly, your website's traffic is instantly and seamlessly routed to an operational node. We back our business web hosting in Nairobi with a stringent 99.99% Service Level Agreement (SLA) uptime guarantee, ensuring maximum reliability for your B2B communications and online operations.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Advanced Enterprise Cybersecurity Protocols</h3>
      <p>Corporate espionage, data breaches, and ransomware attacks pose severe existential threats to modern businesses. Our business web hosting solutions incorporate the highest tier of proactive cybersecurity measures. We deploy AI-driven Web Application Firewalls (WAF) that actively monitor and block malicious SQL injections, Cross-Site Scripting (XSS), and zero-day vulnerabilities in real-time. We also provide comprehensive layer 3, 4, and 7 DDoS mitigation, premium Wildcard SSL certificates for absolute data encryption, and strict server hardening policies. Your proprietary corporate data and sensitive client information are perpetually locked down within an impenetrable digital fortress.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Seamless Corporate Email Integration</h3>
      <p>Professional communication relies heavily on secure, branded email hosting. Our business web hosting packages include robust, enterprise-grade email solutions that eliminate the need for expensive third-party platforms. You can create unlimited professional email addresses (e.g., director@yourcompany.co.ke) equipped with massive storage quotas, advanced anti-spam filtering (like SpamAssassin), and sophisticated anti-phishing algorithms. We ensure seamless synchronization across all desktop clients (Outlook, Apple Mail) and mobile devices via secure IMAP/POP3 protocols, keeping your corporate communications highly efficient and strictly confidential.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Automated High-Frequency Offsite Backups</h3>
      <p>Corporate data continuity is absolutely vital. Standard daily backups are often insufficient for dynamic business websites processing hundreds of daily transactions or database modifications. Our premium business web hosting in Kenya includes high-frequency, automated backup schedules tailored to your enterprise's recovery point objective (RPO). We create granular snapshots of your entire hosting environment multiple times a day and store them securely on physically separate, encrypted offsite storage servers. This ensures that you can effortlessly restore critical data to a specific hour, nullifying the catastrophic impacts of accidental data loss or targeted cyber incidents.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Priority VIP Technical Support</h3>
      <p>Enterprise clients require immediate, high-level technical interventions. When you subscribe to our business web hosting plans, your support tickets bypass the standard queue and are routed directly to our Tier-3 Senior Systems Administrators. We provide you with priority VIP technical support 24/7/365, ensuring rapid response times measured in minutes, not hours. Whether you require complex server configuration changes, custom PHP module installations, or emergency database restorations, our elite technical team based in Nairobi acts as a direct extension of your internal IT department, providing unparalleled service excellence.</p>
    </div>
  </div>
</section>
    `
};

const processBatch = () => {
    Object.keys(batch1).forEach(page => {
        const fullPath = path.join('c:\\Users\\Home\\Desktop\\Domain-Web-Hosting', page);
        
        if (fs.existsSync(fullPath)) {
            const html = fs.readFileSync(fullPath, 'utf8');
            const $ = cheerio.load(html);
            
            // Look for the generic seo-deep-dive section
            const targetSection = $('.seo-deep-dive');
            
            if (targetSection.length > 0) {
                targetSection.replaceWith(batch1[page]);
                fs.writeFileSync(fullPath, $.html());
                console.log("Successfully updated " + page + " (Replaced seo-deep-dive)");
            } else {
                console.log("Warning: .seo-deep-dive not found in " + page + ". Injecting before footer.");
                // fallback just in case
                $('main').append(batch1[page]);
                fs.writeFileSync(fullPath, $.html());
            }
        } else {
            console.error("File not found: " + fullPath);
        }
    });
};

processBatch();
