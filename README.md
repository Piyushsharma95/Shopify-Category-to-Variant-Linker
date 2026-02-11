Shopify Category-to-Variant Linker
🎯 Overview

The Shopify Category-to-Variant Linker enhances the shopping experience for stores offering multi-variant products (e.g., mattresses available in King, Queen, and Twin sizes).

When a customer browses a specific collection (for example, the Queen collection), this script dynamically updates all product links on that page to include the appropriate variant ID. As a result, when a product is selected, the customer lands on the product page with the correct variant pre-selected.

This ensures a seamless and intuitive browsing experience while reducing friction during the purchasing process.

✨ Key Features
✔ Automatic Variant Detection

Detects size keywords (e.g., king, queen, twin) directly from the collection URL.

✔ AJAX Compatibility

Utilizes a MutationObserver to remain functional even after dynamic content updates such as:

Price filters

Size filters

Brand filters

Infinite scrolling

✔ Universal Theme Compatibility

Searches for matching variant IDs using multiple data sources:

<select name="id"> dropdown options

Embedded JSON metadata

HTML data attributes

✔ Safe Fallback

If no matching variant is found, product links remain unchanged to prevent errors.

🚀 Installation Guide
1️⃣ Create a Snippet

In your Shopify theme:

Navigate to Online Store → Themes → Edit Code

Create a new snippet named:

category-variant-linker.liquid


Paste the script into this file.

2️⃣ Render the Snippet in Layout

Open:

layout/theme.liquid


Add the following code just before the closing </body> tag:

{% render 'category-variant-linker' %}


Save the file.

🛠 Technical Details
Detection Logic

The script determines the target variant by analyzing the current collection URL.

Collection URL Example	Target Variant
/collections/king-size	Variant containing “King”
/collections/queen	Variant containing “Queen”
/collections/twin-mattress	Variant containing “Twin”

The keyword must be present in the collection handle.

Variant Search Hierarchy

To identify the correct variant_id, the script scans each product card using the following priority order:

Select Dropdowns
Searches for <select name="id"> options containing the relevant keyword.

JSON Metadata
Parses <script type="application/json"> blocks commonly used by themes to store variant data.

Data Attributes
Checks for data-variant-id attributes within the product container.

Handling AJAX Filters & Dynamic Content

Standard Liquid-based solutions fail when product grids refresh dynamically via filters or infinite scrolling.

This script uses the Web Mutation API:

const observer = new MutationObserver(applyCategoryVariantLinks);
observer.observe(grid, { childList: true, subtree: true });


This ensures that:

Newly loaded products are immediately processed

Links are corrected in real time

Functionality remains stable across dynamic updates

⚠️ Requirements

To ensure proper functionality, the following conditions must be met:

1. Keyword Matching

The collection handle must include one of the following keywords:

king

queen

twin

2. Variant Title Matching

The variant title must contain the corresponding keyword:

“King”

“Queen”

“Twin”

3. Selector Accuracy

The script targets product cards using the class:

.item-product


If your theme uses a different class name for product containers, update the querySelectorAll selector accordingly.

📌 Recommended Use Cases

This solution is ideal for stores selling:

Furniture (Bed sizes)

Mattresses

Apparel (Size-based collections)

Any size-segmented product catalog
