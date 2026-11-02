const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const { JSDOM } = require('jsdom');

const read = path => fs.readFileSync(path, 'utf8');
const loader = read('_includes/head/adsense.html').match(/<script>([\s\S]*?)<\/script>/)[1];
const initialize = read('assets/js/ad-units.js');
const unit = read('_includes/ad-unit.html').replace('{{ include.slot }}', '2024194306');

function page(t) {
  const dom = new JSDOM(`<main><p>Article content</p>${unit}</main>`, { runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  const { window } = dom;
  const observers = [];
  let idle;
  let requests = 0;
  window.requestIdleCallback = callback => { idle = callback; };
  window.adsbygoogle = { push() { requests++; } };
  // jsdom has no layout engine; deliver only observations for currently observed slots.
  window.ResizeObserver = class {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
  };
  window.eval(loader);
  idle();
  const script = window.document.querySelector('script[src*="adsbygoogle.js"]');
  return {
    window,
    script,
    requests: () => requests,
    resize(width) {
      for (const observer of observers) {
        const entries = [...observer.targets].map(target => ({ target, contentRect: { width } }));
        if (entries.length) observer.callback(entries);
      }
    }
  };
}

test('manual ads wait for a slow library and visible content, then request only once', t => {
  const fixture = page(t);
  const { window, script } = fixture;
  window.eval(initialize);
  fixture.resize(720);
  assert.equal(fixture.requests(), 0, 'Ad requested before its library loaded');

  window.document.querySelector('main').style.display = 'none';
  script.dispatchEvent(new window.Event('load'));
  fixture.resize(0);
  assert.equal(fixture.requests(), 0, 'Ad requested while search hides the article');

  window.document.querySelector('main').style.display = '';
  fixture.resize(720);
  assert.equal(fixture.requests(), 1);
  fixture.resize(320);
  fixture.resize(0);
  fixture.resize(720);
  window.dispatchEvent(new window.Event('adsense:ready'));
  fixture.resize(720);
  assert.equal(fixture.requests(), 1, 'Resizing or reopening content requested the ad twice');
  window.loadAdsense();
  assert.equal(window.document.querySelectorAll('script[src*="adsbygoogle.js"]').length, 1);
});

test('manual ads also initialize when the library loads before the deferred initializer', t => {
  const fixture = page(t);
  fixture.script.dispatchEvent(new fixture.window.Event('load'));
  fixture.window.eval(initialize);
  fixture.resize(320);
  assert.equal(fixture.requests(), 1);
  const ad = fixture.window.document.querySelector('.adsbygoogle');
  ad.dataset.adStatus = 'unfilled';
  fixture.resize(0);
  assert.ok(ad.closest('.blog-ad'), 'An unfilled ad removed its reserved region');
  assert.equal(fixture.window.document.querySelector('main p').textContent, 'Article content');
  assert.equal(fixture.requests(), 1);
});

test('a blocked AdSense library leaves content intact and makes no ad request', t => {
  const fixture = page(t);
  const content = fixture.window.document.querySelector('main').innerHTML;
  fixture.window.eval(initialize);
  fixture.script.dispatchEvent(new fixture.window.Event('error'));
  fixture.resize(720);
  assert.equal(fixture.requests(), 0);
  assert.equal(fixture.window.adsenseReady, undefined);
  assert.equal(fixture.window.document.querySelector('main').innerHTML, content);
});
