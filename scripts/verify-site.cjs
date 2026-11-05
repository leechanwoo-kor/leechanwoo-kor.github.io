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
let adSlots = 0;

function checkLink(value, from) {
  const url = new URL(value, new URL(from, siteURL));
  if (url.origin !== siteOrigin) return;
  const target = decodeURIComponent(url.pathname).replace(/^\//, '');
  if (!files.has(target) && !files.has(`${target.replace(/\/$/, '')}${target ? '/' : ''}index.html`)) {
    errors.add(`${from}: missing local target ${url.pathname}`);
  }
}

function checkAds(document, file) {
  const isHome = Boolean(document.querySelector('h1#page-title.archive__subtitle'));
  const isPost = Boolean(document.querySelector('#main.blog-reading-layout'));
  const posts = document.querySelectorAll('.archive > .entries-list > .list__item');
  const units = document.querySelectorAll('.blog-ad');
  const expected = isPost || (isHome && posts.length > 4) ? 1 : 0;
  assert.equal(units.length, expected, `${file}: unexpected manual ad placement count`);
  assert.equal(document.querySelectorAll('script[src$="/assets/js/ad-units.js"]').length, isHome || isPost ? 1 : 0, `${file}: unexpected manual ad initializer count`);
  for (const unit of units) {
    adSlots++;
    const ad = unit.querySelector('ins.adsbygoogle');
    assert.ok(ad, `${file}: missing AdSense unit`);
    assert.equal(ad.dataset.adClient, 'ca-pub-6158389106191012', `${file}: wrong AdSense publisher`);
    assert.equal(ad.dataset.adSlot, isHome ? '2024194306' : '7693830091', `${file}: wrong AdSense placement ID`);
    assert.equal(ad.style.display, 'block', `${file}: ad unit is initially hidden`);
    assert.equal(ad.style.width, '100%', `${file}: ad unit has no responsive width`);
    assert.equal(ad.style.height, '250px', `${file}: ad unit has no reserved height`);
    assert.ok(!ad.hasAttribute('data-ad-format') && !ad.hasAttribute('data-full-width-responsive'), `${file}: automatic sizing overrides fixed-height ad sizing`);
    assert.equal(unit.getAttribute('aria-label'), '광고', `${file}: ad landmark has no label`);
    assert.equal(unit.querySelector('.blog-ad__label')?.textContent.trim(), '광고', `${file}: ad has no visible label`);
    assert.ok(!unit.closest('.page__content, .toc, .sidebar, .masthead'), `${file}: ad interrupts content or navigation`);
    if (isHome) {
      assert.equal(posts[3].nextElementSibling, unit, `${file}: ad does not follow the fourth post`);
      assert.equal(unit.nextElementSibling, posts[4], `${file}: ad is not between post entries`);
    } else {
      assert.equal(document.querySelector('.page__content').nextElementSibling, unit, `${file}: ad does not follow the article body`);
    }
  }
}

function checkPostReading(document, file) {
  const isPost = Boolean(document.querySelector('#main.blog-reading-layout'));
  assert.equal(document.querySelectorAll('script[src$="/assets/js/post-reading.js"]').length, isPost ? 1 : 0, `${file}: unexpected article initializer count`);
  if (!isPost) return;
  assert.ok(document.querySelector('.post-byline a[rel="author"]')?.textContent.trim(), `${file}: mobile author is missing`);
  const outline = document.querySelector('.post-outline');
  const mobile = document.querySelector('.post-toc .toc');
  assert.equal(Boolean(outline), Boolean(mobile), `${file}: desktop and mobile outlines disagree`);
  if (!outline) return;
  const headings = [...document.querySelectorAll('.page__content h2[id], .page__content h3[id]')].filter(heading => !heading.classList.contains('no_toc'));
  const firstSection = headings.findIndex(heading => heading.tagName === 'H2');
  const included = firstSection < 0 ? headings : headings.slice(firstSection);
  const expected = included.map(heading => heading.id);
  for (const navigation of [outline, mobile]) {
    const links = [...navigation.querySelectorAll('a')];
    assert.deepEqual(links.map(link => decodeURIComponent(link.getAttribute('href').slice(1))), expected, `${file}: article outline omits or reorders headings`);
    let parentSection;
    links.forEach((link, index) => {
      const heading = included[index];
      assert.equal(link.textContent.trim(), heading.textContent.trim(), `${file}: outline label differs from its heading`);
      if (firstSection >= 0 && heading.tagName === 'H3') {
        assert.equal(link.closest('ul').parentElement, parentSection, `${file}: subsection is outside its parent section`);
      } else {
        parentSection = link.parentElement;
        assert.equal(parentSection.parentElement.parentElement, navigation, `${file}: major section is incorrectly nested`);
      }
    });
  }
  assert.ok(!outline.hasAttribute('data-enhanced'), `${file}: no-JavaScript outline must remain expanded`);
}

for (const file of files) {
  if (!file.endsWith('.html')) continue;
  pages++;
  const document = JSDOM.fragment(read(file));
  checkAds(document, file);
  checkPostReading(document, file);
  for (const link of document.querySelectorAll('.sidebar .author__urls a')) {
    assert.ok(link.querySelector('.label')?.textContent.trim(), `${file}: profile icon link has no accessible name`);
  }
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
  checkPrimaryNavigation(home, 'Posts', 'index.html');
  checkPrimaryNavigation(page2, 'Posts', 'page2/index.html');
  for (const [document, number] of [[home, 1], [page2, 2]]) {
    assert.equal(document.querySelectorAll('.sidebar .nav__list').length, 0, 'Removed sidebar navigation is still published');
    assert.equal(document.querySelectorAll('h1').length, 1, 'Home must have one primary heading');
    assert.equal(document.querySelector('h1#page-title')?.textContent.trim(), number === 1 ? '최근 글' : '이전 글', 'Home heading must distinguish recent posts from older pages');
    for (const selector of ['.sidebar .author__urls', '.page__footer-follow']) {
      assert.ok(document.querySelector(`${selector} a[href="${linkedinURL}"]`), `LinkedIn is missing from ${selector}`);
    }
    const posts = document.querySelectorAll('.archive > .entries-list .archive__item');
    assert.equal(posts.length, 10, 'Home pagination lost posts');
    const destinations = new Set();
    for (const [index, post] of [...posts].entries()) {
      const title = post.querySelector('.archive__item-title');
      const date = post.querySelector('time[datetime]');
      assert.ok(date && !Number.isNaN(Date.parse(date.dateTime)), 'Post has no valid publication date');
      assert.ok(title.compareDocumentPosition(date) & 4, 'Home post title must precede its metadata');
      const destination = new URL(title.querySelector('a[rel="permalink"]').getAttribute('href'), siteURL);
      destinations.add(destination.href);
      const articleFile = `${decodeURIComponent(destination.pathname).replace(/^\//, '')}index.html`;
      const article = JSDOM.fragment(read(articleFile));
      assert.equal(article.querySelector('link[rel="canonical"]').href, destination.href, 'Home entry no longer points to its original article');
      const featured = number === 1 && index < 2;
      assert.equal(post.parentElement.classList.contains('home-entry--featured'), featured, 'Featured entries must be the first two posts on the first page');
      assert.equal(post.parentElement.classList.contains('home-entry--compact'), !featured, 'Older posts must use compact entries');
      const image = post.querySelector('.home-entry__image img');
      if (featured) {
        assert.equal(post.parentElement.classList.contains('home-entry--text'), !image, 'Image-free featured entries need the text layout');
        if (image) assert.ok(image.alt.trim(), 'Featured image has no alternative text');
        const excerpt = post.querySelector('.archive__item-excerpt');
        if (excerpt) assert.ok(excerpt.textContent.trim(), 'Featured entry has an empty excerpt');
      } else {
        assert.equal(image, null, 'Compact entry unexpectedly includes a thumbnail');
        assert.equal(post.querySelector('.archive__item-excerpt'), null, 'Compact entry unexpectedly includes a summary');
      }
    }
    assert.equal(destinations.size, posts.length, 'Home pagination repeats an article');
    const olderHeading = document.querySelector('.home-older-heading');
    if (number === 1) {
      assert.ok(olderHeading?.textContent.trim(), 'Older entries have no section heading');
      assert.equal(olderHeading.previousElementSibling, posts[1].parentElement, 'Older heading must follow the two featured entries');
      assert.equal(olderHeading.nextElementSibling, posts[2].parentElement, 'Older heading must precede the third entry');
    } else {
      assert.equal(olderHeading, null, 'Paginated archives should use the compact list throughout');
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
  checkPrimaryNavigation(firstPost, 'Posts', firstPostURL.pathname);
  const toc = firstPost.querySelector('details.post-toc');
  assert.ok(toc?.querySelector('summary')?.textContent.trim(), 'Article contents have no disclosure control');
  assert.ok(!toc.hasAttribute('open'), 'Article contents should initially be collapsed');
  for (const link of toc.querySelectorAll('a[href^="#"]')) {
    assert.ok(firstPost.getElementById(decodeURIComponent(link.getAttribute('href').slice(1))), `Article contents point to a missing section: ${link.getAttribute('href')}`);
  }
}

function checkPrimaryNavigation(document, expected, file) {
  const navigation = document.querySelector('#site-nav');
  assert.ok(navigation, `${file}: main navigation is missing`);
  assert.equal(navigation.getAttribute('aria-label'), 'Main navigation', `${file}: navigation has no accessible name`);
  const links = [...navigation.querySelectorAll('.visible-links a')];
  assert.deepEqual(links.map(link => link.textContent.trim()), ['Posts', 'Topics', 'About'], `${file}: navigation labels changed`);
  assert.deepEqual(links.map(link => new URL(link.getAttribute('href'), siteURL).pathname), ['/', '/categories/', '/about/'], `${file}: navigation destinations changed`);
  assert.deepEqual(links.filter(link => link.getAttribute('aria-current') === 'page').map(link => link.textContent.trim()), [expected], `${file}: active navigation does not match the page`);
  const search = navigation.querySelector('.search__toggle');
  assert.equal(search?.getAttribute('aria-label'), 'Search posts', `${file}: search has no accessible name`);
  assert.equal(search?.querySelector('.search__label')?.textContent.trim(), 'Search', `${file}: search label is missing`);
}

function checkTopicNavigation() {
  for (const [page, label] of [['categories', 'Categories'], ['tags', 'Tags']]) {
    const file = `${page}/index.html`;
    const document = JSDOM.fragment(read(file));
    checkPrimaryNavigation(document, 'Topics', file);
    const tabs = document.querySelector('.topics-nav');
    assert.equal(tabs?.getAttribute('aria-label'), 'Browse topics', `${file}: topic navigation has no accessible name`);
    assert.deepEqual([...tabs.querySelectorAll('a')].map(link => link.textContent.trim()), ['Categories', 'Tags'], `${file}: topic navigation labels changed`);
    assert.deepEqual([...tabs.querySelectorAll('a[aria-current="page"]')].map(link => link.textContent.trim()), [label], `${file}: current topic tab is incorrect`);
    assert.deepEqual([...tabs.querySelectorAll('a')].map(link => new URL(link.getAttribute('href'), siteURL).pathname), ['/categories/', '/tags/'], `${file}: topic tab destinations changed`);
  }
  checkPrimaryNavigation(JSDOM.fragment(read('timeline/index.html')), 'Posts', 'timeline/index.html');
}

function checkTaxonomyPagination() {
  for (const page of ['categories', 'tags']) {
    const file = `${page}/index.html`;
    const dom = new JSDOM(read(file), { runScripts: 'outside-only', url: new URL(`${page}/`, siteURL).href });
    try {
      const { document } = dom.window;
      const sections = [...document.querySelectorAll('.taxonomy__section')];
      const index = [...document.querySelectorAll('.taxonomy__index a[href]')];
      assert.equal(index.length, sections.length, `${file}: taxonomy index and sections disagree`);
      assert.equal([...document.scripts].filter(script => script.src && new URL(script.src).pathname.endsWith('/assets/js/taxonomy-collapse.js')).length, 1, `${file}: taxonomy initializer must load once`);
      assert.equal(document.querySelectorAll('.taxonomy__pagination').length, 0, `${file}: pagination must not restrict the no-JavaScript archive`);
      assert.equal(document.querySelectorAll('details.taxonomy__singletons').length, sections.length > 12 ? 2 : 0, `${file}: taxonomy disclosures changed`);
      assert.equal(document.querySelectorAll('details.taxonomy__singletons[open]').length, 0, `${file}: extra taxonomy groups must initially be collapsed`);
      const original = sections.map((section, position) => {
        const entries = section.querySelector('.entries-list, .entries-grid');
        const items = [...entries.children];
        assert.equal(decodeURIComponent(index[position].hash.slice(1)), section.id, `${file}: taxonomy index order or target changed`);
        assert.equal(index[position].querySelector('strong').textContent.trim(), section.querySelector('h2').textContent.trim(), `${file}: taxonomy heading and index label disagree`);
        assert.equal(Number(index[position].querySelector('.taxonomy__count').textContent), items.length, `${file}: ${section.id} post count differs from its index`);
        assert.equal(items.some(item => item.hidden), false, `${file}: ${section.id} hides posts before JavaScript loads`);
        assert.equal(Boolean(section.closest('details.taxonomy__singletons')), position >= 12, `${file}: article groups no longer use the top twelve`);
        assert.equal(Boolean(index[position].closest('details.taxonomy__singletons')), position >= 12, `${file}: index no longer uses the top twelve`);
        return { section, entries, count: items.length, links: [...entries.querySelectorAll('a[rel="permalink"]')].map(link => link.href) };
      });
      const counts = original.map(group => group.count);
      assert.deepEqual(counts, [...counts].sort((a, b) => b - a), `${file}: taxonomy groups must be ordered by post count`);
      dom.window.eval(read('assets/js/taxonomy-collapse.js'));
      for (const group of original) {
        const items = [...group.entries.children];
        assert.equal(items.length, group.count, `${file}: ${group.section.id} loses posts during pagination`);
        assert.deepEqual([...group.entries.querySelectorAll('a[rel="permalink"]')].map(link => link.href), group.links, `${file}: ${group.section.id} article order or destinations changed`);
        assert.equal(items.filter(item => !item.hidden).length, Math.min(group.count, 10), `${file}: ${group.section.id} has an incorrect first page`);
        const pagers = group.section.querySelectorAll('.taxonomy__pagination');
        assert.equal(pagers.length, group.count > 10 ? 1 : 0, `${file}: ${group.section.id} has an incorrect pager count`);
        if (pagers.length) assert.equal(pagers[0].querySelector('[aria-current="page"]')?.textContent, '1', `${file}: ${group.section.id} does not start on page one`);
      }
    } finally {
      dom.window.close();
    }
  }
}

async function checkAbout() {
  const dom = new JSDOM(read('about/index.html'), { runScripts: 'outside-only', url: siteURL });
  try {
    const { document } = dom.window;
    checkPrimaryNavigation(document, 'About', 'about/index.html');
    assert.equal(document.querySelectorAll('#skills .hexagon svg title').length, 46, 'About loses existing skill icons');
    assert.equal([...document.querySelectorAll('.project-container p')].filter(item => item.textContent.includes('■')).length, 8, 'About loses existing projects');
    assert.equal(document.querySelectorAll('.education-container b').length, 2, 'About loses existing education');
    const aboutContent = document.querySelector('.initial-content-about').textContent;
    assert.ok(aboutContent.includes('2023.12 ~ 현재'), 'About must use the Korean date range format');
    assert.ok(!/—|HAI본부/.test(aboutContent), 'About contains rejected date punctuation or the standalone division label');
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
checkTopicNavigation();
checkTaxonomyPagination();
checkAbout().then(() => {
  assert.equal(errors.size, 0, [...errors].join('\n'));
  console.log(`Verified ${pages} HTML pages, ${structuredData} JSON-LD blocks, ${adSlots} manual ad placements, sitemap/feed, local links, IDs, social metadata, home layout/pagination, taxonomy counts/disclosures/pagination, article contents, LinkedIn profiles, and About search with the generated index.`);
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
