(function () {
  function initializeAdUnits() {
    var observer = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.contentRect.width <= 0) return;
        observer.unobserve(entry.target);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      });
    });
    document.querySelectorAll('.blog-ad .adsbygoogle').forEach(function (slot) {
      observer.observe(slot);
    });
  }

  if (window.adsenseReady) {
    initializeAdUnits();
  } else {
    window.addEventListener('adsense:ready', initializeAdUnits, { once: true });
  }
}());
