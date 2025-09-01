(function () {
  function onDomReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  function getSystemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
    
    var themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  }

  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem('theme');
    } catch (e) {}
    var theme = saved || (getSystemPrefersDark() ? 'dark' : 'light');
    applyTheme(theme);
    var btn = document.getElementById('themeToggleBtn');
    if (btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  onDomReady(function init() {
    var flipBtn = document.getElementById('flipBtn');
    var backBtn = document.getElementById('backBtn');
    var themeToggleBtn = document.getElementById('themeToggleBtn');
    var card = document.getElementById('card');

    initTheme();

    if (flipBtn) {
      flipBtn.addEventListener('click', function () {
        card.classList.add('flipped');
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        card.classList.remove('flipped');
      });
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        themeToggleBtn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
      });
    }
  });
})();