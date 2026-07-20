document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('global-billing-toggle');
    const toggleKnob = document.getElementById('toggle-knob');
    let isYearly = true; // Default state based on the HTML translate-x-6
    let currentCurrency = 'kes'; // default
    
    // Find all price elements
    const priceSpans = document.querySelectorAll('[data-monthly-price-kes]');
    const periodSpans = document.querySelectorAll('[data-monthly-period]');
    const currencySymbols = document.querySelectorAll('.text-\\[40px\\].font-bold, .price-currency');

    function updatePrices() {
        priceSpans.forEach(span => {
            const attrBase = isYearly && toggleBtn ? 'data-yearly-price' : 'data-monthly-price';
            if (span.hasAttribute(`${attrBase}-${currentCurrency}`)) {
                span.textContent = span.getAttribute(`${attrBase}-${currentCurrency}`);
            }
        });

        periodSpans.forEach(span => {
            if (isYearly && toggleBtn) {
                if (span.hasAttribute('data-yearly-period')) {
                    span.textContent = span.getAttribute('data-yearly-period');
                }
            } else {
                if (span.hasAttribute('data-monthly-period')) {
                    span.textContent = span.getAttribute('data-monthly-period');
                }
            }
        });

        // Update currency symbols
        currencySymbols.forEach(sym => {
            if (sym.textContent.trim() === 'KSh' || sym.textContent.trim() === '$') {
                sym.textContent = currentCurrency === 'kes' ? 'KSh ' : '$';
            }
        });
    }
    
    // Fetch user location
    fetch('https://get.geojs.io/v1/ip/country.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.country !== 'KE') {
                currentCurrency = 'usd';
            }
            updatePrices();
            
            // Handle simple price-val spans (like on homepage)
            const simplePriceSpans = document.querySelectorAll('.price-val');
            simplePriceSpans.forEach(span => {
                if (currentCurrency === 'kes' && span.hasAttribute('data-ksh')) {
                    span.textContent = span.getAttribute('data-ksh');
                } else if (currentCurrency === 'usd' && span.hasAttribute('data-usd')) {
                    span.textContent = span.getAttribute('data-usd');
                }
            });
        })
        .catch(err => {
            console.error('Geo IP error:', err);
            // Default to KES for simple spans if error
            const simplePriceSpans = document.querySelectorAll('.price-val');
            simplePriceSpans.forEach(span => {
                if (span.hasAttribute('data-ksh')) {
                    span.textContent = span.getAttribute('data-ksh');
                }
            });
        });
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            isYearly = !isYearly;
            
            // Update knob position
            if (isYearly) {
                toggleKnob.classList.add('translate-x-6');
            } else {
                toggleKnob.classList.remove('translate-x-6');
            }
            
            updatePrices();
        });
    }
});
