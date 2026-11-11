# Adi Krishna Foods & Exports - Website

Static website (plain HTML, CSS and JavaScript). No build step, no server needed. Works on GitHub Pages.

## Folder layout

```
index.html            Home page (the only page at the top level)
404.html              Shown for broken links
pages/                Every other page: product pages, product groups, about, contact ...
css/                  style.css, fit.css, fonts.css
js/                   main.js (menu, quote form, settings), translate.js (language button)
images/
  site/               logo, home page and section pictures
  hero/               home page slider
  certs/              certificate logos
  groups/             group banner photos   (<group-name>.jpg)
  products/           product photos        (<product-name>.jpg)
certificates/         certificate files (PDF / JPG)
tools/                helper tools for the owner (not part of the public site)
favicon.ico, apple-touch-icon.png, robots.txt, .nojekyll
```

## Put it online with GitHub Pages

1. Create a repository on github.com (for example `adikrishna-website`).
2. Unzip the package, open the repository, click **Add file > Upload files** and drag in **everything inside the folder** (so `index.html` sits at the top level, not inside another folder). Commit.
   Tip: the `.nojekyll` file is hidden on some computers. Drag it in too, or create an empty file with that name on GitHub.
3. Go to **Settings > Pages**, set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**, then Save.
4. After about a minute the site is live at `https://USERNAME.github.io/REPO-NAME/`.
5. Own domain: in the same Pages screen type the domain under **Custom domain** and follow GitHub's DNS instructions.

## Before launch: settings to fill in

Open `js/main.js` and edit the block at the top:

| Setting | What it does | Current value |
|---|---|---|
| `videoUrl` | Company story video on the home page | placeholder - paste the YouTube embed link |
| `formEndpoint` | Where quote and contact forms are sent (for example a free Formspree link). | empty - forms open the visitor's email app instead |
| `email` | Fallback address for enquiries | info@adikrishnafoods.com |

Also add the real certificate files to `certificates/` and list them in `certificates.html` (the CERTS list near the bottom).

## Search engines

After you know the final web address run:

```
python tools/make_sitemap.py https://www.your-domain.com
```

This writes `sitemap.xml` and adds it to `robots.txt`. Upload both files again. Then add the site in Google Search Console.

## Images

See **IMAGES.md** for the full guide, sizes and the list of photos still needed.

## Translate button

The language button in the top-right corner uses Google Website Translator. It needs an internet connection and loads Google's script. The language list is at the top of `js/translate.js`.

## Updating pages

Each page is a normal HTML file inside `pages/`. To change text open it in any editor, edit, and upload the file again. Product search and the "All Products" page read the list inside `pages/all-products.html`.
