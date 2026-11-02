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
const linkedinURL = 'https://www.linkedin.com/in/cwlee1124/';
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
  if (document.querySelector('.nav__list')?.textContent.includes('Navigation Test')) {
    errors.add(`${file}: demo navigation is still published`);
  }
  if (document.querySelector('a[href*="instagram.com/leechanwoo_"]')) {
    errors.add(`${file}: retired Instagram profile is still published`);
  }
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
    if (data['@type'] === 'Person' && data.url === siteURL) {
      assert.ok(data.sameAs?.includes(linkedinURL), `${file}: LinkedIn is missing from social metadata`);
      assert.ok(!data.sameAs.some(url => url.includes('instagram.com/leechanwoo_')), `${file}: retired Instagram profile remains in social metadata`);
    }
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

function checkNavigation() {
  const page2 = JSDOM.fragment(read('page2/index.html'));
  for (const [document, number] of [[home, 1], [page2, 2]]) {
    assert.equal(document.querySelectorAll('.sidebar .nav__list').length, 0, 'Removed sidebar navigation is still published');
    assert.equal(document.querySelectorAll('h1').length, 1, 'Home must have one primary heading');
    assert.ok(document.querySelector('h1#page-title')?.textContent.trim(), 'Home skip-link target has no heading');
    for (const selector of ['.sidebar .author__urls', '.page__footer-follow']) {
      assert.ok(document.querySelector(`${selector} a[href="${linkedinURL}"]`), `LinkedIn is missing from ${selector}`);
    }
    const posts = document.querySelectorAll('.archive > .entries-list .archive__item');
    assert.equal(posts.length, 10, 'Home pagination lost posts');
    for (const post of posts) {
      const title = post.querySelector('.archive__item-title');
      const date = post.querySelector('time[datetime]');
      assert.ok(date && !Number.isNaN(Date.parse(date.dateTime)), 'Post has no valid publication date');
      assert.ok(date.compareDocumentPosition(title) & 4, 'Post metadata must precede its title');
    }
    assert.equal(document.querySelector('.pagination [aria-current="page"]')?.textContent, String(number));
    for (const control of document.querySelectorAll('.pagination [aria-disabled="true"]')) {
      assert.ok(!control.hasAttribute('href'), 'Unavailable pagination control remains a link');
      assert.ok(control.textContent.trim(), 'Unavailable pagination control has no accessible name');
    }
  }
  assert.equal(new URL(home.querySelector('.pagination li:last-child a[href]').getAttribute('href'), siteURL).pathname, '/page2/');
  assert.equal(new URL(page2.querySelector('.pagination li:first-child a[href]').getAttribute('href'), siteURL).href, siteURL);

  const firstPostURL = new URL(home.querySelector('.archive__item-title a[rel="permalink"]').getAttribute('href'), siteURL);
  const firstPost = JSDOM.fragment(read(`${decodeURIComponent(firstPostURL.pathname).replace(/^\//, '')}index.html`));
  const toc = firstPost.querySelector('details.post-toc');
  assert.ok(toc?.querySelector('summary')?.textContent.trim(), 'Article contents have no disclosure control');
  assert.ok(!toc.hasAttribute('open'), 'Article contents should initially be collapsed');
  for (const link of toc.querySelectorAll('a[href^="#"]')) {
    assert.ok(firstPost.getElementById(decodeURIComponent(link.getAttribute('href').slice(1))), `Article contents point to a missing section: ${link.getAttribute('href')}`);
  }
}

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

checkNavigation();
checkAbout().then(() => {
  assert.equal(errors.size, 0, [...errors].join('\n'));
  console.log(`Verified ${pages} HTML pages, ${structuredData} JSON-LD blocks, sitemap/feed, local links, IDs, social metadata, home layout/pagination, article contents, LinkedIn profiles, and About search with the generated index.`);
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
