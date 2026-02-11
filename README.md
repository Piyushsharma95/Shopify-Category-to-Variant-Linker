Shopify Category-to-Variant Linker
🎯 Overview
This script ensures a seamless user experience for Shopify stores selling multi-variant products (e.g., Mattresses in King, Queen, Twin sizes).

When a customer is browsing a specific category (e.g., the "Queen" collection), this script dynamically modifies all product links on that page to automatically include the correct variant ID. This ensures that when the user clicks a product, they land on the product page with the Queen variant already selected.

✨ Features
Automatic Detection: Detects keywords (king, queen, twin) directly from the collection URL.

AJAX Compatible: Uses a MutationObserver to remain active even after price filters, size filters, or infinite scrolling are used.

Universal Compatibility: Searches through multiple data sources including <select> options, JSON metadata, and data attributes.

Zero-Config Fallback: Defaults to standard links if no matching variant is found.

🚀 Installation
1. Create a Snippet
Create a new snippet in your Shopify theme named category-variant-linker.liquid and paste the code into it.

2. Initialize in Layout
Render the snippet in your layout/theme.liquid file before the closing </body> tag:

Code snippet
{% render 'category-variant-linker' %}
🛠️ Technical Details
The Detection Logic
The script identifies the "Target Size" by checking the current browser URL. | URL Keyword | Target Variant Name | | :--- | :--- | | .../collections/king-size | Finds variant containing "King" | | .../collections/queen | Finds variant containing "Queen" | | .../collections/twin-mattress | Finds variant containing "Twin" |

The Search Hierarchy
To find the correct variant_id, the script scans the HTML of each product card in this order:

Select Dropdowns: Looks for <select name="id"> options containing the keyword.

JSON Metadata: Parses <script type="application/json"> blocks (commonly used by themes for variant data).

Data Attributes: Checks for data-variant-id attributes on the product container.

Handling Price Filters
Standard Liquid code fails when AJAX filters (Price, Color, Brand) refresh the product grid. This script uses the Web Mutation API to watch the DOM:

JavaScript
const observer = new MutationObserver(applyCategoryVariantLinks);
observer.observe(grid, { childList: true, subtree: true });
This ensures that the moment new products are loaded via a filter, their links are instantly corrected.

⚠️ Requirements
Keyword Match: The Collection Handle must contain the words "king", "queen", or "twin".

Variant Match: The Variant Title must contain the words "king", "queen", or "twin".

Selector Accuracy: The script targets .item-product. If your theme uses a different class for product cards, update the querySelectorAll line.
