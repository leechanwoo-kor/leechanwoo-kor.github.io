(function () {
  function reveal(hash) {
    var id;
    try { id = decodeURIComponent(hash.slice(1)); } catch (error) { return; }
    var target = document.getElementById(id);
    var group = target && target.closest('details.taxonomy__singletons');
    if (!group) return;
    group.open = true;
    return target;
  }

  function revealLocation() {
    var target = reveal(window.location.hash);
    if (target) target.scrollIntoView({ block: 'start' });
  }

  document.addEventListener('click', function (event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest('a[href*="#"]');
    if (link && link.origin === window.location.origin && link.pathname === window.location.pathname) {
      reveal(link.hash);
    }
  }, true);
  window.addEventListener('hashchange', revealLocation);
  window.addEventListener('popstate', revealLocation, true);
  revealLocation();
}());
