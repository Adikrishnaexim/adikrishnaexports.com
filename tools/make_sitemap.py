"""Creates sitemap.xml for the site.
Usage (from the website folder):   python tools/make_sitemap.py https://www.your-domain.com
For a GitHub project site use:      python tools/make_sitemap.py https://USERNAME.github.io/REPO-NAME
"""
import sys, glob, datetime, os
if len(sys.argv) < 2:
    sys.exit("Give your site address, e.g.  python tools/make_sitemap.py https://www.example.com")
base = sys.argv[1].rstrip("/")
today = datetime.date.today().isoformat()
skip = {"404.html"}
pages = ["index.html"] + sorted(glob.glob("pages/*.html"))
rows = []
for p in pages:
    loc = base + "/" if p == "index.html" else base + "/" + p
    rows.append(f"  <url><loc>{loc}</loc><lastmod>{today}</lastmod></url>")
xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(rows) + "\n</urlset>\n"
open("sitemap.xml", "w", encoding="utf-8").write(xml)
with open("robots.txt", "a") as f:
    if "Sitemap:" not in open("robots.txt").read():
        f.write("Sitemap: " + base + "/sitemap.xml\n")
print("sitemap.xml written with", len(pages), "pages")
