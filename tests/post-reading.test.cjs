const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { JSDOM } = require('jsdom');

const script = fs.readFileSync(path.join(__dirname, '../assets/js/post-reading.js'), 'utf8');
const code = 'print("한글 <tag>")\n  # preserve indentation\n';

function fixture(t, dialogSupported = true) {
  const dom = new JSDOM(`
    <body class="blog-post">
      <nav class="post-outline"><ul>
        <li><a href="#first">First</a><ul><li><a href="#세부">Details</a></li></ul></li>
        <li><a href="#second">Second</a></li>
      </ul></nav>
      <section class="page__content">
        <h2 id="first">First</h2><h3 id="세부">Details</h3>
        <div class="language-python highlighter-rouge"><div class="highlight"><pre><code></code></pre></div></div>
        <pre id="plain"><code>standalone\n</code></pre>
        <pre class="language-mermaid"><code>graph TD; A--&gt;B;</code></pre>
        <div class="language-mermaid"><pre><code>graph TD; B--&gt;C;</code></pre></div>
        <pre><code class="language-mermaid">graph TD; C--&gt;D;</code></pre>
        <h2 id="second">Second</h2>
        <figure><picture><source srcset="figure.webp" type="image/webp"><img src="figure.png" alt="설명 그림" width="600" height="300"></picture><figcaption>Original caption</figcaption></figure>
        <a href="full.png"><img src="linked.png" alt="Linked figure"></a>
        <img src="map.png" usemap="#map" alt="Map">
      </section>
    </body>
  `, { url: 'https://site.test/post/', runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  const { window } = dom;
  const { document } = window;
  document.querySelector('pre code').textContent = code;
  const positions = [120, 220, 320];
  document.querySelectorAll('h2, h3').forEach((heading, index) => {
    heading.getBoundingClientRect = () => ({ top: positions[index] });
  });
  const frames = [];
  window.requestAnimationFrame = callback => frames.push(callback);
  if (dialogSupported) {
    window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
    window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  } else {
    window.HTMLDialogElement.prototype.showModal = undefined;
  }
  return { window, document, positions, frames, init: () => window.eval(script) };
}

test('post enhancement preserves code and diagrams and does not duplicate controls', t => {
  const page = fixture(t);
  const original = [...page.document.querySelectorAll('pre')].map(pre => pre.outerHTML);
  const originalDiagramParents = [...page.document.querySelectorAll('.language-mermaid')].map(node => node.parentElement);
  page.init();
  page.init();
  assert.deepEqual([...page.document.querySelectorAll('pre')].map(pre => pre.outerHTML), original);
  assert.equal(page.document.querySelectorAll('.post-code-copy').length, 2);
  assert.equal(page.document.querySelectorAll('.post-code-shell').length, 2);
  assert.equal(page.document.querySelectorAll('#post-copy-status').length, 1);
  assert.deepEqual([...page.document.querySelectorAll('.language-mermaid')].map(node => node.parentElement), originalDiagramParents);
  assert.equal(page.document.querySelector('.post-code-tools span').textContent, 'python');
  assert.equal(page.document.querySelectorAll('.post-image-dialog').length, 1);
});

test('copy writes the original code including indentation and announces success', async t => {
  const page = fixture(t);
  const copied = [];
  page.window.navigator.clipboard = { writeText: async text => copied.push(text) };
  page.init();
  const button = page.document.querySelector('.post-code-copy');
  button.click();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(copied, [code]);
  assert.equal(button.textContent, '복사됨');
  assert.equal(page.document.querySelector('[role="status"]').textContent, '코드를 복사했습니다.');
});

for (const rejected of [false, true]) {
  test(`copy ${rejected ? 'denied by the browser' : 'without clipboard support'} selects exactly the original code`, async t => {
    const page = fixture(t);
    if (rejected) page.window.navigator.clipboard = { writeText: async () => { throw new Error('NotAllowedError'); } };
    page.init();
    const button = page.document.querySelector('.post-code-copy');
    button.click();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(page.window.getSelection().toString(), code);
    assert.equal(button.textContent, '선택됨');
    assert.match(page.document.querySelector('[role="status"]').textContent, /복사 단축키/);
  });
}

test('image enlargement retains picture sources, captions and existing image links', t => {
  const page = fixture(t);
  const picture = page.document.querySelector('picture').outerHTML;
  const link = page.document.querySelector('.page__content a').outerHTML;
  page.init();
  assert.equal(page.document.querySelector('picture').outerHTML, picture);
  assert.equal(page.document.querySelector('figcaption').textContent, 'Original caption');
  assert.equal(page.document.querySelector('.page__content a').outerHTML, link);
  assert.equal(page.document.querySelector('img[usemap]').closest('button'), null);
  assert.equal(page.document.querySelectorAll('.post-image-open').length, 1);
  const source = page.document.querySelector('picture img');
  Object.defineProperty(source, 'currentSrc', { value: 'https://site.test/post/figure.webp' });
  const dialog = page.document.querySelector('dialog');
  page.document.querySelector('.post-image-open').click();
  assert.equal(dialog.open, true);
  assert.equal(dialog.querySelector('img').src, source.currentSrc);
  assert.equal(dialog.querySelector('img').alt, source.alt);
  dialog.querySelector('img').click();
  assert.equal(dialog.open, true, 'clicking the enlarged image should not close it');
  dialog.querySelector('button').click();
  assert.equal(dialog.open, false);
  page.document.querySelector('.post-image-open').click();
  dialog.click();
  assert.equal(dialog.open, false, 'clicking the backdrop should close it');
});

test('browsers without a native dialog retain readable images without dead controls', t => {
  const page = fixture(t, false);
  const original = page.document.querySelector('figure').outerHTML;
  page.init();
  assert.equal(page.document.querySelector('figure').outerHTML, original);
  assert.equal(page.document.querySelector('.post-image-open'), null);
  assert.equal(page.document.querySelector('dialog'), null);
  assert.equal(page.document.querySelectorAll('.post-code-copy').length, 2);
});

test('outline follows section positions and expands the active nested section', t => {
  const page = fixture(t);
  page.init();
  assert.equal(page.document.querySelector('.is-current'), null);
  assert.equal(page.document.querySelector('.post-outline').hasAttribute('data-enhanced'), true);
  page.positions.splice(0, 3, -100, 20, 300);
  page.window.dispatchEvent(new page.window.Event('scroll'));
  page.window.dispatchEvent(new page.window.Event('scroll'));
  assert.equal(page.frames.length, 1, 'scroll work should be batched into one frame');
  page.frames.shift()();
  assert.equal(page.document.querySelector('[aria-current="location"]').hash, '#%EC%84%B8%EB%B6%80');
  assert.equal(page.document.querySelectorAll('.is-current').length, 1);
  assert.equal(page.document.querySelector('.is-active-section > a').textContent, 'First');
  page.positions.splice(0, 3, -300, -200, 20);
  page.window.dispatchEvent(new page.window.HashChangeEvent('hashchange'));
  assert.equal(page.document.querySelector('[aria-current="location"]').hash, '#second');
  assert.equal(page.document.querySelector('.is-active-section > a').textContent, 'Second');
});
