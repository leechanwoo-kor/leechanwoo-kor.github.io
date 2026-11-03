const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { JSDOM } = require('jsdom');

const script = fs.readFileSync(path.join(__dirname, '../assets/js/taxonomy-collapse.js'), 'utf8');
const encodedHash = '#%EB%85%BC%EB%AC%B8-%EB%A6%AC%EB%B7%B0';

function fixture(t, hash = '') {
  const dom = new JSDOM(`
    <a id="single-link" href="#논문-리뷰"><strong>논문 리뷰</strong></a>
    <a id="multi-link" href="#multi">Multiple posts</a>
    <a id="other-page" href="/categories/#논문-리뷰">Other page</a>
    <a id="other-origin" href="https://other.test/tags/#논문-리뷰">Other site</a>
    <details class="taxonomy__singletons"><summary>Single-post tags</summary>
      <section id="논문-리뷰">A post</section>
    </details>
    <section id="multi">Multiple posts</section>
  `, { url: 'https://site.test/tags/' + hash, runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  const scrolled = [];
  dom.window.Element.prototype.scrollIntoView = function () { scrolled.push(this.id); };
  return { window: dom.window, document: dom.window.document, group: dom.window.document.querySelector('details'), scrolled };
}

test('a direct encoded taxonomy link reveals and scrolls to its collapsed group', t => {
  const page = fixture(t, encodedHash);
  page.window.eval(script);
  assert.equal(page.group.open, true);
  assert.deepEqual(page.scrolled, ['논문-리뷰']);
});

test('a taxonomy index click reveals its group before existing scroll handlers run', t => {
  const page = fixture(t);
  let visibleWhenScrolling = false;
  page.document.addEventListener('click', event => {
    visibleWhenScrolling = page.group.open;
    event.preventDefault();
  });
  page.window.eval(script);
  page.document.querySelector('#single-link strong').dispatchEvent(new page.window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
  assert.equal(visibleWhenScrolling, true);
});

test('modified clicks and links to other pages leave the current groups closed', t => {
  const page = fixture(t);
  page.document.addEventListener('click', event => event.preventDefault());
  page.window.eval(script);
  for (const options of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    page.document.querySelector('#single-link').dispatchEvent(new page.window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...options }));
    assert.equal(page.group.open, false, JSON.stringify(options));
  }
  for (const id of ['other-page', 'other-origin']) {
    page.document.getElementById(id).dispatchEvent(new page.window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
    assert.equal(page.group.open, false, id);
  }
});

test('changing the fragment reveals the requested single-post group', t => {
  const page = fixture(t);
  page.window.eval(script);
  assert.equal(page.group.open, false);
  page.window.history.pushState(null, '', encodedHash);
  page.window.dispatchEvent(new page.window.HashChangeEvent('hashchange'));
  assert.equal(page.group.open, true);
  assert.deepEqual(page.scrolled, ['논문-리뷰']);
});

test('history navigation reveals its group before existing popstate scroll handlers', t => {
  const page = fixture(t);
  let visibleWhenScrolling = false;
  page.window.addEventListener('popstate', () => { visibleWhenScrolling = page.group.open; });
  page.window.eval(script);
  page.window.history.pushState(null, '', encodedHash);
  page.window.dispatchEvent(new page.window.PopStateEvent('popstate'));
  assert.equal(visibleWhenScrolling, true);
  assert.deepEqual(page.scrolled, ['논문-리뷰']);
});

test('multi-post anchors keep their normal link behavior without opening singletons', t => {
  const page = fixture(t, '#multi');
  let preventedBeforeExistingHandler = null;
  page.document.addEventListener('click', event => {
    preventedBeforeExistingHandler = event.defaultPrevented;
    event.preventDefault();
  });
  page.window.eval(script);
  page.document.querySelector('#multi-link').dispatchEvent(new page.window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
  assert.equal(preventedBeforeExistingHandler, false);
  assert.equal(page.group.open, false);
  assert.deepEqual(page.scrolled, []);
});

test('missing or malformed fragments do not reveal unrelated groups', t => {
  const page = fixture(t, '#%invalid');
  assert.doesNotThrow(() => page.window.eval(script));
  for (const hash of ['#missing', '']) {
    page.window.history.pushState(null, '', '/tags/' + hash);
    page.window.dispatchEvent(new page.window.HashChangeEvent('hashchange'));
  }
  assert.equal(page.group.open, false);
  assert.deepEqual(page.scrolled, []);
});
