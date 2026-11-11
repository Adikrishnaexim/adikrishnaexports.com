# Image guide

All photos live under one `images/` folder (logo and section pictures in `images/site/`).
Product photos and group banners go in two folders. The website finds each one **by file name**, so no code needs to change when you add a photo.

| Folder | Used for | File name | Size | Format |
|---|---|---|---|---|
| `images/products/` | Product cards | exactly the product slug, e.g. `cumin-seeds.jpg` | 800 x 640 px (5:4) | JPG |
| `images/groups/` | Banner at the top of each product group page | exactly the group slug, e.g. `grains-and-cereal.jpg` | 1600 x 500 px | JPG |

* If a photo is missing, the card shows its emoji icon, so nothing looks broken.
* Keep each photo under about 300 KB. Use JPG, not PNG or WEBP.
* The slug is the page file name without `.html`. Example: `pages/cumin-seeds.html` uses `images/products/cumin-seeds.jpg`.
* The complete list with exact file names is in **`tools/image-checklist.csv`** (open in Excel; the last column shows YES or MISSING).

## Easiest way to add or replace photos

1. Open `tools/update-images.html` in a browser (double-click it).
2. Choose the photo for each product, it is resized automatically.
3. Download the ZIP and unzip it into the website folder, then upload to GitHub.

## Status

116 images are in place and 43 are still needed:

- **Banner** (8): Ayurvedic Products, Dehydrated Products, Herbs, Home Care, Incense & Dhoop, Personal Care, Processed Foods, Vegetables
- **Ayurvedic Products** (5): Chyawanprash, Herbal Oils, Herbal Teas, Shatavari, Triphala Powder
- **Dehydrated Products** (1): Dehydrated Vegetables
- **Floriculture** (6): Dried Rose Petals, Fresh Cut Roses, Gladiolus, Jasmine, Marigold, Tuberose
- **Fruits** (1): Guava
- **Grains and Cereal** (1): Buckwheat
- **Herbs** (1): Dried Oregano & Thyme
- **Home Care** (5): Dishwash, Floor Cleaners, Laundry Detergent, Room Fresheners, Toilet & Surface Cleaners
- **Incense & Dhoop** (6): Camphor, Dhoop Cones, Dhoop Sticks, Havan Samagri, Masala Agarbatti, Sambrani (Benzoin)
- **Personal Care** (7): Essential Oils, Hair & Body Oils, Henna, Herbal Face Packs, Herbal Soaps, Herbal Toothpaste, Shampoo & Conditioner
- **Processed Foods** (1): Tea
- **Vegetables** (1): Green Peas
