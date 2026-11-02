const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const root = path.resolve(process.argv[2] || '_site');
function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}
const files = new Set(filesIn(root).map(file => path.relative(root, file).split(path.sep).join('/')));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const home = JSDOM.fragment(read('index.html'));
const siteURL = home.querySelector('link[rel="canonical"]').href;
const siteOrigin = new URL(siteURL).origin;
const errors = new Set();
let pages = 0;
let structuredData = 0;

function checkLink(value, from) {
  const url = new URL(value, new URL(from, siteURL));
  if (url.origin !== siteOrigin) return;
  const target = decodeURIComponent(url.pathname).replace(/^\//, '');
  if (!files.has(target) && !files.has(`${target.replace(/\/$/, '')}${target ? '/' : ''}index.html`)) {
    errors.add(`${from}: missing local target ${url.pathname}`);
  }
}

for (const file of files) {
  if (!file.endsWith('.html')) continue;
  pages++;
  const document = JSDOM.fragment(read(file));
  const ids = new Set();
  for (const element of document.querySelectorAll('[id]')) {
    if (ids.has(element.id)) errors.add(`${file}: duplicate id ${element.id}`);
    ids.add(element.id);
  }
  for (const element of document.querySelectorAll('[href], [src]')) {
    for (const attribute of ['href', 'src']) {
      const value = element.getAttribute(attribute);
      if (value) checkLink(value, file);
    }
  }
  const metadata = new Set();
  for (const meta of document.querySelectorAll('meta[property], meta[name]')) {
    const key = meta.getAttribute('property') || meta.getAttribute('name');
    if (!/^(og:|twitter:)/.test(key)) continue;
    if (metadata.has(key)) errors.add(`${file}: duplicate metadata ${key}`);
    metadata.add(key);
  }
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    const data = JSON.parse(script.textContent);
    structuredData++;
    if (data['@type'] === 'BlogPosting' && data.publisher.logo) {
      assert.notEqual(new URL(data.publisher.logo.url).pathname, '/', `${file}: logo points to site root`);
      checkLink(data.publisher.logo.url, file);
    }
  }
}

for (const file of ['sitemap.xml', 'feed.xml']) {
  const dom = new JSDOM(read(file), { contentType: 'text/xml' });
  if (file === 'sitemap.xml') {
    const locations = new Set();
    for (const element of dom.window.document.querySelectorAll('loc')) {
      const url = element.textContent;
      assert.ok(/(?:\/|\.html)$/.test(new URL(url).pathname), `Non-page sitemap URL: ${url}`);
      assert.ok(!locations.has(url), `Duplicate sitemap URL: ${url}`);
      locations.add(url);
      checkLink(url, file);
    }
  }
  dom.window.close();
}

for (const file of ['plan.md', 'checklist.md', 'context-notes.md', 'Gemfile.lock', 'banner.js']) {
  assert.ok(!files.has(file), `Development file published: ${file}`);
}
assert.ok(![...files].some(file => /^(tests|scripts)\//.test(file)), 'Verification scripts published');

async function checkAbout() {
  const dom = new JSDOM(read('about/index.html'), { runScripts: 'outside-only', url: siteURL });
  try {
    const { document } = dom.window;
    assert.ok(document.querySelector('script[src$="/assets/js/main.min.js"]'), 'About omits shared scripts');
    assert.ok(document.getElementById('footer'), 'About footer link has no target');
    dom.window.eval(read('assets/js/main.min.js'));
    await new Promise(resolve => dom.window.$(resolve));
    document.querySelector('.search__toggle').click();
    assert.ok(document.querySelector('.initial-content-about').classList.contains('is--hidden'), 'About content remains visible during search');
    assert.ok(document.querySelector('.search-content').classList.contains('is--visible'), 'About search does not open');
    for (const file of ['lunr.min.js', 'lunr-store.js', 'lunr-en.js']) {
      dom.window.eval(read(`assets/js/lunr/${file}`));
    }
    await new Promise(resolve => dom.window.$(resolve));
    dom.window.$('#site-search').val('transformer').trigger('keyup');
    assert.ok(document.querySelector('#site-search-results a'), 'Generated search index returns no results');
    dom.window.$(document).trigger(dom.window.$.Event('keyup', { keyCode: 27 }));
    assert.ok(!document.querySelector('.initial-content-about').classList.contains('is--hidden'), 'Escape does not restore About');
    assert.ok(!document.querySelector('.search-content').classList.contains('is--visible'), 'Escape does not close search');
  } finally {
    dom.window.close();
  }
}

checkAbout().then(() => {
  assert.equal(errors.size, 0, [...errors].join('\n'));
  console.log(`Verified ${pages} HTML pages, ${structuredData} JSON-LD blocks, sitemap/feed, local links, IDs, social metadata, and About search with the generated index.`);
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
