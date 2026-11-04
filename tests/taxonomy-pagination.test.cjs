const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { JSDOM } = require('jsdom');

const script = fs.readFileSync(path.join(__dirname, '../assets/js/taxonomy-collapse.js'), 'utf8');

function fixture(t, { count = 21, secondCount = 21, suffix = '', layout = 'list' } = {}) {
  function section(id, title, size) {
    const posts = Array.from({ length: size }, (_, index) =>
      `<div class="${layout}__item"><article><h2><a href="/posts/${id}-${index + 1}/">Post ${index + 1}</a></h2></article></div>`
    ).join('');
    return `<section class="taxonomy__section" id="${id}">
      <h2 class="archive__subtitle" id="${id}-heading">${title}</h2>
      <div class="entries-${layout}">${posts}</div>
      <a class="back-to-top" href="#page-title">Back to Top</a>
    </section>`;
  }
  const dom = new JSDOM(`
    <h1 id="page-title">Posts by Tag</h1>
    <ul class="taxonomy__index">
      <li><a id="first-index" href="#first">First topic</a></li>
      <li><a id="second-index" href="#논문-리뷰"><strong>논문 리뷰</strong></a></li>
    </ul>
    ${section('first', 'First topic', count)}
    <details class="taxonomy__singletons"><summary>전체 보기</summary>
      ${section('논문-리뷰', '논문 리뷰', secondCount)}
    </details>
  `, { url: 'https://site.test/tags/' + suffix, runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  const scrolled = [];
  dom.window.Element.prototype.scrollIntoView = function () { scrolled.push(this.id); };
  return {
    window: dom.window,
    document: dom.window.document,
    first: dom.window.document.getElementById('first'),
    second: dom.window.document.getElementById('논문-리뷰'),
    group: dom.window.document.querySelector('details'),
    scrolled,
    start() { dom.window.eval(script); }
  };
}

function entries(section) {
  return [...section.querySelector('.entries-list, .entries-grid').children];
}

function visibleLinks(section) {
  return entries(section).filter(entry => !entry.hidden).map(entry => entry.querySelector('a').getAttribute('href'));
}

function pageLink(section, number) {
  return [...section.querySelectorAll('.taxonomy__pagination a[href]')]
    .find(link => link.textContent.trim() === String(number));
}

function click(page, link, options = {}) {
  assert.ok(link, 'Expected pagination link');
  const event = new page.window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...options });
  link.dispatchEvent(event);
  return event;
}

function currentPage(section) {
  return section.querySelector('.taxonomy__pagination [aria-current="page"]')?.textContent.trim();
}

test('all taxonomy posts remain available before JavaScript enhances the page', t => {
  const page = fixture(t);
  assert.equal(visibleLinks(page.first).length, 21);
  assert.equal(page.document.querySelector('.taxonomy__pagination'), null);
});

for (const count of [0, 1, 10, 11, 20, 21]) {
  test(`${count} posts use ten per page without discarding source entries`, t => {
    const page = fixture(t, { count, secondCount: 0 });
    const originalLinks = visibleLinks(page.first);
    page.start();
    assert.equal(entries(page.first).length, count);
    assert.deepEqual(visibleLinks(page.first), originalLinks.slice(0, 10));
    const navigation = page.first.querySelector('nav.taxonomy__pagination');
    assert.equal(Boolean(navigation), count > 10);
    if (navigation) {
      assert.equal(page.first.querySelector('.entries-list').nextElementSibling, navigation);
      assert.equal(currentPage(page.first), '1');
      assert.match(navigation.getAttribute('aria-label'), /First topic/);
    }
  });
}

test('paging traverses every post once in order and returns to the first page', t => {
  const page = fixture(t);
  const originalLinks = visibleLinks(page.first);
  page.start();
  const visited = visibleLinks(page.first);
  for (const number of [2, 3]) {
    const event = click(page, pageLink(page.first, number));
    assert.equal(event.defaultPrevented, true);
    assert.equal(currentPage(page.first), String(number));
    assert.equal(new URL(page.window.location.href).searchParams.get('page'), String(number));
    assert.equal(page.window.location.hash, '#first');
    visited.push(...visibleLinks(page.first));
  }
  assert.deepEqual(visited, originalLinks);
  assert.equal(new Set(visited).size, originalLinks.length);
  assert.equal(visibleLinks(page.second).length, 10);
  assert.equal(currentPage(page.second), '1');
  assert.equal(page.document.activeElement, page.first.querySelector('.archive__subtitle'));
  assert.equal(page.document.activeElement.getAttribute('tabindex'), '-1');
  assert.ok(page.scrolled.length > 0, 'Page changes must bring the new entries into view');
  click(page, pageLink(page.first, 1));
  assert.equal(new URL(page.window.location.href).searchParams.has('page'), false);
  assert.deepEqual(visibleLinks(page.first), originalLinks.slice(0, 10));
});

test('grid entries use the same page boundaries', t => {
  const page = fixture(t, { layout: 'grid' });
  const originalLinks = visibleLinks(page.first);
  page.start();
  click(page, pageLink(page.first, 3));
  assert.deepEqual(visibleLinks(page.first), originalLinks.slice(20));
});

test('long taxonomies remain fully reachable through condensed page controls', t => {
  const page = fixture(t, { count: 103, secondCount: 0 });
  const originalLinks = visibleLinks(page.first);
  page.start();
  const visited = visibleLinks(page.first);
  for (let number = 2; number <= 11; number++) {
    const next = page.first.querySelector('.taxonomy__pagination a[aria-label="Next page"]');
    click(page, next);
    assert.equal(currentPage(page.first), String(number));
    assert.ok(page.first.querySelectorAll('.taxonomy__page-numbers a').length <= 5);
    visited.push(...visibleLinks(page.first));
  }
  assert.deepEqual(visited, originalLinks);
  for (let number = 10; number >= 1; number--) {
    click(page, page.first.querySelector('.taxonomy__pagination a[aria-label="Previous page"]'));
    assert.equal(currentPage(page.first), String(number));
    assert.deepEqual(visibleLinks(page.first), originalLinks.slice((number - 1) * 10, number * 10));
  }
});

test('an encoded direct link selects only its taxonomy page and opens its disclosure', t => {
  const page = fixture(t, { suffix: '?page=2#%EB%85%BC%EB%AC%B8-%EB%A6%AC%EB%B7%B0' });
  const secondLinks = visibleLinks(page.second);
  page.start();
  assert.equal(page.group.open, true);
  assert.equal(currentPage(page.first), '1');
  assert.equal(currentPage(page.second), '2');
  assert.deepEqual(visibleLinks(page.second), secondLinks.slice(10, 20));
  assert.ok(page.scrolled.length > 0);
});

test('invalid page numbers default to one and oversized pages clamp to the last page', t => {
  for (const value of ['', 'invalid', '0', '-2', '1.5']) {
    const page = fixture(t, { suffix: `?page=${value}#first` });
    page.start();
    assert.equal(currentPage(page.first), '1', `Invalid page ${value}`);
    assert.equal(visibleLinks(page.first).length, 10);
  }
  const page = fixture(t, { suffix: '?page=999#first' });
  page.start();
  assert.equal(currentPage(page.first), '3');
  assert.equal(visibleLinks(page.first).length, 1);
});

test('unmatched or malformed fragments cannot apply a page to another taxonomy', t => {
  for (const hash of ['', '#missing', '#%invalid']) {
    const page = fixture(t, { suffix: '?page=2' + hash });
    assert.doesNotThrow(() => page.start());
    assert.equal(currentPage(page.first), '1');
    assert.equal(currentPage(page.second), '1');
    assert.equal(page.group.open, false);
  }
});

test('history restores the requested page before other popstate scroll handlers run', t => {
  const page = fixture(t);
  const secondLinks = visibleLinks(page.second);
  let restoredBeforeScrolling = false;
  page.window.addEventListener('popstate', () => {
    restoredBeforeScrolling = page.group.open && currentPage(page.second) === '2';
  });
  page.start();
  click(page, pageLink(page.first, 3));
  page.window.history.pushState(null, '', '?page=2#논문-리뷰');
  page.window.dispatchEvent(new page.window.PopStateEvent('popstate'));
  assert.equal(restoredBeforeScrolling, true);
  assert.equal(currentPage(page.first), '1');
  assert.deepEqual(visibleLinks(page.second), secondLinks.slice(10, 20));
  page.window.history.pushState(null, '', '/tags/#first');
  page.window.dispatchEvent(new page.window.PopStateEvent('popstate'));
  assert.equal(currentPage(page.first), '1');
  assert.equal(currentPage(page.second), '1');
});

test('an index click clears the previous page and reveals its target before scrolling', t => {
  const page = fixture(t, { suffix: '?page=3#first' });
  let visibleBeforeScrolling = false;
  page.document.addEventListener('click', event => {
    visibleBeforeScrolling = page.group.open && currentPage(page.second) === '1';
    event.preventDefault();
  });
  page.start();
  click(page, page.document.querySelector('#second-index strong'));
  assert.equal(visibleBeforeScrolling, true);
  assert.equal(new URL(page.window.location.href).searchParams.has('page'), false);
  assert.equal(currentPage(page.first), '1');
  assert.equal(currentPage(page.second), '1');
});

test('modified pagination clicks preserve native link behavior and current page state', t => {
  const page = fixture(t);
  const prevented = [];
  page.document.addEventListener('click', event => {
    prevented.push(event.defaultPrevented);
    event.preventDefault();
  });
  page.start();
  for (const options of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    click(page, pageLink(page.second, 2), options);
    assert.equal(currentPage(page.second), '1');
    assert.equal(page.group.open, false);
    assert.equal(page.window.location.search, '');
  }
  assert.deepEqual(prevented, [false, false, false, false, false]);
});

test('pagination exposes the current page and disables unavailable boundary controls', t => {
  const page = fixture(t);
  page.start();
  for (const number of [1, 3]) {
    if (number === 3) click(page, pageLink(page.first, 3));
    const navigation = page.first.querySelector('nav.taxonomy__pagination');
    assert.equal(navigation.querySelectorAll('[aria-current="page"]').length, 1);
    assert.equal(currentPage(page.first), String(number));
    const unavailable = [...navigation.querySelectorAll('[aria-disabled="true"]')];
    assert.equal(unavailable.length, 1);
    for (const control of unavailable) {
      assert.equal(control.hasAttribute('href'), false);
      assert.ok(control.textContent.trim(), 'Disabled control must retain an accessible name');
    }
    for (const link of navigation.querySelectorAll('a[href]')) {
      const url = new URL(link.href);
      assert.equal(url.pathname, '/tags/');
      assert.equal(url.hash, '#first');
    }
  }
});
