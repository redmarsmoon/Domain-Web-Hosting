const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const batch5 = {
    'medical-healthcare-web-solutions/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for Medical & Healthcare Web Solutions in Kenya?</h2>
      <p>The healthcare industry relies heavily on trust, strict data confidentiality, and immediate accessibility. When a patient in Kenya searches for a doctor, clinic, or specialized medical facility online, they expect a seamless, secure, and highly professional digital experience. Domain Web Hosting provides elite, custom web solutions specifically engineered for the medical and healthcare sector. We partner with private hospitals, specialized clinics, pharmaceutical companies, and independent practitioners in Nairobi and East Africa to build robust digital platforms that streamline patient care, secure sensitive health data, and elevate your medical practice’s online authority.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Secure Telemedicine and Patient Consultation Portals</h3>
      <p>The demand for remote healthcare consultations has skyrocketed. We develop secure telemedicine portals directly within your medical website. Patients can effortlessly schedule virtual appointments, securely upload prior medical records or diagnostic imaging, and consult with your specialists via encrypted video conferencing tools. This integration not only dramatically expands your clinic's geographical reach beyond your physical location but also provides immense convenience for elderly patients or those in remote areas of Kenya requiring expert medical advice.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Automated Appointment Booking and Reminders</h3>
      <p>Missed appointments and inefficient scheduling create significant financial losses for medical practices. Our healthcare web solutions feature intelligent appointment booking systems. Patients can view real-time doctor availability, select a time slot, and securely pay consultation fees upfront via Safaricom M-Pesa or credit card. The system automatically synchronizes with your clinic’s internal management software, sending automated SMS and email reminders to the patient prior to their visit. This completely eliminates double-booking errors and drastically reduces no-show rates.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Strict Data Security and HIPAA/DPA Compliance</h3>
      <p>Medical data is the most sensitive information a business can handle. A data breach can lead to devastating legal consequences and a total loss of patient trust. We architect healthcare websites with uncompromising, military-grade security. We utilize 256-bit SSL/TLS encryption for all data transmitted through patient portals. Our infrastructure complies strictly with international HIPAA standards and the Kenyan Data Protection Act (DPA). We deploy robust web application firewalls and enforce strict role-based access control (RBAC), ensuring patient records remain absolutely confidential.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Integration with Electronic Health Records (EHR/EMR)</h3>
      <p>To provide seamless care, your patient-facing website must communicate effectively with your internal clinical systems. We build custom API integrations to connect your new website securely with your existing Electronic Medical Records (EMR) or Hospital Management Information System (HMIS). This allows patients to securely log in to a dedicated portal to view their lab results, download digital prescriptions, and review doctor’s notes without requiring tedious phone calls to your administrative staff, vastly improving the overall patient experience.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Targeted Healthcare SEO and Content Strategy</h3>
      <p>Patients increasingly turn to Google for medical information before consulting a doctor. Ranking for specific queries like "Best Pediatrician in Nairobi" or "Cardiology Clinic Kenya" is critical for acquiring new patients. We implement highly aggressive Healthcare SEO strategies. We structure your website with Medical Schema markup, optimize your Google Business Profile for local SEO domination, and create authoritative, medically accurate landing pages for your specific specialties. This ensures your practice is highly visible to patients actively seeking your specific medical expertise.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">High-Performance Hosting and 24/7 Support</h3>
      <p>Medical emergencies do not adhere to business hours, and neither should your website. Your digital platform must remain online and lightning-fast at all times. We host your healthcare website on our premium, isolated NVMe SSD server infrastructure, providing an ironclad 99.9% uptime Service Level Agreement (SLA). Furthermore, our dedicated, Nairobi-based technical support team is available 24/7/365 to provide immediate assistance, ensuring your digital infrastructure never impedes your ability to deliver life-saving patient care.</p>
    </div>
  </div>
</section>
    `,

    'ngo-non-profit-web-solutions/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for NGO & Non-Profit Web Solutions in Kenya?</h2>
      <p>For Non-Governmental Organizations (NGOs), charities, and non-profit entities operating in Kenya and across East Africa, a powerful digital presence is not about generating profit; it is about driving impact, transparency, and global awareness. Your website is the primary tool for securing international donor funding, recruiting dedicated volunteers, and demonstrating the tangible results of your fieldwork. Domain Web Hosting provides highly specialized web solutions for NGOs, architecting secure, visually compelling, and deeply optimized platforms that amplify your mission and aggressively facilitate global fundraising efforts.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Secure, Multi-Currency Global Donation Portals</h3>
      <p>The lifeblood of any NGO is its donor base. Complicated or unsecure donation processes lead directly to abandoned contributions. We develop highly secure, frictionless online donation portals integrated directly into your website. To capture local grassroots support in Kenya, we integrate the Safaricom M-Pesa Daraja API for instant mobile donations. To secure international funding, we integrate global payment processors like Stripe and PayPal, allowing donors worldwide to contribute securely in USD, EUR, or GBP via credit card. We also configure automated recurring donation capabilities to help you build sustainable funding streams.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Impact Storytelling and Visual Transparency</h3>
      <p>Donors need to see the direct impact of their contributions. A spreadsheet of statistics rarely inspires action. Our UI/UX designers utilize high-impact visual storytelling. We integrate dynamic video backgrounds, high-resolution photo galleries from your fieldwork, and interactive maps detailing your project locations across Africa. We create dedicated transparency portals where you can securely publish audited financial reports and annual impact summaries, building immense trust with major institutional donors and international grant-making organizations.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Volunteer Recruitment and Event Management</h3>
      <p>Executing large-scale community outreach requires massive logistical coordination and dedicated volunteers. Our web solutions include comprehensive volunteer management systems. Potential volunteers can easily submit detailed application forms online, securely upload their CVs and identification documents, and register for upcoming training seminars. We also implement dynamic event calendars allowing supporters to RSVP for fundraising galas, community clean-ups, or medical camps, drastically reducing the administrative burden on your core NGO staff.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Multilingual Support for International Outreach</h3>
      <p>If your NGO operates across various regions in Africa or seeks funding from European or Asian donors, your message cannot be limited to a single language. We build robust multilingual website architectures. With the click of a button, visitors can seamlessly switch the entire website interface—including donation portals and impact reports—into French, Swahili, Arabic, or any other required language. This localization strategy drastically expands your global reach and ensures your mission resonates deeply with diverse international audiences.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Aggressive SEO for NGOs and Google Ad Grants</h3>
      <p>Visibility is crucial for attracting new supporters. We implement aggressive Search Engine Optimization (SEO) strategies tailored specifically for the non-profit sector. By optimizing your website architecture and content, we ensure your NGO ranks highly when individuals search for specific charitable causes (e.g., "Wildlife Conservation Kenya" or "Clean Water NGO Nairobi"). Furthermore, a highly optimized, fast-loading website is a strict requirement for qualifying for the Google Ad Grants program, which provides eligible non-profits with free monthly search advertising credits.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Discounted, High-Reliability Hosting for Charities</h3>
      <p>We believe in supporting organizations that make a positive impact. Domain Web Hosting offers specialized, highly discounted premium web hosting packages exclusively for registered charities and NGOs. Despite the reduced cost, we never compromise on quality. Your NGO platform is hosted on our blazing-fast NVMe SSD servers, protected by military-grade SSL encryption and rigorous web application firewalls, and supported by our Nairobi-based technical team 24/7—ensuring your digital operations are always secure, fast, and available to the world.</p>
    </div>
  </div>
</section>
    `,

    'real-estate-property-web-solutions/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for Real Estate Web Solutions in Kenya?</h2>
      <p>The Kenyan real estate market is booming, but it is also incredibly competitive. Whether you are a large-scale property developer, an established real estate agency, or an independent broker in Nairobi, your website must be the ultimate digital showroom for your portfolio. Relying solely on third-party property aggregators dilutes your brand and costs you high-value leads. Domain Web Hosting specializes in developing premium, high-conversion real estate web solutions. We engineer sophisticated property portals that showcase your listings flawlessly, capture high-intent buyer leads, and establish your firm as an authoritative leader in the East African property market.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Advanced Property Search and Dynamic Filtering</h3>
      <p>A potential buyer or renter must be able to find their ideal property within seconds, or they will leave your site. We build highly sophisticated, dynamic property search engines directly into your website. Users can execute granular searches, filtering your portfolio by specific neighborhoods (e.g., Kilimani, Westlands, Karen), property type, exact price ranges, number of bedrooms, and specialized amenities. This frictionless, intuitive search experience keeps users engaged longer and drastically increases the likelihood of them submitting a high-quality lead inquiry.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Immersive Visuals, Virtual Tours, and Interactive Maps</h3>
      <p>Real estate is a highly visual industry; properties sell based on emotional connection. Our web solutions prioritize stunning visual presentation. We integrate high-resolution, lazy-loaded image galleries, seamless drone video backgrounds, and interactive 3D virtual tours (such as Matterport integrations). Furthermore, we embed interactive Google Maps with specific proximity indicators—showing the exact distance from the property to local schools, hospitals, shopping malls, and major highways—providing prospective buyers with critical lifestyle context.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Integration with CRM and Property Management Systems</h3>
      <p>Managing hundreds of property inquiries via scattered emails is inefficient and leads to lost sales. We integrate your real estate website seamlessly with leading Customer Relationship Management (CRM) software (like HubSpot, Salesforce, or Propertybase). When a buyer fills out an inquiry form for a specific villa, the lead—along with the property details—is instantly routed to the correct agent’s CRM dashboard. We also build API integrations with your internal Property Management Systems, allowing you to update property statuses (Available, Let, Sold) dynamically across all platforms.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Mobile-First Optimization for On-the-Go Buyers</h3>
      <p>The majority of property searches in Kenya begin on a smartphone. Your website must provide a flawless mobile experience. We utilize strict mobile-first design principles, ensuring that massive image galleries load instantly, search filters are easily tappable, and contact forms are friction-free on mobile devices. A potential buyer sitting in traffic in Nairobi can comfortably browse your luxury listings, take a virtual tour, and instantly contact an agent via integrated WhatsApp buttons directly from their mobile phone.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Aggressive Local SEO for Real Estate</h3>
      <p>To outrank aggressive competitors and third-party aggregators, your website requires elite technical Search Engine Optimization. We implement highly specific Real Estate Schema markup, ensuring Google deeply understands the structure of your property data (displaying prices and square footage directly in search results). We optimize URL structures, meta tags, and load speeds, while developing a hyper-localized content strategy targeting high-value keywords like "Luxury Apartments for Sale in Kilimani" or "Commercial Office Space Nairobi," driving massive organic traffic to your exclusive listings.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">High-Performance Hosting and Secure Data</h3>
      <p>Hosting high-resolution images and massive video tours requires significant server resources. We host your real estate platform on our premium NVMe SSD infrastructure, utilizing advanced caching and global Content Delivery Networks (CDNs) to ensure your property pages load in milliseconds. We also prioritize cybersecurity, deploying military-grade SSL encryption and rigorous web application firewalls to protect your proprietary client databases and sensitive corporate data, backed by our 24/7 technical support team in Nairobi.</p>
    </div>
  </div>
</section>
    `,

    'restaurant-dining-web-solutions/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for Restaurant Web Solutions in Kenya?</h2>
      <p>The culinary scene in Kenya is vibrant and fiercely competitive. While food quality and ambiance are paramount, the initial decision of where to dine is almost always made online. If your restaurant, cafe, or fine-dining establishment relies entirely on third-party delivery apps like UberEats or Glovo, you are sacrificing up to 30% of your revenue in commission fees and losing total control of your customer data. Domain Web Hosting builds high-performance, commission-free restaurant web solutions. We craft mouth-watering digital experiences that drive direct reservations, facilitate proprietary online ordering, and firmly establish your brand's unique culinary identity in Nairobi and beyond.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Zero-Commission Online Ordering Systems</h3>
      <p>Third-party delivery platforms severely erode your profit margins. We build robust, proprietary online ordering systems directly into your restaurant's website. Your customers can easily browse an interactive digital menu, customize their orders (e.g., adding extra toppings or dietary preferences), and checkout securely without you paying exorbitant commission fees to aggregators. This system allows you to retain 100% of your profits, build a direct relationship with your customers, and implement your own highly effective loyalty and rewards programs.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Seamless M-Pesa and Card Payment Integrations</h3>
      <p>Frictionless checkout is essential for driving online food orders. Our expert developers integrate secure, multi-currency payment gateways perfectly suited for the Kenyan market. We seamlessly integrate the Safaricom M-Pesa API, allowing customers to pay for their delivery or pickup orders instantly via a seamless STK push to their mobile phones. For corporate clients or international tourists booking large catering events or fine-dining reservations, we also integrate secure Visa and Mastercard processing, protected by military-grade SSL encryption.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Automated Table Reservation Management</h3>
      <p>Managing reservations via phone calls and a paper ledger during a busy Friday night service is highly inefficient and prone to double-booking errors. We integrate sophisticated online table reservation systems into your website. Guests can view real-time table availability, specify party sizes, and lock in their reservations instantly. The system automatically syncs with your front-of-house tablet or Point of Sale (POS) system, sending automated email and SMS confirmations to the guest, drastically reducing no-shows and streamlining your host stand operations.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Mouth-Watering Visual Design and Mobile Optimization</h3>
      <p>People eat with their eyes first. Your website must visually reflect the quality of your cuisine. Our UI/UX designers utilize high-resolution, professional food photography, elegant typography, and seamless video backgrounds to create an immersive, appetizing digital experience. Crucially, we build restaurant websites using a strict mobile-first methodology. Whether a customer is walking down the street in Westlands or sitting in traffic, they can easily view your mobile-optimized menu, make a reservation, or order delivery directly from their smartphone without zooming or squinting.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Aggressive Local SEO for Restaurants</h3>
      <p>When a hungry customer searches for "Best Italian Restaurant Near Me" or "Nyama Choma Delivery Nairobi," your business must appear at the top of Google. We implement aggressive Local SEO strategies specifically for the hospitality sector. We utilize Restaurant Schema markup (allowing Google to index your menu items and prices), optimize your Google Business Profile for map domination, and ensure your website passes strict Core Web Vitals performance metrics. This guarantees maximum visibility to high-intent local diners actively looking for your cuisine.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Integration with Restaurant POS Systems</h3>
      <p>To ensure a smooth kitchen workflow, your online orders must communicate directly with your physical operations. Domain Web Hosting can build custom API integrations to connect your new website’s ordering platform directly with your internal Point of Sale (POS) and Kitchen Display Systems (KDS). An online order placed by a customer at home is instantly routed to the kitchen prep screen, eliminating manual order entry by your front-of-house staff, reducing errors, and dramatically speeding up order fulfillment times.</p>
    </div>
  </div>
</section>
    `,

    'small-business-website-solutions/index.html': `
<section class="seo-deep-dive py-16 bg-surface-container-lowest border-t border-outline-variant/30">
  <div class="max-w-container-max mx-auto px-gutter">
    <div class="prose prose-lg text-on-surface-variant max-w-none font-body-md">
      <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">Why Choose Domain Web Hosting for Small Business Web Solutions in Kenya?</h2>
      <p>For small and medium-sized enterprises (SMEs) in Kenya, transitioning into the digital space is the most critical step toward long-term survival and growth. Relying solely on social media pages or word-of-mouth severely limits your reach and professionalism. You need a dedicated digital storefront that you fully own and control. Domain Web Hosting provides highly affordable, conversion-optimized small business web solutions tailored specifically for local entrepreneurs, service providers, and retail startups in Nairobi and across East Africa. We build professional, fast, and secure websites that actively generate qualified leads and level the playing field against larger corporate competitors.</p>
      
      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Affordable, Professional Web Design Packages</h3>
      <p>We understand that small businesses operate with strict marketing budgets. Unlike expensive corporate agencies that charge exorbitant development fees, Domain Web Hosting offers highly cost-effective web design packages specifically structured for SMEs. Despite the affordability, we never compromise on quality. Our expert developers build sleek, modern, and highly professional websites that instantly instill trust in your potential clients. We ensure your local business looks just as authoritative and established as the largest corporations in your industry.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Conversion-Focused Lead Generation</h3>
      <p>A website for a small business is useless if it does not generate actual revenue. We architect your site with a relentless focus on Conversion Rate Optimization (CRO). From strategically placed call-to-action (CTA) buttons and highly visible contact numbers to frictionless lead capture forms and integrated WhatsApp chat widgets, every element is designed to turn a casual browser into a paying customer. We transform your website from a static digital brochure into an active, 24/7 sales representative for your business.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Mobile-First Optimization for the Kenyan Market</h3>
      <p>The vast majority of your local customers will access your website via an Android or iOS smartphone. If your site is not optimized for mobile devices, they will instantly bounce to a competitor. We build small business websites utilizing strict mobile-first design principles. We ensure that your layout, images, and text scale perfectly on any screen size. This guarantees a seamless, rapid browsing experience, whether your customer is browsing your services from an office computer or while commuting on a matatu.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Aggressive Local SEO (Google My Business Integration)</h3>
      <p>For a local SME, ranking highly in local search results is the key to dominating your specific geographical market. We implement powerful Local SEO strategies built directly into your website's architecture. We utilize localized keyword targeting (e.g., "Plumber in Westlands" or "Boutique in Kilimani"), create highly structured schema markup, and tightly integrate your website with your Google Business Profile. This ensures that when a nearby customer searches for your specific services on Google Maps or standard search, your business appears at the very top.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Integrated Payments and Easy Content Management</h3>
      <p>Managing your website should be straightforward, not a technical nightmare. We build small business websites on user-friendly Content Management Systems (CMS) like WordPress. We provide you with a simple, secure dashboard where you can easily update text, add new photos, or post blog updates without needing any coding knowledge. Furthermore, if you sell products or require booking deposits, we can seamlessly integrate the Safaricom M-Pesa API, allowing your customers to pay you instantly and securely via their mobile phones.</p>

      <h3 class="font-headline-md text-headline-md text-on-surface mt-8 mb-4">Blazing-Fast Hosting and 24/7 Local Support</h3>
      <p>A slow website severely damages your brand and destroys your Google rankings. We host your newly developed small business website on our premium, enterprise-grade NVMe SSD servers. We utilize advanced caching technology to ensure your pages load in milliseconds. Furthermore, as a local business ourselves, we provide dedicated, 24/7 technical support based right here in Nairobi. If you ever experience an issue or need assistance updating your site, our expert team is always a quick phone call or live chat away.</p>
    </div>
  </div>
</section>
    `
};

const processBatch = () => {
    Object.keys(batch5).forEach(page => {
        const fullPath = path.join('c:\\\\Users\\\\Home\\\\Desktop\\\\Domain-Web-Hosting', page);
        
        if (fs.existsSync(fullPath)) {
            const html = fs.readFileSync(fullPath, 'utf8');
            const $ = cheerio.load(html);
            
            const targetSection = $('.seo-deep-dive');
            
            if (targetSection.length > 0) {
                targetSection.replaceWith(batch5[page]);
                fs.writeFileSync(fullPath, $.html());
                console.log("Successfully updated " + page);
            } else {
                console.log("Warning: .seo-deep-dive not found in " + page + ". Injecting before footer.");
                $('main').append(batch5[page]);
                fs.writeFileSync(fullPath, $.html());
            }
        } else {
            console.error("File not found: " + fullPath);
        }
    });
};

processBatch();
