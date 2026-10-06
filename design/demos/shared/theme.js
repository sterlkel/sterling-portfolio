// Load in <head> so the theme is set before first paint.
// <html data-demo="abyss" data-default-theme="dark|light">
(function () {
  const root = document.documentElement;
  const key = 'sk-theme-' + (root.dataset.demo || 'demo');
  let t = null;
  try { t = localStorage.getItem(key); } catch (e) {}
  root.dataset.theme = t || root.dataset.defaultTheme || 'dark';

  function toggle() {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem(key, root.dataset.theme); } catch (e) {}
    document.dispatchEvent(new CustomEvent('themechange'));
  }
  document.addEventListener('click', e => { if (e.target.closest('[data-theme-toggle]')) toggle(); });
})();
