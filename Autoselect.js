   <script>
/**
 * Universal Category-to-Variant Linker
 * Forces product links to match the current collection category
 */
(function() {
  function applyCategoryVariantLinks() {
    const url = window.location.href.toLowerCase();
    let target = "";
    
    if (url.includes('king')) target = "king";
    else if (url.includes('queen')) target = "queen";
    else if (url.includes('twin')) target = "twin";

    if (!target) return; // Exit if not in a specific category

    // Select every product card on the page
    const products = document.querySelectorAll('.item-product, [class*="product-grid-item"]');

    products.forEach(product => {
      // Find the links (Title and Image)
      const links = product.querySelectorAll('a[href*="/products/"]');
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('variant=')) return; // Skip if already has a variant ID

        // We search for a variant ID that matches our category
        // Many themes hide variant data in a <select> or JSON script inside the card
        const variantSelectors = product.querySelectorAll('select[name="id"] option, script[type="application/json"]');
        
        let foundId = "";

        variantSelectors.forEach(source => {
          if (source.tagName === 'OPTION') {
             if (source.textContent.toLowerCase().includes(target)) {
               foundId = source.value;
             }
          } else if (source.tagName === 'SCRIPT') {
             try {
               const data = JSON.parse(source.innerHTML);
               const match = data.find(v => v.title.toLowerCase().includes(target) || v.name.toLowerCase().includes(target));
               if (match) foundId = match.id;
             } catch(e) {}
          }
        });

        // Final fallback: If theme is very simple, we look for data attributes
        if (!foundId) {
            const dataAttr = product.querySelector('[data-variant-id]');
            if (dataAttr) foundId = dataAttr.getAttribute('data-variant-id');
        }

        if (foundId) {
          const separator = href.includes('?') ? '&' : '?';
          link.setAttribute('href', href + separator + 'variant=' + foundId);
        }
      });
    });
  }

  // Run on load
  window.addEventListener('load', applyCategoryVariantLinks);
  
  // Run when user uses filters (watches for changes in the product grid)
  const observer = new MutationObserver(applyCategoryVariantLinks);
  const grid = document.querySelector('.main-content, #CollectionSection, #root');
  if (grid) observer.observe(grid, { childList: true, subtree: true });
})();
</script>