(function () {
  const content = document.querySelector('.blog-post .page__content');
  if (!content || content.hasAttribute('data-reading-enhanced')) return;
  content.setAttribute('data-reading-enhanced', '');

  const status = document.createElement('span');
  status.className = 'visually-hidden';
  status.id = 'post-copy-status';
  status.setAttribute('role', 'status');
  document.body.append(status);

  content.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.language-mermaid, .mermaid') || pre.querySelector('.language-mermaid, .mermaid')) return;
    let shell = pre.closest('div.highlighter-rouge, figure.highlight');
    if (!shell) {
      shell = document.createElement('div');
      pre.before(shell);
      shell.append(pre);
    }
    shell.classList.add('post-code-shell');
    const tools = document.createElement('div');
    tools.className = 'post-code-tools';
    const language = document.createElement('span');
    const match = (shell.className + ' ' + (pre.querySelector('code')?.className || '')).match(/language-([\w+-]+)/);
    language.textContent = match?.[1] === 'plaintext' ? 'Text' : (match?.[1] || 'Code');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'post-code-copy';
    button.textContent = '복사';
    button.setAttribute('aria-label', '코드 복사');
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent);
        button.textContent = '복사됨';
        status.textContent = '코드를 복사했습니다.';
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(pre);
        selection.removeAllRanges();
        selection.addRange(range);
        button.textContent = '선택됨';
        status.textContent = '코드를 선택했습니다. 복사 단축키를 눌러 주세요.';
      }
      setTimeout(() => { button.textContent = '복사'; }, 1800);
    });
    tools.append(language, button);
    shell.prepend(tools);
  });

  const dialog = document.createElement('dialog');
  if (typeof dialog.showModal === 'function') {
    dialog.className = 'post-image-dialog';
    dialog.setAttribute('aria-label', '확대된 그림');
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'post-image-close';
    close.textContent = '닫기';
    const enlarged = document.createElement('img');
    enlarged.alt = '';
    dialog.append(close, enlarged);
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    content.querySelectorAll('img').forEach(image => {
      if (image.closest('a, button') || image.hasAttribute('usemap')) return;
      const target = image.closest('picture') || image;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'post-image-open';
      button.setAttribute('aria-label', '그림 크게 보기');
      button.title = '그림 크게 보기';
      target.before(button);
      button.append(target);
      button.addEventListener('click', () => {
        enlarged.src = image.currentSrc || image.src;
        enlarged.alt = image.alt;
        dialog.showModal();
      });
    });
    if (content.querySelector('.post-image-open')) document.body.append(dialog);
  }

  const outline = document.querySelector('.post-outline');
  const links = [...document.querySelectorAll('.post-outline a[href^="#"]')];
  if (!links.length) return;
  const sections = links.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1))));
  outline.setAttribute('data-enhanced', '');
  let queued = false;
  function updateOutline() {
    queued = false;
    let current = -1;
    sections.forEach((section, index) => { if (section?.getBoundingClientRect().top <= 80) current = index; });
    links.forEach((link, index) => {
      link.classList.toggle('is-current', index === current);
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    outline.querySelectorAll(':scope > ul > li').forEach(item => {
      item.classList.toggle('is-active-section', current >= 0 && item.contains(links[current]));
    });
  }
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(updateOutline); }
  }, { passive: true });
  window.addEventListener('load', updateOutline);
  window.addEventListener('hashchange', updateOutline);
  updateOutline();
})();
