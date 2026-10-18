"""Lightweight static-site validation using Python's standard library."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    ROOT / "index.html",
    ROOT / "services/index.html",
    ROOT / "about/index.html",
    ROOT / "contact/index.html",
    ROOT / "privacy/index.html",
    ROOT / "404.html",
]
TEXT_EXTENSIONS = {".html", ".css", ".js", ".md", ".json", ".xml", ".svg", ".txt", ".yml", ".py"}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = []
        self.main_count = 0
        self.h1_count = 0
        self.canonical_count = 0
        self.description_count = 0
        self.titles = 0
        self.schema_blocks = []
        self.in_schema = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if a.get("id"):
            self.ids.append(a["id"])
        if tag == "main":
            self.main_count += 1
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.titles += 1
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical_count += 1
        if tag == "meta" and a.get("name") == "description":
            self.description_count += 1
        if tag == "script" and a.get("type") == "application/ld+json":
            self.in_schema = True
            self.schema_blocks.append("")

    def handle_data(self, data):
        if self.in_schema:
            self.schema_blocks[-1] += data

    def handle_endtag(self, tag):
        if tag == "script":
            self.in_schema = False


def fail(message):
    raise SystemExit("Validation failed: " + message)


def page_for_url(url):
    path = urlsplit(url).path
    file = ROOT / path.lstrip("/")
    if path.endswith("/") or not file.suffix:
        file = file / "index.html"
    return file


for file in ROOT.rglob("*"):
    if file.is_file() and file.suffix.lower() in TEXT_EXTENSIONS:
        if chr(0x2014) in file.read_text(encoding="utf-8"):
            fail(f"prohibited Unicode punctuation found in {file.relative_to(ROOT)}")

parsers = {}
for page in PAGES:
    if not page.is_file():
        fail(f"missing page {page}")
    content = page.read_text(encoding="utf-8")
    if "https://bisflight.in" in content:
        fail(f"wrong domain in {page}")
    parser = PageParser()
    parser.feed(content)
    if (parser.titles, parser.main_count, parser.h1_count, parser.canonical_count, parser.description_count) != (1, 1, 1, 1, 1):
        fail(f"missing or repeated required HTML structure in {page}")
    for block in parser.schema_blocks:
        json.loads(block)
    parsers[page] = parser

for file, parser in parsers.items():
    for href in parser.links:
        if not href.startswith("/") or href.startswith("//"):
            continue
        destination = page_for_url(href)
        if not destination.is_file():
            fail(f"broken link in {file}: {href}")
        fragment = urlsplit(href).fragment
        if fragment and fragment not in parsers[destination].ids:
            fail(f"missing section in {file}: {href}")

if (ROOT / "CNAME").read_text().strip() != "bizflight.in":
    fail("CNAME must contain bizflight.in")
for asset in ("assets/css/style.css", "assets/js/main.js", "assets/js/site-config.js", "assets/images/og-bizflight.png", "favicon.svg", "robots.txt", "sitemap.xml"):
    if not (ROOT / asset).is_file():
        fail("missing asset " + asset)

print("Validation passed: six HTML pages, links, metadata, schema, assets, domain and punctuation.")
