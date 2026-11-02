const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const { setTimeout: delay } = require('node:timers/promises');
const { JSDOM, VirtualConsole, requestInterceptor } = require('jsdom');

const read = path => fs.readFileSync(path, 'utf8');
const jquery = read('assets/js/vendor/jquery/jquery-3.5.1.js');
const engine = read('assets/js/lunr/lunr.min.js');
const search = read('assets/js/lunr/lunr-en.js').replace(/^---[\s\S]*?---/, '');
const form = read('_includes/search/search_form.html')
  .split('{%- when "lunr" -%}')[1].split('{%- when "google" -%}')[0]
  .replace(/{{[\s\S]*?}}/g, 'Search');
const store = [{ title: 'Transformer', excerpt: 'Attention model', categories: [], tags: [], url: '/transformer/', teaser: '' }];

test('search waits for slow dependencies before initializing', { timeout: 5000 }, async t => {
  const loader = read('_includes/scripts.html').match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/{{\s*"([^"]+)"\s*\|\s*relative_url\s*}}/g, '$1');
  const errors = [];
  const responses = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => errors.push(error.message));
  const files = {
    'lunr.min.js': [80, engine],
    'lunr-store.js': [40, `var store = ${JSON.stringify(store)};`],
    'lunr-en.js': [0, search]
  };
  const dom = new JSDOM(`<button class="search__toggle">Search</button>${form}<script>${loader}</script>`, {
    url: 'https://site.test/', runScripts: 'dangerously', virtualConsole,
    resources: { interceptors: [requestInterceptor(async request => {
      const name = new URL(request.url).pathname.split('/').pop();
      assert.ok(files[name], `Unexpected request: ${request.url}`);
      const [wait, code] = files[name];
      await delay(wait);
      responses.push(name);
      return new Response(code, { headers: { 'Content-Type': 'application/javascript' } });
    })] }
  });
  t.after(() => dom.window.close());
  dom.window.eval(jquery);
  await new Promise(resolve => dom.window.$(resolve));
  const loaded = new Promise(resolve => dom.window.document.addEventListener('load', event => {
    if (event.target.src && event.target.src.endsWith('/lunr-en.js')) resolve();
  }, true));
  dom.window.document.querySelector('button').click();
  const input = dom.window.document.querySelector('input');
  input.value = 'transformer';
  input.dispatchEvent(new dom.window.KeyboardEvent('keyup', { bubbles: true }));
  await loaded;
  await new Promise(resolve => dom.window.$(resolve));
  assert.deepEqual(responses, ['lunr.min.js', 'lunr-store.js', 'lunr-en.js']);
  assert.deepEqual(errors, []);
  assert.equal(dom.window.document.querySelector('.results a').textContent, 'Transformer');
  dom.window.document.querySelector('button').click();
  assert.equal(dom.window.document.querySelectorAll('script[src]').length, 3);
});

test('search preserves article headings named Search and Results', async t => {
  const dom = new JSDOM(`<h2 id="search">Search</h2><h2 id="results">Results</h2>${form}`, { runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  dom.window.eval(jquery);
  dom.window.eval(engine);
  dom.window.store = store;
  dom.window.eval(search);
  await new Promise(resolve => dom.window.$(resolve));
  const input = dom.window.document.querySelector('input');
  input.value = 'transformer';
  input.dispatchEvent(new dom.window.KeyboardEvent('keyup', { bubbles: true }));
  assert.equal(dom.window.document.querySelector('h2#results').textContent, 'Results');
  assert.equal(dom.window.document.querySelector('.results a').textContent, 'Transformer');
  assert.equal(dom.window.document.querySelector('label').control, input);
});
