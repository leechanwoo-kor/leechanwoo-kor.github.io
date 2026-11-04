(function () {
  var pagers = [];
  var pageSize = 10;

  function targetFor(hash) {
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch (error) { return null; }
  }

  function reveal(hash) {
    var target = targetFor(hash);
    var group = target && target.closest('details.taxonomy__singletons');
    if (!group) return;
    group.open = true;
    return target;
  }

  function revealLocation() {
    renderLocation();
    var revealed = reveal(window.location.hash);
    var target = targetFor(window.location.hash);
    if (revealed || pagers.some(function (pager) { return pager.section === target; })) target.scrollIntoView({ block: 'start' });
  }

  function pageURL(section, page) {
    var url = new URL(window.location.href);
    url.searchParams.delete('page');
    if (page > 1) url.searchParams.set('page', page);
    url.hash = section.id;
    return url.href;
  }

  function pageLink(pager, page, label, current) {
    var link = document.createElement('a');
    link.textContent = label;
    if (page < 1 || page > pager.total) {
      link.setAttribute('aria-disabled', 'true');
    } else {
      link.href = pageURL(pager.section, page);
      link.setAttribute('aria-label', label === 'Previous' ? 'Previous page' : label === 'Next' ? 'Next page' : 'Page ' + page);
      if (current) link.setAttribute('aria-current', 'page');
    }
    return link;
  }

  function render(pager, page) {
    pager.items.forEach(function (item, index) {
      item.hidden = index < (page - 1) * pageSize || index >= page * pageSize;
    });
    pager.nav.replaceChildren();
    var status = document.createElement('p');
    status.className = 'taxonomy__page-status';
    status.textContent = ((page - 1) * pageSize + 1) + '–' + Math.min(page * pageSize, pager.items.length) + ' / ' + pager.items.length + ' posts';
    pager.nav.appendChild(status);
    pager.nav.appendChild(pageLink(pager, page - 1, 'Previous'));
    var numbers = document.createElement('div');
    numbers.className = 'taxonomy__page-numbers';
    var pages = [];
    if (pager.total <= 5) {
      for (var i = 1; i <= pager.total; i++) pages.push(i);
    } else if (page <= 3) {
      pages = [1, 2, 3, 0, pager.total];
    } else if (page >= pager.total - 2) {
      pages = [1, 0, pager.total - 2, pager.total - 1, pager.total];
    } else {
      pages = [1, 0, page, 0, pager.total];
    }
    pages.forEach(function (number) {
      if (number) numbers.appendChild(pageLink(pager, number, String(number), number === page));
      else {
        var gap = document.createElement('span');
        gap.textContent = '…';
        gap.setAttribute('aria-hidden', 'true');
        numbers.appendChild(gap);
      }
    });
    pager.nav.appendChild(numbers);
    pager.nav.appendChild(pageLink(pager, page + 1, 'Next'));
  }

  function renderLocation() {
    var target = targetFor(window.location.hash);
    var value = new URL(window.location.href).searchParams.get('page');
    var page = /^[1-9]\d*$/.test(value) && Number.isSafeInteger(Number(value)) ? Number(value) : 1;
    pagers.forEach(function (pager) {
      render(pager, pager.section === target ? Math.min(page, pager.total) : 1);
    });
  }

  document.querySelectorAll('.taxonomy__section').forEach(function (section) {
    var entries = section.querySelector('.entries-list, .entries-grid');
    if (!entries || entries.children.length <= pageSize) return;
    var nav = document.createElement('nav');
    nav.className = 'taxonomy__pagination';
    nav.setAttribute('aria-label', section.querySelector('h2').textContent.trim() + ' pagination');
    entries.after(nav);
    pagers.push({ section: section, items: Array.from(entries.children), nav: nav, total: Math.ceil(entries.children.length / pageSize) });
  });

  document.addEventListener('click', function (event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest('a[href*="#"]');
    if (link && link.origin === window.location.origin && link.pathname === window.location.pathname) {
      var isPager = link.closest('.taxonomy__pagination');
      var resetPage = (link.closest('.taxonomy__index') || link.classList.contains('back-to-top')) && new URL(window.location.href).searchParams.has('page');
      if (isPager || resetPage) {
        event.preventDefault();
        var url = new URL(link.href);
        if (resetPage) url.searchParams.delete('page');
        if (url.href !== window.location.href) window.history.pushState(null, '', url.href);
        renderLocation();
        reveal(url.hash);
        var target = targetFor(url.hash);
        var heading = target && (target.querySelector('h2') || target);
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
          target.scrollIntoView({ block: 'start' });
        }
        return;
      }
      reveal(link.hash);
    }
  }, true);
  window.addEventListener('hashchange', revealLocation);
  window.addEventListener('popstate', revealLocation, true);
  revealLocation();
}());
